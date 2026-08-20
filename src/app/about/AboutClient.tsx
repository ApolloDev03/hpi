"use client";

import Image from "next/image";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  HiArrowUpRight,
} from "react-icons/hi2";

import Breadcrumb from "@/app/components/Breadcrumb";

import aboutBreadcrumb from "@/app/assets/banner1.png";

import founderImage from "@/app/assets/client photo.jpeg";

import About from "../components/About";

export default function AboutClient() {
  const reduceMotion =
    useReducedMotion();

  return (
    <main
      className="
        overflow-hidden
        bg-white
      "
    >
      {/* ========================================= */}
      {/* BREADCRUMB */}
      {/* ========================================= */}

      <Breadcrumb
        title="About Us"
        backgroundImage={
          aboutBreadcrumb
        }
        imagePosition="center"
        items={[
          {
            label: "About Us",
          },
        ]}
      />

      {/* ========================================= */}
      {/* ABOUT */}
      {/* ========================================= */}

      <About />

      {/* ========================================= */}
      {/* FOUNDER SECTION */}
      {/* ========================================= */}

      <section
        id="founder"
        className="
          relative
          overflow-hidden

          bg-white

          px-5
          py-20

          sm:px-8
          sm:py-24

          lg:px-[5vw]
          lg:py-[60px]
        "
      >
        {/* ======================================= */}
        {/* BACKGROUND GREEN GLOW */}
        {/* ======================================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -left-48
            top-1/2

            h-[500px]
            w-[500px]

            -translate-y-1/2

            rounded-full

            bg-gold/[0.05]

            blur-[170px]
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

            bg-gold/[0.035]

            blur-[150px]
          "
        />

        {/* ======================================= */}
        {/* ARCHITECTURAL GRID */}
        {/* ======================================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-0

            opacity-[0.35]

            bg-[linear-gradient(rgba(17,24,39,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.025)_1px,transparent_1px)]

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
          {/* ===================================== */}
          {/* FOUNDER SECTION HEADING */}
          {/* ===================================== */}

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
              mb-12

              flex
              flex-col

              gap-7

              lg:flex-row

              lg:items-end

              lg:justify-between
            "
          >
            <div>
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
                    w-11

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
                  Meet the Founder
                </span>
              </div>

              <h2
                className="
                  max-w-[780px]

                  font-serif
                  font-medium

                  text-[clamp(2.3rem,4.7vw,4.6rem)]

                  leading-[1.04]

                  tracking-[-0.035em]

                  text-black
                "
              >
                The creative vision
                <br />

                <em
                  className="
                    font-medium
                    italic

                    text-gold
                  "
                >
                  behind HPI Studio.
                </em>
              </h2>
            </div>

            <p
              className="
                max-w-[390px]

                text-[12px]

                leading-[1.9]

                text-black

                sm:text-[13px]
              "
            >
              A design practice guided by observation,
              empathy and a commitment to creating spaces
              that feel personal, functional and enduring.
            </p>
          </motion.div>

          {/* ===================================== */}
          {/* FOUNDER LAYOUT */}
          {/* ===================================== */}

          <div
            className="
              grid
              grid-cols-1

              gap-10

              lg:grid-cols-[0.88fr_1.12fr]

              lg:items-stretch

              lg:gap-0
            "
          >
            {/* =================================== */}
            {/* FOUNDER IMAGE */}
            {/* =================================== */}

            <motion.div
              initial={{
                opacity: 0,

                x: reduceMotion
                  ? 0
                  : -42,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
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
                group
                relative

                min-h-[520px]

                overflow-hidden

                bg-[#f3f4f6]

                sm:min-h-[650px]

                lg:min-h-[720px]
              "
            >
              <Image
                src={
                  founderImage
                }
                alt="Founder of HPI Design Studio"
                fill
                priority
                sizes="
                  (max-width: 1024px) 100vw,
                  45vw
                "
                className="
                  object-cover
                  object-center

                  grayscale-[15%]

                  transition-all

                  duration-[1200ms]

                  group-hover:scale-[1.025]

                  group-hover:grayscale-0
                "
              />

              {/* ================================= */}
              {/* IMAGE OVERLAYS */}
              {/* ================================= */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  inset-0

                  bg-gradient-to-t

                  from-black/90

                  via-black/10

                  to-black/10
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  inset-0

                  bg-gradient-to-r

                  from-black/20

                  via-transparent

                  to-transparent
                "
              />

              {/* ================================= */}
              {/* INNER FRAME */}
              {/* ================================= */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  inset-5

                  border

                  border-white/20
                "
              />

              {/* ================================= */}
              {/* VERTICAL TEXT */}
              {/* ================================= */}

              <span
                className="
                  absolute
                  right-7
                  top-8

                  hidden

                  text-[8px]

                  font-semibold

                  uppercase

                  tracking-[0.34em]

                  text-white/60

                  [writing-mode:vertical-rl]

                  sm:block
                "
              >
                Founder · HPI Studio Interior
              </span>

              {/* ================================= */}
              {/* FOUNDER NAME */}
              {/* ================================= */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0

                  z-10

                  px-7
                  pb-8

                  sm:px-9
                  sm:pb-10
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    mb-5
                    block

                    h-px
                    w-12

                    bg-gold
                  "
                />

                <h3
                  className="
                    font-serif

                    text-[clamp(2rem,3.5vw,3.4rem)]

                    leading-none

                    tracking-[-0.03em]

                    text-white
                    font-semibold
                  "
                >
                  Hitarth Parikh
                </h3>

                <p
                  className="
                    mt-3

                    text-[11px]

                    font-semibold

                    uppercase

                    tracking-[0.27em]

                    text-foreground
                  "
                >
                  Architecture | Interior
                </p>
              </div>

              {/* ================================= */}
              {/* GREEN CORNER */}
              {/* ================================= */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  left-0
                  top-0

                  h-20
                  w-20

                  border-l-2
                  border-t-2

                  border-gold
                "
              />
            </motion.div>

            {/* =================================== */}
            {/* FOUNDER CONTENT */}
            {/* =================================== */}

            <motion.div
              initial={{
                opacity: 0,

                x: reduceMotion
                  ? 0
                  : 42,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.9,

                delay: 0.08,

                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="
                relative

                flex
                flex-col

                justify-between

                overflow-hidden

                border
                border-black/10

                bg-white

                px-6
                py-8

                shadow-[0_18px_55px_rgba(0,0,0,0.055)]

                sm:px-10
                sm:py-10

                lg:border-l-0

                lg:px-10
                lg:py-10

                xl:px-10
              "
            >
              {/* ================================= */}
              {/* DECORATIVE QUOTE */}
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

                  text-[260px]

                  leading-none

                  text-gold/[0.04]
                "
              >
                “
              </span>

              <div
                className="
                  relative
                  z-10
                "
              >
                <span
                  className="
                    text-[14px]

                    font-semibold

                    uppercase

                    tracking-[0.3em]

                    text-gold
                  "
                >
                  Founder’s Perspective
                </span>

                <h3
                  className="
                    mt-4

                    max-w-[760px]

                    font-serif
                    font-medium

                    text-[clamp(2rem,3.5vw,1.8rem)]

                    leading-[1.16]

                    tracking-[-0.03em]

                    text-black
                  "
                >
                  Creating spaces that feel considered,
                  personal and naturally connected to life.
                </h3>

                {/* ================================= */}
                {/* PARAGRAPHS */}
                {/* ================================= */}

                <div
                  className="
                    mt-8

                    grid
                    grid-cols-1

                    gap-6

                    xl:grid-cols-2

                    xl:gap-8
                  "
                >
                  <p
                    className="
                      text-[12px]

                      leading-[1.95]

                      text-black

                      sm:text-[13px]

                    "
                  >
                    HPI Studio began with a desire to create
                    architecture and interiors that go beyond
                    visual appeal. Every project starts with
                    understanding the people, routines and
                    emotions that will eventually occupy the
                    space.
                  </p>

                  <p
                    className="
                      text-[12px]

                      leading-[1.95]

                      text-black

                      sm:text-[13px]
                    "
                  >
                    From proportion and planning to materials
                    and lighting, every decision is approached
                    with care. The aim is to create balanced,
                    functional and quietly expressive
                    environments rather than spaces driven by
                    temporary trends.
                  </p>
                </div>

                {/* ================================= */}
                {/* FOUNDER QUOTE */}
                {/* ================================= */}

                <div
                  className="
                    relative

                    mt-10

                    border-l-2

                    border-gold

                    bg-[#f0f8f2]

                    px-3
                    py-4
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      -left-[5px]
                      top-7

                      h-2
                      w-2

                      rotate-45

                      bg-gold
                    "
                  />

                  <p
                    className="
                      max-w-[720px]

                      font-serif

                      text-[clamp(1.25rem,2.3vw,1.5rem)]

                      italic

                      leading-[1.55]

                      text-gold
                      font-semibold
                    "
                  >
                    “A meaningful space should feel like it
                    has always belonged to the people who
                    live within it.”
                  </p>
                </div>
              </div>

              {/* ================================= */}
              {/* BOTTOM DETAILS */}
              {/* ================================= */}

              <div
                className="
                  relative
                  z-10

                  mt-7

                  border-t

                  border-black/10

                  pt-7
                "
              >
                <div
                  className="
                    grid
                    grid-cols-2

                    sm:grid-cols-[1fr_1fr_auto]
                  "
                >
                  {/* Years */}

                  <div
                    className="
                      border-r
                      border-black/10

                      pr-5
                    "
                  >
                    <span
                      className="
                        block

                        font-serif

                        text-[2.5rem]

                        leading-none

                        tracking-[-0.05em]

                        text-gold
                        font-semibold
                      "
                    >
                      12+
                    </span>

                    <span
                      className="
                        mt-3
                        block

                        text-[12px]

                        font-semibold

                        uppercase

                        tracking-[0.25em]

                        text-black
                      "
                    >
                      Years of Experience
                    </span>
                  </div>

                  {/* Projects */}

                  <div
                    className="
                      pl-5

                      sm:border-r

                      sm:border-black/10

                      sm:pr-5
                    "
                  >
                    <span
                      className="
                        block

                        font-serif

                        text-[2.5rem]

                        leading-none

                        tracking-[-0.05em]

                        text-gold
                        font-semibold
                      "
                    >
                      120+
                    </span>

                    <span
                      className="
                        mt-3
                        block

                        text-[12px]

                        font-semibold

                        uppercase

                        tracking-[0.25em]

                        text-black
                      "
                    >
                      Projects Completed
                    </span>
                  </div>

                  {/* ================================= */}
                  {/* SOCIAL LINKS */}
                  {/* ================================= */}

                  <div
                    className="
                      col-span-2

                      mt-7

                      flex
                      items-center

                      gap-3

                      sm:col-span-1

                      sm:mt-0

                      sm:pl-6
                    "
                  >
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Founder on Instagram"
                      className="
                        flex
                        h-11
                        w-11

                        items-center
                        justify-center

                        rounded-full

                        border

                        border-black/10

                        bg-white

                        text-black/60

                        transition-all
                        duration-300

                        hover:-translate-y-1

                        hover:border-gold

                        hover:bg-gold

                        hover:text-white
                      "
                    >
                      <FaInstagram
                        size={
                          16
                        }
                      />
                    </a>

                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Founder on LinkedIn"
                      className="
                        flex
                        h-11
                        w-11

                        items-center
                        justify-center

                        rounded-full

                        border

                        border-black/10

                        bg-white

                        text-black/60

                        transition-all
                        duration-300

                        hover:-translate-y-1

                        hover:border-gold

                        hover:bg-gold

                        hover:text-white
                      "
                    >
                      <FaLinkedinIn
                        size={
                          16
                        }
                      />
                    </a>

                    <a
                      href="/contact"
                      aria-label="Contact HPI Studio"
                      className="
                        group

                        ml-auto

                        flex
                        h-11
                        w-11

                        items-center
                        justify-center

                        rounded-full

                        bg-gold

                        text-white

                        transition-all
                        duration-300

                        hover:rotate-45

                        hover:bg-[#2f8f46]
                      "
                    >
                      <HiArrowUpRight
                        size={
                          18
                        }
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Green Line */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  bottom-0
                  left-0

                  h-[2px]
                  w-[30%]

                  bg-gradient-to-r

                  from-gold

                  to-transparent
                "
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* MISSION & VISION */}
      {/* ========================================= */}

      <section
        id="mission-vision"
        className="
          relative
          overflow-hidden

          bg-white

          px-5
          py-20

          lg:px-[5vw]

          lg:py-[60px]
        "
      >
        {/* ======================================= */}
        {/* BACKGROUND GLOWS */}
        {/* ======================================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -left-48
            top-1/2

            h-[480px]
            w-[480px]

            -translate-y-1/2

            rounded-full

            bg-gold/[0.045]

            blur-[165px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -right-40
            top-10

            h-[400px]
            w-[400px]

            rounded-full

            bg-gold/[0.03]

            blur-[150px]
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
          {/* ===================================== */}
          {/* HEADING */}
          {/* ===================================== */}

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
              amount: 0.35,
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
              mb-12

              grid
              grid-cols-1

              gap-7

              lg:mb-12

              lg:grid-cols-[1fr_0.55fr]

              lg:items-end

              lg:gap-14
            "
          >
            <div>
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
                    w-11

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
                  Mission & Vision
                </span>
              </div>

              <h2
                className="
                  max-w-[760px]

                  font-serif
                  font-medium

                  text-[clamp(2.3rem,4.6vw,3rem)]

                  leading-[1.04]

                  tracking-[-0.035em]

                  text-black
                "
              >
                Creating with purpose.
                <br />

                <em
                  className="
                    font-medium

                    italic

                    text-gold
                  "
                >
                  Looking toward the future.
                </em>
              </h2>
            </div>

            <p
              className="
                max-w-[390px]

                text-[12px]

                leading-[1.9]

                text-black

                sm:text-[13px]

                lg:justify-self-end
              "
            >
              Our mission guides every project we create,
              while our vision defines the kind of design
              practice we continue to build.
            </p>
          </motion.div>

          {/* ===================================== */}
          {/* MAIN MISSION / VISION LAYOUT */}
          {/* ===================================== */}

          <div
            className="
              grid
              grid-cols-1

              overflow-hidden

              border

              border-black/10

              bg-white

              shadow-[0_18px_55px_rgba(0,0,0,0.055)]

              lg:grid-cols-[1.08fr_0.92fr]
            "
          >
            {/* =================================== */}
            {/* MISSION */}
            {/* =================================== */}

            <motion.article
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
                amount: 0.2,
              }}
              transition={{
                duration: 0.85,

                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="
                relative

                border-b

                border-black/10

                px-6
                py-9

                lg:min-h-[520px]

                lg:border-b-0

                lg:border-r

                lg:px-8
                lg:py-8
              "
            >
           

              <div
                className="
                  relative
                  z-10
                "
              >
                <div
                  className="
                    flex

                    items-center

                    justify-between

                    gap-5
                  "
                >
                  <span
                    className="
                      text-[9px]

                      font-semibold

                      uppercase

                      tracking-[0.3em]

                      text-gold
                    "
                  >
                    Our Mission
                  </span>

                  <span
                    aria-hidden="true"
                    className="
                      h-2
                      w-2

                      rotate-45

                      bg-gold
                    "
                  />
                </div>

                <h3
                  className="
                    mt-9

                    max-w-[650px]

                    font-serif

                    font-medium

                    text-[clamp(2rem,3.4vw,2rem)]

                    leading-[1.15]

                    tracking-[-0.03em]

                    text-black
                  "
                >
                  Designing spaces that feel meaningful,
                  functional and naturally connected to life.
                </h3>

                <div
                  className="
                    mt-8

                    max-w-[690px]

                    space-y-5
                  "
                >
                  <p
                    className="
                      text-[12px]

                      leading-[1.95]

                      text-black

                      sm:text-[13px]
                    "
                  >
                    Our mission is to create architecture and
                    interiors that respond thoughtfully to the
                    people who use them. Every project begins with
                    understanding the client, the site and the
                    everyday experiences the space is meant to
                    support.
                  </p>

                  <p
                    className="
                      text-[12px]

                      leading-[1.95]

                      text-black

                      sm:text-[13px]
                    "
                  >
                    We believe that successful design is not only
                    about creating a visually impressive environment.
                    It is about improving movement, comfort,
                    functionality and emotional connection through
                    carefully considered planning and meaningful
                    design decisions.
                  </p>

                  <p
                    className="
                      text-[12px]

                      leading-[1.95]

                      text-black

                      sm:text-[13px]
                    "
                  >
                    Through balanced proportions, natural light,
                    refined materials and thoughtful detailing, we
                    aim to create spaces that feel calm, practical
                    and quietly expressive. Every element is selected
                    with purpose so the completed environment feels
                    complete without feeling over-designed.
                  </p>

                  <p
                    className="
                      text-[12px]

                      leading-[1.95]

                      text-black

                      sm:text-[13px]
                    "
                  >
                    From the first conversation to final execution,
                    we remain committed to clarity, collaboration and
                    attention to detail. Our goal is to deliver spaces
                    that reflect the personality of the client while
                    continuing to remain functional, relevant and
                    inspiring over time.
                  </p>
                </div>

                <div
                  className="
                    mt-10

                    flex
                    items-center

                    gap-4

                    border-t

                    border-black/10

                    pt-6
                  "
                >
                  <span
                    className="
                      h-px
                      w-12

                      bg-gold
                    "
                  />

                  <span
                    className="
                      text-[8px]

                      font-semibold

                      uppercase

                      tracking-[0.26em]

                      text-black
                    "
                  >
                    Understand · Plan · Create
                  </span>
                </div>
              </div>
            </motion.article>

            {/* =================================== */}
            {/* VISION */}
            {/* =================================== */}

            <motion.article
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
                amount: 0.2,
              }}
              transition={{
                duration: 0.85,

                delay: 0.08,

                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="
                relative

                px-6
                py-9

                sm:px-9
                sm:py-11

                lg:min-h-[520px]

                lg:px-8
                lg:py-8
              "
            >
            

              <div
                className="
                  relative
                  z-10
                "
              >
                <div
                  className="
                    flex

                    items-center

                    justify-between

                    gap-5
                  "
                >
                  <span
                    className="
                      text-[9px]

                      font-semibold

                      uppercase

                      tracking-[0.3em]

                      text-gold
                    "
                  >
                    Our Vision
                  </span>

                  <span
                    aria-hidden="true"
                    className="
                      h-2
                      w-2

                      rotate-45

                      border

                      border-gold
                    "
                  />
                </div>

                <h3
                  className="
                    mt-9

                    max-w-[560px]

                    font-serif

                    font-medium

                    text-[clamp(2rem,3.4vw,2rem)]

                    leading-[1.15]

                    tracking-[-0.03em]

                    text-black
                  "
                >
                  To build a design practice known for
                  timeless and human-centred spaces.
                </h3>

                {/* ================================= */}
                {/* VISION POINTS */}
                {/* ================================= */}

                <div
                  className="
                    mt-9
                  "
                >
                  {[
                    {
                      title:
                        "Timeless Design",

                      text:
                        "Create spaces that remain relevant beyond temporary trends.",
                    },

                    {
                      title:
                        "Human Connection",

                      text:
                        "Design environments around real routines, emotions and experiences.",
                    },

                    {
                      title:
                        "Honest Materiality",

                      text:
                        "Use materials with clarity, restraint and respect for their natural character.",
                    },

                    {
                      title:
                        "Lasting Value",

                      text:
                        "Deliver spaces that continue to support and inspire people over time.",
                    },
                  ].map(
                    (
                      item,
                      index,
                    ) => (
                      <div
                        key={
                          item.title
                        }
                        className="
                          group

                          grid

                          grid-cols-[42px_1fr]

                          gap-4

                          border-b

                          border-black/10

                          py-5

                          first:pt-0

                          last:border-b-0

                          last:pb-0
                        "
                      >
                        {/* Number */}

                        <span
                          className="
                            flex
                            h-9
                            w-9

                            items-center
                            justify-center

                            border

                            border-gold/35

                            font-serif

                            text-[12px]

                            text-gold

                            transition-all
                            duration-300

                            group-hover:border-gold

                            group-hover:bg-gold

                            group-hover:text-white
                            font-semibold
                          "
                        >
                          0
                          {index +
                            1}
                        </span>

                        <div>
                          <h4
                            className="
                              font-serif

                              text-xl

                      

                              transition-colors
                              duration-300

                              text-gold
                             font-semibold
                            "
                          >
                            {
                              item.title
                            }
                          </h4>

                          <p
                            className="
                              mt-2

                              text-[11px]

                              leading-[1.75]

                              text-black

                              sm:text-[12px]
                            "
                          >
                            {
                              item.text
                            }
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </section>
    </main>
  );
}