// // "use client";

// // import { useMemo, useState } from "react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import {
// //   AnimatePresence,
// //   motion,
// //   useReducedMotion,
// // } from "framer-motion";
// // import {
// //   ArrowLeft,
// //   ArrowRight,
// //   ArrowUpRight,
// // } from "lucide-react";

// // import Breadcrumb from "../components/Breadcrumb";
// // import aboutBreadcrumb from "@/app/assets/banner1.png";

// // import blog1 from "../assets/blog1.webp";
// // import blog2 from "../assets/blog2.webp";
// // import blog3 from "../assets/blog3.webp";

// // const POSTS_PER_PAGE = 6;

// // const posts = [
// //   {
// //     id: 1,
// //     category: "Architecture Notes",
// //     date: "14 June 2026",
// //     readTime: "6 Min Read",
// //     title: "Designing for Ahmedabad’s Light",
// //     excerpt:
// //       "How thoughtful orientation, shading and window placement create calm interiors while managing Ahmedabad’s intense sunlight.",
// //     image: blog1,
// //     href:"/blog-detail",
// //   },
// //   {
// //     id: 2,
// //     category: "Material Journal",
// //     date: "02 May 2026",
// //     readTime: "4 Min Read",
// //     title: "Materials We Keep Returning To",
// //     excerpt:
// //       "A considered selection of stone, timber and metal finishes that age naturally and bring lasting warmth to a space.",
// //     image: blog2,
// //     href:"/blog-detail",
// //   },
// //   {
// //     id: 3,
// //     category: "Behind the Build",
// //     date: "19 March 2026",
// //     readTime: "7 Min Read",
// //     title: "Inside the Vira Residence Build",
// //     excerpt:
// //       "A closer look at how one conversation shaped the planning, natural light and material language of an entire home.",
// //     image: blog3,
// //     href:"/blog-detail",
// //   },
// //   {
// //     id: 4,
// //     category: "Design Process",
// //     date: "08 March 2026",
// //     readTime: "5 Min Read",
// //     title: "From First Sketch to Finished Space",
// //     excerpt:
// //       "An inside view of how early conversations, planning and material decisions gradually develop into a complete interior.",
// //     image: blog1,
// //     href:"/blog-detail",
// //   },
// //   {
// //     id: 5,
// //     category: "Interior Notes",
// //     date: "21 February 2026",
// //     readTime: "4 Min Read",
// //     title: "Creating Calm Through Interior Planning",
// //     excerpt:
// //       "How thoughtful circulation, visual balance and purposeful furniture placement can create interiors that feel naturally calm.",
// //     image: blog2,
// //     href:"/blog-detail",
// //   },
// //   {
// //     id: 6,
// //     category: "Studio Journal",
// //     date: "10 February 2026",
// //     readTime: "6 Min Read",
// //     title: "Why Details Define the Experience",
// //     excerpt:
// //       "A study of the small architectural and interior details that quietly influence how a space looks, feels and functions.",
// //     image: blog3,
// //     href:"/blog-detail",
// //   },
// //   {
// //     id: 7,
// //     category: "Architecture Notes",
// //     date: "25 January 2026",
// //     readTime: "5 Min Read",
// //     title: "The Role of Natural Light in Modern Homes",
// //     excerpt:
// //       "Exploring how openings, orientation and layered shading help natural light become an essential part of everyday living.",
// //     image: blog1,
// //     href:"/blog-detail",
// //   },
// //   {
// //     id: 8,
// //     category: "Material Journal",
// //     date: "12 January 2026",
// //     readTime: "4 Min Read",
// //     title: "Stone, Timber and the Beauty of Ageing",
// //     excerpt:
// //       "Why natural materials remain central to interiors designed to feel warm, authentic and visually balanced over time.",
// //     image: blog2,
// //     href:"/blog-detail",
// //   },
// //   {
// //     id: 9,
// //     category: "Behind the Build",
// //     date: "02 January 2026",
// //     readTime: "7 Min Read",
// //     title: "Planning a Home Around Everyday Routines",
// //     excerpt:
// //       "A practical look at how daily habits and family routines influence room planning, circulation, storage and comfort.",
// //     image: blog3,
// //     href:"/blog-detail",
// //   },
// // ];

// // export default function BlogPage() {
// //   const reduceMotion = useReducedMotion();

// //   const [currentPage, setCurrentPage] =
// //     useState(1);

// //   const totalPages = Math.ceil(
// //     posts.length / POSTS_PER_PAGE
// //   );

// //   const currentPosts = useMemo(() => {
// //     const startIndex =
// //       (currentPage - 1) * POSTS_PER_PAGE;

// //     return posts.slice(
// //       startIndex,
// //       startIndex + POSTS_PER_PAGE
// //     );
// //   }, [currentPage]);

// //   const handlePageChange = (
// //     pageNumber: number
// //   ) => {
// //     if (
// //       pageNumber < 1 ||
// //       pageNumber > totalPages ||
// //       pageNumber === currentPage
// //     ) {
// //       return;
// //     }

// //     setCurrentPage(pageNumber);

// //     window.requestAnimationFrame(() => {
// //       const blogSection =
// //         document.getElementById("blog");

// //       if (!blogSection) return;

// //       const headerOffset = 110;

// //       const sectionTop =
// //         blogSection.getBoundingClientRect()
// //           .top +
// //         window.scrollY -
// //         headerOffset;

// //       window.scrollTo({
// //         top: sectionTop,
// //         behavior: "smooth",
// //       });
// //     });
// //   };

// //   return (
// //     <main
// //       className="
// //         overflow-hidden
// //         bg-[#080807]
// //       "
// //     >
// //       <Breadcrumb
// //         title="Blog"
// //         backgroundImage={aboutBreadcrumb}
// //         imagePosition="center"
// //         items={[
// //           {
// //             label: "Blog",
// //           },
// //         ]}
// //       />

// //       <section
// //         id="blog"
// //         className="
// //           relative overflow-hidden
// //           bg-[#090908]
// //           px-5 py-20

// //           sm:px-8
// //           sm:py-24

// //           lg:px-[5vw]
// //           lg:py-[60px]
// //         "
// //       >
// //         {/* Background details */}
// //         <div
// //           aria-hidden="true"
// //           className="
// //             pointer-events-none
// //             absolute -left-48 top-1/3
// //             h-[420px] w-[420px]
// //             rounded-full
// //             bg-[#b8863a]/[0.045]
// //             blur-[150px]
// //           "
// //         />

// //         <div
// //           aria-hidden="true"
// //           className="
// //             pointer-events-none
// //             absolute right-0 top-0
// //             h-px w-[40%]
// //             bg-gradient-to-l
// //             from-[#b8863a]/50
// //             to-transparent
// //           "
// //         />

