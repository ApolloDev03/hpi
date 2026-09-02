import Link from "next/link";

import {
  ArrowRight,
  Check,
  Home,
} from "lucide-react";

export default function ThankYouPage() {
  return (
    <main
      className="
        relative
        min-h-[calc(100vh-84px)]

        overflow-hidden

        bg-white

        px-5
        py-20

        sm:px-8
        sm:py-24

        lg:px-[5vw]
      "
    >
      {/* ========================================= */}
      {/* BACKGROUND GRID */}
      {/* ========================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          opacity-[0.5]

          bg-[linear-gradient(rgba(17,24,39,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.03)_1px,transparent_1px)]

          bg-[size:80px_80px]
        "
      />

      {/* ========================================= */}
      {/* GREEN GLOW LEFT */}
      {/* ========================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute

          -left-52
          top-1/2

          h-[520px]
          w-[520px]

          -translate-y-1/2

          rounded-full

          bg-gold/[0.07]

          blur-[170px]
        "
      />

      {/* ========================================= */}
      {/* GREEN GLOW RIGHT */}
      {/* ========================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute

          -right-48
          top-0

          h-[420px]
          w-[420px]

          rounded-full

          bg-gold/[0.045]

          blur-[150px]
        "
      />

      {/* ========================================= */}
      {/* TOP DECORATIVE LINE */}
      {/* ========================================= */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          right-0
          top-0

          h-px
          w-[38%]

          bg-gradient-to-l

          from-gold/50
          to-transparent
        "
      />

      {/* ========================================= */}
      {/* MAIN CONTENT */}
      {/* ========================================= */}

      <div
        className="
          relative
          z-10

          mx-auto

          flex
          min-h-[620px]

          w-full
          max-w-[1200px]

          items-center
          justify-center
        "
      >
        <div
          className="
            relative

            w-full
            max-w-[820px]

            overflow-hidden

            border
            border-black/10

            bg-white

            px-6
            py-14

            text-center

            shadow-[0_30px_90px_rgba(0,0,0,0.07)]

            sm:px-10
            sm:py-16

            lg:px-16
          "
        >
          {/* ===================================== */}
          {/* TOP GREEN LINE */}
          {/* ===================================== */}

          <span
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-0

              h-[3px]
              w-[120px]

              -translate-x-1/2

              bg-gold
            "
          />

          {/* ===================================== */}
          {/* CORNERS */}
          {/* ===================================== */}

          <span
            aria-hidden="true"
            className="
              absolute
              left-5
              top-5

              h-8
              w-8

              border-l
              border-t

              border-gold/40
            "
          />

          <span
            aria-hidden="true"
            className="
              absolute
              bottom-5
              right-5

              h-8
              w-8

              border-b
              border-r

              border-gold/40
            "
          />

          {/* ===================================== */}
          {/* SUCCESS ICON */}
          {/* ===================================== */}

          <div
            className="
              mx-auto

              flex
              h-20
              w-20

              items-center
              justify-center

              rounded-full

              border
              border-gold/20

              bg-[#f0f8f2]

              sm:h-24
              sm:w-24
            "
          >
            <div
              className="
                flex
                h-12
                w-12

                items-center
                justify-center

                rounded-full

                bg-gold

                text-white

                shadow-[0_12px_30px_rgba(17,94,40,0.22)]

                sm:h-14
                sm:w-14
              "
            >
              <Check
                size={28}
                strokeWidth={2}
              />
            </div>
          </div>

          {/* ===================================== */}
          {/* SMALL LABEL */}
          {/* ===================================== */}

          <div
            className="
              mt-8

              flex
              items-center
              justify-center

              gap-4
            "
          >
            <span
              className="
                h-px
                w-8

                bg-gold
              "
            />

            <span
              className="
                text-[9px]

                font-semibold

                uppercase

                tracking-[0.32em]

                text-gold

                sm:text-[10px]
              "
            >
              Enquiry Received
            </span>

            <span
              className="
                h-px
                w-8

                bg-gold
              "
            />
          </div>

          {/* ===================================== */}
          {/* TITLE */}
          {/* ===================================== */}

          <h1
            className="
              mt-6

              font-serif

              text-[clamp(3rem,7vw,6rem)]

              font-semibold

              leading-[0.95]

              tracking-[-0.055em]

              text-[#111827]
            "
          >
            Thank You
          </h1>

          {/* ===================================== */}
          {/* SUB TITLE */}
          {/* ===================================== */}

          <h2
            className="
              mx-auto
              mt-5

              max-w-[650px]

              font-serif

              text-[clamp(1.4rem,3vw,2.1rem)]

              font-medium

              leading-[1.3]

              text-[#111827]
            "
          >
            Your message has been submitted successfully.
          </h2>

          {/* ===================================== */}
          {/* DESCRIPTION */}
          {/* ===================================== */}

          <p
            className="
              mx-auto
              mt-5

              max-w-[590px]

              text-[13px]

              leading-[1.9]

              text-[#6b7280]

              sm:text-[14px]
            "
          >
            Thank you for reaching out to HPI Design Studio.
            We have received your enquiry and our team will
            get in touch with you shortly to understand your
            requirements and discuss the next steps.
          </p>

          {/* ===================================== */}
          {/* DIVIDER */}
          {/* ===================================== */}

          <div
            className="
              mx-auto
              mt-9

              h-px
              w-full
              max-w-[520px]

              bg-black/10
            "
          />

          {/* ===================================== */}
          {/* BUTTONS */}
          {/* ===================================== */}

          <div
            className="
              mt-9

              flex
              flex-col

              items-center
              justify-center

              gap-3

              sm:flex-row
            "
          >
            {/* Home */}

            <Link
              href="/"
              className="
                group

                inline-flex

                min-h-[52px]
                min-w-[190px]

                items-center
                justify-center

                gap-3

                border
                border-gold

                bg-gold

                px-6
                py-3

                text-[10px]

                font-semibold

                uppercase

                tracking-[0.22em]

                text-white

                transition-all
                duration-300

                hover:bg-white
                hover:text-black

                hover:shadow-[0_12px_30px_rgba(17,94,40,0.18)]
              "
            >
              <Home
                size={15}
              />

              Back to Home
            </Link>

            {/* Projects */}

            <Link
              href="/product"
              className="
                group

                inline-flex

                min-h-[52px]
                min-w-[190px]

                items-center
                justify-center

                gap-3

                border
                border-black/15

                bg-white

                px-6
                py-3

                text-[10px]

                font-semibold

                uppercase

                tracking-[0.22em]

                text-[#111827]

                transition-all
                duration-300

                hover:border-gold

                hover:text-gold
              "
            >
              View Projects

              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>

          {/* ===================================== */}
          {/* BOTTOM TEXT */}
          {/* ===================================== */}

          <p
            className="
              mt-9

              text-[9px]

              font-semibold

              uppercase

              tracking-[0.24em]

              text-[#9ca3af]
            "
          >
            HPI Design Studio · Architecture & Interior
          </p>
        </div>
      </div>
    </main>
  );
}