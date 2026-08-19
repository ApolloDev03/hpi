"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SignatureLogo from "./SignatureLogo";

type PreloaderProps = {
  visible: boolean;
  onEnter: () => void;
};

export default function Preloader({ visible, onEnter }: PreloaderProps) {
  const reduce = useReducedMotion();
  const [awaitingInteraction, setAwaitingInteraction] = useState(false);
  const hasEnteredRef = useRef(false);

  const d = reduce ? 0.4 : 1;
  const drawDuration = reduce ? 0.6 : 2.3;

  const enterHome = useCallback(() => {
    if (!awaitingInteraction || hasEnteredRef.current) return;
    hasEnteredRef.current = true;
    onEnter();
  }, [awaitingInteraction, onEnter]);

  useEffect(() => {
    if (!visible || !awaitingInteraction) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      enterHome();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const allowedKeys = ["Enter", " ", "ArrowDown", "PageDown"];
      if (!allowedKeys.includes(event.key)) return;
      event.preventDefault();
      enterHome();
    };

    const handleTouch = (event: TouchEvent) => {
      event.preventDefault();
      enterHome();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouch, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [awaitingInteraction, enterHome, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`bg-black fixed inset-0 z-[9999] flex cursor-pointer flex-col items-center justify-center overflow-hidden  ${
            awaitingInteraction ? "pointer-events-auto" : "pointer-events-none"
          }`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025 }}
          transition={{ duration: 0.95 * d, ease: [0.76, 0, 0.24, 1] }}
          onClick={enterHome}
          role="button"
          tabIndex={awaitingInteraction ? 0 : -1}
          aria-label={
            awaitingInteraction
              ? "Click or scroll to enter the HPI Studio website"
              : "HPI Studio website is loading"
          }
        >
    

       
          <motion.div
  className="relative"
  initial={{ scale: 1.6, opacity: 0 }}
  animate={{
    scale: [1.6, 1, 1, 1.84, 1],
    opacity: 1,
  }}
  transition={{
    scale: {
      duration: (reduce ? 1.15 : 5.85) * d,
      times: [0, 0.4, 0.67, 0.84, 1],
      ease: [0.16, 0.8, 0.24, 1],
    },
    opacity: {
      duration: drawDuration * d,
      ease: [0.16, 0.8, 0.24, 1],
    },
  }}
  onAnimationComplete={() => {
              setAwaitingInteraction(true);
 
              if (!hasEnteredRef.current) {
                hasEnteredRef.current = true;
                onEnter();
              }
            }}
>
  <SignatureLogo className="h-auto w-[250px] sm:w-[350px]" />
</motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
