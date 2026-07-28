"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  mediaClassName?: string;
  delay?: number;
  direction?: "left" | "right";
  parallax?: number;
  hoverScale?: number;
  once?: boolean;
};

/**
 * Editorial image reveal inspired by contemporary architecture portfolios:
 * a precise curtain opening, a restrained scroll parallax and a light sweep.
 * It works with Next/Image, video, or any existing visual block.
 */
export default function ImageReveal({
  children,
  className = "",
  mediaClassName = "",
  delay = 0,
  direction = "left",
  parallax = 28,
  hoverScale = 1.035,
  once = true,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);
  const y = useSpring(rawY, { stiffness: 85, damping: 24, mass: 0.35 });

  const hiddenClip =
    direction === "left"
      ? "inset(0 100% 0 0 round 0px)"
      : "inset(0 0 0 100% round 0px)";

  return (
    <motion.div
      ref={ref}
      className={`group/image-reveal relative overflow-hidden ${className}`}
      initial={reduce ? { opacity: 0 } : { clipPath: hiddenClip }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0 round 0px)" }}
      viewport={{ once, amount: 0.18 }}
      transition={{
        duration: reduce ? 0.2 : 1.25,
        delay,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <motion.div
        className={`absolute -inset-y-8 inset-x-0 will-change-transform ${mediaClassName}`}
        style={reduce ? undefined : { y }}
        initial={reduce ? undefined : { scale: 1.12 }}
        whileInView={reduce ? undefined : { scale: 1 }}
        whileHover={reduce ? undefined : { scale: hoverScale }}
        viewport={{ once, amount: 0.18 }}
        transition={{
          scale: { duration: 1.45, delay, ease: [0.2, 0.7, 0.2, 1] },
        }}
      >
        {children}
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-20 w-[22%] bg-gradient-to-r from-transparent via-ivory/16 to-transparent blur-[2px]"
        initial={{ left: direction === "left" ? "-30%" : "108%", opacity: 0 }}
        whileInView={{
          left: direction === "left" ? "112%" : "-32%",
          opacity: [0, 0.7, 0],
        }}
        viewport={{ once, amount: 0.2 }}
        transition={{
          duration: reduce ? 0.01 : 1.35,
          delay: delay + 0.48,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 z-30 w-px bg-gold/70 ${
          direction === "left" ? "right-0 origin-bottom" : "left-0 origin-top"
        }`}
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
        viewport={{ once, amount: 0.2 }}
        transition={{ duration: reduce ? 0.01 : 1.05, delay: delay + 0.1, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
