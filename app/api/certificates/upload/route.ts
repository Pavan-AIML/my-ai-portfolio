import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function safeFilename(name: string) {
  const base = name.replace(/[/\\?%*:|"<>]/g, "-");
  return base.replace(/\s+/g, " ").trim();
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const rawFile = formData.get("file");
  const slot = String(formData.get("slot") ?? "").trim().toLowerCase();

  if (!(rawFile instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  const file = rawFile;
  if (!slot) {
    return NextResponse.json({ error: "Missing slot" }, { status: 400 });
  }
  if (!/^[a-z0-9-]+$/.test(slot)) {
    return NextResponse.json({ error: "Invalid slot format" }, { status: 400 });
  }

  const originalName = String(file.name ?? "certificate.pdf");
  const ext = path.extname(originalName).toLowerCase();
  if (ext !== ".pdf") {
    return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
  }

  const maxBytes = 10 * 1024 * 1024; // 10MB
  if (Number(file.size) > maxBytes) {
    return NextResponse.json({ error: "File is too large (max 10MB)" }, { status: 400 });
  }

  const certDir = path.join(process.cwd(), "public", "certificates");
  await fs.mkdir(certDir, { recursive: true });

  // Keep one PDF per card slot; remove older uploads for same slot.
  const existing = await fs.readdir(certDir, { withFileTypes: true });
  const toDelete = existing
    .filter((e) => e.isFile() && e.name.startsWith(`${slot}__`) && e.name.toLowerCase().endsWith(".pdf"))
    .map((e) => path.join(certDir, e.name));
  await Promise.all(toDelete.map((f) => fs.unlink(f).catch(() => undefined)));

  const filename = `${slot}__${Date.now()}-${safeFilename(originalName)}`;
  const filePath = path.join(certDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return NextResponse.json({
    slot,
    filename,
    url: `/certificates/${filename}`,
  });
}

