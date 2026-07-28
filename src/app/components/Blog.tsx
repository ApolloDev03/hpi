import Reveal from "./Reveal";
import ImageReveal from "./ImageReveal";

const posts = [
  {
    date: "14 June 2026",
    title: "Designing for Ahmedabad's Light",
    excerpt:
      "How we plan window placement and shading around the city's harsh summer sun without losing warmth in winter.",
    visual:
      "radial-gradient(circle at 75% 26%,rgba(230,197,131,.16),transparent 22%),linear-gradient(145deg,#252017,#11100d 60%,#090908)",
  },
  {
    date: "02 May 2026",
    title: "Materials We Keep Returning To",
    excerpt:
      "A short list of stone, wood and metal finishes that age well and quietly anchor a home's palette over decades.",
    visual:
      "linear-gradient(30deg,transparent 46%,rgba(184,134,58,.15) 46.3%,transparent 47%),linear-gradient(160deg,#1d1a15,#0b0c0b)",
  },
  {
    date: "19 March 2026",
    title: "Inside the Vira Residence Build",
    excerpt:
      "A behind-the-scenes look at how a single client conversation shaped an entire home's layout and light.",
    visual:
      "radial-gradient(ellipse at 30% 75%,rgba(243,239,231,.07),transparent 26%),linear-gradient(135deg,#211a14,#11100e 55%,#080908)",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="bg-panel py-[150px] px-[7vw]">
      <Reveal className="max-w-[640px] mb-[70px]">
        <span className="eyebrow block mb-3.5">The Journal</span>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] text-ivory">From the Studio</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-11">
        {posts.map((post, index) => (
          <Reveal key={post.title} delay={index * 0.08}>
            <article className="group">
              <ImageReveal
                className="relative aspect-[4/3] mb-5 bg-[#0d0c0a]"
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.07}
                parallax={20}
                hoverScale={1.055}
              >
                <div className="absolute inset-0" style={{ background: post.visual }} />
                <div className="absolute inset-[12%] border border-gold/10" />
                <div className="absolute bottom-[20%] left-[10%] h-px w-[80%] bg-ivory/10" />
              </ImageReveal>
              <span className="text-[0.66rem] uppercase tracking-widest2 text-gold-light">
                {post.date}
              </span>
              <h3 className="font-serif text-2xl text-ivory mt-3 mb-3.5 transition-colors duration-300 group-hover:text-gold-light">
                {post.title}
              </h3>
              <p className="text-muted text-[0.94rem] leading-[1.8] mb-4">{post.excerpt}</p>
              <a
                href="#"
                className="text-[0.68rem] uppercase tracking-widest2 text-gold-light inline-flex items-center"
              >
                Read More
                <span className="ml-1.5 transition-[margin] duration-300 group-hover:ml-3">→</span>
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
