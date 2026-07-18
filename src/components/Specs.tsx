import { Reveal } from "./ui";
import { specs } from "@/content/site";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Specs() {
  return (
    <section id="specs" className="scroll-mt-24 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-baseline gap-5">
              <span className="font-serif text-xl text-ink/30">06</span>
              <h2 className="font-serif text-3xl tracking-tight md:text-5xl">
                技术栈
              </h2>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-ink/50 md:text-sm">
              基于 Leaves 核心，保留原版特性，支持最新协议。
            </p>
          </div>
        </Reveal>

        {/* 想加技术项：在 content/site.ts 的 specs 数组里追加一条即可 */}
        <div className="mt-12 grid grid-cols-2 border-t border-l border-ink/15 sm:grid-cols-3 md:mt-16 lg:grid-cols-5">
          {specs.map((s, i) => (
            <Reveal key={s.name} delay={(i % 5) * 70} className="h-full">
              <div className="group flex h-full min-h-[9rem] flex-col justify-between border-b border-r border-ink/15 p-5 transition-colors duration-300 hover:border-ink md:p-6">
                <span className="font-serif text-sm text-ink/30">
                  {pad(i + 1)}
                </span>
                <div className="mt-auto pt-8">
                  <h3 className="font-serif text-lg tracking-tight transition-all duration-300 group-hover:italic md:text-xl">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-xs text-ink/60">{s.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
