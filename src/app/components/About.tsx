"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

import aboutImage from "../assets/about-us.webp";
import clientImage from "../assets/client photo.jpeg";

export default function About() {
  const [showClientPhoto, setShowClientPhoto] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;

    console.log("pathname ---->", pathname);

    if (pathname === "/") {
      setShowClientPhoto(true);
    } else {
      setShowClientPhoto(false);
    }
  }, []);

  return (
    <section
      id="about"
      className="
        relative overflow-hidden
        bg-foreground
        px-5 py-20
        sm:px-8 sm:py-24
        lg:px-[5vw] lg:py-[60px]
      "
    >
      <div
        className="
          mx-auto grid w-full max-w-[1500px]
          grid-cols-1 items-center gap-16

          lg:grid-cols-[0.88fr_1.12fr]
          lg:gap-16

          xl:grid-cols-[0.82fr_1.18fr]
          xl:gap-20
        "
      >
        {/* ======================================= */}
        {/* LEFT SIDE */}
        {/* ======================================= */}

        <Reveal>
          <div
            className={`
              relative mx-auto
              w-full max-w-[560px]

              lg:mx-0
              lg:max-w-none

              ${
                showClientPhoto
                  ? "pb-16 sm:pb-20"
                  : ""
              }
            `}
          >
            {/* ======================================= */}
            {/* MAIN ABOUT IMAGE */}
            {/* ALWAYS SHOW */}
            {/* ======================================= */}

            <div
              className="
                relative h-[420px]
                w-full overflow-hidden
                bg-[#151412]

                sm:h-[500px]
                lg:h-[540px]
                xl:h-[570px]
              "
            >
              <Image
                src={aboutImage}
                alt="HPI Studio Interior reception"
                fill
                priority
                sizes="
                  (max-width: 640px) 100vw,
                  (max-width: 1024px) 90vw,
                  42vw
                "
                className="
                  object-cover
                  object-[32%_center]
                  transition-transform
                  duration-700
                  ease-[cubic-bezier(0.16,1,0.3,1)]

                  hover:scale-[1.025]
                "
              />

              {/* Soft image overlay */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/20
                  via-transparent
                  to-black/5
                "
              />

              {/* Inner border */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute inset-4
                  border border-white/10
                "
              />

              {/* Bottom image label */}
              <div
                className="
                  absolute bottom-5 left-5
                  border border-white/15
                  bg-black/70
                  px-5 py-3
                  backdrop-blur-md
                "
              >
                <span
                  className="
                    text-[9px] font-medium
                    uppercase tracking-[0.3em]
                    text-gold-light
                  "
                >
                  HPI Design Studio
                </span>
              </div>
            </div>

            {/* ======================================= */}
            {/* CLIENT PHOTO */}
            {/* ONLY SHOW ON /about */}
            {/* ======================================= */}

            {showClientPhoto && (
              <div
                className="
                  absolute
                  bottom-6 m-0 right-4
                  z-20

                  w-[155px]

                  sm:right-8
                  sm:w-[190px]

                  lg:-right-7
                  lg:w-[200px]

                  xl:-right-10
                  xl:w-[215px]
                "
              >
                {/* Decorative Back Layer */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -left-3 -top-3
                    h-full w-full
                    border border-gold/35
                  "
                />

                {/* Client Card */}
                <div
                  className="
                    relative
                    border border-white/10
                    bg-[#11110f]
                    p-2
                  "
                >
                  {/* Client Image */}
                  <div
                    className="
                      relative
                      aspect-[3/4]
                      w-full
                      overflow-hidden
                      bg-[#1b1a17]
                    "
                  >
                    <Image
                      src={clientImage}
                      alt="HPI Design Studio Principal Designer"
                      fill
                      sizes="
                        (max-width: 640px) 155px,
                        (max-width: 1024px) 190px,
                        215px
                      "
                      className="
                        object-cover
                        object-top
                        transition-transform
                        duration-700
                        ease-[cubic-bezier(0.16,1,0.3,1)]

                        hover:scale-[1.04]
                      "
                    />

                    {/* Portrait Overlay */}
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute inset-0
                        bg-gradient-to-t
                        from-black/35
                        via-transparent
                        to-transparent
                      "
                    />
                  </div>

                  {/* Client information */}
                  <div className="px-2 pb-2 pt-4 sm:px-3 sm:pb-3">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-px w-5 bg-gold" />

                      <span
                        className="
                          text-[7px]
                          font-medium
                          uppercase
                          tracking-[0.25em]
                          text-gold-light

                          sm:text-[8px]
                        "
                      >
                        Architecture | Interior
                      </span>
                    </div>

                    <p
                      className="
                        font-serif
                        text-[15px]
                        font-semibold
                        leading-tight
                        text-gold-light

                        sm:text-[17px]
                      "
                    >
                      Hitarth Parikh
                    </p>
                  </div>

                  {/* Small gold corner */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-0 right-0
                      h-7 w-7
                      border-b border-r
                      border-gold/70
                    "
                  />
                </div>
              </div>
            )}

            {/* ======================================= */}
            {/* BOTTOM LEFT GOLD CORNER */}
            {/* ======================================= */}

            <span
              aria-hidden="true"
              className={`
                pointer-events-none
                absolute
                -left-3
                h-16 w-16
                border-b border-l
                border-gold/70

                ${
                  showClientPhoto
                    ? "bottom-[52px] sm:bottom-[68px]"
                    : "-bottom-3"
                }
              `}
            />

            {/* Top-right gold corner */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-3 -top-3
                h-16 w-16
                border-r border-t
                border-gold/70
              "
            />
          </div>
        </Reveal>

        {/* ======================================= */}
        {/* RIGHT SIDE CONTENT */}
        {/* ======================================= */}

        <div>
          <Reveal>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />

              <span
                className="
                  text-[10px] font-medium
                  uppercase tracking-[0.34em]
                  text-gold-light
                "
              >
                About Us
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h2
              className="
                mb-7
                max-w-[760px]
                font-serif font-semibold
                text-4xl
                leading-[1.08]
                tracking-[-0.025em]
                text-black
              "
            >
              Architecture shaped around real life.
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p
              className="
                mb-5 max-w-[760px]
                text-[13px] leading-[1.95]
                text-black

                sm:text-[14px]
                lg:text-[15px]
              "
            >
              HPI Design Studio creates thoughtful architectural and
              interior spaces shaped around the way people live. Our
              work combines refined materials, balanced proportions
              and carefully considered light to create spaces that
              feel comfortable, functional and timeless.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p
              className="
                mb-8 max-w-[760px]
                text-[13px] leading-[1.95]
                text-black

                sm:text-[14px]
                lg:text-[15px]
              "
            >
              From private residences and luxury interiors to
              commercial environments, every project begins with
              understanding the client, the site and the life the
              space is meant to support. We believe good design should
              feel natural, personal and quietly expressive.
            </p>
          </Reveal>

          {/* Quote */}
          <Reveal delay={0.3}>
            <div
              className="
                relative mb-9
                border-l border-gold
                bg-black/[0.025]
                px-6 py-5
              "
            >
              <span
                className="
                  absolute
                  -left-[5px] top-5
                  h-2 w-2
                  rotate-45
                  bg-gold
                "
              />

              <p
                className="
                  max-w-[680px]
                  font-serif text-lg
                  italic leading-[1.65]
                  text-gold-light

                  sm:text-xl
                "
              >
                “Every space should feel infused with the life meant
                to fill it.”
              </p>
            </div>
          </Reveal>

          {/* Information Row */}
          <Reveal delay={0.36}>
            <div
              className="
                grid grid-cols-1
                border-y border-white/10

                sm:grid-cols-3
              "
            >
              <div
                className="
                  border-b border-white/10
                  py-5

                  sm:border-b-0
                  sm:border-r
                  sm:pr-6
                "
              >
                <span
                  className="
                    mb-2 block
                    text-[9px]
                    uppercase
                    tracking-[0.28em]
                    text-black
                  "
                >
                  Approach
                </span>

                <span
                  className="
                    font-serif
                    text-lg
                    font-semibold
                    text-black
                  "
                >
                  Thoughtful
                </span>
              </div>

              <div
                className="
                  border-b border-white/10
                  py-5

                  sm:border-b-0
                  sm:border-r
                  sm:px-6
                "
              >
                <span
                  className="
                    mb-2 block
                    text-[9px]
                    uppercase
                    tracking-[0.28em]
                    text-black
                  "
                >
                  Focus
                </span>

                <span
                  className="
                    font-serif
                    text-lg
                    font-semibold
                    text-black
                  "
                >
                  Detail
                </span>
              </div>

              <div className="py-5 sm:pl-6">
                <span
                  className="
                    mb-2 block
                    text-[9px]
                    uppercase
                    tracking-[0.28em]
                    text-black
                  "
                >
                  Philosophy
                </span>

                <span
                  className="
                    font-serif
                    text-lg
                    font-semibold
                    text-black
                  "
                >
                  Form · Light · Life
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}