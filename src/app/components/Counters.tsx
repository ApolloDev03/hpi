"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

const stats = [
  {
    target: 120,
    suffix: "+",
    label: "Projects Completed",
  },
  {
    target: 95,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    target: 12,
    suffix: "+",
    label: "Years of Experience",
  },
  {
    target: 8,
    suffix: "+",
    label: "Cities Served",
  },
];

type CounterItemProps = {
  target: number;
  suffix: string;
  label: string;
  index: number;
};

function CounterItem({
  target,
  suffix,
  label,
  index,
}: CounterItemProps) {
  const reduceMotion = useReducedMotion();

  const [value, setValue] = useState(0);

  const startedRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const startCounter = useCallback(() => {
    if (startedRef.current) return;

    startedRef.current = true;

    if (reduceMotion) {
      setValue(target);
      return;
    }

    const duration = 1900;
    const startTime = performance.now();

    const animateCounter = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easedProgress =
        1 - Math.pow(1 - progress, 4);

      setValue(
        Math.floor(target * easedProgress)
      );

      if (progress < 1) {
        frameRef.current =
          requestAnimationFrame(animateCounter);
      } else {
        setValue(target);
      }
    };

    frameRef.current =
      requestAnimationFrame(animateCounter);
  }, [reduceMotion, target]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 28,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.5,
      }}
      onViewportEnter={startCounter}
      transition={{
        duration: 0.75,
        delay: index * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        relative flex min-h-[150px]
        items-center justify-center
        border-b border-black/15
        px-4 py-7
        text-center

        sm:min-h-[170px]
        sm:px-5
        sm:py-8

        md:border-b-0
        md:border-r
        md:last:border-r-0
      "
    >
      <div>
        {/* Counter number */}
        <div className="flex items-start justify-center">
          <span
            className="
              font-serif font-semibold
              text-[clamp(2.9rem,5vw,4.8rem)]
              leading-none
              tracking-[-0.05em]
              text-[#080807]
            "
          >
            {value}
          </span>

          {suffix && (
            <span
              className="
                ml-1 mt-1
                font-serif text-xl
                text-black/60

                sm:text-2xl
              "
            >
              {suffix}
            </span>
          )}
        </div>

        {/* Label */}
        <p
          className="
            mt-4
            text-[9px] font-semibold
            uppercase tracking-[0.21em]
            text-black/60

            sm:text-[10px]
          "
        >
          {label}
        </p>

        {/* Static diamond */}
        <span
          aria-hidden="true"
          className="
            mx-auto mt-5 block
            h-1.5 w-1.5
            rotate-45
            bg-black/50
          "
        />
      </div>
    </motion.article>
  );
}
export default function Counters() {
  return (
    <section
      id="counters"
      className="
        relative overflow-hidden
        bg-[#080807]
        px-5 py-16

        sm:px-8
        sm:py-20

        lg:px-[5vw]
        lg:py-[60px]
      "
    >
      {/* Background gold glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-32 top-1/2
          h-[420px] w-[420px]
          -translate-y-1/2
          rounded-full
          bg-gold/[0.06]
          blur-[150px]
        "
      />

      <div
        className="
          relative z-10
          mx-auto w-full
          max-w-[1500px]
        "
      >
        {/* Heading */}
        <div
          className="
            mb-10 grid
            grid-cols-1 gap-6

            lg:mb-12
            lg:grid-cols-[1fr_0.65fr]
            lg:items-end
            lg:gap-16
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="
                mb-4 flex
                items-center gap-4
              "
            >
              <span className="h-px w-10 bg-gold" />

              <span
                className="
                  text-[9px] font-semibold
                  uppercase tracking-[0.34em]
                  text-gold-light
                "
              >
                Studio in Numbers
              </span>
            </div>

            <h2
              className="
                max-w-[720px]
                font-serif font-semibold
                uppercase
                text-[clamp(1.9rem,3.5vw,3.35rem)]
                leading-[1.06]
                tracking-[-0.025em]
                text-ivory
              "
            >
              Experience reflected
              <br />
              in every{" "}
              <em
                className="
                  font-semibold italic
                  text-gold-light
                "
              >
                number.
              </em>
            </h2>
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.75,
              delay: 0.12,
            }}
            className="
              max-w-[380px]
              text-[12px] leading-[1.85]
              text-white/48

              sm:text-[13px]
              lg:justify-self-end
            "
          >
            A reflection of completed projects, trusted
            relationships and meaningful spaces shaped with care.
          </motion.p>
        </div>

        {/* One golden counter panel */}
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.9,
            delay: 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            relative overflow-hidden
            rounded-xl
            border border-gold/60
            bg-[linear-gradient(120deg,#c49a4a_0%,#b8863a_48%,#9a6e2b_100%)]
            shadow-[0_28px_80px_rgba(0,0,0,0.32)]

            xl:rounded-none
            xl:[clip-path:polygon(0_0,calc(100%-26px)_0,100%_26px,100%_100%,26px_100%,0_calc(100%-26px))]
          "
        >
          {/* Gold texture */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0
              bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_90%_85%,rgba(0,0,0,0.12),transparent_28%)]
            "
          />

          {/* Large subtle HPI */}
          {/* <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -bottom-8 right-5
              hidden select-none
              font-serif text-[130px]
              font-semibold uppercase
              leading-none
              tracking-[-0.06em]
              text-black/[0.035]

              xl:block
            "
          >
            HPI
          </span> */}

          <div
            className="
              relative z-10
              grid grid-cols-1

              sm:grid-cols-2

              md:grid-cols-4
            "
          >
            {stats.map((stat, index) => (
              <CounterItem
                key={stat.label}
                {...stat}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}