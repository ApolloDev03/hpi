/* eslint-disable @next/next/no-img-element */
"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowRight,
  Building2,
  Hospital,
  House,
  Images,
  Store,
  type LucideIcon,
} from "lucide-react";

import Reveal from "./Reveal";

import {
  useHomeData,
  type ApiCategory,
} from "./HomeDataContext";

/* =========================================================
   CATEGORY ICON
========================================================= */

function getCategoryIcon(
  category: ApiCategory,
): LucideIcon {
  const value =
    `${category.name} ${category.slug}`.toLowerCase();

  if (value.includes("home")) {
    return House;
  }

  if (
    value.includes("showroom") ||
    value.includes("shop")
  ) {
    return Store;
  }

  if (value.includes("hospital")) {
    return Hospital;
  }

  if (
    value.includes("corporate") ||
    value.includes("office")
  ) {
    return Building2;
  }

  return Images;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function Projects() {
  const reduceMotion =
    useReducedMotion();

  const {
    categories,
    activeCategoryId,
    activeCategory,
    homeData,

    categoriesLoading,
    homeDataLoading,

    categoriesError,
    homeDataError,

    selectCategory,
    retryCategories,
    retryHomeData,
  } = useHomeData();

  const projects =
    homeData.photo_gallery;

  return (
    <section
      id="projects"
      className="
        relative overflow-hidden

        bg-[var(--foreground)]

        px-5 py-20

        sm:px-8
        sm:py-24

        lg:px-[5vw]
        lg:py-[110px]
      "
    >
      {/* ================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-48
          top-1/3

          h-[460px]
          w-[460px]

          rounded-full

          bg-[#115e28]/[0.045]

          blur-[165px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-40
          bottom-0

          h-[400px]
          w-[400px]

          rounded-full

          bg-[#115e28]/[0.035]

          blur-[150px]
        "
      />

      {/* Very subtle grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0

          opacity-[0.4]

          bg-[linear-gradient(rgba(17,24,39,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.025)_1px,transparent_1px)]

          bg-[size:80px_80px]
        "
      />

      <div
        className="
          relative z-10

          mx-auto
          w-full
          max-w-[1500px]
        "
      >
        {/* ================================================= */}
        {/* HEADING */}
        {/* ================================================= */}

        <Reveal>
          <div
            className="
              mb-12
              grid
              grid-cols-1
              gap-8

              md:mb-14

              lg:grid-cols-[0.82fr_1.18fr]
              lg:items-end
              lg:gap-16
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
                    w-9

                    bg-[var(--gold)]
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase

                    tracking-[0.34em]

                    text-[var(--gold)]
                  "
                >
                  Our Work
                </span>
              </div>

              {/* Heading */}

              <h2
                className="
                  font-serif

                  text-[clamp(3rem,6vw,5.7rem)]

                  font-medium
                  leading-[0.95]

                  tracking-[-0.045em]

                  text-[var(--background)]
                "
              >
                Projects
              </h2>
            </div>

            {/* Right Description */}

            <div
              className="
                flex
                max-w-[570px]

                items-start
                gap-7

                lg:pb-2
              "
            >
              <span
                aria-hidden="true"
                className="
                  mt-1
                  hidden

                  h-[58px]
                  w-px

                  shrink-0

                  bg-[var(--gold)]

                  sm:block
                "
              />

              <p
                className="
                  max-w-[470px]

                  text-[13px]
                  leading-[1.85]

                  text-[var(--muted)]

                  sm:text-[14px]
                "
              >
                Spaces that reflect purpose,
                craftsmanship and timeless
                design.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ================================================= */}
        {/* CATEGORY LOADING */}
        {/* ================================================= */}

        {categoriesLoading && (
          <Reveal delay={0.08}>
            <div
              aria-busy="true"
              aria-label="Loading project categories"
              className="
                mb-12

                grid
                grid-cols-2

                overflow-hidden

                rounded-[12px]

                border
                border-[var(--border)]

                bg-white

                shadow-[0_12px_40px_rgba(0,0,0,0.05)]

                lg:grid-cols-4
              "
            >
              {Array.from({
                length: 4,
              }).map((_, index) => (
                <div
                  key={index}
                  className="
                    min-h-[132px]

                    animate-pulse

                    border-b
                    border-r
                    border-[var(--border)]

                    bg-black/[0.025]

                    lg:min-h-[145px]
                    lg:border-b-0
                  "
                />
              ))}
            </div>
          </Reveal>
        )}

        {/* ================================================= */}
        {/* CATEGORY ERROR */}
        {/* ================================================= */}

        {!categoriesLoading &&
          categoriesError && (
            <Reveal delay={0.08}>
              <div
                role="alert"
                className="
                  mb-12

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

                      text-red-700
                    "
                  >
                    Unable to load categories
                  </p>

                  <p
                    className="
                      mt-1

                      text-xs
                      leading-6

                      text-red-600/80
                    "
                  >
                    {categoriesError}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    void retryCategories()
                  }
                  className="
                    shrink-0

                    border
                    border-[var(--gold)]

                    px-5
                    py-2.5

                    text-[10px]
                    font-semibold
                    uppercase

                    tracking-[0.18em]

                    text-[var(--gold)]

                    transition-all
                    duration-300

                    hover:bg-[var(--gold)]
                    hover:text-white
                  "
                >
                  Try Again
                </button>
              </div>
            </Reveal>
          )}

        {/* ================================================= */}
        {/* EMPTY CATEGORIES */}
        {/* ================================================= */}

        {!categoriesLoading &&
          !categoriesError &&
          categories.length === 0 && (
            <Reveal delay={0.08}>
              <div
                className="
                  mb-12

                  border
                  border-[var(--border)]

                  bg-white

                  px-6
                  py-10

                  text-center
                "
              >
                <p
                  className="
                    text-sm

                    text-[var(--muted)]
                  "
                >
                  No active project categories
                  are available.
                </p>
              </div>
            </Reveal>
          )}

        {/* ================================================= */}
        {/* CATEGORY TABS */}
        {/* ================================================= */}

        {!categoriesLoading &&
          !categoriesError &&
          categories.length > 0 && (
            <Reveal delay={0.08}>
              <div
                role="tablist"
                aria-label="Project categories"
                className="
                  mb-12

                  grid
                  grid-cols-2

                  overflow-hidden

                  rounded-[12px]

                  border
                  border-[var(--border)]

                  bg-white

                  shadow-[0_12px_45px_rgba(0,0,0,0.055)]

                  lg:grid-cols-4
                "
              >
                {categories.map(
                  (
                    category,
                    index,
                  ) => {
                    const isActive =
                      activeCategoryId ===
                      category.id;

                    const Icon =
                      getCategoryIcon(
                        category,
                      );

                    const mobileRowCount =
                      Math.ceil(
                        categories.length /
                          2,
                      );

                    const currentMobileRow =
                      Math.floor(
                        index / 2,
                      ) + 1;

                    const isLastMobileRow =
                      currentMobileRow ===
                      mobileRowCount;

                    return (
                      <button
                        key={
                          category.id
                        }
                        id={`project-tab-${category.id}`}
                        type="button"
                        role="tab"
                        aria-selected={
                          isActive
                        }
                        aria-controls={`project-panel-${category.id}`}
                        onClick={() =>
                          selectCategory(
                            category.id,
                          )
                        }
                        className={`
                          group
                          relative

                          min-h-[132px]

                          overflow-hidden

                          border-[var(--border)]

                          px-5 py-6

                          transition-all
                          duration-400

                          ${
                            index %
                              2 ===
                            0
                              ? "border-r"
                              : ""
                          }

                          ${
                            !isLastMobileRow
                              ? `
                                  border-b

                                  lg:border-b-0
                                `
                              : ""
                          }

                          ${
                            index <
                            categories.length -
                              1
                              ? "lg:border-r"
                              : ""
                          }

                          ${
                            isActive
                              ? `
                                  text-white
                                `
                              : `
                                  bg-white

                                  text-[var(--background)]

                                  hover:bg-[var(--green-soft)]

                                  hover:text-[var(--gold)]
                                `
                          }

                          lg:min-h-[145px]
                        `}
                      >
                        {/* Active Green BG */}

                        {isActive && (
                          <motion.span
                            layoutId="active-project-category"
                            className="
                              absolute
                              inset-0

                              bg-[var(--gold)]
                            "
                            transition={{
                              duration:
                                reduceMotion
                                  ? 0
                                  : 0.5,

                              ease: [
                                0.16,
                                1,
                                0.3,
                                1,
                              ],
                            }}
                          />
                        )}

                        <span
                          className="
                            relative z-10

                            flex
                            h-full

                            flex-col

                            items-center
                            justify-center

                            gap-4
                          "
                        >
                          <Icon
                            size={36}
                            strokeWidth={
                              1.35
                            }
                            className={`
                              transition-all
                              duration-400

                              ${
                                isActive
                                  ? `
                                      text-white
                                    `
                                  : `
                                      text-[var(--gold)]

                                      group-hover:-translate-y-1
                                    `
                              }
                            `}
                          />

                          <span
                            className="
                              text-center

                              text-[10px]
                              font-bold
                              uppercase

                              tracking-[0.22em]

                              sm:text-[11px]
                            "
                          >
                            {
                              category.name
                            }
                          </span>
                        </span>

                        {/* Active bottom line */}

                        {isActive && (
                          <motion.span
                            layoutId="active-project-tab-line"
                            className="
                              absolute
                              bottom-0
                              left-1/2

                              z-20

                              h-[3px]
                              w-[105px]

                              -translate-x-1/2

                              bg-white/85

                              shadow-[0_0_18px_rgba(255,255,255,0.35)]
                            "
                          />
                        )}
                      </button>
                    );
                  },
                )}
              </div>
            </Reveal>
          )}

        {/* ================================================= */}
        {/* PROJECT ERROR */}
        {/* ================================================= */}

        {!categoriesLoading &&
          activeCategory &&
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

                    text-red-700
                  "
                >
                  Unable to load projects
                </p>

                <p
                  className="
                    mt-1

                    text-xs
                    leading-6

                    text-red-600/80
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
                  border-[var(--gold)]

                  px-5
                  py-2.5

                  text-[10px]
                  font-semibold
                  uppercase

                  tracking-[0.18em]

                  text-[var(--gold)]

                  transition-all
                  duration-300

                  hover:bg-[var(--gold)]
                  hover:text-white
                "
              >
                Try Again
              </button>
            </div>
          )}

        {/* ================================================= */}
        {/* PROJECT PANEL */}
        {/* ================================================= */}

        {activeCategory &&
          !homeDataError && (
            <div
              id={`project-panel-${activeCategory.id}`}
              role="tabpanel"
              aria-labelledby={`project-tab-${activeCategory.id}`}
            >
              {/* ============================================= */}
              {/* PROJECT LOADING */}
              {/* ============================================= */}

              {homeDataLoading && (
                <div
                  aria-busy="true"
                  aria-label="Loading projects"
                  className="
                    grid
                    grid-cols-1

                    gap-7

                    md:grid-cols-2

                    xl:grid-cols-3
                    xl:gap-8
                  "
                >
                  {Array.from({
                    length: 3,
                  }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className="
                          overflow-hidden

                          border
                          border-[var(--border)]

                          bg-white

                          shadow-[0_12px_35px_rgba(0,0,0,0.05)]
                        "
                      >
                        <div
                          className="
                            aspect-[4/3]

                            animate-pulse

                            bg-black/[0.04]
                          "
                        />

                        <div
                          className="
                            px-7
                            py-7
                          "
                        >
                          <div
                            className="
                              h-px
                              w-8

                              bg-[var(--gold)]/50
                            "
                          />

                          <div
                            className="
                              mt-5

                              h-8
                              w-2/3

                              animate-pulse

                              bg-black/[0.05]
                            "
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}

              {/* ============================================= */}
              {/* EMPTY PROJECTS */}
              {/* ============================================= */}

              {!homeDataLoading &&
                projects.length ===
                  0 && (
                  <div
                    className="
                      border
                      border-[var(--border)]

                      bg-white

                      px-6
                      py-12

                      text-center
                    "
                  >
                    <p
                      className="
                        text-sm

                        text-[var(--muted)]
                      "
                    >
                      No projects are
                      available in{" "}
                      {
                        activeCategory.name
                      }
                      .
                    </p>
                  </div>
                )}

              {/* ============================================= */}
              {/* PROJECT CARDS */}
              {/* ============================================= */}

              {!homeDataLoading &&
                projects.length >
                  0 && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={
                        activeCategory.id
                      }
                      initial={{
                        opacity: 0,

                        y: reduceMotion
                          ? 0
                          : 28,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,

                        y: reduceMotion
                          ? 0
                          : 18,
                      }}
                      transition={{
                        duration:
                          reduceMotion
                            ? 0.1
                            : 0.58,

                        ease: [
                          0.16,
                          1,
                          0.3,
                          1,
                        ],
                      }}
                      className="
                        grid
                        grid-cols-1

                        gap-7

                        md:grid-cols-2

                        xl:grid-cols-3
                        xl:gap-8
                      "
                    >
                      {projects.map(
                        (
                          project,
                          index,
                        ) => (
                          <motion.article
                            key={`${project.slug}-${index}`}
                            initial={{
                              opacity: 0,

                              y: reduceMotion
                                ? 0
                                : 32,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              duration:
                                reduceMotion
                                  ? 0.1
                                  : 0.65,

                              delay:
                                reduceMotion
                                  ? 0
                                  : index *
                                    0.09,

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

                              overflow-hidden

                              border
                              border-[var(--border)]

                              bg-white

                              shadow-[0_16px_45px_rgba(0,0,0,0.07)]

                              transition-all
                              duration-500

                              hover:-translate-y-2

                              hover:border-[var(--gold)]

                              hover:shadow-[0_25px_60px_rgba(17,94,40,0.12)]
                            "
                          >
                            <a
                              href={`/product-detail?slug=${encodeURIComponent(
                                project.slug,
                              )}`}
                              aria-label={`View ${project.title}`}
                              className="
                                block
                              "
                            >
                              {/* ================================= */}
                              {/* PROJECT IMAGE */}
                              {/* ================================= */}

                              <div
                                className="
                                  relative

                                  aspect-[4/3]

                                  overflow-hidden

                                  bg-[#f3f4f6]
                                "
                              >
                                <img
                                  src={
                                    project.image_url
                                  }
                                  alt={
                                    project.title
                                  }
                                  loading={
                                    index ===
                                    0
                                      ? "eager"
                                      : "lazy"
                                  }
                                  className="
                                    block

                                    h-full
                                    w-full

                                    object-cover

                                    transition-transform

                                    duration-[1000ms]

                                    ease-[cubic-bezier(0.16,1,0.3,1)]

                                    group-hover:scale-[1.055]
                                  "
                                />

                                {/* Very soft image overlay */}

                                <div
                                  aria-hidden="true"
                                  className="
                                    pointer-events-none

                                    absolute
                                    inset-0

                                    bg-gradient-to-t

                                    from-black/10

                                    via-transparent

                                    to-white/[0.03]
                                  "
                                />

                                {/* Green corner detail */}

                                <span
                                  aria-hidden="true"
                                  className="
                                    absolute
                                    right-0
                                    top-0

                                    h-12
                                    w-12

                                    border-r-2
                                    border-t-2

                                    border-[var(--gold)]

                                    opacity-0

                                    transition-all
                                    duration-500

                                    group-hover:right-4
                                    group-hover:top-4
                                    group-hover:opacity-100
                                  "
                                />
                              </div>

                              {/* ================================= */}
                              {/* PROJECT CONTENT */}
                              {/* ================================= */}

                              <div
                                className="
                                  relative

                                  bg-white

                                  px-6
                                  py-6

                                  sm:px-7
                                "
                              >
                                {/* Green line */}

                                <span
                                  aria-hidden="true"
                                  className="
                                    mb-4
                                    block

                                    h-[2px]
                                    w-8

                                    bg-[var(--gold)]

                                    transition-all
                                    duration-500

                                    group-hover:w-14
                                  "
                                />

                                {/* Title */}

                                <h3
                                  className="
                                    font-serif

                                    text-[18px]

                                    font-semibold

                                    leading-[1.15]

                                    tracking-[-0.02em]

                                    text-[var(--background)]

                                    transition-colors
                                    duration-300

                                    group-hover:text-[var(--gold)]

                                    lg:text-[20px]
                                  "
                                >
                                  {
                                    project.title
                                  }
                                </h3>

                                {/* View link */}

                                <div
                                  className="
                                    mt-5

                                    inline-flex

                                    items-center

                                    gap-3

                                    text-[10px]
                                    font-semibold
                                    uppercase

                                    tracking-[0.15em]

                                    text-[var(--gold)]
                                  "
                                >
                                  <span>
                                    View Project
                                  </span>

                                  <span
                                    className="
                                      flex
                                      h-8
                                      w-8

                                      items-center
                                      justify-center

                                      rounded-full

                                      border
                                      border-[var(--gold)]/30

                                      bg-[var(--green-soft)]

                                      transition-all
                                      duration-300

                                      group-hover:border-[var(--gold)]

                                      group-hover:bg-[var(--gold)]

                                      group-hover:text-white
                                    "
                                  >
                                    <ArrowRight
                                      size={
                                        16
                                      }
                                      strokeWidth={
                                        1.6
                                      }
                                      className="
                                        transition-transform
                                        duration-400

                                        group-hover:translate-x-0.5
                                      "
                                    />
                                  </span>
                                </div>

                                {/* Bottom hover line */}

                                <span
                                  aria-hidden="true"
                                  className="
                                    pointer-events-none

                                    absolute
                                    bottom-0
                                    left-0

                                    h-[3px]
                                    w-0

                                    bg-[var(--gold)]

                                    transition-all
                                    duration-500

                                    group-hover:w-full
                                  "
                                />
                              </div>
                            </a>
                          </motion.article>
                        ),
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
            </div>
          )}
      </div>
    </section>
  );
}