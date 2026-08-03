"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import Breadcrumb from "../components/Breadcrumb";
import aboutBreadcrumb from "@/app/assets/banner1.png";

import blog1 from "@/app/assets/blog1.webp";
import blog2 from "@/app/assets/blog2.webp";
import blog3 from "@/app/assets/blog3.webp";

const relatedBlogs = [
  {
    id: 1,
    title: "Designing for Ahmedabad’s Light",
    image: blog1,
    href: "/blog/designing-for-ahmedabads-light",
  },
  {
    id: 2,
    title: "Materials We Keep Returning To",
    image: blog2,
    href: "/blog/materials-we-keep-returning-to",
  },
  {
    id: 3,
    title: "Creating Calm Through Interior Planning",
    image: blog3,
    href: "/blog/creating-calm-through-interior-planning",
  },
];

export default function BlogDetailPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-[#080807]">
      <Breadcrumb
        title="Blog Detail"
        backgroundImage={aboutBreadcrumb}
        imagePosition="center"
        items={[
          {
            label: "Blog",
            href: "/blog",
          },
          {
            label: "Inside the Vira Residence Build",
          },
        ]}
      />

      <section
        className="
          relative bg-[#080807]
          px-5 py-16
          sm:px-8 sm:py-20
          lg:px-[5vw] lg:py-[90px]
        "
      >
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-56 top-1/3
            h-[500px] w-[500px]
            rounded-full
            bg-[#b8863a]/[0.04]
            blur-[170px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute right-0 top-0
            h-px w-[42%]
            bg-gradient-to-l
            from-[#b8863a]/50
            to-transparent
          "
        />

        <div
          className="
            relative z-10
            mx-auto w-full max-w-[1500px]
          "
        >
          <div
            className="
              grid grid-cols-1 gap-12
              lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]
              lg:items-start
              lg:gap-10
              xl:gap-14
            "
          >
            {/* Left blog detail */}
            <motion.article
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: reduceMotion ? 0.1 : 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="min-w-0"
            >
              {/* Blog header */}
              <div className="mb-8">
                <h1
                  className="max-w-[980px] font-serif font-medium text-[clamp(2.4rem,5vw,3rem)] leading-[1.04] tracking-[-0.04em] text-[#f3efe7]">
                  Inside the Vira Residence Build
                </h1>

                <p
                  className="mt-6 max-w-[850px] text-[14px] leading-[1.9] text-white/48 sm:text-[15px]">
                  A closer look at how one conversation shaped
                  the planning, natural light and material
                  language of an entire home.
                </p>
              </div>

              {/* Main blog image */}
              <div
                className="relative aspect-[16/9] overflow-hidden bg-[#141310]">
                <Image
                  src={blog3}
                  alt="Inside the Vira Residence Build"
                  fill
                  priority
                  sizes="
                    (max-width: 1024px) 100vw,
                    66vw
                  "
                  className="object-cover transition-transform duration-[1200ms]
                    hover:scale-[1.025]"/>

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute inset-0
                    bg-gradient-to-t from-black/35 via-transparent to-black/10"/>

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute inset-5
                    border border-white/10
                  "
                />

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute left-0 top-0
                    h-16 w-16
                    border-l-2 border-t-2
                    border-[#b8863a]
                  "
                />
              </div>

              {/* Article content */}
              <div
                className="
                  mx-auto mt-10 max-w-[900px]
                  space-y-7
                "
              >
                <p
                  className="
                    text-[14px] leading-[2]
                    text-white/55
                    sm:text-[15px]
                  "
                >
                  The Vira Residence began with a simple
                  conversation about how a family wanted to
                  experience their home. Rather than starting
                  with a visual style, the design process began
                  by understanding daily routines, movement,
                  privacy, natural light and the relationship
                  between shared and personal spaces.
                </p>

                <p
                  className="
                    text-[14px] leading-[2]
                    text-white/55
                    sm:text-[15px]
                  "
                >
                  This early understanding became the foundation
                  of the entire project. The planning was
                  developed to create a natural flow between the
                  living, dining and outdoor areas while
                  maintaining calm, private zones for the family.
                  Each room was positioned to receive balanced
                  daylight without allowing Ahmedabad’s intense
                  sunlight to overwhelm the interiors.
                </p>

                <div
                  className="
                    relative my-10
                    border-l border-[#b8863a]
                    bg-white/[0.025]
                    px-5 py-5
                    
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      absolute -left-[5px] top-8
                      h-2 w-2 rotate-45
                      bg-[#b8863a]
                    "
                  />

                  <p
                    className="
                      font-serif
                      text-[clamp(1.35rem,2.5vw,1.3rem)]
                      italic leading-[1.55]
                      text-[#e6c583]
                    "
                  >
                    “The design was not shaped around a single
                    visual idea. It was shaped around the life
                    that would unfold within it.”
                  </p>
                </div>

                <h2
                  className="
                    pt-3
                    font-serif font-medium
                    text-[clamp(1.9rem,3vw,3rem)]
                    leading-[1.15]
                    tracking-[-0.025em]
                    text-[#f3efe7]
                  "
                >
                  Planning around everyday life
                </h2>

                <p
                  className="
                    text-[14px] leading-[2]
                    text-white/55
                    sm:text-[15px]
                  "
                >
                  The ground floor was designed as an open but layered environment. The living room, dining area and kitchen remain visually connected, while changes in ceiling height, materials and furniture placement give each zone its own identity. This allowed the home to feel spacious without becoming visually empty or disconnected.
                </p>

                <p
                  className="
                    text-[14px] leading-[2]
                    text-white/55
                    sm:text-[15px]
                  "
                >
                  Storage was integrated into the architectural language rather than treated as an additional element. Built-in cabinetry, concealed services and carefully planned circulation helped maintain clean visual lines while supporting practical everyday use.</p>

                {/* Secondary image */}
                <div
                  className="
                    relative my-10
                    aspect-[16/10]
                    overflow-hidden
                    bg-[#141310]
                  "
                >
                  <Image
                    src={blog1}
                    alt="Vira Residence interior detail"
                    fill
                    sizes="
                      (max-width: 1024px) 100vw,
                      66vw
                    "
                    className="object-cover"
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute inset-0
                      bg-gradient-to-t
                      from-black/25
                      to-transparent
                    "
                  />
                </div>

                <h2
                  className="
                    pt-3
                    font-serif font-medium
                    text-[clamp(1.9rem,3vw,3rem)]
                    leading-[1.15]
                    tracking-[-0.025em]
                    text-[#f3efe7]
                  "
                >
                  Light as a design material
                </h2>

                <p
                  className="
                    text-[14px] leading-[2]
                    text-white/55
                    sm:text-[15px]
                  "
                >
                  Natural light was treated as one of the primary materials of the residence. Deep overhangs, recessed windows and screened openings were used to filter direct sunlight while allowing softer daylight to move through the home throughout the day.</p>

                <p
                  className="
                    text-[14px] leading-[2]
                    text-white/55
                    sm:text-[15px]
                  "
                >
                  The material palette was intentionally restrained. Natural stone, warm timber, soft neutral fabrics and dark metal accents were selected to create contrast without visual noise. These materials were chosen not only for appearance, but also for the way they would age and develop character over time.
                </p>

                <h2
                  className="
                    pt-3
                    font-serif font-medium
                    text-[clamp(1.9rem,3vw,3rem)]
                    leading-[1.15]
                    tracking-[-0.025em]
                    text-[#f3efe7]
                  "
                >
                  A home that feels personal
                </h2>

                <p
                  className="
                    text-[14px] leading-[2]
                    text-white/55
                    sm:text-[15px]
                  "
                >
                  The final residence is refined but not formal.
                  Each space feels carefully considered while
                  remaining comfortable and natural. The design
                  does not compete with the people who live
                  there; instead, it provides a calm background
                  for everyday routines, celebrations and
                  changing family needs.
                </p>

                <p
                  className="
                    text-[14px] leading-[2]
                    text-white/55
                    sm:text-[15px]
                  "
                >
                  Vira Residence represents HPI Studio’s belief
                  that meaningful interiors begin with careful
                  listening. When planning, materials, light and
                  detail are shaped around real life, the
                  completed space feels personal rather than
                  imposed.
                </p>
              </div>

              {/* Share and navigation */}
              <div
                className="
                  mt-12 border-y
                  border-white/10
                  py-7
                "
              >
                <div
                  className="
                    flex flex-col gap-6
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="
                        text-[8px] font-semibold
                        uppercase tracking-[0.26em]
                        text-white/35
                      "
                    >
                      Share Article
                    </span>

                    <div className="flex items-center gap-2">
                      {[FaFacebookF, FaInstagram, FaLinkedinIn].map(
                        (Icon, index) => (
                          <a
                            key={index}
                            href="#"
                            aria-label="Share article"
                            className="
                              flex h-9 w-9
                              items-center justify-center
                              rounded-full
                              border border-white/15
                              text-white/45
                              transition-all duration-300

                              hover:border-[#b8863a]
                              hover:bg-[#b8863a]
                              hover:text-[#080807]
                            "
                          >
                            <Icon size={13} />
                          </a>
                        )
                      )}
                    </div>
                  </div>

                  <Link
                    href="/blog"
                    className="
                      inline-flex items-center gap-3
                      text-[9px] font-semibold
                      uppercase tracking-[0.24em]
                      text-[#e6c583]
                      transition-colors duration-300

                      hover:text-white
                    "
                  >
                    <FaArrowLeft size={12} />

                    Back to Blog
                  </Link>
                </div>
              </div>
            </motion.article>

            {/* Right related blogs */}
            <motion.aside
              initial={{
                opacity: 0,
                x: reduceMotion ? 0 : 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: reduceMotion ? 0.1 : 0.8,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                lg:sticky
                lg:top-[120px]
                lg:self-start
              "
            >
              <div
                className="
                  border border-white/10
                  bg-[#0d0d0c]
                  p-5
                  sm:p-6
                "
              >
                <div
                  className="
                    mb-7 flex
                    items-center justify-between
                    gap-5
                    border-b border-white/10
                    pb-5
                  "
                >
                  <div>
                    <span
                      className="
                        text-[8px] font-semibold
                        uppercase tracking-[0.28em]
                        text-[#b8863a]
                      "
                    >
                      Continue Reading
                    </span>

                    <h2
                      className="
                        mt-2 font-serif
                        text-2xl text-[#f3efe7]
                      "
                    >
                      Related Blogs
                    </h2>
                  </div>

                  <span
                    aria-hidden="true"
                    className="
                      h-2 w-2 rotate-45
                      bg-[#b8863a]
                    "
                  />
                </div>

                <div className="space-y-5">
                  {relatedBlogs.map((blog, index) => (
                    <Link
                      key={blog.id}
                      href={blog.href}
                      className="
                        group block
                        overflow-hidden
                        border border-white/10
                        bg-[#11100e]
                        transition-all duration-400

                        hover:-translate-y-1
                        hover:border-[#b8863a]/50
                        hover:shadow-[0_20px_55px_rgba(0,0,0,0.35)]
                      "
                    >
                      <div
                        className="
                          relative aspect-[16/9]
                          overflow-hidden
                          bg-[#15130f]
                        "
                      >
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          sizes="
                            (max-width: 1024px) 100vw,
                            33vw
                          "
                          className="
                            object-cover
                            transition-transform
                            duration-[800ms]

                            group-hover:scale-[1.06]
                          "
                        />

                        <div
                          aria-hidden="true"
                          className="
                            pointer-events-none
                            absolute inset-0
                            bg-gradient-to-t
                            from-black/70
                            via-transparent
                            to-black/10
                          "
                        />

                        <span
                          className="
                            absolute right-4 top-4
                            flex h-8 w-8
                            items-center justify-center
                            border border-white/20
                            bg-black/35
                            font-serif text-[11px]
                            text-white/65
                            backdrop-blur-md
                          "
                        >
                          0{index + 1}
                        </span>
                      </div>

                      <div className="p-5">
                        <h3
                          className="
                            font-serif text-[19px]
                            leading-[1.3]
                            text-[#f3efe7]
                            transition-colors duration-300

                            group-hover:text-[#e6c583]
                          "
                        >
                          {blog.title}
                        </h3>

                        <div
                          className="
                            mt-4 flex
                            items-center justify-between
                            border-t border-white/10
                            pt-4
                          "
                        >
                          <span
                            className="
                              text-[8px] font-semibold
                              uppercase tracking-[0.23em]
                              text-white/35
                              transition-colors duration-300

                              group-hover:text-[#e6c583]
                            "
                          >
                            Read Article
                          </span>

                          <FaArrowRight
                            size={13}
                            className="
                              text-[#b8863a]
                              transition-transform duration-300

                              group-hover:translate-x-1
                            "
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </main>
  );
}