// //         <div
// //           className="
// //             relative z-10
// //             mx-auto
// //             max-w-[1500px]
// //           "
// //         >
// //           {/* Blog cards */}
// //           <AnimatePresence
// //             mode="wait"
// //             initial={false}
// //           >
// //             <motion.div
// //               key={`blog-page-${currentPage}`}
// //               initial={{
// //                 opacity: 0,
// //                 y: reduceMotion ? 0 : 24,
// //               }}
// //               animate={{
// //                 opacity: 1,
// //                 y: 0,
// //               }}
// //               exit={{
// //                 opacity: 0,
// //                 y: reduceMotion ? 0 : -18,
// //               }}
// //               transition={{
// //                 duration: reduceMotion
// //                   ? 0.1
// //                   : 0.5,
// //                 ease: [0.16, 1, 0.3, 1],
// //               }}
// //               className="
// //                 grid grid-cols-1 gap-8
// //                 md:grid-cols-2
// //                 xl:grid-cols-3
// //               "
// //             >
// //               {currentPosts.map(
// //                 (post, index) => (
// //                   <motion.article
// //                     key={post.id}
// //                     initial={{
// //                       opacity: 0,
// //                       y: reduceMotion
// //                         ? 0
// //                         : 35,
// //                     }}
// //                     animate={{
// //                       opacity: 1,
// //                       y: 0,
// //                     }}
// //                     transition={{
// //                       duration: reduceMotion
// //                         ? 0.1
// //                         : 0.65,
// //                       delay: reduceMotion
// //                         ? 0
// //                         : index * 0.07,
// //                       ease: [
// //                         0.16, 1, 0.3, 1,
// //                       ],
// //                     }}
// //                     className="
// //                       group relative
// //                       flex h-full flex-col
// //                       overflow-hidden
// //                       border border-white/10
// //                       bg-[#0e0e0d]
// //                       transition-all
// //                       duration-500

// //                       hover:-translate-y-1
// //                       hover:border-[#b8863a]/40
// //                       hover:shadow-[0_28px_80px_rgba(0,0,0,0.4)]
// //                     "
// //                   >
// //                     {/* Image */}
// //                     <Link
// //                       href={post.href}
// //                       className="
// //                         relative block
// //                         aspect-[16/11]
// //                         overflow-hidden
// //                         bg-[#15130f]
// //                       "
// //                     >
// //                       <Image
// //                         src={post.image}
// //                         alt={post.title}
// //                         fill
// //                         priority={
// //                           currentPage === 1 &&
// //                           index === 0
// //                         }
// //                         sizes="
// //                           (max-width: 768px) 100vw,
// //                           (max-width: 1280px) 50vw,
// //                           33vw
// //                         "
// //                         className="
// //                           object-cover
// //                           transition-transform
// //                           duration-[900ms]
// //                           ease-[cubic-bezier(0.16,1,0.3,1)]

// //                           group-hover:scale-[1.05]
// //                         "
// //                       />

// //                       <div
// //                         aria-hidden="true"
// //                         className="
// //                           pointer-events-none
// //                           absolute inset-0
// //                           bg-gradient-to-t
// //                           from-black/70
// //                           via-black/5
// //                           to-black/15
// //                         "
// //                       />

// //                       <span
// //                         className="
// //                           absolute bottom-5 left-5
// //                           bg-[#b8863a]
// //                           px-4 py-2
// //                           text-[8px] font-semibold
// //                           uppercase
// //                           tracking-[0.23em]
// //                           text-[#080807]
// //                         "
// //                       >
// //                         {post.category}
// //                       </span>

// //                       <span
// //                         aria-hidden="true"
// //                         className="
// //                           absolute left-5 top-5
// //                           h-5 w-5
// //                           border-l border-t
// //                           border-[#e6c583]/70
// //                           transition-all
// //                           duration-500

// //                           group-hover:h-8
// //                           group-hover:w-8
// //                         "
// //                       />
// //                     </Link>

// //                     {/* Content */}
// //                     <div
// //                       className="
// //                         relative flex flex-1
// //                         flex-col p-6
// //                       "
// //                     >
// //                       <Link href={post.href}>
// //                         <h3
// //                           className="
// //                             font-serif text-xl
// //                             leading-[1.2]
// //                             tracking-[-0.015em]
// //                             text-[#f3efe7]
// //                             transition-colors
// //                             duration-400

// //                             group-hover:text-[#e6c583]
// //                           "
// //                         >
// //                           {post.title}
// //                         </h3>
// //                       </Link>

// //                       <p
// //                         className="
// //                           mt-4 flex-1
// //                           text-[12px]
// //                           leading-[1.85]
// //                           text-white/45

// //                           sm:text-[13px]
// //                         "
// //                       >
// //                         {post.excerpt}
// //                       </p>

// //                       <Link
// //                         href={post.href}
// //                         className="
// //                           mt-7 flex
// //                           items-center
// //                           justify-between
// //                           border-t
// //                           border-white/10
// //                           pt-5
// //                         "
// //                       >
// //                         <span
// //                           className="
// //                             text-[9px]
// //                             font-semibold
// //                             uppercase
// //                             tracking-[0.26em]
// //                             text-[#e6c583]
// //                           "
// //                         >
// //                           Read Article
// //                         </span>

// //                         <span
// //                           className="
// //                             flex h-10 w-10
// //                             items-center
// //                             justify-center
// //                             border
// //                             border-white/15
// //                             text-white/55
// //                             transition-all
// //                             duration-400

// //                             group-hover:border-[#b8863a]
// //                             group-hover:bg-[#b8863a]
// //                             group-hover:text-[#080807]
// //                           "
// //                         >
// //                           <ArrowUpRight
// //                             size={16}
// //                             className="
// //                               transition-transform
// //                               duration-400

// //                               group-hover:-translate-y-0.5
// //                               group-hover:translate-x-0.5
// //                             "
// //                           />
// //                         </span>
// //                       </Link>
// //                     </div>

// //                     <span
// //                       aria-hidden="true"
// //                       className="
// //                         pointer-events-none
// //                         absolute bottom-0 left-0
// //                         h-[2px] w-12
// //                         bg-[#b8863a]
// //                         transition-all
// //                         duration-500

// //                         group-hover:w-full
// //                       "
// //                     />
// //                   </motion.article>
// //                 )
// //               )}
// //             </motion.div>
// //           </AnimatePresence>

// //           {/* Pagination */}
// //           {totalPages > 1 && (
// //             <motion.nav
// //               initial={{
// //                 opacity: 0,
// //                 y: reduceMotion ? 0 : 20,
// //               }}
// //               whileInView={{
// //                 opacity: 1,
// //                 y: 0,
// //               }}
// //               viewport={{
// //                 once: true,
// //                 amount: 0.4,
// //               }}
// //               transition={{
// //                 duration: 0.7,
// //               }}
// //               aria-label="Blog pagination"
// //               className="
// //                 mt-14 flex
// //                 flex-col gap-5
// //                 border-t
// //                 border-white/10
// //                 pt-8

// //                 sm:flex-row
// //                 sm:items-center
// //                 sm:justify-between
// //               "
// //             >
// //               {/* Page information */}
// //               <p
// //                 className="
// //                   text-[9px]
// //                   font-semibold
// //                   uppercase
// //                   tracking-[0.25em]
// //                   text-white/35
// //                 "
// //               >
// //                 {/* Page{" "}
// //                 <span className="text-[#e6c583]">
// //                   {String(
// //                     currentPage
// //                   ).padStart(2, "0")}
// //                 </span>{" "}
// //                 of{" "}
// //                 <span className="text-white/60">
// //                   {String(
// //                     totalPages
// //                   ).padStart(2, "0")}
// //                 </span> */}
// //               </p>

