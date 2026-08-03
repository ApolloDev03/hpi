"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
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
} from "lucide-react";

import Breadcrumb from "../components/Breadcrumb";
import aboutBreadcrumb from "@/app/assets/banner1.png";

import blog1 from "../assets/blog1.webp";
import blog2 from "../assets/blog2.webp";
import blog3 from "../assets/blog3.webp";

const POSTS_PER_PAGE = 6;

const posts = [
  {
    id: 1,
    category: "Architecture Notes",
    date: "14 June 2026",
    readTime: "6 Min Read",
    title: "Designing for Ahmedabad’s Light",
    excerpt:
      "How thoughtful orientation, shading and window placement create calm interiors while managing Ahmedabad’s intense sunlight.",
    image: blog1,
    href:"/blog-detail",
  },
  {
    id: 2,
    category: "Material Journal",
    date: "02 May 2026",
    readTime: "4 Min Read",
    title: "Materials We Keep Returning To",
    excerpt:
      "A considered selection of stone, timber and metal finishes that age naturally and bring lasting warmth to a space.",
    image: blog2,
    href:"/blog-detail",
  },
  {
    id: 3,
    category: "Behind the Build",
    date: "19 March 2026",
    readTime: "7 Min Read",
    title: "Inside the Vira Residence Build",
    excerpt:
      "A closer look at how one conversation shaped the planning, natural light and material language of an entire home.",
    image: blog3,
    href:"/blog-detail",
  },
  {
    id: 4,
    category: "Design Process",
    date: "08 March 2026",
    readTime: "5 Min Read",
    title: "From First Sketch to Finished Space",
    excerpt:
      "An inside view of how early conversations, planning and material decisions gradually develop into a complete interior.",
    image: blog1,
    href:"/blog-detail",
  },
  {
    id: 5,
    category: "Interior Notes",
    date: "21 February 2026",
    readTime: "4 Min Read",
    title: "Creating Calm Through Interior Planning",
    excerpt:
      "How thoughtful circulation, visual balance and purposeful furniture placement can create interiors that feel naturally calm.",
    image: blog2,
    href:"/blog-detail",
  },
  {
    id: 6,
    category: "Studio Journal",
    date: "10 February 2026",
    readTime: "6 Min Read",
    title: "Why Details Define the Experience",
    excerpt:
      "A study of the small architectural and interior details that quietly influence how a space looks, feels and functions.",
    image: blog3,
    href:"/blog-detail",
  },
  {
    id: 7,
    category: "Architecture Notes",
    date: "25 January 2026",
    readTime: "5 Min Read",
    title: "The Role of Natural Light in Modern Homes",
    excerpt:
      "Exploring how openings, orientation and layered shading help natural light become an essential part of everyday living.",
    image: blog1,
    href:"/blog-detail",
  },
  {
    id: 8,
    category: "Material Journal",
    date: "12 January 2026",
    readTime: "4 Min Read",
    title: "Stone, Timber and the Beauty of Ageing",
    excerpt:
      "Why natural materials remain central to interiors designed to feel warm, authentic and visually balanced over time.",
    image: blog2,
    href:"/blog-detail",
  },
  {
    id: 9,
    category: "Behind the Build",
    date: "02 January 2026",
    readTime: "7 Min Read",
    title: "Planning a Home Around Everyday Routines",
    excerpt:
      "A practical look at how daily habits and family routines influence room planning, circulation, storage and comfort.",
    image: blog3,
    href:"/blog-detail",
  },
];

