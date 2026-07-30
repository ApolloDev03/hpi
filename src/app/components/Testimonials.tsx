"use client";

import Image, { StaticImageData } from "next/image";
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

import {
  Quote,
} from "lucide-react";

import logo from "../assets/logo-white.png";

const SLIDE_DURATION = 6500;

type Testimonial = {
  quote: string;
  name: string;
  position: string;
  project: string;
  logo: StaticImageData;
};
// git branch -M main

// git branch -M main
const testimonials: Testimonial[] = [
  {
    quote:
      "HPI Studio understood how our family lives and planned every detail with care. The completed home feels elegant, warm, functional, and deeply personal, with thoughtful spaces that naturally support our everyday routines.",
    name: "Meera & Arjun Shah",
    position: "Homeowners",
    project: "Vira Residence",
    logo,
  },
  {
    quote:
      "HPI Studio brought clarity, creativity, and discipline to every stage of our project. They balanced materials, lighting, function, and aesthetics beautifully, creating a refined space that feels timeless and personal.",
    name: "Rohan Mehta",
    position: "Founder",
    project: "Alcove Studio",
    logo,
  },
  {
    quote:
      "HPI Studio listened beyond colours and finishes. They understood our routines, storage needs, and daily habits, then created a comfortable, welcoming home with thoughtful details that genuinely improve everyday living.",
    name: "Priya Kapadia",
    position: "Homeowner",
    project: "The Linden House",
    logo,
  },
];
export default function Testimonials() {
  const reduceMotion = useReducedMotion();

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const timerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (!timerRef.current) return;

    clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const changeSlide = useCallback(
    (nextIndex: number, nextDirection: number) => {
      clearTimer();

      const normalizedIndex =
        (nextIndex + testimonials.length) %
        testimonials.length;

      setDirection(nextDirection);
      setCurrent(normalizedIndex);
    },
    [clearTimer]
  );

  const previousSlide = useCallback(() => {
    changeSlide(current - 1, -1);
  }, [changeSlide, current]);

  const nextSlide = useCallback(() => {
    changeSlide(current + 1, 1);
  }, [changeSlide, current]);

  useEffect(() => {
    clearTimer();

    if (paused) return;

    timerRef.current = setTimeout(() => {
      setDirection(1);

      setCurrent(
        (previous) =>
          (previous + 1) % testimonials.length
      );
    }, SLIDE_DURATION);

    return clearTimer;
  }, [clearTimer, current, paused]);

  const activeTestimonial = testimonials[current];

  const slideVariants = {
    enter: (slideDirection: number) => ({
      opacity: 0,
      x: reduceMotion
        ? 0
        : slideDirection * 45,
    }),

    center: {
      opacity: 1,
      x: 0,
    },

    exit: (slideDirection: number) => ({
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
        bg-[#080807]
        px-5 py-20
        sm:px-8 sm:py-24
        lg:px-[5vw] lg:py-[90px]
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
          bg-[#b8863a]/10
          blur-[190px]
        "
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px]">
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 24,
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
            ease: [0.16, 1, 0.3, 1],
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
              items-center justify-center
              gap-4
            "
          >
            <span className="h-px w-10 bg-[#b8863a]" />

            <span
              className="
                text-[9px] font-semibold
                uppercase tracking-[0.34em]
                text-[#e6c583]
              "
            >
              Client Stories
            </span>

            <span className="h-px w-10 bg-[#b8863a]" />
          </div>

          <h2
            className="
              font-serif font-semibold uppercase
              text-[clamp(2rem,4vw,3.5rem)]
              leading-[1.07]
              tracking-[-0.025em]
              text-[#f3efe7]
            "
          >
            What our clients say
            <br />
            about their{" "}
            <em className="font-semibold italic text-[#e6c583]">
              experience.
            </em>
          </h2>
        </motion.div>

        {/* Gold testimonial slider */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 35,
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
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="
            relative overflow-hidden
            rounded-[26px]
            border border-[#e6c583]/40
            bg-[linear-gradient(125deg,#d9ad58_0%,#c4933f_42%,#9d6b21_100%)]
            shadow-[0_35px_100px_rgba(0,0,0,0.45)]
          "
        >
          {/* Gold texture */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0
              bg-[radial-gradient(circle_at_10%_15%,rgba(255,255,255,0.25),transparent_28%),radial-gradient(circle_at_90%_90%,rgba(0,0,0,0.16),transparent_35%)]
            "
          />

          {/* Decorative lines */}
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
              from-black/35
              to-transparent
            "
          />

          <AnimatePresence
            initial={false}
            custom={direction}
            mode="wait"
          >
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: reduceMotion ? 0.15 : 0.65,
                ease: [0.16, 1, 0.3, 1],
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
              {/* Left logo panel */}
              <div
                className="
                  relative mx-auto
                  flex aspect-square
                  w-full max-w-[285px]
                  items-center justify-center
                  overflow-hidden
                  rounded-[22px]
                  border border-white/15
                  bg-[#0a0a09]
                  shadow-[0_24px_65px_rgba(0,0,0,0.3)]

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
                    border border-[#e6c583]/30
                  "
                />

                {/* Logo glow */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute left-1/2 top-1/2
                    h-[180px] w-[180px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-[#b8863a]/20
                    blur-[50px]
                  "
                />

                {/* Logo image */}
                <div
                  className="
                    relative h-[115px]
                    w-[210px]
                  "
                >
                  <Image
                    src={activeTestimonial.logo}
                    alt={`${activeTestimonial.name} logo`}
                    fill
                    priority
                    sizes="210px"
                    className="object-contain"
                  />
                </div>

                {/* Project */}
                <span
                  className="
                    absolute bottom-7
                    left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    text-[8px] font-semibold
                    uppercase tracking-[0.28em]
                    text-[#e6c583]
                  "
                >
                  {activeTestimonial.project}
                </span>

                {/* Corners */}
                <span
                  aria-hidden="true"
                  className="
                    absolute left-5 top-5
                    h-6 w-6
                    border-l border-t
                    border-[#e6c583]/65
                  "
                />

                <span
                  aria-hidden="true"
                  className="
                    absolute bottom-5 right-5
                    h-6 w-6
                    border-b border-r
                    border-[#e6c583]/65
                  "
                />
              </div>

              {/* Right testimonial */}
              <div
                className="
                  flex min-w-0
                  flex-col justify-center
                  text-center

                  lg:text-left
                "
              >
                {/* Quote icon and label */}
                <div
                  className="
                    mb-6 flex
                    items-center justify-center
                    gap-4

                    lg:justify-start
                  "
                >
                  <span
                    className="
                      flex h-12 w-12
                      shrink-0 items-center
                      justify-center
                      rounded-full
                      bg-[#11110f]
                      text-[#e6c583]
                      shadow-[0_12px_30px_rgba(0,0,0,0.2)]
                    "
                  >
                    <Quote
                      size={19}
                      strokeWidth={1.7}
                    />
                  </span>

                  <div className="text-left">
                    <p
                      className="
                        text-[9px] font-bold
                        uppercase tracking-[0.28em]
                        text-[#17130d]
                      "
                    >
                      Client Testimonial
                    </p>

                    <p
                      className="
                        mt-1.5 text-[8px]
                        uppercase tracking-[0.22em]
                        text-black/50
                      "
                    >
                      HPI Studio Experience
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote
                  className="
                    mx-auto max-w-[760px]
                    font-serif
                    text-[18px]
                    font-medium
                    leading-[1.55]
                    tracking-[-0.015em]
                    text-[#17130d]

                    lg:mx-0
                  "
                >
                  {activeTestimonial.quote}
                </blockquote>

                {/* Client information */}
                <div
                  className="
                    mt-8 flex
                    items-center justify-center
                    gap-4

                    lg:justify-start
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      hidden h-px w-12
                      bg-[#17130d]/70

                      sm:block
                    "
                  />

                  <div className="text-center lg:text-left">
                    <h3
                      className="
                        text-[12px] font-bold
                        uppercase tracking-[0.2em]
                        text-[#17130d]
                      "
                    >
                      {activeTestimonial.name}
                    </h3>

                    <div
                      className="
                        mt-2 flex flex-wrap
                        items-center justify-center
                        gap-x-3 gap-y-1.5

                        lg:justify-start
                      "
                    >
                      <span
                        className="
                          text-[9px] font-semibold
                          uppercase tracking-[0.2em]
                          text-black/60
                        "
                      >
                        {activeTestimonial.position}
                      </span>

                      <span
                        aria-hidden="true"
                        className="
                          h-1 w-1 rotate-45
                          bg-[#17130d]/70
                        "
                      />

                      <span
                        className="
                          text-[9px] font-medium
                          uppercase tracking-[0.2em]
                          text-black/45
                        "
                      >
                        {activeTestimonial.project}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Previous button */}
          {/* <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous testimonial"
            className="
              absolute bottom-6 left-6
              z-30 flex h-11 w-11
              items-center justify-center
              rounded-full
              border border-black/20
              bg-black/10
              text-[#17130d]
              transition-all duration-300

              hover:border-[#11110f]
              hover:bg-[#11110f]
              hover:text-[#e6c583]

              sm:left-9
              lg:left-12
            "
          >
            <ChevronLeft size={18} />
          </button> */}

          {/* Pagination */}
          <div
            className="
              absolute bottom-7
              left-1/2 z-30
              flex -translate-x-1/2
              items-center gap-2
            "
          >
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() =>
                  changeSlide(
                    index,
                    index >= current ? 1 : -1
                  )
                }
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={
                  index === current ? "true" : undefined
                }
                className={`
                  h-2 rounded-full
                  transition-all duration-500

                  ${
                    index === current
                      ? "w-9 bg-[#11110f]"
                      : "w-2 bg-black/25 hover:bg-black/50"
                  }
                `}
              />
            ))}
          </div>

          {/* Next button */}
          {/* <button
            type="button"
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="
              absolute bottom-6 right-6
              z-30 flex h-11 w-11
              items-center justify-center
              rounded-full
              border border-black/20
              bg-black/10
              text-[#17130d]
              transition-all duration-300

              hover:border-[#11110f]
              hover:bg-[#11110f]
              hover:text-[#e6c583]

              sm:right-9
              lg:right-12
            "
          >
            <ChevronRight size={18} />
          </button> */}

          {/* Slide number */}
          {/* <span
            className="
              absolute right-7 top-6
              z-20 font-serif
              text-[11px] font-semibold
              tracking-[0.17em]
              text-black/45

              sm:right-9
              sm:top-8
            "
          >
            {String(current + 1).padStart(2, "0")}

            <span className="mx-2 text-black/25">
              /
            </span>

            {String(testimonials.length).padStart(
              2,
              "0"
            )}
          </span> */}

          {/* Decorative quote */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-4 -top-20
              select-none
              font-serif text-[270px]
              leading-none
              text-black/[0.035]
            "
          >
            “
          </span>
        </motion.div>
      </div>
    </section>
  );
}