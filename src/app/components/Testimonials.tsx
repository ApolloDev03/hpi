"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "HPI didn't just design our home — they translated how we live into every surface, corner and beam of light. It feels entirely, quietly ours.",
    by: "Meera & Arjun Shah — Vira Residence",
  },
  {
    quote:
      "What struck us most was the restraint. Nothing was there to impress a visitor — every choice was there to serve how we actually live.",
    by: "Rohan Mehta — Alcove Studio",
  },
  {
    quote:
      "They asked more questions about our mornings than our mood board. The result feels less designed and more discovered.",
    by: "Priya Kapadia — The Linden House",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonial" className="text-center py-[150px] px-[7vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <span className="font-serif text-6xl text-gold-dim leading-none block mb-5">“</span>

        <div className="relative min-h-[9rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-serif italic text-[clamp(1.4rem,2.6vw,2.2rem)] max-w-[820px] mx-auto leading-[1.6] text-ivory">
                {testimonials[current].quote}
              </p>
              <div className="mt-8 text-[0.72rem] uppercase tracking-widest2 text-gold-light">
                {testimonials[current].by}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-2.5 justify-center mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`w-[7px] h-[7px] rounded-full transition-colors duration-300 ${
                i === current ? "bg-gold" : "bg-line"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
