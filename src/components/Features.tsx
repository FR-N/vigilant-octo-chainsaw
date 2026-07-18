import { Arrow, Reveal } from "./ui";
import { features } from "@/content/site";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <div className="flex items-baseline gap-5">
            <span className="font-serif text-xl text-ink/30">03</span>
            <h2 className="font-serif text-3xl tracking-tight md:text-5xl">
              特色支持
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 border-t border-ink/15 md:mt-16">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-3 border-b border-ink/15 py-7 transition-colors duration-300 hover:bg-ink/[0.03] md:py-9">
                <div className="col-span-2 font-serif text-base text-ink/30 md:col-span-1 md:text-lg">
                  {pad(i + 1)}
                </div>
                <h3 className="col-span-10 font-serif text-2xl tracking-tight transition-all duration-300 group-hover:translate-x-1 group-hover:italic md:col-span-4 md:text-3xl">
                  {f.title}
                </h3>
                <p className="col-span-12 text-sm leading-relaxed text-ink/70 md:col-span-6 md:text-base">
                  {f.desc}
                </p>
                <div className="col-span-12 hidden items-center justify-end md:col-span-1 md:flex">
                  <Arrow className="text-ink/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
