"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export type GalleryImage = { src: string; caption: string };

// Product photos from public/pictures/. One image renders as a still; several
// become a mini-gallery with arrows and dots. Clicking the photo opens the full,
// uncropped catalog sheet in a lightbox. The category icon shows while an image
// loads (or if it 404s) and disappears once the photo is on screen.
export default function ProductImage({
  images,
  alt,
  fallback,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className = "aspect-[4/3]",
}: {
  images: readonly GalleryImage[];
  alt: string;
  fallback: ReactNode;
  sizes?: string;
  className?: string;
}) {
  const t = useTranslations("Features.gallery");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState<ReadonlySet<string>>(new Set());
  const [failed, setFailed] = useState<ReadonlySet<string>>(new Set());
  const count = images.length;
  const multi = count > 1;
  const current = images[index];
  const currentOk = !failed.has(current.src);

  const go = (step: number) => setIndex((i) => (i + step + count) % count);
  const mark = (set: typeof setLoaded, src: string) =>
    set((prev) => new Set(prev).add(src));

  const arrows = (variant: "card" | "lightbox") =>
    [
      { step: -1, Icon: ChevronLeft, side: "left-2", wide: "left-2 sm:left-4", label: t("prev") },
      { step: 1, Icon: ChevronRight, side: "right-2", wide: "right-2 sm:right-4", label: t("next") },
    ].map(({ step, Icon, side, wide, label }) => (
      <button
        key={label}
        type="button"
        onClick={() => go(step)}
        aria-label={label}
        className={
          variant === "card"
            ? `absolute top-1/2 ${side} z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-800 shadow-md transition-all hover:bg-accent-500 hover:text-brand-950 focus-visible:opacity-100 sm:opacity-0 sm:group-hover/gallery:opacity-100`
            : `absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-accent-500 hover:text-brand-950 ${wide}`
        }
      >
        <Icon className={variant === "card" ? "size-4" : "size-6"} aria-hidden />
      </button>
    ));

  return (
    <>
      <div
        className={`group/gallery relative overflow-hidden rounded-xl bg-white ring-1 ring-inset ring-slate-200 ${className}`}
        aria-roledescription={multi ? "carousel" : undefined}
        aria-label={multi ? alt : undefined}
      >
        {images.map(({ src, caption }, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            {/* Placeholder icon, only until the photo has loaded */}
            {!loaded.has(src) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-50 to-slate-100 text-brand-200">
                {fallback}
              </div>
            )}
            {!failed.has(src) && (
              <button
                type="button"
                onClick={() => {
                  setOpen(true);
                  dialogRef.current?.showModal();
                }}
                tabIndex={i === index ? 0 : -1}
                aria-label={`${t("expand")}: ${caption}`}
                className="absolute inset-0 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent-500"
              >
                <Image
                  src={src}
                  alt={`${alt} – ${caption}`}
                  fill
                  sizes={sizes}
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  onLoad={() => mark(setLoaded, src)}
                  onError={() => mark(setFailed, src)}
                />
              </button>
            )}
          </div>
        ))}

        {/* Soft bottom fade so the caption chip reads on white catalog sheets */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-950/45 via-brand-950/10 to-transparent"
        />

        <p className="pointer-events-none absolute bottom-2.5 left-2.5 max-w-[calc(100%-5.5rem)] truncate rounded-md bg-brand-950/85 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
          {current.caption}
        </p>

        {currentOk && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-2.5 top-2.5 flex items-center gap-1 rounded-md bg-brand-950/75 px-2 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur transition-opacity group-hover/gallery:opacity-100"
          >
            <Maximize2 className="size-3" />
            {t("expand")}
          </span>
        )}

        {multi && (
          <>
            <span className="pointer-events-none absolute right-2.5 top-2.5 rounded bg-white/90 px-1.5 py-0.5 font-mono text-[11px] font-bold text-brand-700 shadow-sm">
              {String(index + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
            </span>

            {arrows("card")}

            <div className="absolute bottom-3.5 right-2.5 z-10 flex gap-1.5">
              {images.map(({ src, caption }, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={caption}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-5 bg-accent-500"
                      : "w-1.5 bg-white/70 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox: native <dialog> gives us Esc-to-close and focus trapping */}
      <dialog
        ref={dialogRef}
        aria-label={`${alt} – ${current.caption}`}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        onKeyDown={(e) => {
          if (!multi) return;
          if (e.key === "ArrowLeft") go(-1);
          if (e.key === "ArrowRight") go(1);
        }}
        className="m-auto size-full max-h-none max-w-none bg-transparent p-0 backdrop:bg-brand-950/90 backdrop:backdrop-blur-sm"
      >
        <div className="pointer-events-none flex size-full flex-col items-center justify-center gap-4 p-4 sm:p-10">
          <div className="pointer-events-auto relative h-[78vh] w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-white/10">
            {/* Only mounted while open, so full-size sheets aren't fetched up front */}
            {open && currentOk && (
              <Image
                key={current.src}
                src={current.src}
                alt={`${alt} – ${current.caption}`}
                fill
                sizes="(min-width: 1200px) 1152px, 100vw"
                className="object-contain p-2 sm:p-4"
              />
            )}
            {multi && arrows("lightbox")}
          </div>

          <div className="pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-4 text-white">
            <p className="min-w-0 truncate text-sm font-semibold sm:text-base">
              <span className="text-accent-400">{alt}</span>
              <span className="mx-2 text-brand-300">·</span>
              {current.caption}
              {multi && (
                <span className="ml-3 font-mono text-xs text-brand-300">
                  {String(index + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold ring-1 ring-white/20 transition-colors hover:bg-accent-500 hover:text-brand-950"
            >
              <X className="size-4" aria-hidden />
              {t("close")}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
