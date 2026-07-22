import { Arrow, Reveal } from "./ui";
import { extras } from "@/content/site";

// 给两位数编号：01 02 03 …
function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Extras() {
  return (
    <section
      id="extras"
      className="flex min-h-[calc(100vh-4rem)] scroll-mt-16 flex-col justify-center py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-baseline gap-5">
              <span className="font-serif text-xl text-muted">04</span>
              <h2 className="font-serif text-3xl tracking-tight md:text-5xl">
                扩展玩法
              </h2>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-ink/50 md:text-sm">
              主服之外，还有子服与模组等你探索——按下面的步骤即可轻松上手。
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px border border-ink/15 bg-ink/15 md:mt-16 md:grid-cols-2">
          {extras.map((e, i) => (
            <Reveal key={e.title} delay={i * 100} className="h-full">
              <div className="flex h-full flex-col bg-paper p-6 transition-colors duration-300 hover:bg-ink/[0.03] md:p-9">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-sm text-muted">
                    {pad(i + 1)}
                  </span>
                  <h3 className="font-serif text-2xl tracking-tight transition-all duration-300 hover:scale-[1.02] origin-left md:text-3xl">
                    {e.title}
                  </h3>
                </div>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70 md:text-base">
                  {e.desc}
                </p>

                {e.steps.length > 0 && (
                  <ol className="mt-6 flex flex-col gap-3">
                    {e.steps.map((s, si) => (
                      <li
                        key={si}
                        className="flex items-center gap-4 border-t border-ink/10 pt-3 text-sm text-ink/75"
                      >
                        <span className="font-serif text-xs text-muted/70">
                          0{si + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                )}

                {e.link && (
                  <a
                    href={e.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-auto inline-flex items-center gap-2 pt-6 text-sm"
                  >
                    <span className="uw">{e.link.label}</span>
                    <Arrow className="group-hover:translate-x-1" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