// //               <div
// //                 className="
// //                   flex flex-wrap
// //                   items-center gap-2
// //                 "
// //               >
// //                 {/* Previous */}
// //                 <button
// //                   type="button"
// //                   onClick={() =>
// //                     handlePageChange(
// //                       currentPage - 1
// //                     )
// //                   }
// //                   disabled={currentPage === 1}
// //                   aria-label="Previous blog page"
// //                   className="
// //                     group flex h-11
// //                     items-center gap-2
// //                     border border-white/15
// //                     px-4
// //                     text-[8px]
// //                     font-semibold
// //                     uppercase
// //                     tracking-[0.2em]
// //                     text-white/55
// //                     transition-all
// //                     duration-300

// //                     hover:border-[#b8863a]
// //                     hover:bg-[#b8863a]
// //                     hover:text-[#080807]

// //                     disabled:cursor-not-allowed
// //                     disabled:opacity-25
// //                     disabled:hover:border-white/15
// //                     disabled:hover:bg-transparent
// //                     disabled:hover:text-white/55
// //                   "
// //                 >
// //                   <ArrowLeft
// //                     size={14}
// //                     className="
// //                       transition-transform
// //                       duration-300

// //                       group-hover:-translate-x-1
// //                     "
// //                   />

// //                   <span
// //                     className="
// //                       hidden sm:inline
// //                     "
// //                   >
// //                     Previous
// //                   </span>
// //                 </button>

// //                 {/* Page numbers */}
// //                 {Array.from(
// //                   {
// //                     length: totalPages,
// //                   },
// //                   (_, index) => {
// //                     const pageNumber =
// //                       index + 1;

// //                     const isActive =
// //                       currentPage ===
// //                       pageNumber;

// //                     return (
// //                       <button
// //                         key={pageNumber}
// //                         type="button"
// //                         onClick={() =>
// //                           handlePageChange(
// //                             pageNumber
// //                           )
// //                         }
// //                         aria-label={`Go to blog page ${pageNumber}`}
// //                         aria-current={
// //                           isActive
// //                             ? "page"
// //                             : undefined
// //                         }
// //                         className={`
// //                           relative flex
// //                           h-11 w-11
// //                           items-center
// //                           justify-center
// //                           overflow-hidden
// //                           border
// //                           font-serif
// //                           text-[13px]
// //                           transition-all
// //                           duration-300

// //                           ${
// //                             isActive
// //                               ? `
// //                                 border-[#b8863a]
// //                                 bg-[#b8863a]
// //                                 text-[#080807]
// //                               `
// //                               : `
// //                                 border-white/15
// //                                 text-white/55
// //                                 hover:border-[#b8863a]
// //                                 hover:text-[#e6c583]
// //                               `
// //                           }
// //                         `}
// //                       >
// //                         {String(
// //                           pageNumber
// //                         ).padStart(
// //                           2,
// //                           "0"
// //                         )}

// //                         {isActive && (
// //                           <span
// //                             aria-hidden="true"
// //                             className="
// //                               absolute bottom-0
// //                               left-0 h-[2px]
// //                               w-full
// //                               bg-[#f3d28d]
// //                             "
// //                           />
// //                         )}
// //                       </button>
// //                     );
// //                   }
// //                 )}

// //                 {/* Next */}
// //                 <button
// //                   type="button"
// //                   onClick={() =>
// //                     handlePageChange(
// //                       currentPage + 1
// //                     )
// //                   }
// //                   disabled={
// //                     currentPage ===
// //                     totalPages
// //                   }
// //                   aria-label="Next blog page"
// //                   className="
// //                     group flex h-11
// //                     items-center gap-2
// //                     border border-white/15
// //                     px-4
// //                     text-[8px]
// //                     font-semibold
// //                     uppercase
// //                     tracking-[0.2em]
// //                     text-white/55
// //                     transition-all
// //                     duration-300

// //                     hover:border-[#b8863a]
// //                     hover:bg-[#b8863a]
// //                     hover:text-[#080807]

// //                     disabled:cursor-not-allowed
// //                     disabled:opacity-25
// //                     disabled:hover:border-white/15
// //                     disabled:hover:bg-transparent
// //                     disabled:hover:text-white/55
// //                   "
// //                 >
// //                   <span
// //                     className="
// //                       hidden sm:inline
// //                     "
// //                   >
// //                     Next
// //                   </span>

// //                   <ArrowRight
// //                     size={14}
// //                     className="
// //                       transition-transform
// //                       duration-300

// //                       group-hover:translate-x-1
// //                     "
// //                   />
// //                 </button>
// //               </div>
// //             </motion.nav>
// //           )}
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }

// /* eslint-disable @next/next/no-img-element */
// "use client";

// import {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import axios from "axios";
// import Link from "next/link";
// import {
//   AnimatePresence,
//   motion,
//   useReducedMotion,
// } from "framer-motion";
// import {
//   ArrowLeft,
//   ArrowRight,
//   ArrowUpRight,
//   RefreshCw,
// } from "lucide-react";

// import Breadcrumb from "../components/Breadcrumb";
// import aboutBreadcrumb from "@/app/assets/banner1.png";
// import { apiUrl } from "../config";

// const POSTS_PER_PAGE = 6;

// type BlogItem = {
//   id: number;
//   title: string;
//   slug: string;
//   image: string | null;
//   description: string | null;
//   meta_title: string | null;
//   meta_keyword: string | null;
//   meta_description: string | null;
//   head: string | null;
//   body: string | null;
//   status: string;
//   created_at: string;
//   updated_at: string;
//   image_url: string | null;
// };

// type BlogsApiResponse = {
//   success: boolean;
//   message: string;
//   data: BlogItem[];
// };

// function getApiErrorMessage(error: unknown): string {
//   if (!axios.isAxiosError(error)) {
//     return error instanceof Error && error.message
//       ? error.message
//       : "Unable to load blogs.";
//   }

//   const responseMessage = error.response?.data?.message;

//   if (
//     typeof responseMessage === "string" &&
//     responseMessage.trim()
//   ) {
//     return responseMessage;
//   }

//   return error.message || "Unable to load blogs.";
// }

// function formatBlogDate(dateValue: string): string {
//   if (!dateValue) {
//     return "";
//   }

//   const normalizedDate = dateValue.includes("T")
//     ? dateValue
//     : dateValue.replace(" ", "T");

//   const parsedDate = new Date(normalizedDate);

//   if (Number.isNaN(parsedDate.getTime())) {
//     return "";
//   }

//   return new Intl.DateTimeFormat("en-GB", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   }).format(parsedDate);
// }

// export default function BlogPage() {
//   const reduceMotion = useReducedMotion();

//   const [blogs, setBlogs] = useState<BlogItem[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] =
//     useState("");

//   const abortControllerRef =
//     useRef<AbortController | null>(null);

