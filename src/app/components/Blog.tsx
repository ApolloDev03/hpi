/* eslint-disable @next/next/no-img-element */
"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowUpRight,
} from "lucide-react";

import {
  useHomeData,
} from "./HomeDataContext";

export default function Blog() {
  const reduceMotion =
    useReducedMotion();

  const {
    activeCategory,
    homeData,
    homeDataLoading,
    homeDataError,
    retryHomeData,
  } = useHomeData();

  const posts = homeData.blogs;

  return (
    <section
      id="blog"
      className="
        relative
        overflow-hidden

        bg-white

        px-5 py-20

        sm:px-8
        sm:py-24

        lg:px-[5vw]
        lg:py-[60px]
      "
    >
      {/* ============================================= */}
      {/* BACKGROUND DETAILS */}
      {/* ============================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-48
          top-1/3

          h-[420px]
          w-[420px]

          rounded-full

          bg-background/[0.045]

          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          right-0
          top-0

          h-px
          w-[40%]

          bg-gradient-to-l

          from-background/40

          to-transparent
        "
      />

      <div
        className="
          relative z-10

          mx-auto

          max-w-[1500px]
        "
      >
        {/* ============================================= */}
        {/* HEADING */}
        {/* ============================================= */}

        <motion.div
          initial={{
            opacity: 0,

            y: reduceMotion
              ? 0
              : 25,
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

            gap-6

            md:mb-16

            md:flex-row

            md:items-end

            md:justify-between
          "
        >
          <div>
            {/* Eyebrow */}

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

                  bg-background
                "
              />

              <span
                className="
                  text-[9px]

                  font-semibold

                  uppercase

                  tracking-[0.34em]

                  text-background
                "
              >
                The Journal
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                max-w-[720px]

                font-serif

                font-semibold

                uppercase

                text-[clamp(2rem,4vw,3.6rem)]

                leading-[1.06]

                tracking-[-0.025em]

                text-[#111827]
              "
            >
              Stories and ideas
              <br />

              from the{" "}

         
                studio.
            </h2>
          </div>

          {/* Description */}

          <p
            className="
              max-w-[360px]

              text-[12px]

              leading-[1.85]

              text-black

              sm:text-[13px]
            "
          >
            Notes on architecture,
            materials and the thoughtful
            decisions behind meaningful
            spaces.
          </p>
        </motion.div>

        {/* ============================================= */}
        {/* LOADING */}
        {/* ============================================= */}

        {homeDataLoading && (
          <div
            aria-busy="true"
            aria-label="Loading blogs"
            className="
              grid
              grid-cols-1

              gap-8

              md:grid-cols-2

              xl:grid-cols-3
            "
          >
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <div
                key={index}
                className="
                  overflow-hidden

                  border
                  border-[#e5e7eb]

                  bg-white

                  shadow-[0_14px_40px_rgba(0,0,0,0.05)]
                "
              >
                <div
                  className="
                    aspect-[16/11]

                    animate-pulse

                    bg-black/[0.04]
                  "
                />

                <div className="p-6">
                  <div
                    className="
                      h-7
                      w-3/4

                      animate-pulse

                      bg-black/[0.06]
                    "
                  />

                  <div
                    className="
                      mt-4
                      h-16

                      animate-pulse

                      bg-black/[0.035]
                    "
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================= */}
        {/* API ERROR */}
        {/* ============================================= */}

        {!homeDataLoading &&
          homeDataError && (
            <div
              role="alert"
              className="
                flex
                flex-col

                items-start

                justify-between

                gap-5

                border
                border-red-200

                bg-red-50

                px-6
                py-5

                sm:flex-row

                sm:items-center
              "
            >
              <div>
                <p
                  className="
                    text-sm

                    font-medium

                    text-red-600
                  "
                >
                  Unable to load blogs
                </p>

                <p
                  className="
                    mt-1

                    text-xs

                    leading-6

                    text-red-500
                  "
                >
                  {homeDataError}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  void retryHomeData()
                }
                className="
                  shrink-0

                  border
                  border-background/50

                  px-5
                  py-2.5

                  text-[10px]

                  font-semibold

                  uppercase

                  tracking-[0.18em]

                  text-background

                  transition-colors
                  duration-300

                  hover:bg-background

                  hover:text-white
                "
              >
                Try Again
              </button>
            </div>
          )}

        {/* ============================================= */}
        {/* EMPTY BLOGS */}
        {/* ============================================= */}

        {!homeDataLoading &&
          !homeDataError &&
          posts.length === 0 && (
            <div
              className="
                border
                border-[#e5e7eb]

                bg-white

                px-6
                py-12

                text-center
              "
            >
              <p
                className="
                  text-sm

                  text-black
                "
              >
                No blogs are available
                for{" "}
                {activeCategory?.name ??
                  "this category"}
                .
              </p>
            </div>
          )}

        {/* ============================================= */}
        {/* BLOG CARDS */}
        {/* ============================================= */}

        {!homeDataLoading &&
          !homeDataError &&
          posts.length > 0 && (
            <div
              className="
                grid
                grid-cols-1

                gap-8

                md:grid-cols-2

                xl:grid-cols-3
              "
            >
              {posts
                .slice(0, 3)
                .map(
                  (
                    post,
                    index,
                  ) => (
                    <motion.article
                      key={`${post.slug}-${index}`}
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
                        duration: 0.8,

                        delay:
                          index *
                          0.1,

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

                        flex
                        h-full

                        flex-col

                        overflow-hidden

                        border
                        border-[#e5e7eb]

                        bg-white

                        shadow-[0_15px_45px_rgba(0,0,0,0.055)]

                        transition-all
                        duration-500

                        hover:-translate-y-1

                        hover:border-background/40

                        hover:shadow-[0_28px_80px_rgba(17,94,40,0.10)]
                      "
                    >
                      {/* ================================= */}
                      {/* IMAGE */}
                      {/* ================================= */}

                      <div
                        className="
                          relative

                          aspect-[16/11]

                          overflow-hidden

                          bg-[#f3f4f6]
                        "
                      >
                        <img
                          src={
                            post.image_url
                          }
                          alt={
                            post.title
                          }
                          loading={
                            index ===
                            0
                              ? "eager"
                              : "lazy"
                          }
                          className="
                            h-full
                            w-full

                            object-cover

                            transition-transform

                            duration-[900ms]

                            ease-[cubic-bezier(0.16,1,0.3,1)]

                            group-hover:scale-[1.05]
                          "
                        />

                        {/* Image overlay */}

                        <div
                          aria-hidden="true"
                          className="
                            pointer-events-none

                            absolute
                            inset-0

                            bg-gradient-to-t

                            from-black/45

                            via-black/5

                            to-transparent
                          "
                        />

                        {/* Category */}

                        <span
                          className="
                            absolute
                            bottom-5
                            left-5

                            bg-background

                            px-4
                            py-2

                            text-[8px]

                            font-semibold

                            uppercase

                            tracking-[0.23em]

                            text-white
                          "
                        >
                          {activeCategory?.name ??
                            "Journal"}
                        </span>

                        {/* Decorative Corner */}

                        <span
                          aria-hidden="true"
                          className="
                            absolute
                            left-5
                            top-5

                            h-5
                            w-5

                            border-l
                            border-t

                            border-white/80

                            transition-all
                            duration-500

                            group-hover:h-8

                            group-hover:w-8
                          "
                        />
                      </div>

                      {/* ================================= */}
                      {/* CONTENT */}
                      {/* ================================= */}

                      <div
                        className="
                          relative

                          flex
                          flex-1

                          flex-col

                          bg-white

                          p-6
                        "
                      >
                        {/* Title */}

                        <h3
                          className="
                            font-serif

                            text-xl

                            leading-[1.2]

                            tracking-[-0.015em]

                            text-[#111827]
font-semibold
                            transition-colors
                            duration-400

                            group-hover:text-background
                          "
                        >
                          {
                            post.title
                          }
                        </h3>

                        {/* Description */}

                        <p
                          className="
                            mt-4

                            flex-1

                            text-[12px]

                            leading-[1.85]

                            text-black
font-medium
                            sm:text-[13px]
                          "
                        >
                          {post.description &&
                          post
                            .description
                            .length >
                            100
                            ? `${post.description
                                .slice(
                                  0,
                                  100,
                                )
                                .trim()
                                .replace(
                                  /\s+\S*$/,
                                  "",
                                )}...`
                            : post.description}
                        </p>

                        {/* ================================= */}
                        {/* READ ARTICLE */}
                        {/* ================================= */}

                        <a
                          href={`/blog-detail?slug=${encodeURIComponent(
                            post.slug,
                          )}`}
                          aria-label={`Read ${post.title}`}
                          className="
                            mt-7

                            flex

                            items-center

                            justify-between

                            border-t

                            border-[#e5e7eb]

                            pt-5
                          "
                        >
                          <span
                            className="
                              text-[9px]

                              font-bold

                              uppercase

                              tracking-[0.26em]

                              text-background
                            "
                          >
                            Read Article
                          </span>

                          <span
                            className="
                              flex
                              h-10
                              w-10

                              items-center
                              justify-center

                              border
                              border-background/30

                              bg-white

                              text-background

                              transition-all
                              duration-400

                              group-hover:border-background

                              group-hover:bg-background

                              group-hover:text-white
                            "
                          >
                            <ArrowUpRight
                              size={
                                16
                              }
                              className="
                                transition-transform
                                duration-400

                                group-hover:-translate-y-0.5

                                group-hover:translate-x-0.5
                              "
                            />
                          </span>
                        </a>
                      </div>

                      {/* ================================= */}
                      {/* BOTTOM GREEN DETAIL */}
                      {/* ================================= */}

                      <span
                        aria-hidden="true"
                        className="
                          pointer-events-none

                          absolute
                          bottom-0
                          left-0

                          h-[2px]
                          w-12

                          bg-background

                          transition-all
                          duration-500

                          group-hover:w-full
                        "
                      />
                    </motion.article>
                  ),
                )}
            </div>
          )}
      </div>
    </section>
  );
}