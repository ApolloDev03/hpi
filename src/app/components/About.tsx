import Image from "next/image";
import Reveal from "./Reveal";
import aboutImage from "../assets/about-us.png";

export default function About() {
  return (
    <section
      id="about"
      className="
        relative overflow-hidden
        bg-[#0b0b0a]
        px-5 py-20
        sm:px-8 sm:py-24
        lg:px-[5vw] lg:py-[60px]
      "
    >
      <div
        className="
          mx-auto grid w-full max-w-[1500px]
          grid-cols-1 items-center gap-12

          lg:grid-cols-[0.88fr_1.12fr]
          lg:gap-16

          xl:grid-cols-[0.82fr_1.18fr]
          xl:gap-20
        "
      >
        {/* Left image */}
       {/* Left image */}
{/* Left image */}
<Reveal>
  <div
    className="
      relative mx-auto
      w-full max-w-[560px]

      lg:mx-0
      lg:max-w-none
    "
  >
    {/* Main image wrapper */}
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

    {/* Bottom-left gold corner */}
    <span
      aria-hidden="true"
      className="
        pointer-events-none
        absolute -bottom-3 -left-3
        h-16 w-16
        border-b border-l
        border-gold/70
      "
    />

    {/* Top-right gold corner */}
    <span
      aria-hidden="true"
      className="
        pointer-events-none
        absolute -right-3 -top-3
        h-16 w-16
        border-r border-t
        border-gold/70
      "
    />
  </div>
</Reveal>

        {/* Right content */}
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
                text-ivory
              "
            >
                 Architecture shaped
around real life.
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p
              className="
                mb-5 max-w-[760px]
                text-[13px] leading-[1.95]
                text-white/60

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
                text-white/60

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
                bg-white/[0.025]
                px-6 py-5
              "
            >
              <span
                className="
                  absolute -left-[5px] top-5
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

          {/* Simple information row */}
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
                    text-[9px] uppercase
                    tracking-[0.28em]
                    text-white/35
                  "
                >
                  Approach
                </span>

                <span
                  className="
                    font-serif text-lg
                    font-semibold text-ivory
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
                    text-[9px] uppercase
                    tracking-[0.28em]
                    text-white/35
                  "
                >
                  Focus
                </span>

                <span
                  className="
                    font-serif text-lg
                    font-semibold text-ivory
                  "
                >
                  Detail
                </span>
              </div>

              <div className="py-5 sm:pl-6">
                <span
                  className="
                    mb-2 block
                    text-[9px] uppercase
                    tracking-[0.28em]
                    text-white/35
                  "
                >
                  Philosophy
                </span>

                <span
                  className="
                    font-serif text-lg
                    font-semibold text-ivory
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