//   const fetchBlogs = useCallback(
//     async (signal?: AbortSignal) => {
//       setLoading(true);
//       setErrorMessage("");

//       try {
//         const response = await axios.post<BlogsApiResponse>(
//           `${apiUrl}/blogslist`,
//           {},
//           {
//             signal,
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//           },
//         );

//         if (
//           !response.data.success ||
//           !Array.isArray(response.data.data)
//         ) {
//           throw new Error(
//             response.data.message ||
//               "Invalid blogs response received.",
//           );
//         }

//         const activeBlogs = response.data.data.filter(
//           (blog) =>
//             blog.status?.trim().toLowerCase() ===
//             "active",
//         );

//         if (signal?.aborted) {
//           return;
//         }

//         setBlogs(activeBlogs);
//         setCurrentPage(1);
//       } catch (error: unknown) {
//         if (
//           signal?.aborted ||
//           (axios.isAxiosError(error) &&
//             error.code === "ERR_CANCELED")
//         ) {
//           return;
//         }

//         setBlogs([]);
//         setCurrentPage(1);
//         setErrorMessage(
//           getApiErrorMessage(error),
//         );
//       } finally {
//         if (!signal?.aborted) {
//           setLoading(false);
//         }
//       }
//     },
//     [],
//   );

//   useEffect(() => {
//     const controller = new AbortController();

//     abortControllerRef.current = controller;

//     void fetchBlogs(controller.signal);

//     return () => {
//       controller.abort();
//     };
//   }, [fetchBlogs]);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(blogs.length / POSTS_PER_PAGE),
//   );

//   const currentPosts = useMemo(() => {
//     const startIndex =
//       (currentPage - 1) * POSTS_PER_PAGE;

//     return blogs.slice(
//       startIndex,
//       startIndex + POSTS_PER_PAGE,
//     );
//   }, [blogs, currentPage]);

//   const visiblePages = useMemo(() => {
//     const pages: number[] = [];
//     const maxVisiblePages = 5;

//     let startPage = Math.max(
//       1,
//       currentPage -
//         Math.floor(maxVisiblePages / 2),
//     );

//     const endPage = Math.min(
//       totalPages,
//       startPage + maxVisiblePages - 1,
//     );

//     startPage = Math.max(
//       1,
//       endPage - maxVisiblePages + 1,
//     );

//     for (
//       let page = startPage;
//       page <= endPage;
//       page += 1
//     ) {
//       pages.push(page);
//     }

//     return pages;
//   }, [currentPage, totalPages]);

//   const handlePageChange = (
//     pageNumber: number,
//   ) => {
//     if (
//       loading ||
//       pageNumber < 1 ||
//       pageNumber > totalPages ||
//       pageNumber === currentPage
//     ) {
//       return;
//     }

//     setCurrentPage(pageNumber);

//     window.requestAnimationFrame(() => {
//       const blogSection =
//         document.getElementById("blog");

//       if (!blogSection) {
//         return;
//       }

//       const headerOffset = 110;

//       const sectionTop =
//         blogSection.getBoundingClientRect().top +
//         window.scrollY -
//         headerOffset;

//       window.scrollTo({
//         top: sectionTop,
//         behavior: "smooth",
//       });
//     });
//   };

//   return (
//     <main
//       className="
//         overflow-hidden
//         bg-[#080807]
//       "
//     >
//       <Breadcrumb
//         title="Blog"
//         backgroundImage={aboutBreadcrumb}
//         imagePosition="center"
//         items={[
//           {
//             label: "Blog",
//           },
//         ]}
//       />

//       <section
//         id="blog"
//         className="
//           relative overflow-hidden
//           bg-[#090908]
//           px-5 py-20
//           sm:px-8
//           sm:py-24
//           lg:px-[5vw]
//           lg:py-[60px]
//         "
//       >
//         {/* Background details */}
//         <div
//           aria-hidden="true"
//           className="
//             pointer-events-none
//             absolute -left-48 top-1/3
//             h-[420px] w-[420px]
//             rounded-full
//             bg-[#b8863a]/[0.045]
//             blur-[150px]
//           "
//         />

//         <div
//           aria-hidden="true"
//           className="
//             pointer-events-none
//             absolute right-0 top-0
//             h-px w-[40%]
//             bg-gradient-to-l
//             from-[#b8863a]/50
//             to-transparent
//           "
//         />

//         <div
//           className="
//             relative z-10
//             mx-auto
//             max-w-[1500px]
//           "
//         >
//           {/* Loading */}
//           {loading && (
//             <div
//               aria-busy="true"
//               aria-label="Loading blogs"
//               className="
//                 grid grid-cols-1 gap-8
//                 md:grid-cols-2
//                 xl:grid-cols-3
//               "
//             >
//               {Array.from({
//                 length: POSTS_PER_PAGE,
//               }).map((_, index) => (
//                 <div
//                   key={index}
//                   className="
//                     overflow-hidden
//                     border border-white/10
//                     bg-[#0e0e0d]
//                   "
//                 >
//                   <div
//                     className="
//                       aspect-[16/11]
//                       animate-pulse
//                       bg-white/[0.04]
//                     "
//                   />

//                   <div className="p-6">
//                     <div
//                       className="
//                         h-7 w-3/4
//                         animate-pulse
//                         bg-white/[0.05]
//                       "
//                     />

//                     <div
//                       className="
//                         mt-4 h-16
//                         animate-pulse
//                         bg-white/[0.035]
//                       "
//                     />

//                     <div
//                       className="
//                         mt-7 h-11
//                         animate-pulse
//                         border-t
//                         border-white/10
//                         pt-5
//                       "
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* API error */}
//           {!loading && errorMessage && (
//             <div
//               role="alert"
//               className="
//                 flex min-h-[300px]
//                 flex-col items-center
//                 justify-center
//                 border border-red-400/20
//                 bg-red-400/[0.04]
//                 px-6 py-12
//                 text-center
//               "
//             >
//               <p
//                 className="
//                   max-w-[560px]
//                   text-sm leading-7
//                   text-red-200
//                 "
//               >
//                 {errorMessage}
//               </p>

//               <button
//                 type="button"
//                 onClick={() => {
//                   abortControllerRef.current?.abort();

//                   const controller =
//                     new AbortController();

//                   abortControllerRef.current =
//                     controller;

//                   void fetchBlogs(
//                     controller.signal,
//                   );
//                 }}
//                 className="
//                   mt-6 inline-flex
//                   items-center gap-3
//                   border border-[#b8863a]/50
//                   px-6 py-3
//                   text-[10px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.2em]
//                   text-[#e6c583]
//                   transition-all
//                   duration-300
//                   hover:bg-[#b8863a]
//                   hover:text-[#080807]
//                 "
//               >
//                 <RefreshCw size={15} />
//                 Try Again
//               </button>
//             </div>
//           )}

//           {/* Empty blogs */}
//           {!loading &&
//             !errorMessage &&
//             blogs.length === 0 && (
//               <div
//                 className="
//                   flex min-h-[300px]
//                   items-center justify-center
//                   border border-white/10
//                   bg-[#0e0e0d]
//                   px-6 py-12
//                   text-center
//                 "
//               >
//                 <p
//                   className="
//                     text-sm leading-7
//                     text-white/50
//                   "
//                 >
//                   No active blogs are available.
//                 </p>
//               </div>
//             )}

