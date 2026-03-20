"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function ZoomableImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scroll while lightbox is open (avoids layout jump / flicker)
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Close on Escape (overlay uses role="dialog" for a11y)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const overlay =
    open && mounted ? (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={alt || "Image preview"}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(false);
        }}
      >
        <div
          className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-zinc-950/90 shadow-2xl shadow-black/60"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt}
            width={1800}
            height={1200}
            className="h-auto max-h-[85vh] w-full object-contain"
            priority
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/90"
          >
            Close
          </button>
        </div>
      </div>
    ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in text-left outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60"
        aria-label={`Open larger preview: ${alt}`}
      >
        <Image src={src} alt={alt} width={width} height={height} className={className} />
      </button>

      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
