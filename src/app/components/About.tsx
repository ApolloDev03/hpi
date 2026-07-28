import Reveal from "./Reveal";
import ImageReveal from "./ImageReveal";

export default function About() {
  return (
    <section id="about" className="bg-panel py-[150px] px-[7vw]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <Reveal>
          <span className="eyebrow block mb-3.5">About the Studio</span>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] text-ivory mb-6 leading-tight">
            A studio built around
            <br />
            one idea — <em className="italic">infusion</em>.
          </h2>
          <span className="block font-serif italic text-gold-light text-xl mb-6">
            Every space should feel infused with the life meant to fill it.
          </span>
          <p className="text-muted leading-[1.95] mb-5 text-[1.02rem]">
            HPI Design Studio began as a small drafting table and a conviction: that good
            design is never decorative first. It listens to how a family moves through a
            morning, how light should fall across a reading chair at 5pm, how a threshold
            should feel underfoot.
          </p>
          <p className="text-muted leading-[1.95] text-[1.02rem]">
            We work across residences, studios and commercial interiors — pairing restrained
            material palettes with a handmade attention to proportion, joinery and light.
          </p>
        </Reveal>

        <div className="relative">
          <ImageReveal
            className="brackets relative aspect-[4/5] bg-[#0e0d0b]"
            direction="right"
            delay={0.08}
            parallax={34}
            hoverScale={1.045}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_25%,rgba(230,197,131,0.15),transparent_24%),linear-gradient(145deg,#211d15_0%,#15120e_45%,#090908_100%)]" />
            <div className="absolute inset-[9%] border border-gold/15" />
            <div className="absolute left-[17%] top-[12%] h-[66%] w-[1px] bg-gold/25" />
            <div className="absolute left-[17%] top-[51%] h-px w-[66%] bg-gold/25" />
            <div className="absolute right-[13%] top-[18%] h-[38%] w-[42%] border border-ivory/10 bg-ivory/[0.02] backdrop-blur-[1px]" />
            <div className="absolute bottom-[18%] left-[22%] h-[24%] w-[56%] border border-gold/15 bg-black/15" />
            <span className="absolute inset-0 flex items-center justify-center font-serif italic text-gold-dim text-8xl opacity-50">
              hpi
            </span>
            <span className="b-tr" />
            <span className="b-br" />
          </ImageReveal>

          <Reveal delay={0.55} className="absolute -bottom-7 -left-5 hidden sm:block">
            <div className="border border-gold/25 bg-bg/90 px-5 py-3 backdrop-blur-md">
              <span className="block text-[0.58rem] uppercase tracking-[0.32em] text-gold-light">
                Form · Light · Life
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
