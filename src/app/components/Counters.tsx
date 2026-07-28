"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { target: 120, suffix: "+", label: "Projects Completed" },
  { target: 95, suffix: "+", label: "Happy Clients" },
  { target: 12, suffix: "", label: "Years Practicing" },
  { target: 8, suffix: "", label: "Cities Served" },
];

function CounterBox({
  target,
  suffix,
  label,
  index,
}: {
  target: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  const start = () => {
    if (started) return;
    setStarted(true);
    const duration = 1600;
    const t0 = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    requestAnimationFrame(tick);
  };

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={start}
      transition={{ duration: 0.9, delay: index * 0.08, ease: "easeOut" }}
    >
      <div className="font-serif text-[clamp(2.4rem,4.2vw,3.6rem)] text-gold-light flex items-baseline justify-center gap-0.5">
        <span>{value}</span>
        <span className="text-gold-dim text-[0.5em]">{suffix}</span>
      </div>
      <div className="mt-2.5 text-[0.7rem] uppercase tracking-widest2 text-muted">{label}</div>
    </motion.div>
  );
}

export default function Counters() {
  return (
    <section id="counters" className="bg-bg border-y border-line py-[150px] px-[7vw]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 gap-y-10">
        {stats.map((s, i) => (
          <CounterBox key={s.label} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}