export default function BlogPage() {
  const reduceMotion = useReducedMotion();

  const [currentPage, setCurrentPage] =
    useState(1);

  const totalPages = Math.ceil(
    posts.length / POSTS_PER_PAGE
  );

  const currentPosts = useMemo(() => {
    const startIndex =
      (currentPage - 1) * POSTS_PER_PAGE;

    return posts.slice(
      startIndex,
      startIndex + POSTS_PER_PAGE
    );
  }, [currentPage]);

  const handlePageChange = (
    pageNumber: number
  ) => {
    if (
      pageNumber < 1 ||
      pageNumber > totalPages ||
      pageNumber === currentPage
    ) {
      return;
    }

    setCurrentPage(pageNumber);

    window.requestAnimationFrame(() => {
      const blogSection =
        document.getElementById("blog");

      if (!blogSection) return;

      const headerOffset = 110;

      const sectionTop =
        blogSection.getBoundingClientRect()
          .top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    });
  };

  return (
    <main
      className="
        overflow-hidden
        bg-[#080807]
      "
    >
      <Breadcrumb
        title="Blog"
        backgroundImage={aboutBreadcrumb}
        imagePosition="center"
        items={[
          {
            label: "Blog",
          },
        ]}
      />

      <section
        id="blog"
        className="
          relative overflow-hidden
          bg-[#090908]
          px-5 py-20

          sm:px-8
          sm:py-24

          lg:px-[5vw]
          lg:py-[60px]
        "
      >
        {/* Background details */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-48 top-1/3
            h-[420px] w-[420px]
            rounded-full
            bg-[#b8863a]/[0.045]
            blur-[150px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute right-0 top-0
            h-px w-[40%]
            bg-gradient-to-l
            from-[#b8863a]/50
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
          {/* Blog cards */}
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.div
              key={`blog-page-${currentPage}`}
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: reduceMotion ? 0 : -18,
              }}
              transition={{
                duration: reduceMotion
                  ? 0.1
                  : 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                grid grid-cols-1 gap-8
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {currentPosts.map(
                (post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{
                      opacity: 0,
                      y: reduceMotion
                        ? 0
                        : 35,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: reduceMotion
                        ? 0.1
                        : 0.65,
                      delay: reduceMotion
                        ? 0
                        : index * 0.07,
                      ease: [
                        0.16, 1, 0.3, 1,
                      ],
                    }}
                    className="
                      group relative
                      flex h-full flex-col
                      overflow-hidden
                      border border-white/10
                      bg-[#0e0e0d]
                      transition-all
                      duration-500

                      hover:-translate-y-1
                      hover:border-[#b8863a]/40
                      hover:shadow-[0_28px_80px_rgba(0,0,0,0.4)]
                    "
                  >
                    {/* Image */}
                    <Link
                      href={post.href}
                      className="
                        relative block
                        aspect-[16/11]
                        overflow-hidden
                        bg-[#15130f]
                      "
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        priority={
                          currentPage === 1 &&
                          index === 0
                        }
                        sizes="
                          (max-width: 768px) 100vw,
                          (max-width: 1280px) 50vw,
                          33vw
                        "
                        className="
                          object-cover
                          transition-transform
                          duration-[900ms]
                          ease-[cubic-bezier(0.16,1,0.3,1)]

                          group-hover:scale-[1.05]
                        "
                      />

                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute inset-0
                          bg-gradient-to-t
                          from-black/70
                          via-black/5
                          to-black/15
                        "
                      />

                      <span
                        className="
                          absolute bottom-5 left-5
                          bg-[#b8863a]
                          px-4 py-2
                          text-[8px] font-semibold
                          uppercase
                          tracking-[0.23em]
                          text-[#080807]
                        "
                      >
                        {post.category}
                      </span>

                      <span
                        aria-hidden="true"
                        className="
                          absolute left-5 top-5
                          h-5 w-5
                          border-l border-t
                          border-[#e6c583]/70
                          transition-all
                          duration-500

                          group-hover:h-8
                          group-hover:w-8
                        "
                      />
                    </Link>

                    {/* Content */}
                    <div
                      className="
                        relative flex flex-1
                        flex-col p-6
                      "
                    >
                      <Link href={post.href}>
                        <h3
                          className="
                            font-serif text-xl
                            leading-[1.2]
                            tracking-[-0.015em]
                            text-[#f3efe7]
                            transition-colors
                            duration-400

                            group-hover:text-[#e6c583]
                          "
                        >
                          {post.title}
                        </h3>
                      </Link>

                      <p
                        className="
                          mt-4 flex-1
                          text-[12px]
                          leading-[1.85]
                          text-white/45

                          sm:text-[13px]
                        "
                      >
                        {post.excerpt}
                      </p>

                      <Link
                        href={post.href}
                        className="
                          mt-7 flex
                          items-center
                          justify-between
                          border-t
                          border-white/10
                          pt-5
                        "
                      >
                        <span
                          className="
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.26em]
                            text-[#e6c583]
                          "
                        >
                          Read Article
                        </span>

                        <span
                          className="
                            flex h-10 w-10
                            items-center
                            justify-center
                            border
                            border-white/15
                            text-white/55
                            transition-all
                            duration-400

                            group-hover:border-[#b8863a]
                            group-hover:bg-[#b8863a]
                            group-hover:text-[#080807]
                          "
                        >
                          <ArrowUpRight
                            size={16}
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

                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute bottom-0 left-0
                        h-[2px] w-12
                        bg-[#b8863a]
                        transition-all
                        duration-500

                        group-hover:w-full
                      "
                    />
                  </motion.article>
                )
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.nav
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 20,
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
                duration: 0.7,
              }}
              aria-label="Blog pagination"
              className="
                mt-14 flex
                flex-col gap-5
                border-t
                border-white/10
                pt-8

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              {/* Page information */}
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-white/35
                "
              >
                {/* Page{" "}
                <span className="text-[#e6c583]">
                  {String(
                    currentPage
                  ).padStart(2, "0")}
                </span>{" "}
                of{" "}
                <span className="text-white/60">
                  {String(
                    totalPages
                  ).padStart(2, "0")}
                </span> */}
              </p>

              <div
                className="
                  flex flex-wrap
                  items-center gap-2
                "
              >
                {/* Previous */}
                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(
                      currentPage - 1
                    )
                  }
                  disabled={currentPage === 1}
                  aria-label="Previous blog page"
                  className="
                    group flex h-11
                    items-center gap-2
                    border border-white/15
                    px-4
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-white/55
                    transition-all
                    duration-300

                    hover:border-[#b8863a]
                    hover:bg-[#b8863a]
                    hover:text-[#080807]

                    disabled:cursor-not-allowed
                    disabled:opacity-25
                    disabled:hover:border-white/15
                    disabled:hover:bg-transparent
                    disabled:hover:text-white/55
                  "
                >
                  <ArrowLeft
                    size={14}
                    className="
                      transition-transform
                      duration-300

                      group-hover:-translate-x-1
                    "
                  />

                  <span
                    className="
                      hidden sm:inline
                    "
                  >
                    Previous
                  </span>
                </button>

                {/* Page numbers */}
                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) => {
                    const pageNumber =
                      index + 1;

                    const isActive =
                      currentPage ===
                      pageNumber;

                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() =>
                          handlePageChange(
                            pageNumber
                          )
                        }
                        aria-label={`Go to blog page ${pageNumber}`}
                        aria-current={
                          isActive
                            ? "page"
                            : undefined
                        }
                        className={`
                          relative flex
                          h-11 w-11
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
                                border-[#b8863a]
                                bg-[#b8863a]
                                text-[#080807]
                              `
                              : `
                                border-white/15
                                text-white/55
                                hover:border-[#b8863a]
                                hover:text-[#e6c583]
                              `
                          }
                        `}
                      >
                        {String(
                          pageNumber
                        ).padStart(
                          2,
                          "0"
                        )}

                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="
                              absolute bottom-0
                              left-0 h-[2px]
                              w-full
                              bg-[#f3d28d]
                            "
                          />
                        )}
                      </button>
                    );
                  }
                )}

                {/* Next */}
                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  aria-label="Next blog page"
                  className="
                    group flex h-11
                    items-center gap-2
                    border border-white/15
                    px-4
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-white/55
                    transition-all
                    duration-300

                    hover:border-[#b8863a]
                    hover:bg-[#b8863a]
                    hover:text-[#080807]

                    disabled:cursor-not-allowed
                    disabled:opacity-25
                    disabled:hover:border-white/15
                    disabled:hover:bg-transparent
                    disabled:hover:text-white/55
                  "
                >
                  <span
                    className="
                      hidden sm:inline
                    "
                  >
                    Next
                  </span>

                  <ArrowRight
                    size={14}
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