//           {/* Dynamic blog cards */}
//           {!loading &&
//             !errorMessage &&
//             currentPosts.length > 0 && (
//               <AnimatePresence
//                 mode="wait"
//                 initial={false}
//               >
//                 <motion.div
//                   key={`blog-page-${currentPage}`}
//                   initial={{
//                     opacity: 0,
//                     y: reduceMotion ? 0 : 24,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     y: reduceMotion ? 0 : -18,
//                   }}
//                   transition={{
//                     duration: reduceMotion
//                       ? 0.1
//                       : 0.5,
//                     ease: [0.16, 1, 0.3, 1],
//                   }}
//                   className="
//                     grid grid-cols-1 gap-8
//                     md:grid-cols-2
//                     xl:grid-cols-3
//                   "
//                 >
//                   {currentPosts.map(
//                     (post, index) => {
//                       const detailUrl =
//                         `/blog-detail?slug=${encodeURIComponent(
//                           post.slug,
//                         )}`;

//                       const formattedDate =
//                         formatBlogDate(
//                           post.created_at,
//                         );

//                       return (
//                         <motion.article
//                           key={post.id}
//                           initial={{
//                             opacity: 0,
//                             y: reduceMotion
//                               ? 0
//                               : 35,
//                           }}
//                           animate={{
//                             opacity: 1,
//                             y: 0,
//                           }}
//                           transition={{
//                             duration: reduceMotion
//                               ? 0.1
//                               : 0.65,
//                             delay: reduceMotion
//                               ? 0
//                               : index * 0.07,
//                             ease: [
//                               0.16,
//                               1,
//                               0.3,
//                               1,
//                             ],
//                           }}
//                           className="
//                             group relative
//                             flex h-full flex-col
//                             overflow-hidden
//                             border border-white/10
//                             bg-[#0e0e0d]
//                             transition-all
//                             duration-500
//                             hover:-translate-y-1
//                             hover:border-[#b8863a]/40
//                             hover:shadow-[0_28px_80px_rgba(0,0,0,0.4)]
//                           "
//                         >
//                           {/* API image */}
//                           <Link
//                             href={detailUrl}
//                             className="
//                               relative block
//                               aspect-[16/11]
//                               overflow-hidden
//                               bg-[#15130f]
//                             "
//                             aria-label={`Read ${post.title}`}
//                           >
//                             {post.image_url ? (
//                               <img
//                                 src={post.image_url}
//                                 alt={post.title}
//                                 loading={
//                                   currentPage === 1 &&
//                                   index === 0
//                                     ? "eager"
//                                     : "lazy"
//                                 }
//                                 className="
//                                   h-full w-full
//                                   object-cover
//                                   transition-transform
//                                   duration-[900ms]
//                                   ease-[cubic-bezier(0.16,1,0.3,1)]
//                                   group-hover:scale-[1.05]
//                                 "
//                               />
//                             ) : (
//                               <div
//                                 className="
//                                   flex h-full w-full
//                                   items-center justify-center
//                                   bg-[#15130f]
//                                   text-xs
//                                   text-white/35
//                                 "
//                               >
//                                 Image unavailable
//                               </div>
//                             )}

//                             <div
//                               aria-hidden="true"
//                               className="
//                                 pointer-events-none
//                                 absolute inset-0
//                                 bg-gradient-to-t
//                                 from-black/70
//                                 via-black/5
//                                 to-black/15
//                               "
//                             />

//                             <span
//                               className="
//                                 absolute bottom-5 left-5
//                                 bg-[#b8863a]
//                                 px-4 py-2
//                                 text-[8px]
//                                 font-semibold
//                                 uppercase
//                                 tracking-[0.23em]
//                                 text-[#080807]
//                               "
//                             >
//                               Blog
//                             </span>

//                             {formattedDate && (
//                               <span
//                                 className="
//                                   absolute bottom-5 right-5
//                                   bg-black/35
//                                   px-3 py-2
//                                   text-[8px]
//                                   font-semibold
//                                   uppercase
//                                   tracking-[0.16em]
//                                   text-white/65
//                                   backdrop-blur-sm
//                                 "
//                               >
//                                 {formattedDate}
//                               </span>
//                             )}

//                             <span
//                               aria-hidden="true"
//                               className="
//                                 absolute left-5 top-5
//                                 h-5 w-5
//                                 border-l border-t
//                                 border-[#e6c583]/70
//                                 transition-all
//                                 duration-500
//                                 group-hover:h-8
//                                 group-hover:w-8
//                               "
//                             />
//                           </Link>

//                           {/* API content */}
//                           <div
//                             className="
//                               relative flex flex-1
//                               flex-col p-6
//                             "
//                           >
//                             <Link href={detailUrl}>
//                               <h3
//                                 className="
//                                   font-serif text-xl
//                                   leading-[1.2]
//                                   tracking-[-0.015em]
//                                   text-[#f3efe7]
//                                   transition-colors
//                                   duration-400
//                                   group-hover:text-[#e6c583]
//                                 "
//                               >
//                                 {post.title}
//                               </h3>
//                             </Link>

//                           {post.description && (
//   <p
//     className="
//       mt-4 flex-1
//       text-[12px]
//       leading-[1.85]
//       text-white/45
//       sm:text-[13px]
//     "
//   >
//     {post.description.length > 100
//       ? `${post.description.slice(0, 100)}...`
//       : post.description}
//   </p>
// )}

//                             <Link
//                               href={detailUrl}
//                               className="
//                                 mt-7 flex
//                                 items-center
//                                 justify-between
//                                 border-t
//                                 border-white/10
//                                 pt-5
//                               "
//                             >
//                               <span
//                                 className="
//                                   text-[9px]
//                                   font-semibold
//                                   uppercase
//                                   tracking-[0.26em]
//                                   text-[#e6c583]
//                                 "
//                               >
//                                 Read Article
//                               </span>

//                               <span
//                                 className="
//                                   flex h-10 w-10
//                                   items-center
//                                   justify-center
//                                   border
//                                   border-white/15
//                                   text-white/55
//                                   transition-all
//                                   duration-400
//                                   group-hover:border-[#b8863a]
//                                   group-hover:bg-[#b8863a]
//                                   group-hover:text-[#080807]
//                                 "
//                               >
//                                 <ArrowUpRight
//                                   size={16}
//                                   className="
//                                     transition-transform
//                                     duration-400
//                                     group-hover:-translate-y-0.5
//                                     group-hover:translate-x-0.5
//                                   "
//                                 />
//                               </span>
//                             </Link>
//                           </div>

//                           <span
//                             aria-hidden="true"
//                             className="
//                               pointer-events-none
//                               absolute bottom-0 left-0
//                               h-[2px] w-12
//                               bg-[#b8863a]
//                               transition-all
//                               duration-500
//                               group-hover:w-full
//                             "
//                           />
//                         </motion.article>
//                       );
//                     },
//                   )}
//                 </motion.div>
//               </AnimatePresence>
//             )}

