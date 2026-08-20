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

import {
  FaAward,
  FaBuilding,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

/* =========================================================
   SECONDARY STATS
========================================================= */

const secondaryStats = [
  {
    target: 115,
    suffix: "+",
    label: "Happy Clients",
    icon: FaUsers,
  },
  {
    target: 12,
    suffix: "+",
    label: "Years of Experience",
    icon: FaAward,
  },
  {
    target: 8,
    suffix: "+",
    label: "Cities Served",
    icon: FaMapMarkerAlt,
  },
];

/* =========================================================
   ANIMATED NUMBER TYPES
========================================================= */

type AnimatedNumberProps = {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
  suffixClassName?: string;
};

/* =========================================================
   ANIMATED NUMBER
========================================================= */

function AnimatedNumber({
  target,
  suffix = "",
  duration = 1900,
  className = "",
  suffixClassName = "",
}: AnimatedNumberProps) {
  const reduceMotion =
    useReducedMotion();

  const [value, setValue] =
    useState(0);

  const startedRef =
    useRef(false);

  const frameRef =
    useRef<number | null>(
      null,
    );

  const startCounter =
    useCallback(() => {
      if (
        startedRef.current
      ) {
        return;
      }

      startedRef.current =
        true;

      if (reduceMotion) {
        setValue(target);
        return;
      }

      const startTime =
        performance.now();

      const animate = (
        currentTime: number,
      ) => {
        const progress =
          Math.min(
            (currentTime -
              startTime) /
              duration,
            1,
          );

        const easedProgress =
          1 -
          Math.pow(
            1 - progress,
            4,
          );

        setValue(
          Math.floor(
            target *
              easedProgress,
          ),
        );

        if (progress < 1) {
          frameRef.current =
            requestAnimationFrame(
              animate,
            );
        } else {
          setValue(target);
        }
      };

      frameRef.current =
        requestAnimationFrame(
          animate,
        );
    }, [
      duration,
      reduceMotion,
      target,
    ]);

  useEffect(() => {
    return () => {
      if (
        frameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          frameRef.current,
        );
      }
    };
  }, []);

  return (
    <motion.span
      onViewportEnter={
        startCounter
      }
      viewport={{
        once: true,
        amount: 0.5,
      }}
      className="
        inline-flex
        items-start
      "
    >
      <span
        className={
          className
        }
      >
        {value}
      </span>

      {suffix && (
        <span
          className={
            suffixClassName
          }
        >
          {suffix}
        </span>
      )}
    </motion.span>
  );
}

/* =========================================================
   COUNTERS
========================================================= */

