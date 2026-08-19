"use client";

import Image from "next/image";

import {
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

import { Quote } from "lucide-react";

/* White theme mate black logo */
import logo from "../assets/logo-black.png";

import {
  useHomeData,
} from "./HomeDataContext";

const SLIDE_DURATION = 6500;

export default function Testimonials() {
  const reduceMotion = useReducedMotion();

  const {
    activeCategoryId,
    activeCategory,
    homeData,
    homeDataLoading,
    homeDataError,
  } = useHomeData();

  const testimonials =
    homeData.testimonials;

  const [current, setCurrent] =
    useState(0);

  const [direction, setDirection] =
    useState(1);

  const [paused, setPaused] =
    useState(false);

  const timerRef =
    useRef<
      ReturnType<typeof setTimeout> | null
    >(null);

  const clearTimer = useCallback(() => {
    if (!timerRef.current) {
      return;
    }

    clearTimeout(timerRef.current);

    timerRef.current = null;
  }, []);

  /*
   * Always start from the first testimonial when
   * the selected project category changes.
   */
  useEffect(() => {
    clearTimer();

    setCurrent(0);

    setDirection(1);

    setPaused(false);
  }, [
    activeCategoryId,
    testimonials.length,
    clearTimer,
  ]);

  const changeSlide = useCallback(
    (
      nextIndex: number,
      nextDirection: number,
    ) => {
      if (testimonials.length === 0) {
        return;
      }

      clearTimer();

      const normalizedIndex =
        (nextIndex + testimonials.length) %
        testimonials.length;

      setDirection(nextDirection);

      setCurrent(normalizedIndex);
    },
    [
      clearTimer,
      testimonials.length,
    ],
  );

  useEffect(() => {
    clearTimer();

    if (
      paused ||
      testimonials.length <= 1
    ) {
      return;
    }

    timerRef.current = setTimeout(() => {
      setDirection(1);

      setCurrent(
        (previous) =>
          (previous + 1) %
          testimonials.length,
      );
    }, SLIDE_DURATION);

    return clearTimer;
  }, [
    clearTimer,
    current,
    paused,
    testimonials.length,
  ]);

  const activeTestimonial =
    testimonials[current] ?? null;

  const slideVariants = {
    enter: (
      slideDirection: number,
    ) => ({
      opacity: 0,

      x: reduceMotion
        ? 0
        : slideDirection * 45,
    }),

    center: {
      opacity: 1,
      x: 0,
    },

    exit: (
      slideDirection: number,
    ) => ({
      opacity: 0,

      x: reduceMotion
        ? 0
        : slideDirection * -45,
    }),
  };

  return (
    <section
      id="testimonials"
      className="
        relative overflow-hidden
        bg-white
        px-5
        sm:px-8 
        lg:px-[5vw] 
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-[520px] w-[900px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#115e28]/10
          blur-[190px]
        "
      />

      <div
        className="
          relative z-10 mx-auto
          w-full max-w-[1280px]
        "
      >
        {/* ======================================= */}
        {/* Heading */}
        {/* ======================================= */}

        <motion.div
          initial={{
            opacity: 0,

            y: reduceMotion
              ? 0
              : 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
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
          className="
            mx-auto mb-12
            max-w-[1060px]
            text-center
          "
        >
          <div
            className="
              mb-5 flex
              items-center
              justify-center
              gap-4
            "
          >
            <span
              className="
                h-px w-10
                bg-[#115e28]
              "
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.34em]
                text-[#115e28]
              "
            >
              Client Stories
            </span>

            <span
              className="
                h-px w-10
                bg-[#115e28]
              "
            />
          </div>

          <h2
            className="
              font-serif
              font-semibold
              uppercase
              text-[clamp(2rem,4vw,3.5rem)]
              leading-[1.07]
              tracking-[-0.025em]
              text-[#111827]
            "
          >
            What our clients say
            <br />

            about their{" "}

            <em
              className="
                font-semibold
                italic
                text-[#115e28]
              "
            >
              experience.
            </em>
          </h2>
        </motion.div>

        {/* ======================================= */}
        {/* Loading */}
        {/* ======================================= */}

        {homeDataLoading && (
          <div
            aria-busy="true"
            aria-label="Loading testimonials"
            className="
              min-h-[430px]
              animate-pulse
              rounded-[26px]
              border
              border-[#115e28]/20
              bg-[#115e28]/10
            "
          />
        )}

        {/* ======================================= */}
        {/* API error */}
        {/* ======================================= */}

        {!homeDataLoading &&
          homeDataError && (
            <div
              className="
                rounded-[26px]
                border
                border-red-400/20
                bg-red-50
                px-6 py-12
                text-center
              "
            >
              <p
                className="
                  text-sm
                  text-red-600
                "
              >
                Testimonials could not be loaded.
              </p>
            </div>
          )}

        {/* ======================================= */}
        {/* Empty testimonials */}
        {/* ======================================= */}

        {!homeDataLoading &&
          !homeDataError &&
          testimonials.length === 0 && (
            <div
              className="
                rounded-[26px]
                border
                border-black/10
                bg-white
                px-6 py-12
                text-center
              "
            >
              <p
                className="
                  text-sm
                  text-black/50
                "
              >
                No testimonials are available for{" "}
                {activeCategory?.name ??
                  "this category"}
                .
              </p>
            </div>
          )}

        {/* ======================================= */}
        {/* Dynamic testimonial slider */}
        {/* ======================================= */}

        {!homeDataLoading &&
          !homeDataError &&
          activeTestimonial && (
            <motion.div
              initial={{
                opacity: 0,

                y: reduceMotion
                  ? 0
                  : 35,
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
              onMouseEnter={() =>
                setPaused(true)
              }
              onMouseLeave={() =>
                setPaused(false)
              }
              className="
                relative overflow-hidden
                rounded-[26px]
                border border-[#2f8f46]/40

                bg-[linear-gradient(125deg,#83c58f_0%,#4b9d5f_42%,#115e28_100%)]

                shadow-[0_35px_100px_rgba(17,94,40,0.22)]
              "
            >
              {/* ================================= */}
              {/* Green texture */}
              {/* ================================= */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute inset-0

                  bg-[radial-gradient(circle_at_10%_15%,rgba(255,255,255,0.25),transparent_28%),radial-gradient(circle_at_90%_90%,rgba(0,0,0,0.12),transparent_35%)]
                "
              />

              {/* ================================= */}
              {/* Decorative lines */}
              {/* ================================= */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute left-0 top-0
                  h-px w-[48%]

                  bg-gradient-to-r
                  from-white/70
                  to-transparent
                "
              />

              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute bottom-0 right-0
                  h-px w-[48%]

                  bg-gradient-to-l
                  from-white/35
                  to-transparent
                "
              />

              {/* ================================= */}
              {/* Slider */}
              {/* ================================= */}

              <AnimatePresence
                initial={false}
                custom={direction}
                mode="wait"
              >
                <motion.div
                  key={`${activeCategoryId}-${current}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration:
                      reduceMotion
                        ? 0.15
                        : 0.65,

                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  className="
                    relative z-10
                    grid grid-cols-1
                    items-center gap-10
                    px-6 pb-24 pt-8

                    sm:px-9
                    sm:pt-10

                    lg:min-h-[430px]
                    lg:grid-cols-[330px_minmax(0,1fr)]
                    lg:gap-16
                    lg:px-12
                    lg:pb-24
                    lg:pt-12
                  "
                >
                  {/* ================================= */}
                  {/* Left logo panel */}
                  {/* ================================= */}

                  <div
                    className="
                      relative mx-auto

                      flex aspect-square

                      w-full
                      max-w-[285px]

                      items-center
                      justify-center

                      overflow-hidden

                      rounded-[22px]

                      border
                      border-black/10

                      bg-white

                      shadow-[0_24px_65px_rgba(0,0,0,0.12)]

                      lg:mx-0
                      lg:max-w-[310px]
                    "
                  >
                    {/* Inner frame */}

                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute inset-4

                        rounded-[16px]

                        border
                        border-[#115e28]/30
                      "
                    />

                    {/* Logo glow */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none

                        absolute
                        left-1/2
                        top-1/2

                        h-[180px]
                        w-[180px]

                        -translate-x-1/2
                        -translate-y-1/2

                        rounded-full

                        bg-[#115e28]/10

                        blur-[50px]
                      "
                    />

                    {/* ================================= */}
                    {/* Logo image */}
                    {/* ================================= */}

                    <div
                      className="
                        relative
                        h-[115px]
                        w-[210px]
                      "
                    >
                      <Image
                        src={logo}
                        alt="HPI Studio logo"
                        fill
                        priority
                        sizes="210px"
                        className="
                          object-contain
                        "
                      />
                    </div>

                    {/* Category */}

                    <span
                      className="
                        absolute
                        bottom-7
                        left-1/2

                        -translate-x-1/2

                        whitespace-nowrap

                        text-[8px]
                        font-semibold
                        uppercase

                        tracking-[0.28em]

                        text-[#115e28]
                      "
                    >
                      {
                        activeTestimonial.category_name
                      }
                    </span>

                    {/* Top Left Corner */}

                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        left-5
                        top-5

                        h-6
                        w-6

                        border-l
                        border-t

                        border-[#115e28]/65
                      "
                    />

                    {/* Bottom Right Corner */}

                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        bottom-5
                        right-5

                        h-6
                        w-6

                        border-b
                        border-r

                        border-[#115e28]/65
                      "
                    />
                  </div>

                  {/* ================================= */}
                  {/* Right testimonial content */}
                  {/* ================================= */}

                  <div
                    className="
                      flex
                      min-w-0

                      flex-col

                      justify-center

                      text-center

                      lg:text-left
                    "
                  >
                    {/* ================================= */}
                    {/* Quote icon + label */}
                    {/* ================================= */}

                    <div
                      className="
                        mb-6

                        flex

                        items-center
                        justify-center

                        gap-4

                        lg:justify-start
                      "
                    >
                      <span
                        className="
                          flex
                          h-12
                          w-12

                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          bg-white

                          text-[#115e28]

                          shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                        "
                      >
                        <Quote
                          size={19}
                          strokeWidth={1.7}
                        />
                      </span>

                      <div
                        className="
                          text-left
                        "
                      >
                        <p
                          className="
                            text-[9px]
                            font-bold
                            uppercase

                            tracking-[0.28em]

                            text-[#102516]
                          "
                        >
                          Client Testimonial
                        </p>

                        <p
                          className="
                            mt-1.5

                            text-[8px]
                            uppercase

                            tracking-[0.22em]

                            text-[#102516]/55
                          "
                        >
                          HPI Studio Experience
                        </p>
                      </div>
                    </div>

                    {/* ================================= */}
                    {/* Quote */}
                    {/* ================================= */}

                    <blockquote
                      className="
                        mx-auto

                        max-w-[760px]

                        font-serif

                        text-[18px]

                        font-medium

                        leading-[1.55]

                        tracking-[-0.015em]

                        text-[#102516]

                        lg:mx-0
                      "
                    >
                      {
                        activeTestimonial.comments
                      }
                    </blockquote>

                    {/* ================================= */}
                    {/* Client information */}
                    {/* ================================= */}

                    <div
                      className="
                        mt-8

                        flex

                        items-center
                        justify-center

                        gap-4

                        lg:justify-start
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="
                          hidden

                          h-px
                          w-12

                          bg-white/80

                          sm:block
                        "
                      />

                      <div
                        className="
                          text-center

                          lg:text-left
                        "
                      >
                        <h3
                          className="
                            text-[12px]
                            font-bold
                            uppercase

                            tracking-[0.2em]

                            text-[#102516]
                          "
                        >
                          {
                            activeTestimonial.name
                          }
                        </h3>

                        <div
                          className="
                            mt-2

                            flex
                            flex-wrap

                            items-center
                            justify-center

                            gap-x-3
                            gap-y-1.5

                            lg:justify-start
                          "
                        >
                          <span
                            className="
                              text-[9px]
                              font-semibold
                              uppercase

                              tracking-[0.2em]

                              text-[#102516]/65
                            "
                          >
                            Client
                          </span>

                          <span
                            aria-hidden="true"
                            className="
                              h-1
                              w-1

                              rotate-45

                              bg-white/80
                            "
                          />

                          <span
                            className="
                              text-[9px]
                              font-medium
                              uppercase

                              tracking-[0.2em]

                              text-[#102516]/55
                            "
                          >
                            {
                              activeTestimonial.category_name
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* ================================= */}
              {/* Pagination */}
              {/* ================================= */}

              {testimonials.length > 1 && (
                <div
                  className="
                    absolute
                    bottom-7
                    left-1/2

                    z-30

                    flex

                    -translate-x-1/2

                    items-center

                    gap-2
                  "
                >
                  {testimonials.map(
                    (
                      testimonial,
                      index,
                    ) => (
                      <button
                        key={`${testimonial.name}-${index}`}
                        type="button"
                        onClick={() =>
                          changeSlide(
                            index,

                            index >= current
                              ? 1
                              : -1,
                          )
                        }
                        aria-label={`Show testimonial ${
                          index + 1
                        }`}
                        aria-current={
                          index === current
                            ? "true"
                            : undefined
                        }
                        className={`
                          h-2
                          rounded-full

                          transition-all
                          duration-500

                          ${
                            index === current
                              ? `
                                  w-9
                                  bg-white
                                `
                              : `
                                  w-2
                                  bg-white/35

                                  hover:bg-white/70
                                `
                          }
                        `}
                      />
                    ),
                  )}
                </div>
              )}

              {/* ================================= */}
              {/* Decorative quote */}
              {/* ================================= */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  -right-4
                  -top-20

                  select-none

                  font-serif

                  text-[270px]

                  leading-none

                  text-white/[0.08]
                "
              >
                “
              </span>
            </motion.div>
          )}
      </div>
    </section>
  );
}