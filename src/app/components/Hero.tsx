"use client";

import {
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  MoveUpRight,
} from "lucide-react";

import img1 from "../assets/banner1.png";
import img2 from "../assets/banner2.png";
import img3 from "../assets/banner3.png";

const SLIDE_DURATION = 6500;

const slides = [
  {
    image: img1,
    imageAlt:
      "Luxury modern living room interior designed by HPI Studio",
    objectPosition: "72% center",
    eyebrow: "HPI Studio",
    heading: (
      <>
        Design that is{" "}
        <em className="font-semibold italic text-gold-light">
          felt
        </em>
        ,
        <br />
        not just seen.
      </>
    ),
    description:
      "HPI Design Studio shapes interiors and architecture around the way people actually live — quiet material choices, considered light, and spaces built to hold a life well.",
    button: {
      href: "#projects",
      label: "View Our Work",
    },
  },
  {
    image: img2,
    imageAlt:
      "Dark luxury kitchen and dining interior designed by HPI Studio",
    objectPosition: "70% center",
    eyebrow: "Thoughtful Interiors",
    heading: (
      <>
        Every corner,
        <br />
        <em className="font-semibold italic text-gold-light">
          considered.
        </em>
      </>
    ),
    description:
      "From the first sketch to the final handover, we shape kitchens, dining spaces and residences that feel refined, functional and unmistakably personal.",
    button: {
      href: "#about",
      label: "Our Philosophy",
    },
  },
  {
    image: img3,
    imageAlt:
      "Warm floating staircase and indoor landscape designed by HPI Studio",
    objectPosition: "72% center",
    eyebrow: "Architecture & Craft",
    heading: (
      <>
        Built with
        <br />
        <em className="font-semibold italic text-gold-light">
          quiet precision.
        </em>
      </>
    ),
    description:
      "Material, light and proportion come together in spaces that feel effortless today and continue to age beautifully over time.",
    button: {
      href: "#contact",
      label: "Start a Project",
    },
  },
];

type HeroProps = {
  ready: boolean;
};

