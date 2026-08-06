// "use client";

// import Image from "next/image";
// import { motion, useReducedMotion } from "framer-motion";
// import {
//   ArrowUpRight,
//   CalendarDays,
//   Clock3,
// } from "lucide-react";

// import blog1 from "../assets/blog1.webp";
// import blog2 from "../assets/blog2.webp";
// import blog3 from "../assets/blog3.webp";

// const posts = [
//   {
//     category: "Architecture Notes",
//     date: "14 June 2026",
//     readTime: "6 Min Read",
//     title: "Designing for Ahmedabad’s Light",
//     excerpt:
//       "How thoughtful orientation, shading and window placement create calm interiors while managing Ahmedabad’s intense sunlight.",
//     image: blog1,
//     href: "#",
//   },
//   {
//     category: "Material Journal",
//     date: "02 May 2026",
//     readTime: "4 Min Read",
//     title: "Materials We Keep Returning To",
//     excerpt:
//       "A considered selection of stone, timber and metal finishes that age naturally and bring lasting warmth to a space.",
//     image: blog2,
//     href: "#",
//   },
//   {
//     category: "Behind the Build",
//     date: "19 March 2026",
//     readTime: "7 Min Read",
//     title: "Inside the Vira Residence Build",
//     excerpt:
//       "A closer look at how one conversation shaped the planning, natural light and material language of an entire home.",
//     image: blog3,
//     href: "#",
//   },
// ];

// export default function Blog() {
//   const reduceMotion = useReducedMotion();

//   return (
//     <section
//       id="blog"
//       className="
//         relative overflow-hidden
//         bg-[#090908]
//         px-5 py-20
//         sm:px-8 sm:py-24
//         lg:px-[5vw] lg:py-[60px]
//       "
//     >
//       {/* Background details */}
//       <div
//         aria-hidden="true"
//         className="
//           pointer-events-none
//           absolute -left-48 top-1/3
//           h-[420px] w-[420px]
//           rounded-full
//           bg-[#b8863a]/[0.045]
//           blur-[150px]
//         "
//       />

//       <div
//         aria-hidden="true"
//         className="
//           pointer-events-none
//           absolute right-0 top-0
//           h-px w-[40%]
//           bg-gradient-to-l
//           from-[#b8863a]/50
//           to-transparent
//         "
//       />

//       <div className="relative z-10 mx-auto max-w-[1500px]">
//         {/* Heading */}
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: reduceMotion ? 0 : 25,
//           }}
//           whileInView={{
//             opacity: 1,
//             y: 0,
//           }}
//           viewport={{
//             once: true,
//             amount: 0.4,
//           }}
//           transition={{
//             duration: 0.8,
//             ease: [0.16, 1, 0.3, 1],
//           }}
//           className="
//             mb-12 flex
//             flex-col gap-6
//             md:mb-16
//             md:flex-row
//             md:items-end
//             md:justify-between
//           "
//         >
//           <div>
//             <div className="mb-5 flex items-center gap-4">
//               <span className="h-px w-10 bg-[#b8863a]" />

//               <span
//                 className="
//                   text-[9px] font-semibold
//                   uppercase tracking-[0.34em]
//                   text-[#e6c583]
//                 "
//               >
//                 The Journal
//               </span>
//             </div>

//             <h2
//               className="
//                 max-w-[720px]
//                 font-serif font-semibold uppercase
//                 text-[clamp(2rem,4vw,3.6rem)]
//                 leading-[1.06]
//                 tracking-[-0.025em]
//                 text-[#f3efe7]
//               "
//             >
//               Stories and ideas
//               <br />
//               from the{" "}
//               <em className="font-semibold italic text-[#e6c583]">
//                 studio.
//               </em>
//             </h2>
//           </div>

//           <p
//             className="
//               max-w-[360px]
//               text-[12px] leading-[1.85]
//               text-white/45
//               sm:text-[13px]
//             "
//           >
//             Notes on architecture, materials and the thoughtful
//             decisions behind meaningful spaces.
//           </p>
//         </motion.div>

//         {/* Blog cards */}
//         <div
//           className="
//             grid grid-cols-1 gap-8
//             md:grid-cols-2
//             xl:grid-cols-3
//           "
//         >
//           {posts.map((post, index) => (
//             <motion.article
//               key={post.title}
//               initial={{
//                 opacity: 0,
//                 y: reduceMotion ? 0 : 40,
//               }}
//               whileInView={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               viewport={{
//                 once: true,
//                 amount: 0.2,
//               }}
//               transition={{
//                 duration: 0.8,
//                 delay: index * 0.1,
//                 ease: [0.16, 1, 0.3, 1],
//               }}
//               className="
//                 group relative
//                 flex h-full flex-col
//                 overflow-hidden
//                 border border-white/10
//                 bg-[#0e0e0d]
//                 transition-all duration-500

