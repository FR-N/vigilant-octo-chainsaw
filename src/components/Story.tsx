import { Reveal } from "./ui";
import { story } from "@/content/site";

export function Story() {
  return (
    <section
      id="story"
      className="flex min-h-[calc(100vh-4rem)] scroll-mt-16 flex-col justify-center bg-surface text-surface-fg"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="font-serif text-xl text-surface-fg/30">02</span>
                <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">
                  {story.headingTop}
                  <br />
                  <span className="text-muted">
                    {story.headingBottom}
                  </span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-8 max-w-sm font-serif text-lg leading-relaxed text-surface-fg/70">
                “{story.quote}”
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={120}>
              <div className="text-sm leading-relaxed text-surface-fg/75 md:columns-2 md:gap-8 md:text-base">
                {story.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === story.paragraphs.length - 1
                        ? "break-inside-avoid"
                        : "mb-6 break-inside-avoid"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