export default function Hero({ ready }: HeroProps) {
  const reduceMotion = useReducedMotion();

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progressKey, setProgressKey] = useState(0);

  const timerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSliderTimer = useCallback(() => {
    if (!timerRef.current) return;

    clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const changeSlide = useCallback(
    (index: number, slideDirection: number) => {
      const normalizedIndex =
        (index + slides.length) % slides.length;

      clearSliderTimer();
      setDirection(slideDirection);
      setCurrent(normalizedIndex);
      setProgressKey((previous) => previous + 1);
    },
    [clearSliderTimer]
  );

  const showNextSlide = useCallback(() => {
    changeSlide(current + 1, 1);
  }, [changeSlide, current]);

  const showPreviousSlide = useCallback(() => {
    changeSlide(current - 1, -1);
  }, [changeSlide, current]);

  useEffect(() => {
    if (!ready) return;

    clearSliderTimer();

    timerRef.current = setTimeout(() => {
      setDirection(1);

      setCurrent((previous) => {
        return (previous + 1) % slides.length;
      });

      setProgressKey((previous) => previous + 1);
    }, SLIDE_DURATION);

    return clearSliderTimer;
  }, [clearSliderTimer, current, ready]);

  const handleButtonClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    const targetSection = document.querySelector(href);

    targetSection?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const activeSlide = slides[current];

  const slideVariants = {
    enter: (slideDirection: number) => ({
      opacity: 0,
      scale: reduceMotion ? 1 : 1.08,
      x: reduceMotion ? 0 : slideDirection * 35,
    }),

    active: {
      opacity: 1,
      scale: 1,
      x: 0,
    },

    exit: (slideDirection: number) => ({
      opacity: 0,
      scale: reduceMotion ? 1 : 1.025,
      x: reduceMotion ? 0 : slideDirection * -25,
    }),
  };

  return (
    <section
      id="home"
      aria-label="HPI Studio introduction"
      className="relative min-h-[100svh] overflow-hidden bg-black"
    >
      <AnimatePresence
        initial={false}
        custom={direction}
        mode="sync"
      >
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="active"
          exit="exit"
          transition={{
            opacity: {
              duration: reduceMotion ? 0.2 : 1.1,
              ease: "easeInOut",
            },

            x: {
              duration: reduceMotion ? 0.2 : 1.1,
              ease: [0.22, 1, 0.36, 1],
            },

            scale: {
              duration: reduceMotion
                ? 0.2
                : SLIDE_DURATION / 1000,
              ease: [0.2, 0.7, 0.2, 1],
            },
          }}
          drag={reduceMotion ? false : "x"}
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70) {
              showNextSlide();
            }

            if (info.offset.x > 70) {
              showPreviousSlide();
            }
          }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <Image
            src={activeSlide.image}
            alt={activeSlide.imageAlt}
            fill
            priority={current === 0}
            sizes="100vw"
            draggable={false}
            style={{
              objectPosition: activeSlide.objectPosition,
            }}
            className="select-none object-cover"
          />



          {/* Left-side dark gradient */}
          <div
            className="
              absolute inset-0
              bg-[linear-gradient(90deg,rgba(4,4,4,0.98)_0%,rgba(4,4,4,0.92)_25%,rgba(4,4,4,0.68)_48%,rgba(4,4,4,0.25)_70%,transparent_100%)]

              max-md:bg-[linear-gradient(180deg,rgba(4,4,4,0.08)_0%,rgba(4,4,4,0.20)_30%,rgba(4,4,4,0.78)_64%,rgba(4,4,4,0.98)_100%)]
            "
          />

          {/* Bottom gradient */}
          <div
            className="
              absolute inset-x-0 bottom-0 h-[34%]
              bg-gradient-to-t from-black/90 to-transparent
            "
          />

          {/* Main left content */}
          <div
            className="
              relative z-10 mx-auto flex
              min-h-[100svh] w-full max-w-[1600px]
              items-end px-5 pb-32 pt-28

              sm:px-8 sm:pb-32

              md:items-center
              md:px-[5vw]
              md:pb-24
              md:pt-28
            "
          >
            <div
              className="
                w-full max-w-[590px] text-left
                lg:max-w-[630px]
                xl:max-w-[660px]
              "
            >
              {/* Small heading */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -25,
                }}
                animate={
                  ready
                    ? {
                      opacity: 1,
                      x: 0,
                    }
                    : {}
                }
                transition={{
                  duration: 0.75,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  mb-5 flex items-center gap-3
                  text-[10px] font-medium uppercase
                  tracking-[0.32em] text-gold-light

                  sm:text-[11px]
                "
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={ready ? { scaleX: 1 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-px w-9 origin-left bg-gold"
                />

                {activeSlide.eyebrow}
              </motion.div>

              {/* Main heading */}
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={
                  ready
                    ? {
                      opacity: 1,
                      y: 0,
                    }
                    : {}
                }
                transition={{
                  duration: 0.9,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
    max-w-[610px]
    font-serif font-semibold uppercase
    text-[clamp(1.9rem,4.2vw,4rem)]
    leading-[1.08]
    tracking-[-0.015em]
    text-ivory

    sm:text-[clamp(2.1rem,4.2vw,4rem)]
  "
              >
                {activeSlide.heading}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 22,
                }}
                animate={
                  ready
                    ? {
                      opacity: 1,
                      y: 0,
                    }
                    : {}
                }
                transition={{
                  duration: 0.9,
                  delay: 0.42,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
    mt-5 max-w-[510px]
    text-[12px] leading-[1.75]
    text-white/70

    sm:text-[13px]
    md:mt-6
    lg:text-[14px]
    lg:leading-[1.8]
  "
              >
                {activeSlide.description}
              </motion.p>

              {/* ARCHITECTURAL SHUTTER CTA */}
              <motion.a
                href={activeSlide.button.href}
                onClick={(event) =>
                  handleButtonClick(
                    event,
                    activeSlide.button.href
                  )
                }
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={
                  ready
                    ? {
                      opacity: 1,
                      y: 0,
                    }
                    : {}
                }
                whileHover="hover"
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.56,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
    group relative mt-7
    inline-flex min-w-[245px]
    overflow-hidden
    bg-gold/60
    p-px
    shadow-[0_14px_40px_rgba(0,0,0,0.25)]
rounded-md
    xl:[clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]
  "
              >
                {/* Inner button */}
                <span
                  className="
      relative flex h-[56px]
      w-full items-center
      overflow-hidden
      bg-black
      text-white
      backdrop-blur-md
rounded-md
      xl:[clip-path:polygon(0_0,calc(100%-15px)_0,100%_15px,100%_100%,15px_100%,0_calc(100%-15px))]
    "
                >
                  {/* Staggered shutter panels */}
                  <span
                    aria-hidden="true"
                    className="
        pointer-events-none
        absolute inset-0 flex
      "
                  >
                    {[0, 1, 2, 3, 4, 5].map((item) => (
                      <motion.span
                        key={item}
                        initial={{
                          scaleY: 0,
                        }}
                        variants={{
                          hover: {
                            scaleY: 1,
                          },
                        }}
                        transition={{
                          duration: 0.48,
                          delay: item * 0.055,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                        style={{
                          transformOrigin:
                            item % 2 === 0
                              ? "top"
                              : "bottom",
                        }}
                        className="h-full flex-1 bg-gold"
                      />
                    ))}
                  </span>

                  {/* Rolling text */}
                  <span
                    className="
        relative z-10
        flex h-full flex-1
        items-center overflow-hidden
        px-5
        text-[10px] font-semibold
        uppercase tracking-[0.22em]

        sm:px-6
        sm:text-[11px]
      "
                  >
                    {/* Default text */}
                    <motion.span
                      initial={{
                        y: 0,
                        opacity: 1,
                        color: "#f3efe7",
                      }}
                      variants={{
                        hover: {
                          y: -28,
                          opacity: 0,
                          color: "#0b0b0a",
                        },
                      }}
                      transition={{
                        duration: 0.36,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="
          absolute left-5
          whitespace-nowrap

          sm:left-6
        "
                    >
                      {activeSlide.button.label}
                    </motion.span>

                    {/* Hover text */}
                    <motion.span
                      aria-hidden="true"
                      initial={{
                        y: 28,
                        opacity: 0,
                        color: "#0b0b0a",
                      }}
                      variants={{
                        hover: {
                          y: 0,
                          opacity: 1,
                          color: "#0b0b0a",
                        },
                      }}
                      transition={{
                        duration: 0.36,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="
          absolute left-5
          whitespace-nowrap

          sm:left-6
        "
                    >
                      {activeSlide.button.label}
                    </motion.span>
                  </span>

                  {/* Diamond arrow */}
                  <motion.span
                    initial={{
                      rotate: 45,
                    }}
                    variants={{
                      hover: {
                        rotate: 0,
                        scale: 1.06,
                        backgroundColor: "#0b0b0a",
                        borderColor: "#0b0b0a",
                        color: "#e6c583",
                      },
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
        relative z-10 mr-2
        flex h-10 w-10 shrink-0
        items-center justify-center
        border border-gold/60
        bg-gold
        text-gold-light
      "
                  >
                    <motion.span
                      initial={{
                        rotate: -45,
                      }}
                      variants={{
                        hover: {
                          rotate: 0,
                          x: 1,
                          y: -1,
                        },
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <MoveUpRight className="h-4 w-4" />
                    </motion.span>
                  </motion.span>

                  {/* Corner details: only XL screen */}
                  <span
                    className="
        absolute bottom-0 left-0 z-20
        hidden h-4 w-px bg-gold
        xl:block
      "
                  />

                  <span
                    className="
        absolute bottom-0 left-0 z-20
        hidden h-px w-4 bg-gold
        xl:block
      "
                  />

                  <span
                    className="
        absolute right-0 top-0 z-20
        hidden h-4 w-px bg-gold
        xl:block
      "
                  />

                  <span
                    className="
        absolute right-0 top-0 z-20
        hidden h-px w-4 bg-gold
        xl:block
      "
                  />
                </span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

   {/* Bottom slider controls */}
<div
  className="
    pointer-events-none
    absolute inset-x-0 bottom-5 z-30
    mx-auto w-full
    px-5

    sm:bottom-7
    sm:px-8

    md:bottom-9
    md:px-[5vw]
  "
>
  <div className="flex w-full items-center justify-between gap-5">
    {/* Progress indicators: left side */}
    <div
      className="
        pointer-events-auto
        flex items-center gap-2
      "
    >
      {slides.map((slideItem, index) => (
        <button
          key={slideItem.image.src}
          type="button"
          onClick={() =>
            changeSlide(
              index,
              index >= current ? 1 : -1
            )
          }
          aria-label={`Go to slide ${index + 1}`}
          aria-current={
            index === current ? "true" : undefined
          }
          className="
            relative h-[3px] w-7
            overflow-hidden rounded-full
            bg-white/25
            transition-all duration-300

            hover:bg-white/40

            sm:w-10
          "
        >
          {index === current && (
            <motion.span
              key={`${progressKey}-${current}`}
              initial={{
                width: "0%",
              }}
              animate={{
                width: "100%",
              }}
              transition={{
                duration: SLIDE_DURATION / 1000,
                ease: "linear",
              }}
              className="
                absolute inset-y-0 left-0
                bg-gold
              "
            />
          )}
        </button>
      ))}
    </div>

    {/* Navigation arrows: exact right side */}
    <div
      className="
        pointer-events-auto
        ml-auto flex
        shrink-0 items-center
        justify-end gap-2
      "
    >
      {/* Previous arrow */}
      <button
        type="button"
        onClick={showPreviousSlide}
        aria-label="Previous slide"
        className="
          group flex h-10 w-10
          items-center justify-center
          rounded-full
          border border-white/35
          bg-black/35
          text-white
          backdrop-blur-md
          transition-all duration-300

          hover:-translate-x-1
          hover:border-gold
          hover:bg-gold
          hover:text-black
          hover:shadow-[0_8px_25px_rgba(184,134,58,0.25)]

          sm:h-11
          sm:w-11

          md:h-12
          md:w-12
        "
      >
        <ChevronLeft
          className="
            h-4 w-4
            transition-transform duration-300
            group-hover:-translate-x-0.5

            sm:h-5
            sm:w-5
          "
        />
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={showNextSlide}
        aria-label="Next slide"
        className="
          group flex h-10 w-10
          items-center justify-center
          rounded-full
          border border-white/35
          bg-black/35
          text-white
          backdrop-blur-md
          transition-all duration-300

          hover:translate-x-1
          hover:border-gold
          hover:bg-gold
          hover:text-black
          hover:shadow-[0_8px_25px_rgba(184,134,58,0.25)]

          sm:h-11
          sm:w-11

          md:h-12
          md:w-12
        "
      >
        <ChevronRight
          className="
            h-4 w-4
            transition-transform duration-300
            group-hover:translate-x-0.5

            sm:h-5
            sm:w-5
          "
        />
      </button>
    </div>
  </div>
</div>
    </section>
  );
}