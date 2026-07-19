import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Arrow } from "./ui";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { label: "连接", href: "#join" },
  { label: "故事", href: "#story" },
  { label: "特色", href: "#features" },
  { label: "扩展", href: "#extras" },
  { label: "画廊", href: "#gallery" },
  { label: "规格", href: "#specs" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-ink/10 bg-paper/95"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        <a
          href="#top"
          className="font-serif text-base tracking-[0.35em] uppercase"
        >
          Chocolate
        </a>

        <nav className="hidden items-center gap-9 text-sm md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="uw text-ink/70 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 md:gap-6">
          <ThemeToggle />
          <div className="hidden items-center gap-6 md:flex">
            <a
              href="#join"
              className="group inline-flex items-center gap-2 text-sm"
            >
              <span className="uw">立即加入</span>
              <Arrow className="group-hover:translate-x-1" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="菜单"
            aria-expanded={open}
          >
            <span className="relative block h-3 w-6">
              <span
                className={cn(
                  "absolute left-0 block h-px w-6 bg-ink transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 block h-px w-6 bg-ink transition-all duration-300",
                  open ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-px w-6 bg-ink transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-ink/10 bg-paper transition-all duration-500 md:hidden",
          open ? "max-h-96 border-t" : "max-h-0"
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-6 py-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/10 py-3 text-sm text-ink/80"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#join"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 py-4 text-sm"
          >
            立即加入 <Arrow />
          </a>
        </nav>
      </div>
    </header>
  );
}
