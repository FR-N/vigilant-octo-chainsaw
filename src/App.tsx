import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Join } from "@/components/Join";
import { Story } from "@/components/Story";
import { Features } from "@/components/Features";
import { Extras } from "@/components/Extras";
import { Gallery } from "@/components/Gallery";
import { Specs } from "@/components/Specs";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/ui";
import { ticker } from "@/content/site";

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <main>
        <Hero />
        <div id="join" className="mt-16 scroll-mt-16 md:mt-24">
          <Marquee items={ticker} />
        </div>
        <Join />
        <Story />
        <Features />
        <Extras />
        <Gallery />
        <Specs />
      </main>
      <Footer />
    </div>
  );
}
