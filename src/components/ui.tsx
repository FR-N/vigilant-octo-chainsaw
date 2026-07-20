import { type ReactNode, useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";
import { cn } from "@/utils/cn";

/* ---------- Arrow (editorial line arrow) ---------- */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        "inline-block h-[0.85em] w-[1.5em] transition-transform duration-300",
        className
      )}
      viewBox="0 0 24 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      aria-hidden="true"
    >
      <path d="M0 6h22" strokeLinecap="square" />
      <path d="M17 1.4l5 4.6-5 4.6" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

/* ---------- Reveal (fade + rise on scroll) ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-1000 ease-editorial will-change-transform",
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------- RevealImage (clip-path wipe + grayscale -> colour) ---------- */
export function RevealImage({
  src,
  alt,
  caption,
  className,
  imgClassName,
  delay = 0,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const [colored, setColored] = useState(false);

  // Reveal colour on its own: once in view, hold the grayscale for ~1.5s
  // (so the image settles into place), then let the colour ease in.
  useEffect(() => {
    if (!inView) return;
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setColored(true);
      return;
    }
    const t = window.setTimeout(() => setColored(true), 1500);
    return () => window.clearTimeout(t);
  }, [inView]);

  return (
    <figure ref={ref} className={cn("group", className)}>
      <div
        className="h-full w-full overflow-hidden"
        style={{
          clipPath: inView ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          transition: "clip-path 1.2s var(--ease-editorial)",
          transitionDelay: `${delay}ms`,
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-all duration-[1400ms] ease-editorial",
            colored ? "grayscale-0" : "grayscale",
            inView ? "scale-100" : "scale-[1.08]",
            imgClassName
          )}
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.25em] text-ink/45">
          <span>{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ---------- Marquee ticker ---------- */
export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee-group relative overflow-hidden border-y border-ink/10 py-5">
      <div className="marquee-track flex w-max items-center">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 font-serif text-lg italic text-ink/70 md:text-xl">
              {item}
            </span>
            <span className="text-ink/25" aria-hidden="true">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Copy to clipboard button ---------- */
export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handle = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* noop */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={`复制 ${value}`}
      className={cn(
        "inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-ink/45 transition-colors hover:text-ink",
        className
      )}
    >
      {copied ? "已复制✔️" : "复制"}
      <span className="inline-block h-3 w-3" aria-hidden="true">
        {copied ? (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M3 8.5l3 3 7-7" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.25}>
            <rect x="4" y="4" width="9" height="9" />
            <path d="M3 11V3h8" />
          </svg>
        )}
      </span>
    </button>
  );
}
