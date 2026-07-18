import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage unavailable — ignore */
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(readTheme);

  // Follow the system preference live, unless the user has chosen explicitly.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      let explicit = true;
      try {
        explicit = localStorage.getItem("theme") !== null;
      } catch {
        explicit = false;
      }
      if (!explicit) {
        const next: Theme = mq.matches ? "dark" : "light";
        setTheme(next);
        document.documentElement.classList.toggle("dark", next === "dark");
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "切换到日间模式" : "切换到夜间模式"}
      title={theme === "dark" ? "日间模式" : "夜间模式"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center text-ink/70 transition-colors hover:text-ink active:scale-95",
        className
      )}
    >
      {theme === "dark" ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2.5M12 19.5V22M4.4 4.4l1.8 1.8M17.8 17.8l1.8 1.8M2 12h2.5M19.5 12H22M4.4 19.6l1.8-1.8M17.8 6.2l1.8-1.8"
            strokeLinecap="square"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <path
            d="M20 14.4A8 8 0 1 1 9.6 4a6.4 6.4 0 0 0 10.4 10.4z"
            strokeLinejoin="miter"
          />
        </svg>
      )}
    </button>
  );
}
