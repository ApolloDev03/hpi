import Reveal from "./Reveal";
import ImageReveal from "./ImageReveal";

const projects = [
  {
    cat: "Residential — 01",
    name: "Vira Residence",
    visual:
      "radial-gradient(circle at 70% 18%, rgba(218,189,133,.16), transparent 24%), linear-gradient(145deg,#2b251b 0%,#15120e 52%,#090908 100%)",
  },
  {
    cat: "Commercial — 02",
    name: "Alcove Studio",
    visual:
      "linear-gradient(120deg,transparent 40%,rgba(230,197,131,.13) 40.2%,transparent 41%), linear-gradient(155deg,#181b19 0%,#0f1110 53%,#080908 100%)",
  },
  {
    cat: "Interior — 03",
    name: "The Linden House",
    visual:
      "radial-gradient(ellipse at 35% 65%,rgba(176,127,61,.18),transparent 28%), linear-gradient(135deg,#221b15 0%,#12100e 58%,#090908 100%)",
  },
  {
    cat: "Residential — 04",
    name: "Kavi Bungalow",
    visual:
      "linear-gradient(90deg,transparent 63%,rgba(243,239,231,.06) 63%), radial-gradient(circle at 22% 24%,rgba(230,197,131,.12),transparent 24%), linear-gradient(150deg,#1d1a15,#0b0b0a)",
  },
  {
    cat: "Hospitality — 05",
    name: "Amber Court",
    visual:
      "linear-gradient(28deg,transparent 48%,rgba(184,134,58,.17) 48.3%,transparent 49%), linear-gradient(145deg,#292117 0%,#15110c 55%,#090908 100%)",
  },
  {
    cat: "Interior — 06",
    name: "Studio Noor",
    visual:
      "radial-gradient(circle at 64% 42%,rgba(243,239,231,.08),transparent 26%), linear-gradient(160deg,#191713 0%,#11100e 47%,#070807 100%)",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-[150px] px-[7vw]">
      <Reveal className="max-w-[640px] mb-[70px]">
        <span className="eyebrow block mb-3.5">Selected Work</span>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] text-ivory">Projects</h2>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-line">
        {projects.map((p, index) => (
          <Reveal key={p.name} delay={(index % 3) * 0.08}>
            <article className="group relative aspect-[3/4] bg-bg overflow-hidden flex items-end cursor-pointer">
              <ImageReveal
                className="absolute inset-0"
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 3) * 0.07}
                parallax={22 + (index % 3) * 5}
                hoverScale={1.065}
              >
                <div className="absolute inset-0" style={{ background: p.visual }} />
                <div className="absolute inset-[10%] border border-ivory/[0.07]" />
                <div className="absolute left-[16%] top-[13%] h-[56%] w-px bg-gold/20" />
                <div className="absolute left-[16%] top-[69%] h-px w-[62%] bg-gold/20" />
                <div className="absolute right-[14%] top-[21%] h-[34%] w-[46%] border border-gold/10 bg-black/[0.08]" />
              </ImageReveal>

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent transition-colors duration-700 group-hover:from-black/95" />
              <div className="relative z-10 w-full p-7">
                <span className="text-[0.62rem] uppercase tracking-widest2 text-gold-light block mb-2">
                  {p.cat}
                </span>
                <h3 className="font-serif text-2xl text-ivory">{p.name}</h3>
                <div className="mt-3 flex items-center gap-2 text-[0.68rem] uppercase tracking-widest2 text-muted opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-gold-light">
                  <span>View Project</span>
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </div>
              </div>

              <span className="pointer-events-none absolute left-0 top-0 z-20 h-px w-0 bg-gold/70 transition-all duration-700 group-hover:w-full" />
              <span className="pointer-events-none absolute right-0 top-0 z-20 h-0 w-px bg-gold/70 transition-all delay-150 duration-700 group-hover:h-full" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
