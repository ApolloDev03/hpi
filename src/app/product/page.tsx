"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import Reveal from "../components/Reveal";
import Breadcrumb from "@/app/components/Breadcrumb";
import banner from "../assets/banner1.png";
import { apiUrl } from "../config";

const PER_PAGE = 10;

/* =========================================================
   TYPES
========================================================= */

type PhotoGalleryItem = {
  title: string;
  slug: string;
  image_url: string;
  description: string | null;
};

type ApiPagination = {
  total: number;
  per_page: number | string;
  current_page: number | string;
  last_page: number;
  from: number | null;
  to: number | null;
};

type CategoryProjectApiResponse = {
  success: boolean;
  message: string;

  data: {
    photo_gallery: PhotoGalleryItem[];
  };

  pagination: ApiPagination;
};

type PaginationState = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  from: number | null;
  to: number | null;
};

/* =========================================================
   INITIAL PAGINATION
========================================================= */

const INITIAL_PAGINATION: PaginationState = {
  total: 0,
  perPage: PER_PAGE,
  currentPage: 1,
  lastPage: 1,
  from: null,
  to: null,
};

/* =========================================================
   CATEGORY TITLE
========================================================= */

function formatCategoryTitle(
  slug: string,
): string {
  if (!slug.trim()) {
    return "Projects";
  }

  return slug
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase(),
    )
    .join(" ");
}

/* =========================================================
   API ERROR
========================================================= */

function getApiErrorMessage(
  error: unknown,
): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error &&
      error.message
      ? error.message
      : "Unable to load projects.";
  }

  const responseMessage =
    error.response?.data?.message;

  if (
    typeof responseMessage === "string" &&
    responseMessage.trim()
  ) {
    return responseMessage;
  }

  return (
    error.message ||
    "Unable to load projects."
  );
}

/* =========================================================
   PROJECT CONTENT
========================================================= */

