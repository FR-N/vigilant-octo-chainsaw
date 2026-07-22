import { Arrow, Reveal } from "./ui";
import { join, server } from "@/content/site";

export function Join() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="font-serif text-xl text-muted">01</span>
                <h2 className="font-serif text-3xl tracking-tight md:text-5xl">
                  如何加入
                </h2>
              </div>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/70 md:text-base">
                {join.intro}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={120}>
              <dl className="border-t border-ink/15">
                {join.rows.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between gap-4 border-b border-ink/15 py-5"
                  >
                    <dt className="text-xs uppercase tracking-[0.2em] text-ink/45 md:text-sm">
                      {r.label}
                    </dt>
                    <dd className="text-right font-serif text-lg tracking-tight md:text-2xl">
                      {r.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* live status */}
              <div className="mt-8 border border-ink/20 p-5 transition-colors hover:border-accent md:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[0.7rem] uppercase tracking-[0.25em] text-ink/45">
                    实时状态
                  </span>
                  <span className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-ink/45">
                    <span className="pulse-dot inline-block h-1.5 w-1.5 bg-accent" />
                    Live
                  </span>
                </div>
                <img
                  src={server.statusImg}
                  alt="Minceraft 巧克力服实时在线人数与服务器状态"
                  className="mt-3 h-auto w-full max-w-sm"
                  loading="lazy"
                />
              </div>

              <a
                href={server.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-2 text-sm"
              >
                <span className="uw">前往服务器文档站</span>
                <Arrow className="group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