//                 hover:-translate-y-1
//                 hover:border-[#b8863a]/40
//                 hover:shadow-[0_28px_80px_rgba(0,0,0,0.4)]
//               "
//             >
//               {/* Image */}
//               <div
//                 className="
//                   relative aspect-[16/11]
//                   overflow-hidden
//                   bg-[#15130f]
//                 "
//               >
//                 <Image
//                   src={post.image}
//                   alt={post.title}
//                   fill
//                   priority={index === 0}
//                   sizes="
//                     (max-width: 768px) 100vw,
//                     (max-width: 1280px) 50vw,
//                     33vw
//                   "
//                   className="
//                     object-cover
//                     transition-transform
//                     duration-[900ms]
//                     ease-[cubic-bezier(0.16,1,0.3,1)]

//                     group-hover:scale-[1.05]
//                   "
//                 />

//                 {/* Image overlay */}
//                 <div
//                   aria-hidden="true"
//                   className="
//                     pointer-events-none
//                     absolute inset-0
//                     bg-gradient-to-t
//                     from-black/70
//                     via-black/5
//                     to-black/15
//                   "
//                 />


//                 {/* Category */}
//                 <span
//                   className="
//                     absolute bottom-5 left-5
//                     bg-[#b8863a]
//                     px-4 py-2
//                     text-[8px] font-semibold
//                     uppercase tracking-[0.23em]
//                     text-[#080807]
//                   "
//                 >
//                   {post.category}
//                 </span>

//                 {/* Decorative corner */}
//                 <span
//                   aria-hidden="true"
//                   className="
//                     absolute left-5 top-5
//                     h-5 w-5
//                     border-l border-t
//                     border-[#e6c583]/70
//                     transition-all duration-500

//                     group-hover:h-8
//                     group-hover:w-8
//                   "
//                 />
//               </div>

//               {/* Content */}
//               <div
//                 className="
//                   relative flex flex-1
//                   flex-col
//                   p-6
//                 "
//               >
             

//                 {/* Title */}
//                 <h3
//                   className="
                 
//                     font-serif
//                     text-xl
//                     leading-[1.2]
//                     tracking-[-0.015em]
//                     text-[#f3efe7]
//                     transition-colors duration-400

//                     group-hover:text-[#e6c583]
//                   "
//                 >
//                   {post.title}
//                 </h3>

//                 {/* Description */}
//                 <p
//                   className="
//                     mt-4 flex-1
//                     text-[12px] leading-[1.85]
//                     text-white/45
//                     sm:text-[13px]
//                   "
//                 >
//                   {post.excerpt}
//                 </p>

//                 {/* Button */}
//                 <a
//                   href={post.href}
//                   className="
//                     mt-7 flex
//                     items-center justify-between
//                     border-t border-white/10
//                     pt-5
//                   "
//                 >
//                   <span
//                     className="
//                       text-[9px] font-semibold
//                       uppercase tracking-[0.26em]
//                       text-[#e6c583]
//                   "
//                   >
//                     Read Article
//                   </span>

//                   <span
//                     className="
//                       flex h-10 w-10
//                       items-center justify-center
//                       border border-white/15
//                       text-white/55
//                       transition-all duration-400

//                       group-hover:border-[#b8863a]
//                       group-hover:bg-[#b8863a]
//                       group-hover:text-[#080807]
//                     "
//                   >
//                     <ArrowUpRight
//                       size={16}
//                       className="
//                         transition-transform duration-400
//                         group-hover:-translate-y-0.5
//                         group-hover:translate-x-0.5
//                       "
//                     />
//                   </span>
//                 </a>
//               </div>

//               {/* Bottom gold detail */}
//               <span
//                 aria-hidden="true"
//                 className="
//                   pointer-events-none
//                   absolute bottom-0 left-0
//                   h-[2px] w-12
//                   bg-[#b8863a]
//                   transition-all duration-500

//                   group-hover:w-full
//                 "
//               />
//             </motion.article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

/* eslint-disable @next/next/no-img-element */
"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import {
  useHomeData,
} from "./HomeDataContext";