//           {/* Client-side pagination */}
//           {!loading &&
//             !errorMessage &&
//             totalPages > 1 && (
//               <motion.nav
//                 initial={{
//                   opacity: 0,
//                   y: reduceMotion ? 0 : 20,
//                 }}
//                 whileInView={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 viewport={{
//                   once: true,
//                   amount: 0.4,
//                 }}
//                 transition={{
//                   duration: 0.7,
//                 }}
//                 aria-label="Blog pagination"
//                 className="
//                   mt-14 flex
//                   flex-col gap-5
//                   border-t
//                   border-white/10
//                   pt-8
//                   sm:flex-row
//                   sm:items-center
//                   sm:justify-between
//                 "
//               >
//                 <p
//                   className="
//                     text-[9px]
//                     font-semibold
//                     uppercase
//                     tracking-[0.25em]
//                     text-white/35
//                   "
//                 >
//                   Showing{" "}
//                   <span className="text-[#e6c583]">
//                     {(currentPage - 1) *
//                       POSTS_PER_PAGE +
//                       1}
//                   </span>
//                   –
//                   <span className="text-[#e6c583]">
//                     {Math.min(
//                       currentPage *
//                         POSTS_PER_PAGE,
//                       blogs.length,
//                     )}
//                   </span>{" "}
//                   of{" "}
//                   <span className="text-white/60">
//                     {blogs.length}
//                   </span>
//                 </p>

//                 <div
//                   className="
//                     flex flex-wrap
//                     items-center gap-2
//                   "
//                 >
//                   <button
//                     type="button"
//                     onClick={() =>
//                       handlePageChange(
//                         currentPage - 1,
//                       )
//                     }
//                     disabled={currentPage === 1}
//                     aria-label="Previous blog page"
//                     className="
//                       group flex h-11
//                       items-center gap-2
//                       border border-white/15
//                       px-4
//                       text-[8px]
//                       font-semibold
//                       uppercase
//                       tracking-[0.2em]
//                       text-white/55
//                       transition-all
//                       duration-300
//                       hover:border-[#b8863a]
//                       hover:bg-[#b8863a]
//                       hover:text-[#080807]
//                       disabled:cursor-not-allowed
//                       disabled:opacity-25
//                       disabled:hover:border-white/15
//                       disabled:hover:bg-transparent
//                       disabled:hover:text-white/55
//                     "
//                   >
//                     <ArrowLeft
//                       size={14}
//                       className="
//                         transition-transform
//                         duration-300
//                         group-hover:-translate-x-1
//                       "
//                     />

//                     <span className="hidden sm:inline">
//                       Previous
//                     </span>
//                   </button>

//                   {visiblePages.map(
//                     (pageNumber) => {
//                       const isActive =
//                         currentPage ===
//                         pageNumber;

//                       return (
//                         <button
//                           key={pageNumber}
//                           type="button"
//                           onClick={() =>
//                             handlePageChange(
//                               pageNumber,
//                             )
//                           }
//                           aria-label={`Go to blog page ${pageNumber}`}
//                           aria-current={
//                             isActive
//                               ? "page"
//                               : undefined
//                           }
//                           className={`
//                             relative flex
//                             h-11 w-11
//                             items-center
//                             justify-center
//                             overflow-hidden
//                             border
//                             font-serif
//                             text-[13px]
//                             transition-all
//                             duration-300

//                             ${
//                               isActive
//                                 ? `
//                                     border-[#b8863a]
//                                     bg-[#b8863a]
//                                     text-[#080807]
//                                   `
//                                 : `
//                                     border-white/15
//                                     text-white/55
//                                     hover:border-[#b8863a]
//                                     hover:text-[#e6c583]
//                                   `
//                             }
//                           `}
//                         >
//                           {String(
//                             pageNumber,
//                           ).padStart(2, "0")}

//                           {isActive && (
//                             <span
//                               aria-hidden="true"
//                               className="
//                                 absolute bottom-0
//                                 left-0 h-[2px]
//                                 w-full
//                                 bg-[#f3d28d]
//                               "
//                             />
//                           )}
//                         </button>
//                       );
//                     },
//                   )}

//                   <button
//                     type="button"
//                     onClick={() =>
//                       handlePageChange(
//                         currentPage + 1,
//                       )
//                     }
//                     disabled={
//                       currentPage === totalPages
//                     }
//                     aria-label="Next blog page"
//                     className="
//                       group flex h-11
//                       items-center gap-2
//                       border border-white/15
//                       px-4
//                       text-[8px]
//                       font-semibold
//                       uppercase
//                       tracking-[0.2em]
//                       text-white/55
//                       transition-all
//                       duration-300
//                       hover:border-[#b8863a]
//                       hover:bg-[#b8863a]
//                       hover:text-[#080807]
//                       disabled:cursor-not-allowed
//                       disabled:opacity-25
//                       disabled:hover:border-white/15
//                       disabled:hover:bg-transparent
//                       disabled:hover:text-white/55
//                     "
//                   >
//                     <span className="hidden sm:inline">
//                       Next
//                     </span>

//                     <ArrowRight
//                       size={14}
//                       className="
//                         transition-transform
//                         duration-300
//                         group-hover:translate-x-1
//                       "
//                     />
//                   </button>
//                 </div>
//               </motion.nav>
//             )}
//         </div>
//       </section>
//     </main>
//   );
// }

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

const POSTS_PER_PAGE = 6;

const BLOG_SEO_ID = "5";

const BLOG_SEO_ATTRIBUTE =
  "data-hpi-blog-api-seo";

const BLOG_FALLBACK_TITLE =
  "Blog | HPI Design Studio";

const BLOG_FALLBACK_DESCRIPTION =
  "Explore interior design insights, architecture notes, material ideas and studio updates from HPI Design Studio.";

const BLOG_FALLBACK_KEYWORDS =
  "HPI Design Studio blog, interior design blog, architecture blog, interior materials, residential interiors, commercial interiors";

/* =========================================================
   SEO TYPES
========================================================= */

type SeoData = {
  id: number;
  page_name: string | null;
  meta_title: string | null;
  meta_keyword: string | null;
  meta_description: string | null;
  head: string | null;
  body: string | null;
  h1_tag: string | null;
  h1_tag_grey: string | null;
  created_at: string | null;
  updated_at: string | null;
};

type SeoApiResponse = {
  success: boolean;
  message: string;
  data: SeoData | null;
};

/* =========================================================
   REMOVE PREVIOUS BLOG SEO ELEMENTS
========================================================= */

function removePreviousBlogSeoElements() {
  document
    .querySelectorAll(
      `[${BLOG_SEO_ATTRIBUTE}="true"]`,
    )
    .forEach((element) => {
      element.remove();
    });
}

/* =========================================================
   ADD META TAG
========================================================= */

