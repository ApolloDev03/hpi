/* eslint-disable @next/next/no-img-element */

"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import axios from "axios";

import Link from "next/link";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

import Breadcrumb from "../components/Breadcrumb";

import aboutBreadcrumb from "@/app/assets/banner1.png";

import { apiUrl } from "../config";

/* =========================================================
   SETTINGS
========================================================= */

const POSTS_PER_PAGE = 6;

/* =========================================================
   BLOG TYPES
========================================================= */

type BlogItem = {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  image_url: string | null;
};

type BlogsApiResponse = {
  success: boolean;
  message: string;
  data: BlogItem[];
};

/* =========================================================
   API ERROR MESSAGE
========================================================= */

function getApiErrorMessage(
  error: unknown,
): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error &&
      error.message
      ? error.message
      : "Unable to load blogs.";
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
    "Unable to load blogs."
  );
}

/* =========================================================
   FORMAT BLOG DATE
========================================================= */

function formatBlogDate(
  dateValue: string,
): string {
  if (!dateValue) {
    return "";
  }

  const normalizedDate =
    dateValue.includes("T")
      ? dateValue
      : dateValue.replace(
          " ",
          "T",
        );

  const parsedDate =
    new Date(normalizedDate);

  if (
    Number.isNaN(
      parsedDate.getTime(),
    )
  ) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  ).format(parsedDate);
}

/* =========================================================
   BLOG PAGE
========================================================= */

