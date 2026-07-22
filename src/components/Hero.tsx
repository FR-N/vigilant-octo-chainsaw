import { Arrow, CopyButton, Reveal, RevealImage } from "./ui";
import { hero, now, server, volume } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* masthead */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-ink/15 pb-4 pt-24 text-[0.7rem] uppercase tracking-[0.25em] text-ink/45 md:pt-28">
          <span>
            Est. {server.foundedYear} · 公益原版生存
          </span>
          <span className="hidden sm:block">
            第 {now.age} 年 — Vol. {volume}
          </span>
          <span>和谐 · 友爱</span>
        </div>

        <div className="grid grid-cols-1 gap-y-12 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-x-12">
          {/* left — headline */}
          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="font-serif text-6xl leading-[0.92] tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem]">
                <span className="block">{hero.headlineTop}</span>
                <span className="block text-accent">
                  {hero.headlineBottom}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-ink/65 md:text-2xl">
                {hero.sub}
              </p>
            </Reveal>

            {/* address card */}
            <Reveal delay={200}>
              <div className="group mt-10 max-w-md border border-ink/20 p-5 transition-colors hover:border-accent md:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[0.7rem] uppercase tracking-[0.25em] text-ink/45">
                    服务器地址
                  </span>
                  <CopyButton value={server.address} />
                </div>
                <div className="mt-2 font-serif text-2xl tracking-tight md:text-3xl">
                  {server.address}
                </div>
                <div className="mt-1 text-xs text-ink/60">{hero.addressHint}</div>
              </div>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={280}>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href="#join"
                  className="group inline-flex items-center gap-3 bg-accent px-6 py-3.5 text-sm tracking-wide text-paper transition-all hover:bg-accent/85 hover:scale-[1.02] active:scale-95"
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
                  <span className="uw">阅读服务器文档</span>
                  <Arrow className="group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* right — portrait image */}
          <div className="lg:col-span-5">
            <RevealImage
              src={hero.image.src}
              alt={hero.image.alt}
              caption={hero.image.caption}
              className="aspect-[3/4] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