function addBlogMetaTag({
  name,
  property,
  content,
}: {
  name?: string;
  property?: string;
  content?: string | null;
}) {
  const cleanContent = content?.trim();

  if (!cleanContent) {
    return;
  }

  const meta = document.createElement("meta");

  if (name) {
    meta.setAttribute("name", name);
  }

  if (property) {
    meta.setAttribute(
      "property",
      property,
    );
  }

  meta.setAttribute(
    "content",
    cleanContent,
  );

  meta.setAttribute(
    BLOG_SEO_ATTRIBUTE,
    "true",
  );

  document.head.appendChild(meta);
}

/* =========================================================
   ADD CANONICAL URL
========================================================= */

function addBlogCanonicalLink(
  href: string,
) {
  const cleanHref = href.trim();

  if (!cleanHref) {
    return;
  }

  const link =
    document.createElement("link");

  link.setAttribute(
    "rel",
    "canonical",
  );

  link.setAttribute(
    "href",
    cleanHref,
  );

  link.setAttribute(
    BLOG_SEO_ATTRIBUTE,
    "true",
  );

  document.head.appendChild(link);
}

/* =========================================================
   ADD JSON-LD
========================================================= */

function addBlogJsonLdScript(
  content: string,
  index: number,
) {
  const cleanContent = content.trim();

  if (!cleanContent) {
    return;
  }

  try {
    const schema = JSON.parse(
      cleanContent,
    );

    const script =
      document.createElement("script");

    script.id =
      `blog-api-schema-${index}`;

    script.type =
      "application/ld+json";

    script.textContent =
      JSON.stringify(schema);

    script.setAttribute(
      BLOG_SEO_ATTRIBUTE,
      "true",
    );

    document.head.appendChild(script);
  } catch (error) {
    console.error(
      "Invalid Blog JSON-LD schema:",
      error,
    );
  }
}

/* =========================================================
   APPLY API HEAD HTML
========================================================= */

function applyBlogApiHeadHtml(
  headHtml: string | null,
) {
  if (!headHtml?.trim()) {
    return;
  }

  const parser = new DOMParser();

  const parsedDocument =
    parser.parseFromString(
      headHtml,
      "text/html",
    );

  /*
   * Open Graph, Twitter, robots
   * and other meta tags.
   */
  parsedDocument
    .querySelectorAll("meta")
    .forEach((sourceMeta) => {
      const name =
        sourceMeta
          .getAttribute("name")
          ?.trim();

      const property =
        sourceMeta
          .getAttribute("property")
          ?.trim();

      const content =
        sourceMeta
          .getAttribute("content")
          ?.trim();

      addBlogMetaTag({
        name,
        property,
        content,
      });
    });

  /*
   * Canonical link.
   */
  parsedDocument
    .querySelectorAll("link")
    .forEach((sourceLink) => {
      const rel =
        sourceLink
          .getAttribute("rel")
          ?.trim()
          .toLowerCase();

      const href =
        sourceLink
          .getAttribute("href")
          ?.trim();

      if (
        rel === "canonical" &&
        href
      ) {
        addBlogCanonicalLink(href);
      }
    });

  /*
   * JSON-LD schema from API head.
   */
  parsedDocument
    .querySelectorAll(
      'script[type="application/ld+json"]',
    )
    .forEach(
      (sourceScript, index) => {
        addBlogJsonLdScript(
          sourceScript.textContent ||
            "",
          index + 1,
        );
      },
    );
}

/* =========================================================
   APPLY API BODY SCHEMA
========================================================= */

function applyBlogApiBodySchema(
  bodyHtml: string | null,
) {
  if (!bodyHtml?.trim()) {
    return;
  }

  const cleanBody = bodyHtml.trim();
  const parser = new DOMParser();

  const parsedDocument =
    parser.parseFromString(
      cleanBody,
      "text/html",
    );

  const schemaScripts =
    parsedDocument.querySelectorAll(
      'script[type="application/ld+json"]',
    );

  schemaScripts.forEach(
    (sourceScript, index) => {
      addBlogJsonLdScript(
        sourceScript.textContent ||
          "",
        index + 101,
      );
    },
  );

  /*
   * Support raw JSON in the API body.
   */
  if (
    schemaScripts.length === 0 &&
    (
      cleanBody.startsWith("{") ||
      cleanBody.startsWith("[")
    )
  ) {
    addBlogJsonLdScript(
      cleanBody,
      101,
    );
  }
}

/* =========================================================
   APPLY BLOG SEO DATA
========================================================= */

function applyBlogSeoData(
  seo: SeoData,
) {
  removePreviousBlogSeoElements();

  const pageTitle =
    seo.meta_title?.trim() ||
    seo.page_name?.trim() ||
    BLOG_FALLBACK_TITLE;

  const pageDescription =
    seo.meta_description?.trim() ||
    BLOG_FALLBACK_DESCRIPTION;

  const pageKeywords =
    seo.meta_keyword?.trim() ||
    BLOG_FALLBACK_KEYWORDS;

  document.title = pageTitle;

  addBlogMetaTag({
    name: "description",
    content: pageDescription,
  });

  addBlogMetaTag({
    name: "keywords",
    content: pageKeywords,
  });

  applyBlogApiHeadHtml(seo.head);
  applyBlogApiBodySchema(seo.body);
}

/* =========================================================
   APPLY BLOG FALLBACK SEO
========================================================= */

function applyBlogFallbackSeo() {
  removePreviousBlogSeoElements();

  document.title =
    BLOG_FALLBACK_TITLE;

  addBlogMetaTag({
    name: "description",
    content:
      BLOG_FALLBACK_DESCRIPTION,
  });

  addBlogMetaTag({
    name: "keywords",
    content:
      BLOG_FALLBACK_KEYWORDS,
  });
}


type BlogItem = {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  description: string | null;
  meta_title: string | null;
  meta_keyword: string | null;
  meta_description: string | null;
  head: string | null;
  body: string | null;
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

function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error && error.message
      ? error.message
      : "Unable to load blogs.";
  }

  const responseMessage = error.response?.data?.message;

  if (
    typeof responseMessage === "string" &&
    responseMessage.trim()
  ) {
    return responseMessage;
  }

  return error.message || "Unable to load blogs.";
}

