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

// const cities = [
//   "Ahmedabad",
//   "Gandhinagar",
//   "Surat",
//   "Vadodara",
//   "Rajkot",
//   "Mumbai",
//   "Udaipur",
//   "Indore",
// ];

const secondaryStats = [
  {
    target: 115,
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

type AnimatedNumberProps = {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
  suffixClassName?: string;
};

function AnimatedNumber({
  target,
  suffix = "",
  duration = 1900,
  className = "",
  suffixClassName = "",
}: AnimatedNumberProps) {
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

    const startTime = performance.now();

    const animate = (currentTime: number) => {
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
          requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    frameRef.current =
      requestAnimationFrame(animate);
  }, [duration, reduceMotion, target]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(
          frameRef.current
        );
      }
    };
  }, []);

  return (
    <motion.span
      onViewportEnter={startCounter}
      viewport={{
        once: true,
        amount: 0.5,
      }}
      className="
        inline-flex items-start
      "
    >
      <span className={className}>
        {value}
      </span>

      {suffix && (
        <span className={suffixClassName}>
          {suffix}
        </span>
      )}
    </motion.span>
  );
}

export default function Counters() {
  const reduceMotion = useReducedMotion();

  // const repeatedCities = [
  //   ...cities,
  //   ...cities,
  // ];

  return (
    <section
      id="counters"
      className="
        relative overflow-hidden
        bg-[#080807]
        px-5 !pt-20
        sm:px-8
        lg:px-[5vw]
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-48 top-1/2
          h-[520px] w-[520px]
          -translate-y-1/2
          rounded-full
          bg-[#b8863a]/[0.055]
          blur-[175px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-40 top-0
          h-[420px] w-[420px]
          rounded-full
          bg-[#b8863a]/[0.04]
          blur-[155px]
        "
      />

      {/* Architectural grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.18]
          bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
          bg-[size:80px_80px]
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
            mb-12 grid
            grid-cols-1 gap-7

            lg:mb-16
            lg:grid-cols-[1fr_0.55fr]
            lg:items-end
            lg:gap-16
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="
                mb-5 flex
                items-center gap-4
              "
            >
              <span
                className="
                  h-px w-10
                  bg-[#b8863a]
                "
              />

              <span
                className="
                  text-[9px] font-semibold
                  uppercase tracking-[0.34em]
                  text-[#e6c583]
                "
              >
                Studio in Numbers
              </span>
            </div>

            <h2
              className="
                max-w-[800px]
                font-serif font-semibold
                uppercase
                text-[clamp(2.2rem,4.5vw,4rem)]
                leading-[1.02]
                tracking-[-0.035em]
                text-[#f3efe7]
              "
            >
              A journey measured
              <br />
              through{" "}
              <em
                className="
                  font-semibold italic
                  text-[#e6c583]
                "
              >
                meaningful spaces.
              </em>
            </h2>
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.12,
            }}
            className="
              max-w-[410px]
              text-[12px] leading-[1.9]
              text-white/45

              sm:text-[13px]
              lg:justify-self-end
            "
          >
            Each number represents a project completed,
            a relationship built and a space shaped with
            thoughtful design.
          </motion.p>
        </div>

        {/* Main statistics composition */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            relative overflow-hidden
            border-y border-white/10
          "
        >
          <div
            className="
              grid grid-cols-1

              lg:grid-cols-[1.18fr_0.82fr]
            "
          >
            {/* Dominant project count */}
            <div
              className="
                relative overflow-hidden
                border-b border-white/10
                px-5 py-12

                sm:px-8
                sm:py-16

                lg:min-h-[510px]
                lg:border-b-0
                lg:border-r
                lg:px-12
                lg:py-14

                xl:px-16
              "
            >
              
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute -bottom-10
                  -right-4
                  select-none
                  font-serif
                  text-[180px]
                  font-semibold
                  uppercase
                  leading-none
                  tracking-[-0.08em]
                  text-[#b8863a]/[0.025]

                  sm:text-[250px]
                  lg:text-[320px]
              "
              >
                HPI
              </span>

              <div
                className="
                  relative z-10
                  flex h-full
                  flex-col justify-between
                "
              >
                <div
                  className="
                    flex items-center
                    justify-between gap-5
                  "
                >
                  <span
                    className="
                      text-[9px] font-semibold
                      uppercase tracking-[0.3em]
                      text-white/35
                    "
                  >
                    Since Our Beginning
                  </span>

                  <span
                    className="
                      h-px w-20
                      bg-gradient-to-r
                      from-[#b8863a]
                      to-transparent

                      sm:w-32
                    "
                  />
                </div>

                <div className="my-10">
                  <p
                    className="
                      mb-2
                      text-[10px] font-semibold
                      uppercase tracking-[0.3em]
                      text-[#e6c583]
                    "
                  >
                    Successfully completed
                  </p>

                  <div
                    className="
                      flex flex-wrap
                      items-end gap-x-6
                      gap-y-3
                    "
                  >
                    <AnimatedNumber
                      target={120}
                      suffix="+"
                      className="
                        font-serif font-semibold
                        text-[clamp(6.5rem,14vw,13rem)]
                        leading-[0.76]
                        tracking-[-0.085em]
                        text-[#f3efe7]
                      "
                      suffixClassName="
                        ml-2 mt-1
                        font-serif
                        text-[clamp(2rem,4vw,4rem)]
                        leading-none
                        text-[#b8863a]
                      "
                    />

                    <span
                      className="
                        pb-2
                        font-serif
                        text-[clamp(1.5rem,3vw,2.8rem)]
                        italic
                        leading-none
                        text-[#e6c583]

                        sm:pb-4
                      "
                    >
                      projects
                    </span>
                  </div>
                </div>

                <div
                  className="
                    flex flex-col gap-4
                    border-t border-white/10
                    pt-6

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <p
                    className="
                      max-w-[470px]
                      text-[11px] leading-[1.8]
                      text-white/38

                      sm:text-[12px]
                    "
                  >
                    Residential, commercial, healthcare and
                    interior environments designed with
                    purpose and precision.
                  </p>

                  <span
                    className="
                      shrink-0
                      text-[8px] font-semibold
                      uppercase tracking-[0.28em]
                      text-[#b8863a]/70
                    "
                  >
                    HPI Studio Interior
                  </span>
                </div>
              </div>
            </div>

            {/* Supporting statistics */}
            <div
              className="
                grid grid-cols-1

                sm:grid-cols-3
                lg:grid-cols-1
              "
            >
              {secondaryStats.map(
                (stat, index) => (
                  <motion.article
                    key={stat.label}
                    initial={{
                      opacity: 0,
                      x: reduceMotion
                        ? 0
                        : 30,
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
                      delay:
                        0.15 +
                        index * 0.1,
                      ease: [
                        0.16, 1, 0.3, 1,
                      ],
                    }}
                    className="
                      group relative
                      flex min-h-[165px]
                      items-center
                      overflow-hidden
                      border-b border-white/10
                      px-6 py-8
                      last:border-b-0

                      sm:border-b-0
                      sm:border-r
                      sm:last:border-r-0

                      lg:min-h-[170px]
                      lg:border-b
                      lg:border-r-0
                      lg:px-10
                      lg:last:border-b-0
                    "
                  >
                    {/* Hover fill */}
                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute inset-0
                        origin-left
                        scale-x-0
                        bg-[#b8863a]
                        transition-transform
                        duration-500
                        ease-[cubic-bezier(0.16,1,0.3,1)]

                        group-hover:scale-x-100
                      "
                    />

                    <div
                      className="
                        relative z-10
                        flex w-full
                        items-end
                        justify-between
                        gap-5
                      "
                    >
                      <div>
                        <AnimatedNumber
                          target={
                            stat.target
                          }
                          suffix={
                            stat.suffix
                          }
                          className="
                            font-serif
                            text-[clamp(3.2rem,6vw,5.5rem)]
                            font-semibold
                            leading-[0.82]
                            tracking-[-0.065em]
                            text-[#f3efe7]
                            transition-colors
                            duration-400

                            group-hover:text-[#080807]
                          "
                          suffixClassName="
                            ml-1
                            font-serif
                            text-2xl
                            leading-none
                            text-[#b8863a]
                            transition-colors
                            duration-400

                            group-hover:text-black/55
                          "
                        />

                        <p
                          className="
                            mt-4
                            text-[14px] font-semibold
                            uppercase
                            tracking-[0.23em]
                            text-white/38
                            transition-colors
                            duration-400

                            group-hover:text-black/60
                          "
                        >
                          {stat.label}
                        </p>
                      </div>

                      
                    </div>

                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute bottom-0
                        left-0 h-[2px]
                        w-0 bg-[#f0d18b]
                        transition-all
                        duration-500

                        group-hover:w-full
                      "


                    />
                  </motion.article>
                )
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}