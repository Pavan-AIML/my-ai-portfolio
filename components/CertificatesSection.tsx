"use client";

import { useEffect, useMemo, useState } from "react";

type InitialCertificate = {
  name: string;
  issuer: string;
  year: string;
  link?: string;
};

type UploadedCertificate = {
  filename: string;
  url: string;
  slot?: string;
};

function filenameToTitle(filename: string) {
  const base = filename.replace(/\.pdf$/i, "");
  // Replace common separators for a nicer display.
  return base.replace(/[-_]+/g, " ").trim();
}

function toSlotId(name: string, year: string) {
  return `${name}-${year}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function CertificatesSection({
  initialCertificates,
}: {
  initialCertificates: InitialCertificate[];
}) {
  const isDev = process.env.NODE_ENV === "development";
  const [uploaded, setUploaded] = useState<UploadedCertificate[]>([]);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const certificatesWithUploads = useMemo(() => {
    const uploadedBySlot = new Map<string, UploadedCertificate>();
    for (const u of uploaded) {
      if (u.slot) uploadedBySlot.set(u.slot, u);
    }

    return initialCertificates.map((c) => {
      const slot = toSlotId(c.name, c.year);
      const uploadedItem = uploadedBySlot.get(slot);
      return {
        ...c,
        slot,
        viewUrl: uploadedItem?.url ?? c.link,
        uploadedFilename: uploadedItem?.filename,
      };
    });
  }, [uploaded, initialCertificates]);

  const refresh = async () => {
    try {
      const res = await fetch("/api/certificates/list");
      if (!res.ok) throw new Error(`List failed (${res.status})`);
      const data = (await res.json()) as { items: UploadedCertificate[] };
      setUploaded(data.items ?? []);
    } catch {
      // Listing is best-effort; don't break the whole page.
      setUploaded([]);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const onUpload = async (slot: string, file: File | null) => {
    if (!file) return;

    setUploadingSlot(slot);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("slot", slot);

      const res = await fetch("/api/certificates/upload", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      if (!res.ok) {
        throw new Error(text || `Upload failed (${res.status})`);
      }

      await refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setUploadError(msg);
    } finally {
      setUploadingSlot(null);
    }
  };

  return (
    <div className="mt-0">
      <h2 className="text-lg font-semibold">Certificates</h2>
      <p className="mt-2 text-sm text-white/70">
        Upload certificate PDFs inside each card and open them directly from this section.
      </p>

      {uploadError ? <p className="mt-3 text-xs text-red-200">{uploadError}</p> : null}

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {certificatesWithUploads.map((c) => (
          <article
            key={c.slot}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/30"
          >
            <p className="text-sm font-semibold">{c.name}</p>
            <p className="mt-2 text-xs text-white/70">{c.issuer}</p>
            {c.year ? <p className="mt-1 text-xs text-white/55">{c.year}</p> : null}

            {isDev ? (
              <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10">
                {uploadingSlot === c.slot ? "Uploading..." : "Upload PDF"}
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  disabled={uploadingSlot !== null}
                  onChange={(e) => onUpload(c.slot, e.target.files?.[0] ?? null)}
                />
              </label>
            ) : null}

            {c.viewUrl ? (
              <a
                href={c.viewUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
              >
                View PDF
              </a>
            ) : (
              <p className="mt-4 text-[11px] text-white/50">Upload a PDF for this card.</p>
            )}

            {c.uploadedFilename ? (
              <p className="mt-2 text-[11px] text-white/50">
                Uploaded: {filenameToTitle(c.uploadedFilename)}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