function formatBlogDate(dateValue: string): string {
  if (!dateValue) {
    return "";
  }

  const normalizedDate = dateValue.includes("T")
    ? dateValue
    : dateValue.replace(" ", "T");

  const parsedDate = new Date(normalizedDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

export default function BlogPage() {
  const reduceMotion = useReducedMotion();

  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] =
    useState("");

  const abortControllerRef =
    useRef<AbortController | null>(null);

  /* =======================================================
     FETCH BLOG SEO API
  ======================================================= */

  useEffect(() => {
    const controller =
      new AbortController();

    async function fetchBlogSeo() {
      try {
        const response = await fetch(
          `${apiUrl}/getSeoById`,
          {
            method: "POST",

            headers: {
              Accept:
                "application/json",

              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              id: BLOG_SEO_ID,
            }),

            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(
            `Blog SEO API request failed with status ${response.status}.`,
          );
        }

        const result =
          (await response.json()) as SeoApiResponse;

        if (
          !result.success ||
          !result.data
        ) {
          throw new Error(
            result.message ||
              "Blog SEO data not found.",
          );
        }

        applyBlogSeoData(
          result.data,
        );
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Blog SEO API error:",
          error,
        );

        applyBlogFallbackSeo();
      }
    }

    void fetchBlogSeo();

    return () => {
      controller.abort();
      removePreviousBlogSeoElements();
    };
  }, []);

  const fetchBlogs = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await axios.post<BlogsApiResponse>(
          `${apiUrl}/blogslist`,
          {},
          {
            signal,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          },
        );

        if (
          !response.data.success ||
          !Array.isArray(response.data.data)
        ) {
          throw new Error(
            response.data.message ||
              "Invalid blogs response received.",
          );
        }

        const activeBlogs = response.data.data.filter(
          (blog) =>
            blog.status?.trim().toLowerCase() ===
            "active",
        );

        if (signal?.aborted) {
          return;
        }

        setBlogs(activeBlogs);
        setCurrentPage(1);
      } catch (error: unknown) {
        if (
          signal?.aborted ||
          (axios.isAxiosError(error) &&
            error.code === "ERR_CANCELED")
        ) {
          return;
        }

        setBlogs([]);
        setCurrentPage(1);
        setErrorMessage(
          getApiErrorMessage(error),
        );
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();

    abortControllerRef.current = controller;

    void fetchBlogs(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchBlogs]);

  const totalPages = Math.max(
    1,
    Math.ceil(blogs.length / POSTS_PER_PAGE),
  );

  const currentPosts = useMemo(() => {
    const startIndex =
      (currentPage - 1) * POSTS_PER_PAGE;

    return blogs.slice(
      startIndex,
      startIndex + POSTS_PER_PAGE,
    );
  }, [blogs, currentPage]);

  const visiblePages = useMemo(() => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(
      1,
      currentPage -
        Math.floor(maxVisiblePages / 2),
    );

    const endPage = Math.min(
      totalPages,
      startPage + maxVisiblePages - 1,
    );

    startPage = Math.max(
      1,
      endPage - maxVisiblePages + 1,
    );

    for (
      let page = startPage;
      page <= endPage;
      page += 1
    ) {
      pages.push(page);
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePageChange = (
    pageNumber: number,
  ) => {
    if (
      loading ||
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

      if (!blogSection) {
        return;
      }

      const headerOffset = 110;

      const sectionTop =
        blogSection.getBoundingClientRect().top +
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
          {/* Loading */}
          {loading && (
            <div
              aria-busy="true"
              aria-label="Loading blogs"
              className="
                grid grid-cols-1 gap-8
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {Array.from({
                length: POSTS_PER_PAGE,
              }).map((_, index) => (
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

                    <div
                      className="
                        mt-7 h-11
                        animate-pulse
                        border-t
                        border-white/10
                        pt-5
                      "
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* API error */}
          {!loading && errorMessage && (
            <div
              role="alert"
              className="
                flex min-h-[300px]
                flex-col items-center
                justify-center
                border border-red-400/20
                bg-red-400/[0.04]
                px-6 py-12
                text-center
              "
            >
              <p
                className="
                  max-w-[560px]
                  text-sm leading-7
                  text-red-200
                "
              >
                {errorMessage}
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
                  mt-6 inline-flex
                  items-center gap-3
                  border border-[#b8863a]/50
                  px-6 py-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#e6c583]
                  transition-all
                  duration-300
                  hover:bg-[#b8863a]
                  hover:text-[#080807]
                "
              >
                <RefreshCw size={15} />
                Try Again
              </button>
            </div>
          )}

          {/* Empty blogs */}
          {!loading &&
            !errorMessage &&
            blogs.length === 0 && (
              <div
                className="
                  flex min-h-[300px]
                  items-center justify-center
                  border border-white/10
                  bg-[#0e0e0d]
                  px-6 py-12
                  text-center
                "
              >
                <p
                  className="
                    text-sm leading-7
                    text-white/50
                  "
                >
                  No active blogs are available.
                </p>
              </div>
            )}

          {/* Dynamic blog cards */}
          {!loading &&
            !errorMessage &&
            currentPosts.length > 0 && (
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
                    (post, index) => {
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
                              0.16,
                              1,
                              0.3,
                              1,
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
                          {/* API image */}
                          <Link
                            href={detailUrl}
                            className="
                              relative block
                              aspect-[16/11]
                              overflow-hidden
                              bg-[#15130f]
                            "
                            aria-label={`Read ${post.title}`}
                          >
                            {post.image_url ? (
                              <img
                                src={post.image_url}
                                alt={post.title}
                                loading={
                                  currentPage === 1 &&
                                  index === 0
                                    ? "eager"
                                    : "lazy"
                                }
                                className="
                                  h-full w-full
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
                                  flex h-full w-full
                                  items-center justify-center
                                  bg-[#15130f]
                                  text-xs
                                  text-white/35
                                "
                              >
                                Image unavailable
                              </div>
                            )}

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
                                text-[8px]
                                font-semibold
                                uppercase
                                tracking-[0.23em]
                                text-[#080807]
                              "
                            >
                              Blog
                            </span>

                            {formattedDate && (
                              <span
                                className="
                                  absolute bottom-5 right-5
                                  bg-black/35
                                  px-3 py-2
                                  text-[8px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.16em]
                                  text-white/65
                                  backdrop-blur-sm
                                "
                              >
                                {formattedDate}
                              </span>
                            )}

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

                          {/* API content */}
                          <div
                            className="
                              relative flex flex-1
                              flex-col p-6
                            "
                          >
                            <Link href={detailUrl}>
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

                          {post.description && (
  <p
    className="
      mt-4 flex-1
      text-[12px]
      leading-[1.85]
      text-white/45
      sm:text-[13px]
    "
  >
    {post.description.length > 100
      ? `${post.description.slice(0, 100)}...`
      : post.description}
  </p>
)}

                            <Link
                              href={detailUrl}
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
                      );
                    },
                  )}
                </motion.div>
              </AnimatePresence>
            )}

          {/* Client-side pagination */}
          {!loading &&
            !errorMessage &&
            totalPages > 1 && (
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
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-white/35
                  "
                >
                  Showing{" "}
                  <span className="text-[#e6c583]">
                    {(currentPage - 1) *
                      POSTS_PER_PAGE +
                      1}
                  </span>
                  –
                  <span className="text-[#e6c583]">
                    {Math.min(
                      currentPage *
                        POSTS_PER_PAGE,
                      blogs.length,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="text-white/60">
                    {blogs.length}
                  </span>
                </p>

                <div
                  className="
                    flex flex-wrap
                    items-center gap-2
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      handlePageChange(
                        currentPage - 1,
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

                    <span className="hidden sm:inline">
                      Previous
                    </span>
                  </button>

                  {visiblePages.map(
                    (pageNumber) => {
                      const isActive =
                        currentPage ===
                        pageNumber;

                      return (
                        <button
                          key={pageNumber}
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
                            pageNumber,
                          ).padStart(2, "0")}

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
                    },
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      handlePageChange(
                        currentPage + 1,
                      )
                    }
                    disabled={
                      currentPage === totalPages
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
                    <span className="hidden sm:inline">
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