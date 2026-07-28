import Reveal from "./Reveal";
import ImageReveal from "./ImageReveal";

const videos = [
  {
    label: "Vira Residence — Walkthrough",
    visual:
      "radial-gradient(circle at 68% 24%,rgba(230,197,131,.16),transparent 23%),linear-gradient(145deg,#241f17,#100f0d 58%,#080908)",
  },
  {
    label: "Studio Process",
    visual:
      "linear-gradient(110deg,transparent 43%,rgba(184,134,58,.15) 43.3%,transparent 44%),linear-gradient(150deg,#191a17,#0b0c0b)",
  },
  {
    label: "Amber Court — Reveal",
    visual:
      "radial-gradient(ellipse at 30% 68%,rgba(243,239,231,.08),transparent 25%),linear-gradient(130deg,#201914,#100e0c 60%,#080908)",
  },
];

export default function Videos() {
  return (
    <section id="videos" className="bg-panel py-[150px] px-[7vw]">
      <Reveal className="max-w-[640px] mb-[70px]">
        <span className="eyebrow block mb-3.5">In Motion</span>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] text-ivory">Video Gallery</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <Reveal key={video.label} delay={index * 0.08}>
            <div className="group relative aspect-[16/10] overflow-hidden bg-[#0d0c0a]">
              <ImageReveal
                className="absolute inset-0"
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 0.07}
                parallax={18}
                hoverScale={1.06}
              >
                <div className="absolute inset-0" style={{ background: video.visual }} />
                <div className="absolute inset-[12%] border border-ivory/[0.07]" />
              </ImageReveal>

              <div className="absolute inset-0 z-10 bg-black/10 transition-colors duration-500 group-hover:bg-black/35" />
              <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[58px] h-[58px] rounded-full border border-gold flex items-center justify-center transition-all duration-500 group-hover:scale-[1.12] group-hover:bg-gold group-hover:shadow-[0_0_0_12px_rgba(184,134,58,.12)]">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gold-light ml-0.5 transition-colors duration-500 group-hover:fill-bg">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="absolute z-20 bottom-4 left-[18px] text-[0.75rem] tracking-wide text-muted transition-colors duration-300 group-hover:text-ivory">
                {video.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