export default function Blog() {
  const reduceMotion = useReducedMotion();

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
        relative overflow-hidden
        bg-[#090908]
        px-5 py-20
        sm:px-8 sm:py-24
        lg:px-[5vw] lg:py-[60px]
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
          relative z-10 mx-auto
          max-w-[1500px]
        "
      >
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 25,
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
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mb-12 flex flex-col gap-6
            md:mb-16 md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-[#b8863a]" />

              <span
                className="
                  text-[9px] font-semibold
                  uppercase tracking-[0.34em]
                  text-[#e6c583]
                "
              >
                The Journal
              </span>
            </div>

            <h2
              className="
                max-w-[720px]
                font-serif font-semibold uppercase
                text-[clamp(2rem,4vw,3.6rem)]
                leading-[1.06]
                tracking-[-0.025em]
                text-[#f3efe7]
              "
            >
              Stories and ideas
              <br />
              from the{" "}
              <em
                className="
                  font-semibold italic
                  text-[#e6c583]
                "
              >
                studio.
              </em>
            </h2>
          </div>

          <p
            className="
              max-w-[360px]
              text-[12px] leading-[1.85]
              text-white/45
              sm:text-[13px]
            "
          >
            Notes on architecture, materials and the
            thoughtful decisions behind meaningful spaces.
          </p>
        </motion.div>

        {/* Loading */}
        {homeDataLoading && (
          <div
            aria-busy="true"
            aria-label="Loading blogs"
            className="
              grid grid-cols-1 gap-8
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {Array.from({ length: 3 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="
                    overflow-hidden
                    border border-white/10
                    bg-[#0e0e0d]
                  "
                >
                  <div
                    className="
                      aspect-[16/11]
                      animate-pulse
                      bg-white/[0.04]
                    "
                  />

                  <div className="p-6">
                    <div
                      className="
                        h-7 w-3/4
                        animate-pulse
                        bg-white/[0.05]
                      "
                    />

                    <div
                      className="
                        mt-4 h-16
                        animate-pulse
                        bg-white/[0.035]
                      "
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        )}

        {/* API error */}
        {!homeDataLoading && homeDataError && (
          <div
            role="alert"
            className="
              flex flex-col items-start
              justify-between gap-5
              border border-red-400/25
              bg-red-400/[0.06]
              px-6 py-5
              sm:flex-row sm:items-center
            "
          >
            <div>
              <p className="text-sm font-medium text-red-200">
                Unable to load blogs
              </p>

              <p className="mt-1 text-xs leading-6 text-white/55">
                {homeDataError}
              </p>
            </div>

            <button
              type="button"
              onClick={() => void retryHomeData()}
              className="
                shrink-0 border
                border-[#b8863a]/50
                px-5 py-2.5
                text-[10px] font-semibold
                uppercase tracking-[0.18em]
                text-[#e6c583]
                transition-colors duration-300
                hover:bg-[#b8863a]
                hover:text-[#090908]
              "
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty blogs */}
        {!homeDataLoading &&
          !homeDataError &&
          posts.length === 0 && (
            <div
              className="
                border border-white/10
                bg-[#0e0e0d]
                px-6 py-12 text-center
              "
            >
              <p className="text-sm text-white/50">
                No blogs are available for{" "}
                {activeCategory?.name ??
                  "this category"}.
              </p>
            </div>
          )}

        {/* Dynamic blog cards */}
        {!homeDataLoading &&
          !homeDataError &&
          posts.length > 0 && (
            <div
              className="
                grid grid-cols-1 gap-8
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {posts.map((post, index) => (
                <motion.article
                  key={`${post.slug}-${index}`}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 40,
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
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="
                    group relative
                    flex h-full flex-col
                    overflow-hidden
                    border border-white/10
                    bg-[#0e0e0d]
                    transition-all duration-500
                    hover:-translate-y-1
                    hover:border-[#b8863a]/40
                    hover:shadow-[0_28px_80px_rgba(0,0,0,0.4)]
                  "
                >
                  {/* API blog image */}
                  <div
                    className="
                      relative aspect-[16/11]
                      overflow-hidden
                      bg-[#15130f]
                    "
                  >
                    <img
                      src={post.image_url}
                      alt={post.title}
                      loading={
                        index === 0
                          ? "eager"
                          : "lazy"
                      }
                      className="
                        h-full w-full object-cover
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
                        uppercase tracking-[0.23em]
                        text-[#080807]
                      "
                    >
                      {activeCategory?.name ??
                        "Journal"}
                    </span>

                    <span
                      aria-hidden="true"
                      className="
                        absolute left-5 top-5
                        h-5 w-5
                        border-l border-t
                        border-[#e6c583]/70
                        transition-all duration-500
                        group-hover:h-8
                        group-hover:w-8
                      "
                    />
                  </div>

                  {/* API blog content */}
                  <div
                    className="
                      relative flex flex-1
                      flex-col p-6
                    "
                  >
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

                    <p
                      className="
                        mt-4 flex-1
                        text-[12px] leading-[1.85]
                        text-white/45
                        sm:text-[13px]
                      "
                    >
                      {post.description}
                    </p>

                    <a
                      href={`/blog-detail?slug=${encodeURIComponent(
                        post.slug,
                      )}`}
                      aria-label={`Read ${post.title}`}
                      className="
                        mt-7 flex items-center
                        justify-between
                        border-t border-white/10
                        pt-5
                      "
                    >
                      <span
                        className="
                          text-[9px] font-semibold
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
                          items-center justify-center
                          border border-white/15
                          text-white/55
                          transition-all duration-400
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
                    </a>
                  </div>

                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute bottom-0 left-0
                      h-[2px] w-12
                      bg-[#b8863a]
                      transition-all duration-500
                      group-hover:w-full
                    "
                  />
                </motion.article>
              ))}
            </div>
          )}
      </div>
    </section>
  );
}