function ProductProjectsContent() {
  const reduceMotion =
    useReducedMotion();

  const searchParams =
    useSearchParams();

  const categorySlug =
    searchParams
      .get("slug")
      ?.trim() || "home";

  const categoryTitle =
    useMemo(
      () =>
        formatCategoryTitle(
          categorySlug,
        ),
      [categorySlug],
    );

  /* =======================================================
     STATE
  ======================================================= */

  const [
    projects,
    setProjects,
  ] =
    useState<
      PhotoGalleryItem[]
    >([]);

  const [
    pagination,
    setPagination,
  ] =
    useState<PaginationState>(
      INITIAL_PAGINATION,
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState("");

  const requestController =
    useRef<AbortController | null>(
      null,
    );

  /* =======================================================
     FETCH PROJECTS
  ======================================================= */

  const fetchProjects =
    useCallback(
      async (
        page: number,

        options?: {
          scrollToListing?: boolean;
        },
      ) => {
        requestController.current?.abort();

        const controller =
          new AbortController();

        requestController.current =
          controller;

        setLoading(true);

        setErrorMessage("");

        try {
          const response =
            await axios.post<CategoryProjectApiResponse>(
              `${apiUrl}/category_project`,

              {
                category_slug:
                  categorySlug,

                page:
                  String(page),

                per_page:
                  String(
                    PER_PAGE,
                  ),
              },

              {
                signal:
                  controller.signal,

                headers: {
                  Accept:
                    "application/json",

                  "Content-Type":
                    "application/json",
                },
              },
            );

          if (
            !response.data.success ||
            !response.data.data ||
            !Array.isArray(
              response.data.data
                .photo_gallery,
            )
          ) {
            throw new Error(
              response.data.message ||
                "Invalid project response received.",
            );
          }

          if (
            controller.signal
              .aborted
          ) {
            return;
          }

          const apiPagination =
            response.data
              .pagination;

          setProjects(
            response.data.data
              .photo_gallery,
          );

          setPagination({
            total:
              Number(
                apiPagination.total,
              ) || 0,

            perPage:
              Number(
                apiPagination.per_page,
              ) ||
              PER_PAGE,

            currentPage:
              Number(
                apiPagination.current_page,
              ) ||
              page,

            lastPage:
              Number(
                apiPagination.last_page,
              ) || 1,

            from:
              apiPagination.from ===
              null
                ? null
                : Number(
                    apiPagination.from,
                  ),

            to:
              apiPagination.to ===
              null
                ? null
                : Number(
                    apiPagination.to,
                  ),
          });

          if (
            options?.scrollToListing
          ) {
            window.requestAnimationFrame(
              () => {
                document
                  .getElementById(
                    "project-listing",
                  )
                  ?.scrollIntoView({
                    behavior:
                      "smooth",

                    block:
                      "start",
                  });
              },
            );
          }
        } catch (
          error: unknown
        ) {
          if (
            controller.signal
              .aborted ||
            (
              axios.isAxiosError(
                error,
              ) &&
              error.code ===
                "ERR_CANCELED"
            )
          ) {
            return;
          }

          setProjects([]);

          setPagination(
            INITIAL_PAGINATION,
          );

          setErrorMessage(
            getApiErrorMessage(
              error,
            ),
          );
        } finally {
          if (
            !controller.signal
              .aborted
          ) {
            setLoading(
              false,
            );
          }
        }
      },

      [
        categorySlug,
      ],
    );

  /* =======================================================
     INITIAL FETCH
  ======================================================= */

  useEffect(() => {
    void fetchProjects(1);

    return () => {
      requestController.current?.abort();
    };
  }, [fetchProjects]);

  /* =======================================================
     CHANGE PAGE
  ======================================================= */

  const changePage = (
    page: number,
  ) => {
    if (
      loading ||
      page < 1 ||
      page >
        pagination.lastPage ||
      page ===
        pagination.currentPage
    ) {
      return;
    }

    void fetchProjects(
      page,
      {
        scrollToListing:
          true,
      },
    );
  };

  /* =======================================================
     VISIBLE PAGES
  ======================================================= */

  const visiblePages =
    useMemo(() => {
      const pages: number[] =
        [];

      const maxVisiblePages =
        5;

      let startPage =
        Math.max(
          1,

          pagination.currentPage -
            Math.floor(
              maxVisiblePages /
                2,
            ),
        );

      const endPage =
        Math.min(
          pagination.lastPage,

          startPage +
            maxVisiblePages -
            1,
        );

      startPage =
        Math.max(
          1,

          endPage -
            maxVisiblePages +
            1,
        );

      for (
        let page =
          startPage;

        page <= endPage;

        page += 1
      ) {
        pages.push(page);
      }

      return pages;
    }, [
      pagination.currentPage,
      pagination.lastPage,
    ]);

  return (
    <main
      className="
        overflow-hidden
        bg-white
      "
    >
      {/* ================================================= */}
      {/* BREADCRUMB */}
      {/* ================================================= */}

      <Breadcrumb
        title={
          categoryTitle
        }
        backgroundImage={
          banner
        }
        imagePosition="center"
        items={[
          {
            label:
              "Projects",
          },
          {
            label:
              categoryTitle,
          },
        ]}
      />

      {/* ================================================= */}
      {/* PROJECT SECTION */}
      {/* ================================================= */}

      <section
        id="home-projects"
        className="
          relative
          overflow-hidden

          bg-white

          px-5
          py-20

          sm:px-8
          sm:py-24

          lg:px-[5vw]
          lg:py-[100px]
        "
      >
        {/* =============================================== */}
        {/* BACKGROUND GLOWS */}
        {/* =============================================== */}

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
            bottom-0

            h-[400px]
            w-[400px]

            rounded-full

            bg-gold/[0.035]

            blur-[150px]
          "
        />

        {/* =============================================== */}
        {/* DECORATIVE TOP LINE */}
        {/* =============================================== */}

        <span
          aria-hidden="true"
          className="
            pointer-events-none

            absolute

            right-0
            top-0

            h-px
            w-[42%]

            bg-gradient-to-l

            from-gold/50

            to-transparent
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

                md:mb-16

                lg:grid-cols-[1.18fr_0.82fr]

                lg:items-end

                lg:gap-16
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
                      w-10

                      bg-gold
                    "
                  />

                  <span
                    className="
                      text-[10px]

                      font-semibold

                      uppercase

                      tracking-[0.34em]

                      text-gold
                    "
                  >
                    Interior Design Projects
                  </span>
                </div>

                <h1
                  className="
                    font-serif

                    text-[clamp(2.8rem,6vw,5.4rem)]

                    font-medium

                    leading-[0.96]

                    tracking-[-0.045em]

                    text-[#111827]
                  "
                >
                  {
                    categoryTitle
                  }
                </h1>
              </div>

              <div
                className="
                  flex

                  max-w-[590px]

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

                    h-[70px]
                    w-px

                    shrink-0

                    bg-gold

                    sm:block
                  "
                />

                <p
                  className="
                    max-w-[500px]

                    text-[13px]

                    leading-[1.9]

                    text-black

                    sm:text-[14px]
                  "
                >
                  Explore our
                  carefully
                  designed{" "}
                  {categoryTitle.toLowerCase()}{" "}
                  projects,
                  created with
                  thoughtful
                  planning,
                  functionality,
                  material balance
                  and timeless
                  visual character.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ================================================= */}
          {/* PROJECT COUNT */}
          {/* ================================================= */}

          <motion.div
            id="project-listing"
            initial={{
              opacity: 0,

              y:
                reduceMotion
                  ? 0
                  : 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration:
                0.7,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            className="
              mb-10

              flex

              items-center

              justify-between

              border-y

              border-black/10

              py-5

              scroll-mt-28
            "
          >
            <span
              className="
                text-[11px]

                font-semibold

                uppercase

                tracking-[0.27em]

                text-gold
              "
            >
              Selected{" "}
              {
                categoryTitle
              }{" "}
              Work
            </span>

            <span
              className="
                text-[10px]

                font-semibold

                uppercase

                tracking-[0.25em]

                text-[#6b7280]
              "
            >
              {String(
                pagination.total,
              ).padStart(
                2,
                "0",
              )}{" "}

              {pagination.total ===
              1
                ? "Project"
                : "Projects"}
            </span>
          </motion.div>

          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {loading && (
            <div
              aria-busy="true"
              aria-label="Loading projects"
              className="
                grid
                grid-cols-1

                gap-x-7
                gap-y-10

                md:grid-cols-2

                xl:grid-cols-3

                xl:gap-x-8
                xl:gap-y-12
              "
            >
              {Array.from({
                length: 6,
              }).map(
                (
                  _,
                  index,
                ) => (
                  <div
                    key={
                      index
                    }
                    className="
                      overflow-hidden

                      border

                      border-black/10

                      bg-white

                      shadow-[0_15px_45px_rgba(0,0,0,0.05)]
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

                          bg-gold/60
                        "
                      />

                      <div
                        className="
                          mt-5

                          h-8
                          w-2/3

                          animate-pulse

                          bg-black/[0.06]
                        "
                      />

                      <div
                        className="
                          mt-4

                          h-12

                          animate-pulse

                          bg-black/[0.035]
                        "
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          )}

          {/* ================================================= */}
          {/* ERROR */}
          {/* ================================================= */}

          {!loading &&
            errorMessage && (
              <div
                role="alert"
                className="
                  flex

                  min-h-[260px]

                  flex-col

                  items-center

                  justify-center

                  border

                  border-red-200

                  bg-red-50

                  px-6
                  py-12

                  text-center
                "
              >
                <p
                  className="
                    max-w-[580px]

                    text-sm

                    leading-7

                    text-red-600
                  "
                >
                  {
                    errorMessage
                  }
                </p>

                <button
                  type="button"
                  onClick={() =>
                    void fetchProjects(
                      pagination.currentPage ||
                        1,
                    )
                  }
                  className="
                    mt-6

                    inline-flex

                    items-center

                    gap-3

                    border

                    border-gold/50

                    px-6
                    py-3

                    text-[10px]

                    font-semibold

                    uppercase

                    tracking-[0.2em]

                    text-gold

                    transition-all

                    duration-300

                    hover:bg-gold

                    hover:text-white
                  "
                >
                  <RefreshCw
                    size={
                      15
                    }
                  />

                  Try Again
                </button>
              </div>
            )}

          {/* ================================================= */}
          {/* EMPTY */}
          {/* ================================================= */}

          {!loading &&
            !errorMessage &&
            projects.length ===
              0 && (
              <div
                className="
                  flex

                  min-h-[260px]

                  items-center

                  justify-center

                  border

                  border-black/10

                  bg-white

                  px-6
                  py-12

                  text-center
                "
              >
                <p
                  className="
                    text-sm

                    leading-7

                    text-[#6b7280]
                  "
                >
                  No{" "}
                  {categoryTitle.toLowerCase()}{" "}
                  projects are
                  available.
                </p>
              </div>
            )}

          {/* ================================================= */}
          {/* PROJECT LIST */}
          {/* ================================================= */}

          {!loading &&
            !errorMessage &&
            projects.length >
              0 && (
              <>
                <div
                  className="
                    grid
                    grid-cols-1

                    gap-x-7
                    gap-y-10

                    md:grid-cols-2

                    xl:grid-cols-3

                    xl:gap-x-8
                    xl:gap-y-12
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
                          opacity:
                            0,

                          y:
                            reduceMotion
                              ? 0
                              : 34,
                        }}
                        whileInView={{
                          opacity:
                            1,

                          y: 0,
                        }}
                        viewport={{
                          once:
                            true,

                          amount:
                            0.15,
                        }}
                        transition={{
                          duration:
                            reduceMotion
                              ? 0.1
                              : 0.7,

                          delay:
                            reduceMotion
                              ? 0
                              : index *
                                0.08,

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

                          border-black/10

                          bg-white

                          shadow-[0_18px_55px_rgba(0,0,0,0.07)]

                          transition-all

                          duration-500

                          hover:-translate-y-1

                          hover:border-gold/45

                          hover:shadow-[0_28px_75px_rgba(17,94,40,0.12)]
                        "
                      >
                        <Link
                          href={`/product-detail?slug=${encodeURIComponent(
                            project.slug,
                          )}`}
                          className="
                            block
                            h-full
                          "
                          aria-label={`View ${project.title}`}
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
                                index <
                                3
                                  ? "eager"
                                  : "lazy"
                              }
                              className="
                                h-full
                                w-full

                                object-cover

                                transition-transform

                                duration-[1100ms]

                                ease-[cubic-bezier(0.16,1,0.3,1)]

                                group-hover:scale-[1.055]
                              "
                            />

                            {/* Image Overlay */}

                            <div
                              aria-hidden="true"
                              className="
                                pointer-events-none

                                absolute
                                inset-0

                                bg-gradient-to-t

                                from-black/35

                                via-black/[0.03]

                                to-transparent
                              "
                            />

                            {/* Project number */}

                            <span
                              className="
                                absolute

                                left-5
                                top-5

                                flex

                                h-9

                                min-w-9

                                items-center

                                justify-center

                                border

                                border-white/40

                                bg-white/90

                                px-2

                                text-[8px]

                                font-semibold

                                tracking-[0.18em]

                                text-[#111827]

                                shadow-sm

                                backdrop-blur-md
                              "
                            >
                              {String(
                                (
                                  pagination.currentPage -
                                  1
                                ) *
                                  pagination.perPage +
                                  index +
                                  1,
                              ).padStart(
                                2,
                                "0",
                              )}
                            </span>

                            {/* Top Arrow */}

                            <span
                              className="
                                absolute

                                right-5
                                top-5

                                flex

                                h-11
                                w-11

                                items-center

                                justify-center

                                border

                                border-white/40

                                bg-white/90

                                text-[#111827]

                                shadow-sm

                                backdrop-blur-md

                                transition-all

                                duration-400

                                group-hover:border-gold

                                group-hover:bg-gold

                                group-hover:text-white
                              "
                            >
                              <ArrowRight
                                size={
                                  19
                                }
                                strokeWidth={
                                  1.4
                                }
                                className="
                                  -rotate-45

                                  transition-transform

                                  duration-400

                                  group-hover:translate-x-0.5

                                  group-hover:-translate-y-0.5
                                "
                              />
                            </span>

                            {/* Hover Frame */}

                            <span
                              aria-hidden="true"
                              className="
                                pointer-events-none

                                absolute
                                inset-4

                                border

                                border-white/0

                                transition-all

                                duration-500

                                group-hover:border-white/30
                              "
                            />
                          </div>

                          {/* ================================= */}
                          {/* PROJECT CONTENT */}
                          {/* ================================= */}

                          <div
                            className="
                              relative

                              flex

                              min-h-[150px]

                              flex-col

                              bg-white

                              px-6
                              py-6

                              sm:px-7
                            "
                          >
                            <span
                              aria-hidden="true"
                              className="
                                mb-4

                                block

                                h-[2px]
                                w-8

                                bg-gold

                                transition-all

                                duration-500

                                group-hover:w-14
                              "
                            />

                            <h2
                              className="
                                font-serif

                                text-[clamp(1.5rem,2.2vw,1rem)]

                                font-semibold

                                leading-[1.15]

                                tracking-[-0.02em]

                                text-[#111827]

                                transition-colors

                                duration-400

                                group-hover:text-gold
                              "
                            >
                              {
                                project.title
                              }
                            </h2>

                            <div
                              className="
                                mt-auto

                                flex

                                items-center

                                justify-between
                              "
                            >
                              <span
                                className="
                                  text-[10px]

                                  font-bold

                                  uppercase

                                  tracking-[0.24em]

                                  text-gold
                                "
                              >
                                View
                                Project
                              </span>

                              <ArrowRight
                                size={
                                  18
                                }
                                strokeWidth={
                                  1.4
                                }
                                className="
                                  text-gold

                                  transition-transform

                                  duration-400

                                  group-hover:translate-x-1.5
                                "
                              />
                            </div>

                            {/* Bottom line */}

                            <span
                              aria-hidden="true"
                              className="
                                pointer-events-none

                                absolute

                                bottom-0
                                left-0

                                h-[2px]

                                w-0

                                bg-gold

                                transition-all

                                duration-500

                                group-hover:w-full
                              "
                            />
                          </div>
                        </Link>
                      </motion.article>
                    ),
                  )}
                </div>

                {/* ================================================= */}
                {/* PAGINATION */}
                {/* ================================================= */}

                {pagination.lastPage >
                  1 && (
                  <nav
                    aria-label="Project pagination"
                    className="
                      mt-14

                      flex
                      flex-wrap

                      items-center

                      justify-center

                      gap-2
                    "
                  >
                    {/* Previous */}

                    <button
                      type="button"
                      onClick={() =>
                        changePage(
                          pagination.currentPage -
                            1,
                        )
                      }
                      disabled={
                        loading ||
                        pagination.currentPage ===
                          1
                      }
                      className="
                        inline-flex

                        h-11

                        items-center

                        gap-2

                        border

                        border-black/10

                        bg-white

                        px-4

                        text-[9px]

                        font-semibold

                        uppercase

                        tracking-[0.18em]

                        text-[#4b5563]

                        transition-all

                        duration-300

                        hover:border-gold

                        hover:text-gold

                        disabled:cursor-not-allowed

                        disabled:opacity-30
                      "
                    >
                      <ArrowLeft
                        size={
                          15
                        }
                      />

                      Previous
                    </button>

                    {/* Page numbers */}

                    {visiblePages.map(
                      (
                        page,
                      ) => {
                        const isCurrent =
                          page ===
                          pagination.currentPage;

                        return (
                          <button
                            key={
                              page
                            }
                            type="button"
                            onClick={() =>
                              changePage(
                                page,
                              )
                            }
                            aria-current={
                              isCurrent
                                ? "page"
                                : undefined
                            }
                            className={`
                              flex
                              h-11
                              w-11

                              items-center

                              justify-center

                              border

                              text-[10px]

                              font-semibold

                              transition-all

                              duration-300

                              ${
                                isCurrent
                                  ? `
                                      border-gold
                                      bg-gold
                                      text-white
                                    `
                                  : `
                                      border-black/10
                                      bg-white
                                      text-[#4b5563]

                                      hover:border-gold

                                      hover:text-gold
                                    `
                              }
                            `}
                          >
                            {String(
                              page,
                            ).padStart(
                              2,
                              "0",
                            )}
                          </button>
                        );
                      },
                    )}

                    {/* Next */}

                    <button
                      type="button"
                      onClick={() =>
                        changePage(
                          pagination.currentPage +
                            1,
                        )
                      }
                      disabled={
                        loading ||
                        pagination.currentPage ===
                          pagination.lastPage
                      }
                      className="
                        inline-flex

                        h-11

                        items-center

                        gap-2

                        border

                        border-black/10

                        bg-white

                        px-4

                        text-[9px]

                        font-semibold

                        uppercase

                        tracking-[0.18em]

                        text-[#4b5563]

                        transition-all

                        duration-300

                        hover:border-gold

                        hover:text-gold

                        disabled:cursor-not-allowed

                        disabled:opacity-30
                      "
                    >
                      Next

                      <ArrowRight
                        size={
                          15
                        }
                      />
                    </button>
                  </nav>
                )}

                {/* ========================================= */}
                {/* PAGINATION INFO */}
                {/* ========================================= */}

                <p
                  className="
                    mt-5

                    text-center

                    text-[11px]

                    uppercase

                    tracking-[0.2em]

                    text-black
                  "
                >
                  Showing{" "}

                  {pagination.from ??
                    0}

                  –

                  {pagination.to ??
                    0}{" "}

                  of{" "}

                  {
                    pagination.total
                  }
                </p>
              </>
            )}
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   FALLBACK
========================================================= */

function ProductPageFallback() {
  return (
    <main
      className="
        flex

        min-h-screen

        items-center

        justify-center

        bg-white
      "
    >
      <div
        className="
          flex

          items-center

          gap-3

          text-gold
        "
      >
        <LoaderCircle
          size={22}
          className="
            animate-spin
          "
        />

        <span
          className="
            text-[10px]

            font-semibold

            uppercase

            tracking-[0.24em]
          "
        >
          Loading Projects
        </span>
      </div>
    </main>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function HomeProjects() {
  return (
    <Suspense
      fallback={
        <ProductPageFallback />
      }
    >
      <ProductProjectsContent />
    </Suspense>
  );
}