export default function BlogPage() {
  const reduceMotion =
    useReducedMotion();

  const [
    blogs,
    setBlogs,
  ] =
    useState<BlogItem[]>(
      [],
    );

  const [
    currentPage,
    setCurrentPage,
  ] =
    useState(1);

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

  const abortControllerRef =
    useRef<AbortController | null>(
      null,
    );

  /* =======================================================
     FETCH BLOGS API
  ======================================================= */

  const fetchBlogs =
    useCallback(
      async (
        signal?: AbortSignal,
      ) => {
        setLoading(true);

        setErrorMessage("");

        try {
          const response =
            await axios.post<BlogsApiResponse>(
              `${apiUrl}/blogslist`,

              {},

              {
                signal,

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
            !Array.isArray(
              response.data.data,
            )
          ) {
            throw new Error(
              response.data.message ||
                "Invalid blogs response received.",
            );
          }

          const activeBlogs =
            response.data.data.filter(
              (blog) =>
                blog.status
                  ?.trim()
                  .toLowerCase() ===
                "active",
            );

          if (
            signal?.aborted
          ) {
            return;
          }

          setBlogs(
            activeBlogs,
          );

          setCurrentPage(
            1,
          );
        } catch (
          error: unknown
        ) {
          if (
            signal?.aborted ||
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

          setBlogs([]);

          setCurrentPage(
            1,
          );

          setErrorMessage(
            getApiErrorMessage(
              error,
            ),
          );
        } finally {
          if (
            !signal?.aborted
          ) {
            setLoading(
              false,
            );
          }
        }
      },
      [],
    );

  /* =======================================================
     INITIAL BLOG FETCH
  ======================================================= */

  useEffect(() => {
    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    void fetchBlogs(
      controller.signal,
    );

    return () => {
      controller.abort();
    };
  }, [fetchBlogs]);

  /* =======================================================
     TOTAL PAGES
  ======================================================= */

  const totalPages =
    Math.max(
      1,

      Math.ceil(
        blogs.length /
          POSTS_PER_PAGE,
      ),
    );

  /* =======================================================
     CURRENT POSTS
  ======================================================= */

  const currentPosts =
    useMemo(() => {
      const startIndex =
        (
          currentPage - 1
        ) *
        POSTS_PER_PAGE;

      return blogs.slice(
        startIndex,

        startIndex +
          POSTS_PER_PAGE,
      );
    }, [
      blogs,
      currentPage,
    ]);

  /* =======================================================
     VISIBLE PAGE NUMBERS
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

          currentPage -
            Math.floor(
              maxVisiblePages /
                2,
            ),
        );

      const endPage =
        Math.min(
          totalPages,

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
        pages.push(
          page,
        );
      }

      return pages;
    }, [
      currentPage,
      totalPages,
    ]);

  /* =======================================================
     PAGE CHANGE
  ======================================================= */

  const handlePageChange = (
    pageNumber: number,
  ) => {
    if (
      loading ||
      pageNumber < 1 ||
      pageNumber >
        totalPages ||
      pageNumber ===
        currentPage
    ) {
      return;
    }

    setCurrentPage(
      pageNumber,
    );

    window.requestAnimationFrame(
      () => {
        const blogSection =
          document.getElementById(
            "blog",
          );

        if (
          !blogSection
        ) {
          return;
        }

        const headerOffset =
          110;

        const sectionTop =
          blogSection
            .getBoundingClientRect()
            .top +
          window.scrollY -
          headerOffset;

        window.scrollTo({
          top:
            sectionTop,

          behavior:
            "smooth",
        });
      },
    );
  };

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
        title="Blog"
        backgroundImage={
          aboutBreadcrumb
        }
        imagePosition="center"
        items={[
          {
            label:
              "Blog",
          },
        ]}
      />

      {/* ================================================= */}
      {/* BLOG SECTION */}
      {/* ================================================= */}

      <section
        id="blog"
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
        {/* ================================================= */}
        {/* BACKGROUND DETAILS */}
        {/* ================================================= */}

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

            bg-gold/[0.045]

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

            from-gold/40

            to-transparent
          "
        />

        <div
          className="
            relative
            z-10

            mx-auto

            max-w-[1500px]
          "
        >
          {/* ============================================== */}
          {/* LOADING */}
          {/* ============================================== */}

          {loading && (
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
                length:
                  POSTS_PER_PAGE,
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
                        aspect-[16/11]

                        animate-pulse

                        bg-black/[0.04]
                      "
                    />

                    <div
                      className="
                        p-6
                      "
                    >
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

                      <div
                        className="
                          mt-7
                          h-11

                          animate-pulse

                          border-t

                          border-black/10

                          pt-5
                        "
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          )}

          {/* ============================================== */}
          {/* API ERROR */}
          {/* ============================================== */}

          {!loading &&
            errorMessage && (
              <div
                role="alert"
                className="
                  flex

                  min-h-[300px]

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
                    max-w-[560px]

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
                  onClick={() => {
                    abortControllerRef.current?.abort();

                    const controller =
                      new AbortController();

                    abortControllerRef.current =
                      controller;

                    void fetchBlogs(
                      controller.signal,
                    );
                  }}
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

          {/* ============================================== */}
          {/* EMPTY BLOGS */}
          {/* ============================================== */}

          {!loading &&
            !errorMessage &&
            blogs.length ===
              0 && (
              <div
                className="
                  flex

                  min-h-[300px]

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
                  No active blogs
                  are available.
                </p>
              </div>
            )}

          {/* ============================================== */}
          {/* DYNAMIC BLOG CARDS */}
          {/* ============================================== */}

          {!loading &&
            !errorMessage &&
            currentPosts.length >
              0 && (
              <AnimatePresence
                mode="wait"
                initial={
                  false
                }
              >
                <motion.div
                  key={`blog-page-${currentPage}`}
                  initial={{
                    opacity:
                      0,

                    y:
                      reduceMotion
                        ? 0
                        : 24,
                  }}
                  animate={{
                    opacity:
                      1,

                    y: 0,
                  }}
                  exit={{
                    opacity:
                      0,

                    y:
                      reduceMotion
                        ? 0
                        : -18,
                  }}
                  transition={{
                    duration:
                      reduceMotion
                        ? 0.1
                        : 0.5,

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

                    gap-8

                    md:grid-cols-2

                    xl:grid-cols-3
                  "
                >
                  {currentPosts.map(
                    (
                      post,
                      index,
                    ) => {
                      const detailUrl =
                        `/blog-detail?slug=${encodeURIComponent(
                          post.slug,
                        )}`;

                      const formattedDate =
                        formatBlogDate(
                          post.created_at,
                        );

                      return (
                        <motion.article
                          key={
                            post.id
                          }
                          initial={{
                            opacity:
                              0,

                            y:
                              reduceMotion
                                ? 0
                                : 35,
                          }}
                          animate={{
                            opacity:
                              1,

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
                                  0.07,

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

                            border-black/10

                            bg-white

                            shadow-[0_15px_45px_rgba(0,0,0,0.055)]

                            transition-all

                            duration-500

                            hover:-translate-y-1

                            hover:border-gold/40

                            hover:shadow-[0_28px_80px_rgba(17,94,40,0.10)]
                          "
                        >
                          {/* ================================= */}
                          {/* IMAGE */}
                          {/* ================================= */}

                          <Link
                            href={
                              detailUrl
                            }
                            className="
                              relative

                              block

                              aspect-[16/11]

                              overflow-hidden

                              bg-[#f3f4f6]
                            "
                            aria-label={`Read ${post.title}`}
                          >
                            {post.image_url ? (
                              <img
                                src={
                                  post.image_url
                                }
                                alt={
                                  post.title
                                }
                                loading={
                                  currentPage ===
                                    1 &&
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
                            ) : (
                              <div
                                className="
                                  flex
                                  h-full
                                  w-full

                                  items-center

                                  justify-center

                                  bg-[#f3f4f6]

                                  text-xs

                                  text-[#6b7280]
                                "
                              >
                                Image
                                unavailable
                              </div>
                            )}

                            {/* =============================== */}
                            {/* IMAGE OVERLAY */}
                            {/* =============================== */}

                            <div
                              aria-hidden="true"
                              className="
                                pointer-events-none

                                absolute
                                inset-0

                                bg-gradient-to-t

                                from-black/45

                                via-black/[0.03]

                                to-transparent
                              "
                            />

                            {/* =============================== */}
                            {/* BLOG LABEL */}
                            {/* =============================== */}

                            <span
                              className="
                                absolute

                                bottom-5
                                left-5

                                bg-gold

                                px-4
                                py-2

                                text-[8px]

                                font-semibold

                                uppercase

                                tracking-[0.23em]

                                text-white
                              "
                            >
                              Blog
                            </span>

                            {/* =============================== */}
                            {/* DATE */}
                            {/* =============================== */}

                            {formattedDate && (
                              <span
                                className="
                                  absolute

                                  bottom-5
                                  right-5

                                  bg-white/90

                                  px-3
                                  py-2

                                  text-[8px]

                                  font-semibold

                                  uppercase

                                  tracking-[0.16em]

                                  text-[#111827]

                                  shadow-sm

                                  backdrop-blur-sm
                                "
                              >
                                {
                                  formattedDate
                                }
                              </span>
                            )}

                            {/* =============================== */}
                            {/* DECORATIVE CORNER */}
                            {/* =============================== */}

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
                          </Link>

                          {/* ================================= */}
                          {/* BLOG CONTENT */}
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
                            <Link
                              href={
                                detailUrl
                              }
                            >
                              <h3
                                className="
                                  font-serif

                                  text-xl

                                  font-semibold

                                  leading-[1.2]

                                  tracking-[-0.015em]

                                  text-[#111827]

                                  transition-colors

                                  duration-400

                                  group-hover:text-gold
                                "
                              >
                                {
                                  post.title
                                }
                              </h3>
                            </Link>

                            {/* =============================== */}
                            {/* DESCRIPTION */}
                            {/* =============================== */}

                            {post.description && (
                              <p
                                className="
                                  mt-4

                                  flex-1

                                  text-[12px]

                                  leading-[1.85]

                                  text-black

                                  sm:text-[13px]
                                "
                              >
                                {post
                                  .description
                                  .length >
                                100
                                  ? `${post.description.slice(
                                      0,
                                      100,
                                    )}...`
                                  : post.description}
                              </p>
                            )}

                            {/* =============================== */}
                            {/* READ ARTICLE */}
                            {/* =============================== */}

                            <Link
                              href={
                                detailUrl
                              }
                              className="
                                mt-7

                                flex

                                items-center

                                justify-between

                                border-t

                                border-black/10

                                pt-5
                              "
                            >
                              <span
                                className="
                                  text-[10px]

                                  font-bold

                                  uppercase

                                  tracking-[0.26em]

                                  text-gold
                                "
                              >
                                Read
                                Article
                              </span>

                              <span
                                className="
                                  flex

                                  h-10
                                  w-10

                                  items-center

                                  justify-center

                                  border

                                  border-gold/30

                                  bg-white

                                  text-gold

                                  transition-all

                                  duration-400

                                  group-hover:border-gold

                                  group-hover:bg-gold

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
                            </Link>
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

                              bg-gold

                              transition-all

                              duration-500

                              group-hover:w-full
                            "
                          />
                        </motion.article>
                      );
                    },
                  )}
                </motion.div>
              </AnimatePresence>
            )}

          {/* ============================================== */}
          {/* CLIENT SIDE PAGINATION */}
          {/* ============================================== */}

          {!loading &&
            !errorMessage &&
            totalPages >
              1 && (
              <motion.nav
                initial={{
                  opacity:
                    0,

                  y:
                    reduceMotion
                      ? 0
                      : 20,
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
                    0.4,
                }}
                transition={{
                  duration:
                    0.7,
                }}
                aria-label="Blog pagination"
                className="
                  mt-14

                  flex
                  flex-col

                  gap-5

                  border-t

                  border-black/10

                  pt-8

                  sm:flex-row

                  sm:items-center

                  sm:justify-between
                "
              >
                {/* ========================================= */}
                {/* SHOWING */}
                {/* ========================================= */}

                <p
                  className="
                    text-[9px]

                    font-semibold

                    uppercase

                    tracking-[0.25em]

                    text-[#6b7280]
                  "
                >
                  Showing{" "}

                  <span
                    className="
                      text-gold
                    "
                  >
                    {(currentPage -
                      1) *
                      POSTS_PER_PAGE +
                      1}
                  </span>

                  –

                  <span
                    className="
                      text-gold
                    "
                  >
                    {Math.min(
                      currentPage *
                        POSTS_PER_PAGE,

                      blogs.length,
                    )}
                  </span>{" "}

                  of{" "}

                  <span
                    className="
                      text-[#111827]
                    "
                  >
                    {
                      blogs.length
                    }
                  </span>
                </p>

                {/* ========================================= */}
                {/* PAGINATION CONTROLS */}
                {/* ========================================= */}

                <div
                  className="
                    flex
                    flex-wrap

                    items-center

                    gap-2
                  "
                >
                  {/* ======================================= */}
                  {/* PREVIOUS */}
                  {/* ======================================= */}

                  <button
                    type="button"
                    onClick={() =>
                      handlePageChange(
                        currentPage -
                          1,
                      )
                    }
                    disabled={
                      currentPage ===
                      1
                    }
                    aria-label="Previous blog page"
                    className="
                      group

                      flex
                      h-11

                      items-center

                      gap-2

                      border

                      border-black/10

                      bg-white

                      px-4

                      text-[8px]

                      font-semibold

                      uppercase

                      tracking-[0.2em]

                      text-[#4b5563]

                      transition-all

                      duration-300

                      hover:border-gold

                      hover:bg-gold

                      hover:text-white

                      disabled:cursor-not-allowed

                      disabled:opacity-25

                      disabled:hover:border-black/10

                      disabled:hover:bg-white

                      disabled:hover:text-[#4b5563]
                    "
                  >
                    <ArrowLeft
                      size={
                        14
                      }
                      className="
                        transition-transform

                        duration-300

                        group-hover:-translate-x-1
                      "
                    />

                    <span
                      className="
                        hidden

                        sm:inline
                      "
                    >
                      Previous
                    </span>
                  </button>

                  {/* ======================================= */}
                  {/* PAGE NUMBERS */}
                  {/* ======================================= */}

                  {visiblePages.map(
                    (
                      pageNumber,
                    ) => {
                      const isActive =
                        currentPage ===
                        pageNumber;

                      return (
                        <button
                          key={
                            pageNumber
                          }
                          type="button"
                          onClick={() =>
                            handlePageChange(
                              pageNumber,
                            )
                          }
                          aria-label={`Go to blog page ${pageNumber}`}
                          aria-current={
                            isActive
                              ? "page"
                              : undefined
                          }
                          className={`
                            relative

                            flex
                            h-11
                            w-11

                            items-center

                            justify-center

                            overflow-hidden

                            border

                            font-serif

                            text-[13px]

                            transition-all

                            duration-300

                            ${
                              isActive
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
                            pageNumber,
                          ).padStart(
                            2,
                            "0",
                          )}

                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="
                                absolute

                                bottom-0
                                left-0

                                h-[2px]

                                w-full

                                bg-white/70
                              "
                            />
                          )}
                        </button>
                      );
                    },
                  )}

                  {/* ======================================= */}
                  {/* NEXT */}
                  {/* ======================================= */}

                  <button
                    type="button"
                    onClick={() =>
                      handlePageChange(
                        currentPage +
                          1,
                      )
                    }
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    aria-label="Next blog page"
                    className="
                      group

                      flex
                      h-11

                      items-center

                      gap-2

                      border

                      border-black/10

                      bg-white

                      px-4

                      text-[8px]

                      font-semibold

                      uppercase

                      tracking-[0.2em]

                      text-[#4b5563]

                      transition-all

                      duration-300

                      hover:border-gold

                      hover:bg-gold

                      hover:text-white

                      disabled:cursor-not-allowed

                      disabled:opacity-25

                      disabled:hover:border-black/10

                      disabled:hover:bg-white

                      disabled:hover:text-[#4b5563]
                    "
                  >
                    <span
                      className="
                        hidden

                        sm:inline
                      "
                    >
                      Next
                    </span>

                    <ArrowRight
                      size={
                        14
                      }
                      className="
                        transition-transform

                        duration-300

                        group-hover:translate-x-1
                      "
                    />
                  </button>
                </div>
              </motion.nav>
            )}
        </div>
      </section>
    </main>
  );
}