"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import SignatureLogo from "./SignatureLogo";

type PreloaderProps = {
  visible: boolean;
  onEnter: () => void;
};

export default function Preloader({
  visible,
  onEnter,
}: PreloaderProps) {
  const reduce =
    useReducedMotion();

  const [
    showWhiteFlash,
    setShowWhiteFlash,
  ] = useState(false);

  const hasEnteredRef =
    useRef(false);

  /* =========================================
     RESET
  ========================================= */

  useEffect(() => {
    if (!visible) {
      return;
    }

    setShowWhiteFlash(false);

    hasEnteredRef.current =
      false;
  }, [visible]);

  /* =========================================
     OPEN HOME
  ========================================= */

  const openHome = () => {
    if (
      hasEnteredRef.current
    ) {
      return;
    }

    hasEnteredRef.current =
      true;

    onEnter();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration:
              reduce
                ? 0.05
                : 0.18,

            ease: "easeOut",
          }}
          className="
            fixed inset-0
            z-[9999]

            flex
            items-center
            justify-center

            overflow-hidden

            bg-black

            pointer-events-none
          "
          aria-label="HPI Studio website is loading"
        >
          {/* ========================================= */}
          {/* LOGO ANIMATION */}
          {/* ========================================= */}

          <motion.div
            className="
              relative z-10

              flex
              items-center
              justify-center
            "
            initial={{
              scale: 1.6,
              opacity: 0,
            }}
            animate={{
              /*
               * Final value 1.84 che.
               * Pachhu scale 1 par nathi aavtu.
               * Etle NO ZOOM OUT.
               */
              scale: [
                1.6,
                1,
                1,
                1.84,
              ],

              opacity: [
                0,
                1,
                1,
                1,
              ],
            }}
            transition={{
              scale: {
                duration:
                  reduce
                    ? 1
                    : 5.2,

                times: [
                  0,
                  0.4,
                  0.68,
                  1,
                ],

                ease: [
                  0.16,
                  0.8,
                  0.24,
                  1,
                ],
              },

              opacity: {
                duration:
                  reduce
                    ? 0.25
                    : 1.2,

                times: [
                  0,
                  0.35,
                  0.8,
                  1,
                ],

                ease:
                  "easeOut",
              },
            }}
            onAnimationComplete={() => {
              /*
               * HPI Design Studio animation
               * + final zoom complete.
               *
               * Have ekdam white flash.
               */
              setShowWhiteFlash(
                true,
              );
            }}
          >
            <SignatureLogo
              className="
                h-auto
                w-[250px]

                sm:w-[350px]
              "
            />
          </motion.div>

     
         {/* ========================================= */}
{/* WHITE REVEAL FROM CENTER */}
{/* ========================================= */}

<AnimatePresence>
  {showWhiteFlash && (
    <motion.div
      initial={{
        clipPath:
          "circle(0% at 50% 50%)",
      }}
      animate={{
        clipPath:
          "circle(150% at 50% 50%)",
      }}
      transition={{
        duration: reduce
          ? 0.15
          : 0.75,

        ease: [
          0.76,
          0,
          0.24,
          1,
        ],
      }}
      onAnimationComplete={() => {
        window.setTimeout(
          openHome,
          reduce ? 20 : 80,
        );
      }}
      className="
        absolute inset-0
        z-50
        bg-white
      "
    />
  )}
</AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}