"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    heading: (
      <>
        Design that is <em className="italic text-gold-light">felt</em>,
        <br />
        not just seen.
      </>
    ),
    sub: "HPI Design Studio shapes interiors and architecture around the way people actually live — quiet material choices, considered light, and spaces built to hold a life well.",
    cta: { href: "#projects", label: "View Our Work" },
    showLogo: true,
    bg: "radial-gradient(ellipse at 50% 15%, rgba(184,134,58,0.12), transparent 60%), linear-gradient(180deg,#0b0b0a,#0e0d0b)",
  },
  {
    heading: (
      <>
        Every corner,
        <br />
        <em className="italic text-gold-light">considered.</em>
      </>
    ),
    sub: "From first sketch to final handover, we design residences and studios that age gracefully and feel unmistakably like home.",
    cta: { href: "#about", label: "Our Philosophy" },
    showLogo: false,
    bg: "radial-gradient(ellipse at 70% 30%, rgba(184,134,58,0.10), transparent 60%), linear-gradient(160deg,#0d0c0a,#14110c)",
  },
  {
    heading: (
      <>
        Twelve years of
        <br />
        <em className="italic text-gold-light">quiet craft.</em>
      </>
    ),
    sub: "120+ projects across eight cities — each one built on the same idea: infuse the space with the life meant to fill it.",
    cta: { href: "#contact", label: "Start a Project" },
    showLogo: false,
    bg: "radial-gradient(ellipse at 30% 70%, rgba(184,134,58,0.10), transparent 60%), linear-gradient(200deg,#0c0b0a,#151007)",
  },
];

export default function Hero({ ready }: { ready: boolean }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const restart = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    restart();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (i: number) => {
    setCurrent((i + slides.length) % slides.length);
    restart();
  };

  const slide = slides[current];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-bg">
      {/* <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-[6vw]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute -inset-[3%] -z-10 will-change-transform"
            style={{ background: slide.bg }}
            initial={{ scale: 1.09 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: [0.2, 0.7, 0.2, 1] }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -z-[5] w-[34vw] border-x border-gold/[0.07] bg-ivory/[0.012]"
            initial={{ left: current % 2 === 0 ? "-38vw" : "104vw", opacity: 0 }}
            animate={{ left: current % 2 === 0 ? "68vw" : "-4vw", opacity: [0, 1, 0.35] }}
            transition={{ duration: 5.8, ease: [0.22, 1, 0.36, 1] }}
          />
          {current === 0 && (
            <div className="absolute inset-0 -z-10 opacity-50 pointer-events-none">
              <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="w-full h-full">
                <line x1="0" y1="80" x2="1000" y2="80" stroke="#b8863a" strokeWidth="0.4" opacity="0.3" />
                <line x1="0" y1="520" x2="1000" y2="520" stroke="#b8863a" strokeWidth="0.4" opacity="0.3" />
                <line x1="60" y1="0" x2="60" y2="600" stroke="#b8863a" strokeWidth="0.4" opacity="0.25" />
                <line x1="940" y1="0" x2="940" y2="600" stroke="#b8863a" strokeWidth="0.4" opacity="0.25" />
              </svg>
            </div>
          )}

          {slide.showLogo && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
              className="relative w-[220px] sm:w-[260px] mb-4"
            >
              <Image src="/logo-white.png" alt="HPI Studio" width={680} height={503} className="w-full h-auto" />
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="font-serif font-normal text-ivory leading-[1.08] text-[clamp(2.2rem,5.6vw,4.6rem)]"
          >
            {slide.heading}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-16 h-px bg-gold my-7"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.55, ease: "easeOut" }}
            className="max-w-[520px] text-muted text-base leading-[1.8]"
          >
            {slide.sub}
          </motion.p>

          <motion.a
            href={slide.cta.href}
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            className="inline-block mt-8 px-9 py-3.5 border border-gold text-gold-light text-[0.7rem] uppercase tracking-widest2 transition-colors duration-300 hover:bg-gold hover:text-bg"
          >
            {slide.cta.label}
          </motion.a>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-[7.5rem] left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2.5 text-muted text-[0.65rem] uppercase tracking-[0.3em]"
      >
        <span>Scroll</span>
        <span className="w-px h-9 bg-gradient-to-b from-gold to-transparent animate-pulse" />
      </motion.div>

      <div className="hidden md:flex absolute bottom-14 left-[5vw] z-[5] gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-[2px] w-[26px] transition-colors duration-300 ${
              i === current ? "bg-gold" : "bg-line"
            }`}
          />
        ))}
      </div>

      <div className="hidden md:flex absolute bottom-11 right-[5vw] z-[5] gap-3.5">
        <button
          onClick={() => goTo(current - 1)}
          aria-label="Previous slide"
          className="w-11 h-11 rounded-full border border-gold-line text-gold-light flex items-center justify-center transition-colors duration-300 hover:bg-gold/15 hover:border-gold"
        >
          ‹
        </button>
        <button
          onClick={() => goTo(current + 1)}
          aria-label="Next slide"
          className="w-11 h-11 rounded-full border border-gold-line text-gold-light flex items-center justify-center transition-colors duration-300 hover:bg-gold/15 hover:border-gold"
        >
          ›
        </button>
      </div> */}
    </section>
  );
}
