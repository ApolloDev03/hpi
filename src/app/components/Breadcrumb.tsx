"use client";

import Image, {
  StaticImageData,
} from "next/image";

import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  title: string;
  backgroundImage:
    | StaticImageData
    | string;

  items?: BreadcrumbItem[];

  imagePosition?: string;
};

export default function Breadcrumb({
  title,
  backgroundImage,
  items = [],
  imagePosition = "center",
}: BreadcrumbProps) {
  const reduceMotion =
    useReducedMotion();

  return (
    <section
      id="page-breadcrumb"
      className="
        relative
        h-[300px]
        overflow-hidden

        bg-white

        sm:h-[340px]

        lg:h-[390px]
      "
    >
      {/* ========================================= */}
      {/* BACKGROUND IMAGE */}
      {/* ========================================= */}

      <motion.div
        initial={{
          opacity: 0,

          scale: reduceMotion
            ? 1
            : 1.06,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration:
            reduceMotion
              ? 0.1
              : 1.1,

          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
        className="
          absolute
          inset-0
        "
      >
        <Image
          src={backgroundImage}
          alt={`${title} page background`}
          fill
          priority
          sizes="100vw"
          className="
            object-cover
          "
          style={{
            objectPosition:
              imagePosition,
          }}
        />
      </motion.div>

      {/* ========================================= */}
      {/* WHITE DIRECTIONAL OVERLAY */}
      {/* ========================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          bg-gradient-to-r

          from-white/70
          via-white/50
          to-white/25
        "
      />

      {/* ========================================= */}
      {/* SOFT BOTTOM WHITE OVERLAY */}
      {/* ========================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          bg-gradient-to-t

          from-white/75
          via-transparent
          to-white/10
        "
      />

      {/* ========================================= */}
      {/* SOFT GREEN GLOW */}
      {/* ========================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-32
          top-1/2

          h-[320px]
          w-[320px]

          -translate-y-1/2

          rounded-full

          bg-gold/10

          blur-[120px]
        "
      />

      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}

      <div
        className="
          relative
          z-10

          mx-auto

          flex
          h-full
          w-full
          max-w-[1500px]

          items-center

          px-5
          pt-[72px]

          sm:px-8
          sm:pt-[82px]

          lg:px-[5vw]
          lg:pt-[95px]
        "
      >
        <div>
          {/* ===================================== */}
          {/* PAGE TITLE */}
          {/* ===================================== */}

          <motion.h1
            initial={{
              opacity: 0,

              y: reduceMotion
                ? 0
                : 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration:
                reduceMotion
                  ? 0.1
                  : 0.8,

              delay: 0.15,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            className="
              font-serif
              font-medium

              text-[20px]

              leading-none

              tracking-[-0.045em]

              text-[#111827]

              lg:text-[60px]
            "
          >
            {title}
          </motion.h1>

          {/* ===================================== */}
          {/* BREADCRUMB */}
          {/* ===================================== */}

          <motion.nav
            initial={{
              opacity: 0,

              y: reduceMotion
                ? 0
                : 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration:
                reduceMotion
                  ? 0.1
                  : 0.7,

              delay: 0.28,
            }}
            aria-label="Breadcrumb"
            className="
              mt-6

              flex
              flex-wrap

              items-center

              gap-3

              text-[9px]

              lg:text-[12px]
            "
          >
            {/* Home */}

            <Link
              href="/"
              className="
                font-semibold

                uppercase

                tracking-[0.24em]

                text-[#4b5563]

                transition-colors
                duration-300

                hover:text-gold
              "
            >
              Home
            </Link>

            {/* Dynamic Breadcrumb Items */}

            {items.map(
              (
                item,
                index,
              ) => (
                <div
                  key={`${item.label}-${index}`}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  {/* Green Diamond */}

                  <span
                    aria-hidden="true"
                    className="
                      h-1.5
                      w-1.5

                      rotate-45

                      bg-gold
                    "
                  />

                  {item.href ? (
                    <Link
                      href={
                        item.href
                      }
                      className="
                        font-semibold

                        uppercase

                        tracking-[0.24em]

                        text-[#4b5563]

                        transition-colors
                        duration-300

                        hover:text-gold
                      "
                    >
                      {
                        item.label
                      }
                    </Link>
                  ) : (
                    <span
                      aria-current="page"
                      className="
                        font-semibold

                        uppercase

                        tracking-[0.24em]

                        text-gold
                      "
                    >
                      {
                        item.label
                      }
                    </span>
                  )}
                </div>
              ),
            )}
          </motion.nav>
        </div>
      </div>

      {/* ========================================= */}
      {/* BOTTOM GREEN LINE */}
      {/* ========================================= */}

      <motion.span
        aria-hidden="true"
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          duration:
            reduceMotion
              ? 0.1
              : 1,

          delay: 0.3,

          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
        className="
          absolute
          bottom-0
          left-0

          z-20

          h-[2px]
          w-[42%]

          origin-left

          bg-gradient-to-r

          from-gold

          to-transparent
        "
      />
    </section>
  );
}