import { Arrow, Reveal } from "./ui";
import { now, server } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-surface text-surface-fg">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <div className="border-b border-surface-fg/15 py-16 md:py-24">
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-surface-fg/45">
              期待与你相见
            </p>
            <h2 className="mt-5 font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
              See you
              <br />
              <span className="italic">in&nbsp;game.</span>
            </h2>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="#join"
                className="group inline-flex items-center gap-3 border border-surface-fg/30 px-6 py-3.5 text-sm tracking-wide transition-all hover:border-accent hover:scale-[1.02] active:scale-95"
              >
                立即加入
                <Arrow className="group-hover:translate-x-1.5" />
              </a>
              <a
                href={server.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-sm"
              >
                <span className="uw">服务器文档</span>
                <Arrow className="group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col items-start justify-between gap-6 py-8 md:flex-row md:items-center">
          <span className="font-serif text-sm text-surface-fg/80">
            © {now.year} Minceraft 巧克力服 — 第 {now.age} 年 ❤️
          </span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.7rem] uppercase tracking-[0.2em] text-surface-fg/50">
            <span>Leaves 核心</span>
            <span className="text-surface-fg/30">·</span>
            <span>最新协议支持</span>
            <span className="text-surface-fg/30">·</span>
            <span>长期稳定运行</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
