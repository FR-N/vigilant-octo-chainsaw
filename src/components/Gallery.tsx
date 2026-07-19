import { Reveal, RevealImage } from "./ui";
import { GALLERY_SIZES, gallery } from "@/content/site";

export function Gallery() {
  return (
    <section
      id="gallery"
      className="flex min-h-[calc(100vh-4rem)] scroll-mt-16 flex-col justify-center py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div className="flex items-baseline gap-5">
              <span className="font-serif text-xl text-ink/30">05</span>
              <h2 className="font-serif text-3xl tracking-tight md:text-5xl">
                记录
              </h2>
            </div>
            <span className="hidden text-xs uppercase tracking-[0.25em] text-ink/45 sm:block">
              玩家作品 · Grayscale
            </span>
          </div>
        </Reveal>

        {/* 想加图：在 content/site.ts 的 gallery 数组里追加一条即可 */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-12 md:gap-6">
          {gallery.map((g, i) => (
            <RevealImage
              key={g.src}
              src={g.src}
              alt={g.alt}
              caption={g.caption}
              delay={i * 60}
              className={GALLERY_SIZES[g.size]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
