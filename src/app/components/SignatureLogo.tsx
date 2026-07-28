"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  HPI_SIGNATURE_PATH_D,
  HPI_STUDIO_PATH_D,
  HPI_TAGLINE_PATH_D,
} from "./logoPath";

/**
 * Draws the original logo artwork in three deliberate stages.
 * HPI keeps its approved draw treatment. Studio enters from the right edge,
 * while the lower interior/tagline line rises from the bottom.
 */
export default function SignatureLogo({
  className = "",
  onDrawComplete,
}: {
  className?: string;
  onDrawComplete?: () => void;
}) {
  const reduce = useReducedMotion();

  const signatureDuration = reduce ? 0.6 : 2.3;
  const studioDuration = reduce ? 0.35 : 0.9;
  const taglineDuration = reduce ? 0.3 : 0.78;

  const studioDelay = reduce ? 0.4 : 1.92;
  const taglineDelay = reduce ? 0.62 : 2.72;
  const completeAt = taglineDelay + taglineDuration + (reduce ? 0.1 : 0.42);

  return (
    <svg
      viewBox="0 0 4150 3065"
      className={className}
      role="img"
      aria-label="HPI Studio — Infused your dreams"
    >
      <g transform="translate(0,3065) scale(0.1,-0.1)">
        {/* Existing HPI signature animation — intentionally unchanged. */}
        <motion.path
          d={HPI_SIGNATURE_PATH_D}
          fill="#f3efe7"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: signatureDuration - 0.15,
            ease: "easeOut",
          }}
        />
        <motion.path
          d={HPI_SIGNATURE_PATH_D}
          fill="none"
          stroke="#e6c583"
          strokeWidth={55}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: [1, 1, 0] }}
          transition={{
            pathLength: { duration: signatureDuration, ease: "easeInOut" },
            opacity: {
              duration: signatureDuration + 0.6,
              times: [0, signatureDuration / (signatureDuration + 0.6), 1],
            },
          }}
        />

        {/* Studio travels in from the screen's right side, then settles into place. */}
        <motion.g
          initial={{ x: reduce ? 0 : 19000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            x: {
              duration: studioDuration,
              delay: studioDelay,
              ease: [0.16, 1, 0.3, 1],
            },
            opacity: {
              duration: reduce ? 0.15 : 0.42,
              delay: studioDelay,
              ease: "easeOut",
            },
          }}
        >
          <motion.path
            d={HPI_STUDIO_PATH_D}
            fill="#f3efe7"
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduce ? 0.2 : 0.42,
              delay: studioDelay + studioDuration * 0.62,
              ease: "easeOut",
            }}
          />
          <motion.path
            d={HPI_STUDIO_PATH_D}
            fill="none"
            stroke="#e6c583"
            strokeWidth={34}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
            transition={{
              pathLength: {
                duration: studioDuration,
                delay: studioDelay,
                ease: [0.4, 0, 0.2, 1],
              },
              opacity: {
                duration: studioDuration + (reduce ? 0.15 : 0.5),
                delay: studioDelay,
                times: [0, 0.08, 0.72, 1],
              },
            }}
          />
        </motion.g>

        {/* The lower interior/tagline line rises upward from below the logo. */}
        <motion.g
          initial={{ y: reduce ? 0 : -9000, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            y: {
              duration: taglineDuration,
              delay: taglineDelay,
              ease: [0.16, 1, 0.3, 1],
            },
            opacity: {
              duration: reduce ? 0.15 : 0.4,
              delay: taglineDelay,
              ease: "easeOut",
            },
          }}
        >
          <motion.path
            d={HPI_TAGLINE_PATH_D}
            fill="#f3efe7"
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduce ? 0.2 : 0.5,
              delay: taglineDelay + taglineDuration * 0.55,
              ease: "easeOut",
            }}
          />
          <motion.path
            d={HPI_TAGLINE_PATH_D}
            fill="none"
            stroke="#e6c583"
            strokeWidth={22}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.9, 0.9, 0] }}
            transition={{
              pathLength: {
                duration: taglineDuration,
                delay: taglineDelay,
                ease: "easeInOut",
              },
              opacity: {
                duration: taglineDuration + (reduce ? 0.15 : 0.45),
                delay: taglineDelay,
                times: [0, 0.08, 0.7, 1],
              },
            }}
          />
        </motion.g>

        {/* Animation completion hook without altering any visible artwork. */}
        <motion.rect
          x="0"
          y="0"
          width="1"
          height="1"
          fill="transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.01, delay: completeAt }}
          onAnimationComplete={onDrawComplete}
        />
      </g>
    </svg>
  );
}