export default function Counters() {
  const reduceMotion =
    useReducedMotion();

  /*
   * 0 = Happy Clients
   * By default only Happy Clients is selected.
   */
  const [
    selectedStat,
    setSelectedStat,
  ] = useState(0);

  return (
    <section
      id="counters"
      className="
        relative
        overflow-hidden

        bg-foreground

        px-5

        sm:px-8

        lg:px-[5vw]
      "
    >
      {/* ================================================= */}
      {/* SOFT GREEN BACKGROUND GLOWS */}
      {/* ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-48
          top-1/2

          h-[520px]
          w-[520px]

          -translate-y-1/2

          rounded-full

          bg-[#115e28]/[0.05]

          blur-[175px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-40
          top-0

          h-[420px]
          w-[420px]

          rounded-full

          bg-[#115e28]/[0.04]

          blur-[155px]
        "
      />

      {/* ================================================= */}
      {/* ARCHITECTURAL GRID */}
      {/* ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          opacity-[0.5]

          bg-[linear-gradient(rgba(17,24,39,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.035)_1px,transparent_1px)]

          bg-[size:80px_80px]
        "
      />

      <div
        className="
          relative
          z-10

          mx-auto

          w-full

          max-w-[1500px]
        "
      >
        {/* ================================================= */}
        {/* HEADING */}
        {/* ================================================= */}

        <div
          className="
            mb-12

            grid
            grid-cols-1

            gap-7

            lg:mb-16

            lg:grid-cols-[1fr_0.55fr]

            lg:items-end

            lg:gap-16
          "
        >
          <motion.div
            initial={{
              opacity: 0,

              x: reduceMotion
                ? 0
                : -30,
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

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            <div
              className="
                mb-5

                flex
                items-center

                gap-4
              "
            >
              <span
                className="
                  h-px
                  w-10

                  bg-gold
                "
              />

              <span
                className="
                  text-[9px]

                  font-semibold

                  uppercase

                  tracking-[0.34em]

                  text-gold
                "
              >
                Studio in Numbers
              </span>
            </div>

            <h2
              className="
                max-w-[800px]

                font-serif

                font-semibold

                uppercase

                text-[clamp(2.2rem,4.5vw,4rem)]

                leading-[1.02]

                tracking-[-0.035em]

                text-ivory
              "
            >
              A journey measured
              <br />

              through{" "}

              <em
                className="
                  font-semibold
                  italic

                  text-gold
                "
              >
                meaningful spaces.
              </em>
            </h2>
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,

              y: reduceMotion
                ? 0
                : 20,
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

              text-[12px]

              leading-[1.9]

              text-[#4b5563]

              sm:text-[13px]

              lg:justify-self-end
            "
          >
            Each number represents a
            project completed, a
            relationship built and a
            space shaped with thoughtful
            design.
          </motion.p>
        </div>

        {/* ================================================= */}
        {/* MAIN STATISTICS */}
        {/* ================================================= */}

        <motion.div
          initial={{
            opacity: 0,

            y: reduceMotion
              ? 0
              : 40,
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

            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
          className="
            relative

            overflow-hidden

            border-y
            border-black/10

            bg-white
          "
        >
          <div
            className="
              grid
              grid-cols-1

              lg:grid-cols-[1.18fr_0.82fr]
            "
          >
            {/* ============================================= */}
            {/* MAIN PROJECT COUNT */}
            {/* ============================================= */}

            <div
              className="
                relative

                overflow-hidden

                border-b
                border-black/10

                px-5
                py-12

                sm:px-8
                sm:py-16

                lg:min-h-[510px]

                lg:border-b-0

                lg:border-r

                lg:border-black/10

                lg:px-12
                lg:py-14

                xl:px-16
              "
            >
              {/* Decorative HPI */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute

                  -bottom-10
                  -right-4

                  select-none

                  font-serif

                  text-[180px]

                  font-semibold

                  uppercase

                  leading-none

                  tracking-[-0.08em]

                  text-[#115e28]/[0.035]

                  sm:text-[250px]

                  lg:text-[320px]
                "
              >
                HPI
              </span>

              <div
                className="
                  relative
                  z-10

                  flex
                  h-full

                  flex-col

                  justify-between
                "
              >
                {/* Top */}

                <div
                  className="
                    flex

                    items-center

                    justify-end

                    gap-5
                  "
                >
                 

                   <div
                    className="
                 

                      flex
                      h-16
                      w-16

                      items-center
                      justify-center

                      border

                      border-gold/20

                      bg-[#f0f8f2]

                      text-gold
                    "
                  >
                    <FaBuilding
                      size={25}
                    />
                  </div>
                </div>

                {/* ========================================= */}
                {/* MAIN COUNT */}
                {/* ========================================= */}

                <div
                  className="
                    my-10
                  "
                >
                  {/* Project Icon */}

                 

                  <p
                    className="
                      mb-2

                      text-[10px]

                      font-semibold

                      uppercase

                      tracking-[0.3em]

                      text-gold
                    "
                  >
                    Successfully completed
                  </p>

                  <div
                    className="
                      flex
                      flex-wrap

                      items-end

                      gap-x-6
                      gap-y-3
                    "
                  >
                    <AnimatedNumber
                      target={120}
                      suffix="+"
                      className="
                        font-serif

                        font-semibold

                        text-[clamp(6.5rem,14vw,13rem)]

                        leading-[0.76]

                        tracking-[-0.085em]

                        text-ivory
                      "
                      suffixClassName="
                        ml-2
                        mt-1

                        font-serif

                        text-[clamp(2rem,4vw,4rem)]

                        leading-none

                        text-gold
                      "
                    />

                    <span
                      className="
                        pb-2

                        font-serif

                        text-[clamp(1.5rem,3vw,2.8rem)]

                        italic

                        leading-none

                        text-gold

                        sm:pb-4
                      "
                    >
                      projects
                    </span>
                  </div>
                </div>

                {/* Bottom Description */}

                <div
                  className="
                    flex
                    flex-col

                    gap-4

                    border-t

                    border-black/10

                    pt-6

                    sm:flex-row

                    sm:items-center

                    sm:justify-between
                  "
                >
                  <p
                    className="
                      max-w-[470px]

                      text-[11px]

                      leading-[1.8]

                      text-[#6b7280]

                      sm:text-[12px]
                    "
                  >
                    Residential,
                    commercial,
                    healthcare and
                    interior environments
                    designed with purpose
                    and precision.
                  </p>

                  <span
                    className="
                      shrink-0

                      text-[8px]

                      font-semibold

                      uppercase

                      tracking-[0.28em]

                      text-gold/70
                    "
                  >
                    HPI Studio Interior
                  </span>
                </div>
              </div>
            </div>

            {/* ============================================= */}
            {/* SUPPORTING STATISTICS */}
            {/* ============================================= */}

            <div
              className="
                grid
                grid-cols-1

                sm:grid-cols-3

                lg:grid-cols-1
              "
            >
              {secondaryStats.map(
                (
                  stat,
                  index,
                ) => {
                  const Icon =
                    stat.icon;

                  const isSelected =
                    selectedStat ===
                    index;

                  return (
                    <motion.button
                      key={
                        stat.label
                      }
                      type="button"
                      onClick={() =>
                        setSelectedStat(
                          index,
                        )
                      }
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
                        duration:
                          0.75,

                        delay:
                          0.15 +
                          index *
                            0.1,

                        ease: [
                          0.16,
                          1,
                          0.3,
                          1,
                        ],
                      }}
                      className={`
                        group

                        relative

                        flex

                        min-h-[165px]

                        w-full

                        items-center

                        overflow-hidden

                        border-b

                        border-black/10

                        px-6
                        py-8

                        text-left

                        last:border-b-0

                        sm:border-b-0

                        sm:border-r

                        sm:border-black/10

                        sm:last:border-r-0

                        lg:min-h-[170px]

                        lg:border-b

                        lg:border-r-0

                        lg:border-black/10

                        lg:px-10

                        lg:last:border-b-0

                        transition-colors
                        duration-500

                        ${
                          isSelected
                            ? "bg-gold"
                            : "bg-white"
                        }
                      `}
                    >
                      {/* ===================================== */}
                      {/* SELECTED / HOVER BACKGROUND */}
                      {/* ===================================== */}

                      {!isSelected && (
                        <span
                          aria-hidden="true"
                          className="
                            pointer-events-none

                            absolute
                            inset-0

                            origin-left

                            scale-x-0

                            bg-gold

                            transition-transform

                            duration-500

                            ease-[cubic-bezier(0.16,1,0.3,1)]

                            group-hover:scale-x-100
                          "
                        />
                      )}

                      <div
                        className="
                          relative
                          z-10

                          flex

                          w-full

                          items-center

                          justify-between

                          gap-5
                        "
                      >
                        {/* =================================== */}
                        {/* COUNT */}
                        {/* =================================== */}

                        <div>
                          <AnimatedNumber
                            target={
                              stat.target
                            }
                            suffix={
                              stat.suffix
                            }
                            className={`
                              font-serif

                              text-[clamp(3.2rem,6vw,5.5rem)]

                              font-semibold

                              leading-[0.82]

                              tracking-[-0.065em]

                              transition-colors

                              duration-400

                              ${
                                isSelected
                                  ? "text-white"
                                  : "text-ivory group-hover:text-white"
                              }
                            `}
                            suffixClassName={`
                              ml-1

                              font-serif

                              text-2xl

                              leading-none

                              transition-colors

                              duration-400

                              ${
                                isSelected
                                  ? "text-white/70"
                                  : "text-gold group-hover:text-white/70"
                              }
                            `}
                          />

                          <p
                            className={`
                              mt-4

                              text-[14px]

                              font-semibold

                              uppercase

                              tracking-[0.23em]

                              transition-colors

                              duration-400

                              ${
                                isSelected
                                  ? "text-white/80"
                                  : "text-[#6b7280] group-hover:text-white/80"
                              }
                            `}
                          >
                            {
                              stat.label
                            }
                          </p>
                        </div>

                        {/* =================================== */}
                        {/* COUNT WISE ICON */}
                        {/* =================================== */}

                        <span
                          className={`
                            flex
                            h-14
                            w-14

                            shrink-0

                            items-center

                            justify-center

                            border

                            transition-all

                            duration-400

                            ${
                              isSelected
                                ? `
                                    border-white/25
                                    bg-white/10
                                    text-white
                                  `
                                : `
                                    border-gold/20
                                    bg-[#f0f8f2]
                                    text-gold

                                    group-hover:border-white/25
                                    group-hover:bg-white/10
                                    group-hover:text-white
                                  `
                            }
                          `}
                        >
                          <Icon
                            size={
                              21
                            }
                          />
                        </span>
                      </div>

                      {/* ===================================== */}
                      {/* BOTTOM LINE */}
                      {/* ===================================== */}

                      <span
                        aria-hidden="true"
                        className={`
                          pointer-events-none

                          absolute

                          bottom-0
                          left-0

                          h-[2px]

                          bg-[#83e688]

                          transition-all

                          duration-500

                          ${
                            isSelected
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                          }
                        `}
                      />
                    </motion.button>
                  );
                },
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}