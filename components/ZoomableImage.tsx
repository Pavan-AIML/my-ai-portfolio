"use client";

import Image from "next/image";
import { useState } from "react";

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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full text-left"
        aria-label="Open image preview"
      >
        <Image src={src} alt={alt} width={width} height={height} className={className} />
      </button>

      {open ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
              setOpen(false);
            }
          }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          aria-label="Close image preview"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-black/40"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={1800}
              height={1200}
              className="h-auto max-h-[90vh] w-full object-contain"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white hover:bg-black/80"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
