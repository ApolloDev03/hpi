// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion, useReducedMotion } from "framer-motion";
// import {
//   FaArrowLeft,
//   FaArrowRight,
//   FaCalendarAlt,
//   FaClock,
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
// } from "react-icons/fa";

// import Breadcrumb from "../components/Breadcrumb";
// import aboutBreadcrumb from "@/app/assets/banner1.png";

// import blog1 from "@/app/assets/blog1.webp";
// import blog2 from "@/app/assets/blog2.webp";
// import blog3 from "@/app/assets/blog3.webp";

// const relatedBlogs = [
//   {
//     id: 1,
//     title: "Designing for Ahmedabad’s Light",
//     image: blog1,
//     href: "/blog/designing-for-ahmedabads-light",
//   },
//   {
//     id: 2,
//     title: "Materials We Keep Returning To",
//     image: blog2,
//     href: "/blog/materials-we-keep-returning-to",
//   },
//   {
//     id: 3,
//     title: "Creating Calm Through Interior Planning",
//     image: blog3,
//     href: "/blog/creating-calm-through-interior-planning",
//   },
// ];

// export default function BlogDetailPage() {
//   const reduceMotion = useReducedMotion();

//   return (
//     <main className="overflow-hidden bg-[#080807]">
//       <Breadcrumb
//         title="Blog Detail"
//         backgroundImage={aboutBreadcrumb}
//         imagePosition="center"
//         items={[
//           {
//             label: "Blog",
//             href: "/blog",
//           },
//           {
//             label: "Inside the Vira Residence Build",
//           },
//         ]}
//       />

//       <section
//         className="
//           relative bg-[#080807]
//           px-5 py-16
//           sm:px-8 sm:py-20
//           lg:px-[5vw] lg:py-[90px]
//         "
//       >
//         {/* Background decoration */}
//         <div
//           aria-hidden="true"
//           className="
//             pointer-events-none
//             absolute -left-56 top-1/3
//             h-[500px] w-[500px]
//             rounded-full
//             bg-[#b8863a]/[0.04]
//             blur-[170px]
//           "
//         />

//         <div
//           aria-hidden="true"
//           className="
//             pointer-events-none
//             absolute right-0 top-0
//             h-px w-[42%]
//             bg-gradient-to-l
//             from-[#b8863a]/50
//             to-transparent
//           "
//         />

//         <div
//           className="
//             relative z-10
//             mx-auto w-full max-w-[1500px]
//           "
//         >
//           <div
//             className="
//               grid grid-cols-1 gap-12
//               lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]
//               lg:items-start
//               lg:gap-10
//               xl:gap-14
//             "
//           >
//             {/* Left blog detail */}
//             <motion.article
//               initial={{
//                 opacity: 0,
//                 y: reduceMotion ? 0 : 30,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               transition={{
//                 duration: reduceMotion ? 0.1 : 0.8,
//                 ease: [0.16, 1, 0.3, 1],
//               }}
//               className="min-w-0"
//             >
//               {/* Blog header */}
//               <div className="mb-8">
//                 <h1
//                   className="max-w-[980px] font-serif font-medium text-[clamp(2.4rem,5vw,3rem)] leading-[1.04] tracking-[-0.04em] text-[#f3efe7]">
//                   Inside the Vira Residence Build
//                 </h1>

//                 <p
//                   className="mt-6 max-w-[850px] text-[14px] leading-[1.9] text-white/48 sm:text-[15px]">
//                   A closer look at how one conversation shaped
//                   the planning, natural light and material
//                   language of an entire home.
//                 </p>
//               </div>

//               {/* Main blog image */}
//               <div
//                 className="relative aspect-[16/9] overflow-hidden bg-[#141310]">
//                 <Image
//                   src={blog3}
//                   alt="Inside the Vira Residence Build"
//                   fill
//                   priority
//                   sizes="
//                     (max-width: 1024px) 100vw,
//                     66vw
//                   "
//                   className="object-cover transition-transform duration-[1200ms]
//                     hover:scale-[1.025]"/>

//                 <div
//                   aria-hidden="true"
//                   className="
//                     pointer-events-none absolute inset-0
//                     bg-gradient-to-t from-black/35 via-transparent to-black/10"/>

//                 <span
//                   aria-hidden="true"
//                   className="
//                     pointer-events-none
//                     absolute inset-5
//                     border border-white/10
//                   "
//                 />

//                 <span
//                   aria-hidden="true"
//                   className="
//                     pointer-events-none
//                     absolute left-0 top-0
//                     h-16 w-16
//                     border-l-2 border-t-2
//                     border-[#b8863a]
//                   "
//                 />
//               </div>

//               {/* Article content */}
//               <div
//                 className="
//                   mx-auto mt-10 max-w-[900px]
//                   space-y-7
//                 "
//               >
//                 <p
//                   className="
//                     text-[14px] leading-[2]
//                     text-white/55
//                     sm:text-[15px]
//                   "
//                 >
//                   The Vira Residence began with a simple
//                   conversation about how a family wanted to
//                   experience their home. Rather than starting
//                   with a visual style, the design process began
//                   by understanding daily routines, movement,
//                   privacy, natural light and the relationship
//                   between shared and personal spaces.
//                 </p>

//                 <p
//                   className="
//                     text-[14px] leading-[2]
//                     text-white/55
//                     sm:text-[15px]
//                   "
//                 >
//                   This early understanding became the foundation
//                   of the entire project. The planning was
//                   developed to create a natural flow between the
//                   living, dining and outdoor areas while
//                   maintaining calm, private zones for the family.
//                   Each room was positioned to receive balanced
//                   daylight without allowing Ahmedabad’s intense
//                   sunlight to overwhelm the interiors.
//                 </p>

//                 <div
//                   className="
//                     relative my-10
//                     border-l border-[#b8863a]
//                     bg-white/[0.025]
//                     px-5 py-5
                    
//                   "
//                 >
//                   <span
//                     aria-hidden="true"
//                     className="
//                       absolute -left-[5px] top-8
//                       h-2 w-2 rotate-45
//                       bg-[#b8863a]
//                     "
//                   />

//                   <p
//                     className="
//                       font-serif
//                       text-[clamp(1.35rem,2.5vw,1.3rem)]
//                       italic leading-[1.55]
//                       text-[#e6c583]
//                     "
//                   >
//                     “The design was not shaped around a single
//                     visual idea. It was shaped around the life
//                     that would unfold within it.”
//                   </p>
//                 </div>

//                 <h2
//                   className="
//                     pt-3
//                     font-serif font-medium
//                     text-[clamp(1.9rem,3vw,3rem)]
//                     leading-[1.15]
//                     tracking-[-0.025em]
//                     text-[#f3efe7]
//                   "
//                 >
//                   Planning around everyday life
//                 </h2>

//                 <p
//                   className="
//                     text-[14px] leading-[2]
//                     text-white/55
//                     sm:text-[15px]
//                   "
//                 >
//                   The ground floor was designed as an open but layered environment. The living room, dining area and kitchen remain visually connected, while changes in ceiling height, materials and furniture placement give each zone its own identity. This allowed the home to feel spacious without becoming visually empty or disconnected.
//                 </p>

//                 <p
//                   className="
//                     text-[14px] leading-[2]
//                     text-white/55
//                     sm:text-[15px]
//                   "
//                 >
//                   Storage was integrated into the architectural language rather than treated as an additional element. Built-in cabinetry, concealed services and carefully planned circulation helped maintain clean visual lines while supporting practical everyday use.</p>

//                 {/* Secondary image */}
//                 <div
//                   className="
//                     relative my-10
//                     aspect-[16/10]
//                     overflow-hidden
//                     bg-[#141310]
//                   "
//                 >
//                   <Image
//                     src={blog1}
//                     alt="Vira Residence interior detail"
//                     fill
//                     sizes="
//                       (max-width: 1024px) 100vw,
//                       66vw
//                     "
//                     className="object-cover"
//                   />

//                   <div
//                     aria-hidden="true"
//                     className="
//                       pointer-events-none
//                       absolute inset-0
//                       bg-gradient-to-t
//                       from-black/25
//                       to-transparent
//                     "
//                   />
//                 </div>

//                 <h2
//                   className="
//                     pt-3
//                     font-serif font-medium
//                     text-[clamp(1.9rem,3vw,3rem)]
//                     leading-[1.15]
//                     tracking-[-0.025em]
//                     text-[#f3efe7]
//                   "
//                 >
//                   Light as a design material
//                 </h2>

//                 <p
//                   className="
//                     text-[14px] leading-[2]
//                     text-white/55
//                     sm:text-[15px]
//                   "
//                 >
//                   Natural light was treated as one of the primary materials of the residence. Deep overhangs, recessed windows and screened openings were used to filter direct sunlight while allowing softer daylight to move through the home throughout the day.</p>

//                 <p
//                   className="
//                     text-[14px] leading-[2]
//                     text-white/55
//                     sm:text-[15px]
//                   "
//                 >
//                   The material palette was intentionally restrained. Natural stone, warm timber, soft neutral fabrics and dark metal accents were selected to create contrast without visual noise. These materials were chosen not only for appearance, but also for the way they would age and develop character over time.
//                 </p>

//                 <h2
//                   className="
//                     pt-3
//                     font-serif font-medium
//                     text-[clamp(1.9rem,3vw,3rem)]
//                     leading-[1.15]
//                     tracking-[-0.025em]
//                     text-[#f3efe7]
//                   "
//                 >
//                   A home that feels personal
//                 </h2>

//                 <p
//                   className="
//                     text-[14px] leading-[2]
//                     text-white/55
//                     sm:text-[15px]
//                   "
//                 >
//                   The final residence is refined but not formal.
//                   Each space feels carefully considered while
//                   remaining comfortable and natural. The design
//                   does not compete with the people who live
//                   there; instead, it provides a calm background
//                   for everyday routines, celebrations and
//                   changing family needs.
//                 </p>

//                 <p
//                   className="
//                     text-[14px] leading-[2]
//                     text-white/55
//                     sm:text-[15px]
//                   "
//                 >
//                   Vira Residence represents HPI Studio’s belief
//                   that meaningful interiors begin with careful
//                   listening. When planning, materials, light and
//                   detail are shaped around real life, the
//                   completed space feels personal rather than
//                   imposed.
//                 </p>
//               </div>

//               {/* Share and navigation */}
//               <div
//                 className="
//                   mt-12 border-y
//                   border-white/10
//                   py-7
//                 "
//               >
//                 <div
//                   className="
//                     flex flex-col gap-6
//                     sm:flex-row
//                     sm:items-center
//                     sm:justify-between
//                   "
//                 >
//                   <div className="flex items-center gap-4">
//                     <span
//                       className="
//                         text-[8px] font-semibold
//                         uppercase tracking-[0.26em]
//                         text-white/35
//                       "
//                     >
//                       Share Article
//                     </span>

//                     <div className="flex items-center gap-2">
//                       {[FaFacebookF, FaInstagram, FaLinkedinIn].map(
//                         (Icon, index) => (
//                           <a
//                             key={index}
//                             href="#"
//                             aria-label="Share article"
//                             className="
//                               flex h-9 w-9
//                               items-center justify-center
//                               rounded-full
//                               border border-white/15
//                               text-white/45
//                               transition-all duration-300

//                               hover:border-[#b8863a]
//                               hover:bg-[#b8863a]
//                               hover:text-[#080807]
//                             "
//                           >
//                             <Icon size={13} />
//                           </a>
//                         )
//                       )}
//                     </div>
//                   </div>

//                   <Link
//                     href="/blog"
//                     className="
//                       inline-flex items-center gap-3
//                       text-[9px] font-semibold
//                       uppercase tracking-[0.24em]
//                       text-[#e6c583]
//                       transition-colors duration-300

//                       hover:text-white
//                     "
//                   >
//                     <FaArrowLeft size={12} />

//                     Back to Blog
//                   </Link>
//                 </div>
//               </div>
//             </motion.article>

//             {/* Right related blogs */}
//             <motion.aside
//               initial={{
//                 opacity: 0,
//                 x: reduceMotion ? 0 : 30,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               transition={{
//                 duration: reduceMotion ? 0.1 : 0.8,
//                 delay: 0.12,
//                 ease: [0.16, 1, 0.3, 1],
//               }}
//               className="
//                 lg:sticky
//                 lg:top-[120px]
//                 lg:self-start
//               "
//             >
//               <div
//                 className="
//                   border border-white/10
//                   bg-[#0d0d0c]
//                   p-5
//                   sm:p-6
//                 "
//               >
//                 <div
//                   className="
//                     mb-7 flex
//                     items-center justify-between
//                     gap-5
//                     border-b border-white/10
//                     pb-5
//                   "
//                 >
//                   <div>
//                     <span
//                       className="
//                         text-[8px] font-semibold
//                         uppercase tracking-[0.28em]
//                         text-[#b8863a]
//                       "
//                     >
//                       Continue Reading
//                     </span>

//                     <h2
//                       className="
//                         mt-2 font-serif
//                         text-2xl text-[#f3efe7]
//                       "
//                     >
//                       Related Blogs
//                     </h2>
//                   </div>

//                   <span
//                     aria-hidden="true"
//                     className="
//                       h-2 w-2 rotate-45
//                       bg-[#b8863a]
//                     "
//                   />
//                 </div>

//                 <div className="space-y-5">
//                   {relatedBlogs.map((blog, index) => (
//                     <Link
//                       key={blog.id}
//                       href={blog.href}
//                       className="
//                         group block
//                         overflow-hidden
//                         border border-white/10
//                         bg-[#11100e]
//                         transition-all duration-400

//                         hover:-translate-y-1
//                         hover:border-[#b8863a]/50
//                         hover:shadow-[0_20px_55px_rgba(0,0,0,0.35)]
//                       "
//                     >
//                       <div
//                         className="
//                           relative aspect-[16/9]
//                           overflow-hidden
//                           bg-[#15130f]
//                         "
//                       >
//                         <Image
//                           src={blog.image}
//                           alt={blog.title}
//                           fill
//                           sizes="
//                             (max-width: 1024px) 100vw,
//                             33vw
//                           "
//                           className="
//                             object-cover
//                             transition-transform
//                             duration-[800ms]

//                             group-hover:scale-[1.06]
//                           "
//                         />

//                         <div
//                           aria-hidden="true"
//                           className="
//                             pointer-events-none
//                             absolute inset-0
//                             bg-gradient-to-t
//                             from-black/70
//                             via-transparent
//                             to-black/10
//                           "
//                         />

//                         <span
//                           className="
//                             absolute right-4 top-4
//                             flex h-8 w-8
//                             items-center justify-center
//                             border border-white/20
//                             bg-black/35
//                             font-serif text-[11px]
//                             text-white/65
//                             backdrop-blur-md
//                           "
//                         >
//                           0{index + 1}
//                         </span>
//                       </div>

//                       <div className="p-5">
//                         <h3
//                           className="
//                             font-serif text-[19px]
//                             leading-[1.3]
//                             text-[#f3efe7]
//                             transition-colors duration-300

//                             group-hover:text-[#e6c583]
//                           "
//                         >
//                           {blog.title}
//                         </h3>

//                         <div
//                           className="
//                             mt-4 flex
//                             items-center justify-between
//                             border-t border-white/10
//                             pt-4
//                           "
//                         >
//                           <span
//                             className="
//                               text-[8px] font-semibold
//                               uppercase tracking-[0.23em]
//                               text-white/35
//                               transition-colors duration-300

//                               group-hover:text-[#e6c583]
//                             "
//                           >
//                             Read Article
//                           </span>

//                           <FaArrowRight
//                             size={13}
//                             className="
//                               text-[#b8863a]
//                               transition-transform duration-300

//                               group-hover:translate-x-1
//                             "
//                           />
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </motion.aside>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

/* eslint-disable @next/next/no-img-element */


// "use client";

// import {
//   Suspense,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import axios from "axios";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import {
//   motion,
//   useReducedMotion,
// } from "framer-motion";
// import {
//   FaArrowLeft,
//   FaArrowRight,
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
// } from "react-icons/fa";
// import {
//   LoaderCircle,
//   RefreshCw,
// } from "lucide-react";

// import Breadcrumb from "../components/Breadcrumb";
// import aboutBreadcrumb from "@/app/assets/banner1.png";
// import { apiUrl } from "../config";

// type BlogDetail = {
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

// type LatestBlog = {
//   id: number;
//   title: string;
//   slug: string;
//   image: string | null;
//   image_url: string | null;
// };

// type BlogDetailApiResponse = {
//   success: boolean;
//   message: string;
//   data: BlogDetail;
//   latest_blogs: LatestBlog[];
// };

// function getApiErrorMessage(error: unknown): string {
//   if (!axios.isAxiosError(error)) {
//     return error instanceof Error && error.message
//       ? error.message
//       : "Unable to load blog details.";
//   }

//   const responseMessage = error.response?.data?.message;

//   if (
//     typeof responseMessage === "string" &&
//     responseMessage.trim()
//   ) {
//     return responseMessage;
//   }

//   return (
//     error.message ||
//     "Unable to load blog details."
//   );
// }

// function BlogDetailContent() {
//   const reduceMotion = useReducedMotion();
//   const searchParams = useSearchParams();

//   const blogSlug =
//     searchParams.get("slug")?.trim() || "";

//   const [blog, setBlog] =
//     useState<BlogDetail | null>(null);

//   const [latestBlogs, setLatestBlogs] =
//     useState<LatestBlog[]>([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [errorMessage, setErrorMessage] =
//     useState("");

//   const abortControllerRef =
//     useRef<AbortController | null>(null);

//   const fetchBlogDetail = useCallback(
//     async (signal?: AbortSignal) => {
//       if (!blogSlug) {
//         setBlog(null);
//         setLatestBlogs([]);
//         setLoading(false);
//         setErrorMessage(
//           "Blog slug is missing from the URL.",
//         );
//         return;
//       }

//       setLoading(true);
//       setErrorMessage("");

//       try {
//         const response =
//           await axios.post<BlogDetailApiResponse>(
//             `${apiUrl}/blogdetail`,
//             {
//               slug: blogSlug,
//             },
//             {
//               signal,
//               headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//               },
//             },
//           );

//         if (
//           !response.data.success ||
//           !response.data.data
//         ) {
//           throw new Error(
//             response.data.message ||
//               "Invalid blog detail response received.",
//           );
//         }

//         if (signal?.aborted) {
//           return;
//         }

//         setBlog(response.data.data);

//         setLatestBlogs(
//           Array.isArray(response.data.latest_blogs)
//             ? response.data.latest_blogs.filter(
//                 (item) =>
//                   item.slug !== response.data.data.slug,
//               )
//             : [],
//         );
//       } catch (error: unknown) {
//         if (
//           signal?.aborted ||
//           (axios.isAxiosError(error) &&
//             error.code === "ERR_CANCELED")
//         ) {
//           return;
//         }

//         setBlog(null);
//         setLatestBlogs([]);
//         setErrorMessage(
//           getApiErrorMessage(error),
//         );
//       } finally {
//         if (!signal?.aborted) {
//           setLoading(false);
//         }
//       }
//     },
//     [blogSlug],
//   );

//   useEffect(() => {
//     abortControllerRef.current?.abort();

//     const controller = new AbortController();
//     abortControllerRef.current = controller;

//     void fetchBlogDetail(controller.signal);

//     return () => {
//       controller.abort();
//     };
//   }, [fetchBlogDetail]);

//   useEffect(() => {
//     if (!blog) {
//       return;
//     }

//     document.title =
//       blog.meta_title?.trim() ||
//       blog.title;
//   }, [blog]);

//   const currentUrl =
//     typeof window !== "undefined"
//       ? window.location.href
//       : "";

//   const facebookShareUrl =
//     `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//       currentUrl,
//     )}`;

//   const linkedInShareUrl =
//     `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//       currentUrl,
//     )}`;

//   return (
//     <main className="overflow-hidden bg-[#080807]">
//       <Breadcrumb
//         title={blog?.title || "Blog Detail"}
//         backgroundImage={aboutBreadcrumb}
//         imagePosition="center"
//         items={[
//           {
//             label: "Blog",
//             href: "/blog",
//           },
//           {
//             label:
//               blog?.title || "Blog Detail",
//           },
//         ]}
//       />

//       <section
//         className="
//           relative bg-[#080807]
//           px-5 py-16
//           sm:px-8 sm:py-20
//           lg:px-[5vw] lg:py-[90px]
//         "
//       >
//         {/* Background decoration */}
//         <div
//           aria-hidden="true"
//           className="
//             pointer-events-none
//             absolute -left-56 top-1/3
//             h-[500px] w-[500px]
//             rounded-full
//             bg-[#b8863a]/[0.04]
//             blur-[170px]
//           "
//         />

//         <div
//           aria-hidden="true"
//           className="
//             pointer-events-none
//             absolute right-0 top-0
//             h-px w-[42%]
//             bg-gradient-to-l
//             from-[#b8863a]/50
//             to-transparent
//           "
//         />

//         <div
//           className="
//             relative z-10
//             mx-auto w-full max-w-[1500px]
//           "
//         >
//           {/* Loading */}
//           {loading && (
//             <div
//               aria-busy="true"
//               aria-label="Loading blog details"
//               className="
//                 grid grid-cols-1 gap-12
//                 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]
//                 lg:gap-10
//                 xl:gap-14
//               "
//             >
//               <div>
//                 <div
//                   className="
//                     h-14 w-3/4
//                     animate-pulse
//                     bg-white/[0.05]
//                   "
//                 />

//                 <div
//                   className="
//                     mt-6 h-16 w-full
//                     max-w-[850px]
//                     animate-pulse
//                     bg-white/[0.035]
//                   "
//                 />

//                 <div
//                   className="
//                     mt-8 aspect-[16/9]
//                     animate-pulse
//                     bg-white/[0.04]
//                   "
//                 />

//                 <div
//                   className="
//                     mt-10 h-[340px]
//                     animate-pulse
//                     bg-white/[0.025]
//                   "
//                 />
//               </div>

//               <div
//                 className="
//                   h-[520px]
//                   animate-pulse
//                   border border-white/10
//                   bg-white/[0.025]
//                 "
//               />
//             </div>
//           )}

//           {/* API error */}
//           {!loading && errorMessage && (
//             <div
//               role="alert"
//               className="
//                 flex min-h-[360px]
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
//                   max-w-[580px]
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

//                   void fetchBlogDetail(
//                     controller.signal,
//                   );
//                 }}
//                 className="
//                   mt-6 inline-flex
//                   items-center gap-3
//                   border border-[#b8863a]/50
//                   px-6 py-3
//                   text-[10px] font-semibold
//                   uppercase tracking-[0.2em]
//                   text-[#e6c583]
//                   transition-all duration-300
//                   hover:bg-[#b8863a]
//                   hover:text-[#080807]
//                 "
//               >
//                 <RefreshCw size={15} />
//                 Try Again
//               </button>

//               <Link
//                 href="/blog"
//                 className="
//                   mt-5 inline-flex
//                   items-center gap-3
//                   text-[9px] font-semibold
//                   uppercase tracking-[0.22em]
//                   text-white/45
//                   transition-colors
//                   hover:text-[#e6c583]
//                 "
//               >
//                 <FaArrowLeft size={12} />
//                 Back to Blog
//               </Link>
//             </div>
//           )}

//           {/* Dynamic blog detail */}
//           {!loading &&
//             !errorMessage &&
//             blog && (
//               <div
//                 className="
//                   grid grid-cols-1 gap-12
//                   lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]
//                   lg:items-start
//                   lg:gap-10
//                   xl:gap-14
//                 "
//               >
//                 {/* Left blog detail */}
//                 <motion.article
//                   initial={{
//                     opacity: 0,
//                     y: reduceMotion
//                       ? 0
//                       : 30,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   transition={{
//                     duration: reduceMotion
//                       ? 0.1
//                       : 0.8,
//                     ease: [
//                       0.16,
//                       1,
//                       0.3,
//                       1,
//                     ],
//                   }}
//                   className="min-w-0"
//                 >
//                   {/* API blog header */}
//                   <div className="mb-8">
//                     <h1
//                       className="
//                         max-w-[980px]
//                         font-serif font-medium
//                         text-[clamp(2.4rem,5vw,3rem)]
//                         leading-[1.04]
//                         tracking-[-0.04em]
//                         text-[#f3efe7]
//                       "
//                     >
//                       {blog.title}
//                     </h1>

//                     {blog.description && (
//                       <p
//                         className="
//                           mt-6 max-w-[850px]
//                           text-[14px]
//                           leading-[1.9]
//                           text-white/48
//                           sm:text-[15px]
//                         "
//                       >
//                         {blog.description}
//                       </p>
//                     )}
//                   </div>

//                   {/* API main image */}
//                   <div
//                     className="
//                       relative aspect-[16/9]
//                       overflow-hidden
//                       bg-[#141310]
//                     "
//                   >
//                     {blog.image_url ? (
//                       <img
//                         src={blog.image_url}
//                         alt={blog.title}
//                         className="
//                           h-full w-full
//                           object-cover
//                           transition-transform
//                           duration-[1200ms]
//                           hover:scale-[1.025]
//                         "
//                       />
//                     ) : (
//                       <div
//                         className="
//                           flex h-full
//                           items-center
//                           justify-center
//                           text-sm
//                           text-white/35
//                         "
//                       >
//                         Image unavailable
//                       </div>
//                     )}

//                     <div
//                       aria-hidden="true"
//                       className="
//                         pointer-events-none
//                         absolute inset-0
//                         bg-gradient-to-t
//                         from-black/35
//                         via-transparent
//                         to-black/10
//                       "
//                     />

//                     <span
//                       aria-hidden="true"
//                       className="
//                         pointer-events-none
//                         absolute inset-5
//                         border border-white/10
//                       "
//                     />

//                     <span
//                       aria-hidden="true"
//                       className="
//                         pointer-events-none
//                         absolute left-0 top-0
//                         h-16 w-16
//                         border-l-2 border-t-2
//                         border-[#b8863a]
//                       "
//                     />
//                   </div>

//                   {/* API body content */}
//                   <div
//                     className="
//                       blog-api-content
//                       mx-auto mt-10
//                       max-w-[900px]
//                       text-[14px]
//                       leading-[2]
//                       text-white/55
//                       sm:text-[15px]

//                       [&_a]:text-[#e6c583]
//                       [&_a]:underline

//                       [&_blockquote]:relative
//                       [&_blockquote]:my-10
//                       [&_blockquote]:border-l
//                       [&_blockquote]:border-[#b8863a]
//                       [&_blockquote]:bg-white/[0.025]
//                       [&_blockquote]:px-6
//                       [&_blockquote]:py-6
//                       [&_blockquote]:font-serif
//                       [&_blockquote]:text-xl
//                       [&_blockquote]:italic
//                       [&_blockquote]:text-[#e6c583]

//                       [&_h1]:mb-5
//                       [&_h1]:mt-10
//                       [&_h1]:font-serif
//                       [&_h1]:text-3xl
//                       [&_h1]:font-medium
//                       [&_h1]:text-[#f3efe7]

//                       [&_h2]:mb-5
//                       [&_h2]:mt-10
//                       [&_h2]:font-serif
//                       [&_h2]:text-[clamp(1.9rem,3vw,3rem)]
//                       [&_h2]:font-medium
//                       [&_h2]:leading-[1.15]
//                       [&_h2]:tracking-[-0.025em]
//                       [&_h2]:text-[#f3efe7]

//                       [&_h3]:mb-4
//                       [&_h3]:mt-8
//                       [&_h3]:font-serif
//                       [&_h3]:text-2xl
//                       [&_h3]:text-[#e6c583]

//                       [&_img]:my-10
//                       [&_img]:h-auto
//                       [&_img]:w-full

//                       [&_li]:mb-2
//                       [&_ol]:my-6
//                       [&_ol]:list-decimal
//                       [&_ol]:pl-6
//                       [&_p]:mb-7
//                       [&_strong]:text-white/80
//                       [&_ul]:my-6
//                       [&_ul]:list-disc
//                       [&_ul]:pl-6
//                     "
//                     dangerouslySetInnerHTML={{
//                       __html:
//                         blog.body?.trim() ||
//                         blog.description?.trim() ||
//                         "",
//                     }}
//                   />

//                   {/* Share and navigation */}
//                   <div
//                     className="
//                       mt-12 border-y
//                       border-white/10
//                       py-7
//                     "
//                   >
//                     <div
//                       className="
//                         flex flex-col gap-6
//                         sm:flex-row
//                         sm:items-center
//                         sm:justify-between
//                       "
//                     >
//                       <div
//                         className="
//                           flex items-center
//                           gap-4
//                         "
//                       >
//                         <span
//                           className="
//                             text-[8px]
//                             font-semibold
//                             uppercase
//                             tracking-[0.26em]
//                             text-white/35
//                           "
//                         >
//                           Share Article
//                         </span>

//                         <div
//                           className="
//                             flex items-center
//                             gap-2
//                           "
//                         >
//                           <a
//                             href={facebookShareUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             aria-label="Share on Facebook"
//                             className="
//                               flex h-9 w-9
//                               items-center
//                               justify-center
//                               rounded-full
//                               border
//                               border-white/15
//                               text-white/45
//                               transition-all
//                               duration-300
//                               hover:border-[#b8863a]
//                               hover:bg-[#b8863a]
//                               hover:text-[#080807]
//                             "
//                           >
//                             <FaFacebookF
//                               size={13}
//                             />
//                           </a>

//                           <a
//                             href={currentUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             aria-label="Open article"
//                             className="
//                               flex h-9 w-9
//                               items-center
//                               justify-center
//                               rounded-full
//                               border
//                               border-white/15
//                               text-white/45
//                               transition-all
//                               duration-300
//                               hover:border-[#b8863a]
//                               hover:bg-[#b8863a]
//                               hover:text-[#080807]
//                             "
//                           >
//                             <FaInstagram
//                               size={13}
//                             />
//                           </a>

//                           <a
//                             href={linkedInShareUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             aria-label="Share on LinkedIn"
//                             className="
//                               flex h-9 w-9
//                               items-center
//                               justify-center
//                               rounded-full
//                               border
//                               border-white/15
//                               text-white/45
//                               transition-all
//                               duration-300
//                               hover:border-[#b8863a]
//                               hover:bg-[#b8863a]
//                               hover:text-[#080807]
//                             "
//                           >
//                             <FaLinkedinIn
//                               size={13}
//                             />
//                           </a>
//                         </div>
//                       </div>

//                       <Link
//                         href="/blog"
//                         className="
//                           inline-flex
//                           items-center gap-3
//                           text-[9px]
//                           font-semibold
//                           uppercase
//                           tracking-[0.24em]
//                           text-[#e6c583]
//                           transition-colors
//                           duration-300
//                           hover:text-white
//                         "
//                       >
//                         <FaArrowLeft
//                           size={12}
//                         />

//                         Back to Blog
//                       </Link>
//                     </div>
//                   </div>
//                 </motion.article>

//                 {/* API latest blogs */}
//                 <motion.aside
//                   initial={{
//                     opacity: 0,
//                     x: reduceMotion
//                       ? 0
//                       : 30,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     x: 0,
//                   }}
//                   transition={{
//                     duration: reduceMotion
//                       ? 0.1
//                       : 0.8,
//                     delay: 0.12,
//                     ease: [
//                       0.16,
//                       1,
//                       0.3,
//                       1,
//                     ],
//                   }}
//                   className="
//                     lg:sticky
//                     lg:top-[120px]
//                     lg:self-start
//                   "
//                 >
//                   <div
//                     className="
//                       border
//                       border-white/10
//                       bg-[#0d0d0c]
//                       p-5
//                       sm:p-6
//                     "
//                   >
//                     <div
//                       className="
//                         mb-7 flex
//                         items-center
//                         justify-between
//                         gap-5
//                         border-b
//                         border-white/10
//                         pb-5
//                       "
//                     >
//                       <div>
//                         <span
//                           className="
//                             text-[8px]
//                             font-semibold
//                             uppercase
//                             tracking-[0.28em]
//                             text-[#b8863a]
//                           "
//                         >
//                           Continue Reading
//                         </span>

//                         <h2
//                           className="
//                             mt-2 font-serif
//                             text-2xl
//                             text-[#f3efe7]
//                           "
//                         >
//                           Latest Blogs
//                         </h2>
//                       </div>

//                       <span
//                         aria-hidden="true"
//                         className="
//                           h-2 w-2
//                           rotate-45
//                           bg-[#b8863a]
//                         "
//                       />
//                     </div>

//                     {latestBlogs.length ===
//                     0 ? (
//                       <p
//                         className="
//                           py-10 text-center
//                           text-xs
//                           leading-6
//                           text-white/40
//                         "
//                       >
//                         No latest blogs
//                         available.
//                       </p>
//                     ) : (
//                       <div className="space-y-5">
//                         {latestBlogs.map(
//                           (
//                             latestBlog,
//                             index,
//                           ) => {
//                             const detailUrl =
//                               `/blog-detail?slug=${encodeURIComponent(
//                                 latestBlog.slug,
//                               )}`;

//                             return (
//                               <Link
//                                 key={
//                                   latestBlog.id
//                                 }
//                                 href={
//                                   detailUrl
//                                 }
//                                 className="
//                                   group block
//                                   overflow-hidden
//                                   border
//                                   border-white/10
//                                   bg-[#11100e]
//                                   transition-all
//                                   duration-400
//                                   hover:-translate-y-1
//                                   hover:border-[#b8863a]/50
//                                   hover:shadow-[0_20px_55px_rgba(0,0,0,0.35)]
//                                 "
//                               >
//                                 <div
//                                   className="
//                                     relative
//                                     aspect-[16/9]
//                                     overflow-hidden
//                                     bg-[#15130f]
//                                   "
//                                 >
//                                   {latestBlog.image_url ? (
//                                     <img
//                                       src={
//                                         latestBlog.image_url
//                                       }
//                                       alt={
//                                         latestBlog.title
//                                       }
//                                       className="
//                                         h-full
//                                         w-full
//                                         object-cover
//                                         transition-transform
//                                         duration-[800ms]
//                                         group-hover:scale-[1.06]
//                                       "
//                                     />
//                                   ) : (
//                                     <div
//                                       className="
//                                         h-full
//                                         w-full
//                                         bg-white/[0.03]
//                                       "
//                                     />
//                                   )}

//                                   <div
//                                     aria-hidden="true"
//                                     className="
//                                       pointer-events-none
//                                       absolute inset-0
//                                       bg-gradient-to-t
//                                       from-black/70
//                                       via-transparent
//                                       to-black/10
//                                     "
//                                   />

//                                   <span
//                                     className="
//                                       absolute
//                                       right-4 top-4
//                                       flex h-8
//                                       w-8
//                                       items-center
//                                       justify-center
//                                       border
//                                       border-white/20
//                                       bg-black/35
//                                       font-serif
//                                       text-[11px]
//                                       text-white/65
//                                       backdrop-blur-md
//                                     "
//                                   >
//                                     {String(
//                                       index + 1,
//                                     ).padStart(
//                                       2,
//                                       "0",
//                                     )}
//                                   </span>
//                                 </div>

//                                 <div className="p-5">
//                                   <h3
//                                     className="
//                                       font-serif
//                                       text-[19px]
//                                       leading-[1.3]
//                                       text-[#f3efe7]
//                                       transition-colors
//                                       duration-300
//                                       group-hover:text-[#e6c583]
//                                     "
//                                   >
//                                     {
//                                       latestBlog.title
//                                     }
//                                   </h3>

//                                   <div
//                                     className="
//                                       mt-4 flex
//                                       items-center
//                                       justify-between
//                                       border-t
//                                       border-white/10
//                                       pt-4
//                                     "
//                                   >
//                                     <span
//                                       className="
//                                         text-[8px]
//                                         font-semibold
//                                         uppercase
//                                         tracking-[0.23em]
//                                         text-white/35
//                                         transition-colors
//                                         duration-300
//                                         group-hover:text-[#e6c583]
//                                       "
//                                     >
//                                       Read Article
//                                     </span>

//                                     <FaArrowRight
//                                       size={13}
//                                       className="
//                                         text-[#b8863a]
//                                         transition-transform
//                                         duration-300
//                                         group-hover:translate-x-1
//                                       "
//                                     />
//                                   </div>
//                                 </div>
//                               </Link>
//                             );
//                           },
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </motion.aside>
//               </div>
//             )}
//         </div>
//       </section>
//     </main>
//   );
// }

// function BlogDetailFallback() {
//   return (
//     <main
//       className="
//         flex min-h-screen
//         items-center
//         justify-center
//         bg-[#080807]
//       "
//     >
//       <div
//         className="
//           flex items-center
//           gap-3
//           text-[#e6c583]
//         "
//       >
//         <LoaderCircle
//           size={22}
//           className="animate-spin"
//         />

//         <span
//           className="
//             text-[10px]
//             font-semibold
//             uppercase
//             tracking-[0.24em]
//           "
//         >
//           Loading Blog
//         </span>
//       </div>
//     </main>
//   );
// }

// export default function BlogDetailPage() {
//   return (
//     <Suspense
//       fallback={
//         <BlogDetailFallback />
//       }
//     >
//       <BlogDetailContent />
//     </Suspense>
//   );
// }

"use client";

import {
  Suspense,
  useCallback,
  useEffect,
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
  FaArrowLeft,
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import Breadcrumb from "../components/Breadcrumb";
import aboutBreadcrumb from "@/app/assets/banner1.png";
import { apiUrl } from "../config";

/* =========================================================
   TYPES
========================================================= */

type BlogDetail = {
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

type LatestBlog = {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  image_url: string | null;
};

type BlogDetailApiResponse = {
  success: boolean;
  message: string;
  data: BlogDetail;
  latest_blogs: LatestBlog[];
};

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
      : "Unable to load blog details.";
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
    "Unable to load blog details."
  );
}

/* =========================================================
   HTML HELPERS
========================================================= */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeApiHtml(
  value: string | null,
): string {
  if (!value?.trim()) {
    return "";
  }

  const content = value.trim();

  /*
   * Check whether API content already contains HTML.
   * Example:
   * <p>Description</p>
   * <h2>Heading</h2>
   * <img src="..." />
   */
  const containsHtml =
    /<\/?[a-z][\s\S]*>/i.test(content);

  if (containsHtml) {
    return content;
  }

  /*
   * When API returns normal plain text,
   * safely convert it into paragraph HTML.
   */
  return `<p>${escapeHtml(content)}</p>`;
}

/* =========================================================
   BLOG DETAIL CONTENT
========================================================= */

function BlogDetailContent() {
  const reduceMotion = useReducedMotion();
  const searchParams = useSearchParams();

  const blogSlug =
    searchParams.get("slug")?.trim() || "";

  const [blog, setBlog] =
    useState<BlogDetail | null>(null);

  const [latestBlogs, setLatestBlogs] =
    useState<LatestBlog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [currentUrl, setCurrentUrl] =
    useState("");

  const abortControllerRef =
    useRef<AbortController | null>(null);

  /* =======================================================
     FETCH BLOG DETAILS
  ======================================================= */

  const fetchBlogDetail = useCallback(
    async (signal?: AbortSignal) => {
      if (!blogSlug) {
        setBlog(null);
        setLatestBlogs([]);
        setLoading(false);

        setErrorMessage(
          "Blog slug is missing from the URL.",
        );

        return;
      }

      setLoading(true);
      setErrorMessage("");

      try {
        const response =
          await axios.post<BlogDetailApiResponse>(
            `${apiUrl}/blogdetail`,
            {
              slug: blogSlug,
            },
            {
              signal,
              headers: {
                Accept: "application/json",
                "Content-Type":
                  "application/json",
              },
            },
          );

        if (
          !response.data.success ||
          !response.data.data
        ) {
          throw new Error(
            response.data.message ||
              "Invalid blog detail response received.",
          );
        }

        if (signal?.aborted) {
          return;
        }

        const blogData =
          response.data.data;

        setBlog(blogData);

        const latestBlogData =
          Array.isArray(
            response.data.latest_blogs,
          )
            ? response.data.latest_blogs.filter(
                (item) =>
                  item.slug !== blogData.slug,
              )
            : [];

        setLatestBlogs(latestBlogData);
      } catch (error: unknown) {
        if (
          signal?.aborted ||
          (axios.isAxiosError(error) &&
            error.code === "ERR_CANCELED")
        ) {
          return;
        }

        setBlog(null);
        setLatestBlogs([]);

        setErrorMessage(
          getApiErrorMessage(error),
        );
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [blogSlug],
  );

  /* =======================================================
     INITIAL API CALL
  ======================================================= */

  useEffect(() => {
    abortControllerRef.current?.abort();

    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    void fetchBlogDetail(
      controller.signal,
    );

    return () => {
      controller.abort();
    };
  }, [fetchBlogDetail]);

  /* =======================================================
     CURRENT PAGE URL
  ======================================================= */

  useEffect(() => {
    setCurrentUrl(
      window.location.href,
    );
  }, [blogSlug]);

  /* =======================================================
     DYNAMIC DOCUMENT TITLE
  ======================================================= */

  useEffect(() => {
    if (!blog) {
      return;
    }

    document.title =
      blog.meta_title?.trim() ||
      blog.title;
  }, [blog]);

  /* =======================================================
     SHARE URLS
  ======================================================= */

  const facebookShareUrl =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl,
    )}`;

  const linkedInShareUrl =
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl,
    )}`;

  /* =======================================================
     RETRY API
  ======================================================= */

  const handleRetry = () => {
    abortControllerRef.current?.abort();

    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    void fetchBlogDetail(
      controller.signal,
    );
  };

  return (
    <main className="overflow-hidden bg-[#080807]">
      <Breadcrumb
        title={
          blog?.title || "Blog Detail"
        }
        backgroundImage={
          aboutBreadcrumb
        }
        imagePosition="center"
        items={[
          {
            label: "Blog",
            href: "/blog",
          },
          {
            label:
              blog?.title ||
              "Blog Detail",
          },
        ]}
      />

      <section
        className="
          relative
          bg-[#080807]
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
            mx-auto
            w-full max-w-[1500px]
          "
        >
          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div
              aria-busy="true"
              aria-label="Loading blog details"
              className="
                grid grid-cols-1
                gap-12
                lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]
                lg:gap-10
                xl:gap-14
              "
            >
              <div>
                <div
                  className="
                    aspect-[16/9]
                    animate-pulse
                    bg-white/[0.04]
                  "
                />

                <div
                  className="
                    mt-10 h-14
                    w-3/4
                    animate-pulse
                    bg-white/[0.05]
                  "
                />

                <div
                  className="
                    mt-6 h-16
                    w-full max-w-[850px]
                    animate-pulse
                    bg-white/[0.035]
                  "
                />

                <div
                  className="
                    mt-10 h-[340px]
                    animate-pulse
                    bg-white/[0.025]
                  "
                />
              </div>

              <div
                className="
                  h-[520px]
                  animate-pulse
                  border border-white/10
                  bg-white/[0.025]
                "
              />
            </div>
          )}

          {/* =================================================
              API ERROR
          ================================================= */}

          {!loading &&
            errorMessage && (
              <div
                role="alert"
                className="
                  flex min-h-[360px]
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
                    !m-0
                    max-w-[580px]
                    !text-sm
                    !leading-7
                    !text-red-200
                  "
                >
                  {errorMessage}
                </p>

                <button
                  type="button"
                  onClick={
                    handleRetry
                  }
                  className="
                    mt-6
                    !inline-flex
                    !w-auto
                    items-center
                    gap-3
                    !border
                    !border-[#b8863a]/50
                    !bg-transparent
                    !px-6
                    !py-3
                    !text-[10px]
                    !font-semibold
                    !uppercase
                    !tracking-[0.2em]
                    !text-[#e6c583]
                    transition-all
                    duration-300
                    hover:!bg-[#b8863a]
                    hover:!text-[#080807]
                  "
                >
                  <RefreshCw size={15} />

                  Try Again
                </button>

                <Link
                  href="/blog"
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-3
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-white/45
                    transition-colors
                    hover:text-[#e6c583]
                  "
                >
                  <FaArrowLeft
                    size={12}
                  />

                  Back to Blog
                </Link>
              </div>
            )}

          {/* =================================================
              DYNAMIC BLOG DETAIL
          ================================================= */}

          {!loading &&
            !errorMessage &&
            blog && (
              <div
                className="
                  grid grid-cols-1
                  gap-12
                  lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]
                  lg:items-start
                  lg:gap-10
                  xl:gap-14
                "
              >
                {/* =============================================
                    LEFT BLOG DETAIL
                ============================================= */}

                <motion.article
                  initial={{
                    opacity: 0,
                    y: reduceMotion
                      ? 0
                      : 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0.1
                      : 0.8,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  className="min-w-0"
                >
                  {/* ===========================================
                      1. API MAIN IMAGE
                  =========================================== */}

                  <div
                    className="
                      relative
                      aspect-[16/9]
                      overflow-hidden
                      bg-[#141310]
                    "
                  >
                    {blog.image_url ? (
                      <img
                        src={
                          blog.image_url
                        }
                        alt={blog.title}
                        loading="eager"
                        className="
                          h-full w-full
                          object-cover
                          transition-transform
                          duration-[1200ms]
                          hover:scale-[1.025]
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex h-full
                          w-full
                          items-center
                          justify-center
                          text-sm
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
                        from-black/40
                        via-transparent
                        to-black/10
                      "
                    />

                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute inset-4
                        border border-white/10
                        sm:inset-5
                      "
                    />

                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute left-0 top-0
                        h-12 w-12
                        border-l-2
                        border-t-2
                        border-[#b8863a]
                        sm:h-16 sm:w-16
                      "
                    />
                  </div>

                  {/* ===========================================
                      2. API TITLE
                  =========================================== */}

                  <div
                    className="
                      mt-8
                      sm:mt-10
                      lg:mt-12
                    "
                  >
                    <h1
                      className="
                        !m-0
                        max-w-[980px]
                        !font-serif
                        text-[20px] lg:text-[40px]
                        !font-medium
                        !leading-[1.04]
                        !tracking-[-0.04em]
                        !text-[#f3efe7]
                      "
                    >
                      {blog.title}
                    </h1>

                    {/* =========================================
                        3. API DESCRIPTION HTML
                    ========================================= */}

                    {blog.description?.trim() && (
                      <div
                        className="
                          blog-api-description
                          mt-5
                          max-w-[900px]
                          text-white/50
                          sm:mt-6

                          [&_a]:!text-[#e6c583]
                          [&_a]:!underline
                          [&_a]:!underline-offset-4

                          [&_b]:!font-semibold
                          [&_b]:!text-white/85

                          [&_br]:block

                          [&_p]:!mb-5
                          [&_p]:!mt-0
                          [&_p]:!font-sans
                          [&_p]:!text-[clamp(0.875rem,1vw,1rem)]
                          [&_p]:!font-normal
                          [&_p]:!leading-[1.9]
                          [&_p]:!tracking-[0.01em]
                          [&_p]:!text-white/50

                          [&_p:last-child]:!mb-0

                          [&_strong]:!font-semibold
                          [&_strong]:!text-white/85
                        "
                        dangerouslySetInnerHTML={{
                          __html:
                            normalizeApiHtml(
                              blog.description,
                            ),
                        }}
                      />
                    )}
                  </div>

                  {/* ===========================================
                      4. API BODY HTML
                  =========================================== */}

                  {blog.body?.trim() && (
                    <div
                      className="
                        blog-api-content
                        mt-9
                        max-w-[900px]
                        border-t
                        border-white/10
                        pt-9
                        text-white/55
                        sm:mt-12
                        sm:pt-12

                        [&>*:first-child]:!mt-0
                        [&>*:last-child]:!mb-0

                        [&_a]:!text-[#e6c583]
                        [&_a]:!underline
                        [&_a]:!decoration-1
                        [&_a]:!underline-offset-4

                        [&_b]:!font-semibold
                        [&_b]:!text-white/85

                        [&_blockquote]:!relative
                        [&_blockquote]:!my-10
                        [&_blockquote]:!border-l-2
                        [&_blockquote]:!border-[#b8863a]
                        [&_blockquote]:!bg-white/[0.025]
                        [&_blockquote]:!px-5
                        [&_blockquote]:!py-6
                        [&_blockquote]:!font-serif
                        [&_blockquote]:!text-[clamp(1.35rem,2.5vw,2rem)]
                        [&_blockquote]:!italic
                        [&_blockquote]:!leading-[1.5]
                        [&_blockquote]:!text-[#e6c583]
                        sm:[&_blockquote]:!px-8
                        sm:[&_blockquote]:!py-8

                        [&_blockquote_p]:!m-0
                        [&_blockquote_p]:!font-inherit
                        [&_blockquote_p]:!text-inherit
                        [&_blockquote_p]:!leading-inherit
                        [&_blockquote_p]:!text-inherit

                        [&_figcaption]:!mt-3
                        [&_figcaption]:!text-center
                        [&_figcaption]:!text-xs
                        [&_figcaption]:!leading-6
                        [&_figcaption]:!text-white/35

                        [&_figure]:!my-8
                        [&_figure]:!w-full
                        sm:[&_figure]:!my-10
                        lg:[&_figure]:!my-14

                        [&_figure_img]:!m-0

                        [&_h1]:!mb-5
                        [&_h1]:!mt-10
                        [&_h1]:!font-serif
                        [&_h1]:!text-[clamp(2rem,4vw,3.75rem)]
                        [&_h1]:!font-medium
                        [&_h1]:!leading-[1.05]
                        [&_h1]:!tracking-[-0.035em]
                        [&_h1]:!text-[#f3efe7]

                        [&_h2]:!mb-5
                        [&_h2]:!mt-10
                        [&_h2]:!font-serif
                        [&_h2]:!text-[clamp(1.8rem,3.5vw,3.2rem)]
                        [&_h2]:!font-medium
                        [&_h2]:!leading-[1.1]
                        [&_h2]:!tracking-[-0.025em]
                        [&_h2]:!text-[#f3efe7]

                        [&_h3]:!mb-4
                        [&_h3]:!mt-8
                        [&_h3]:!font-serif
                        [&_h3]:!text-[clamp(1.5rem,2.5vw,2.25rem)]
                        [&_h3]:!font-medium
                        [&_h3]:!leading-[1.2]
                        [&_h3]:!text-[#e6c583]

                        [&_h4]:!mb-4
                        [&_h4]:!mt-8
                        [&_h4]:!font-serif
                        [&_h4]:!text-[clamp(1.25rem,2vw,1.75rem)]
                        [&_h4]:!font-medium
                        [&_h4]:!leading-[1.3]
                        [&_h4]:!text-[#f3efe7]

                        [&_h5]:!mb-3
                        [&_h5]:!mt-7
                        [&_h5]:!font-serif
                        [&_h5]:!text-[clamp(1.15rem,1.8vw,1.5rem)]
                        [&_h5]:!font-medium
                        [&_h5]:!text-[#f3efe7]

                        [&_h6]:!mb-3
                        [&_h6]:!mt-7
                        [&_h6]:!font-serif
                        [&_h6]:!text-[clamp(1rem,1.5vw,1.25rem)]
                        [&_h6]:!font-medium
                        [&_h6]:!text-[#e6c583]

                        [&_iframe]:!my-8
                        [&_iframe]:!aspect-video
                        [&_iframe]:!h-auto
                        [&_iframe]:!w-full
                        [&_iframe]:!max-w-full
                        [&_iframe]:!border-0
                        sm:[&_iframe]:!my-10
                        lg:[&_iframe]:!my-14

                        [&_img]:!my-8
                        [&_img]:!block
                        [&_img]:!h-auto
                        [&_img]:!w-full
                        [&_img]:!max-w-full
                        [&_img]:!object-cover
                        sm:[&_img]:!my-10
                        lg:[&_img]:!my-14

                        [&_li]:!mb-3
                        [&_li]:!pl-1
                        [&_li]:!font-sans
                        [&_li]:!text-[clamp(0.875rem,1vw,1rem)]
                        [&_li]:!leading-[1.8]
                        [&_li]:!text-white/55

                        [&_li::marker]:!text-[#b8863a]

                        [&_ol]:!my-6
                        [&_ol]:!list-decimal
                        [&_ol]:!pl-6

                        [&_p]:!mb-7
                        [&_p]:!mt-0
                        [&_p]:!font-sans
                        [&_p]:!text-[clamp(0.875rem,1vw,1rem)]
                        [&_p]:!font-normal
                        [&_p]:!leading-[2]
                        [&_p]:!tracking-[0.01em]
                        [&_p]:!text-white/55

                        [&_strong]:!font-semibold
                        [&_strong]:!text-white/85

                        [&_table]:!my-8
                        [&_table]:!w-full
                        [&_table]:!border-collapse
                        [&_table]:!overflow-hidden

                        [&_td]:!border
                        [&_td]:!border-white/10
                        [&_td]:!p-3
                        [&_td]:!text-sm
                        [&_td]:!leading-6
                        [&_td]:!text-white/55

                        [&_th]:!border
                        [&_th]:!border-white/10
                        [&_th]:!bg-white/[0.04]
                        [&_th]:!p-3
                        [&_th]:!text-left
                        [&_th]:!text-sm
                        [&_th]:!font-semibold
                        [&_th]:!text-[#e6c583]

                        [&_ul]:!my-6
                        [&_ul]:!list-disc
                        [&_ul]:!pl-6

                        [&_video]:!my-8
                        [&_video]:!h-auto
                        [&_video]:!w-full
                        [&_video]:!max-w-full
                        sm:[&_video]:!my-10
                        lg:[&_video]:!my-14
                      "
                      dangerouslySetInnerHTML={{
                        __html:
                          normalizeApiHtml(
                            blog.body,
                          ),
                      }}
                    />
                  )}

                  {/* ===========================================
                      SHARE AND NAVIGATION
                  =========================================== */}

                  <div
                    className="
                      mt-12
                      border-y
                      border-white/10
                      py-7
                    "
                  >
                    <div
                      className="
                        flex flex-col
                        gap-6
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >
                      <div
                        className="
                          flex items-center
                          gap-4
                        "
                      >
                        <span
                          className="
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.26em]
                            text-white/35
                          "
                        >
                          Share Article
                        </span>

                        <div
                          className="
                            flex items-center
                            gap-2
                          "
                        >
                          <a
                            href={
                              facebookShareUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Facebook"
                            className="
                              flex h-9 w-9
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-white/15
                              text-white/45
                              transition-all
                              duration-300
                              hover:border-[#b8863a]
                              hover:bg-[#b8863a]
                              hover:text-[#080807]
                            "
                          >
                            <FaFacebookF
                              size={13}
                            />
                          </a>

                          <a
                            href={currentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open article"
                            className="
                              flex h-9 w-9
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-white/15
                              text-white/45
                              transition-all
                              duration-300
                              hover:border-[#b8863a]
                              hover:bg-[#b8863a]
                              hover:text-[#080807]
                            "
                          >
                            <FaInstagram
                              size={13}
                            />
                          </a>

                          <a
                            href={
                              linkedInShareUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on LinkedIn"
                            className="
                              flex h-9 w-9
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-white/15
                              text-white/45
                              transition-all
                              duration-300
                              hover:border-[#b8863a]
                              hover:bg-[#b8863a]
                              hover:text-[#080807]
                            "
                          >
                            <FaLinkedinIn
                              size={13}
                            />
                          </a>
                        </div>
                      </div>

                      <Link
                        href="/blog"
                        className="
                          inline-flex
                          items-center
                          gap-3
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.24em]
                          text-[#e6c583]
                          transition-colors
                          duration-300
                          hover:text-white
                        "
                      >
                        <FaArrowLeft
                          size={12}
                        />

                        Back to Blog
                      </Link>
                    </div>
                  </div>
                </motion.article>

                {/* =============================================
                    RIGHT SIDE LATEST BLOGS
                ============================================= */}

                <motion.aside
                  initial={{
                    opacity: 0,
                    x: reduceMotion
                      ? 0
                      : 30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0.1
                      : 0.8,
                    delay: 0.12,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  className="
                    lg:sticky
                    lg:top-[120px]
                    lg:self-start
                  "
                >
                  <div
                    className="
                      border
                      border-white/10
                      bg-[#0d0d0c]
                      p-5
                      sm:p-6
                    "
                  >
                    <div
                      className="
                        mb-7
                        flex items-center
                        justify-between
                        gap-5
                        border-b
                        border-white/10
                        pb-5
                      "
                    >
                      <div>
                        <span
                          className="
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.28em]
                            text-[#b8863a]
                          "
                        >
                          Continue Reading
                        </span>

                        <h2
                          className="
                            !mb-0
                            !mt-2
                            !font-serif
                            !text-2xl
                            !font-medium
                            !leading-tight
                            !tracking-normal
                            !text-[#f3efe7]
                          "
                        >
                          Latest Blogs
                        </h2>
                      </div>

                      <span
                        aria-hidden="true"
                        className="
                          h-2 w-2
                          rotate-45
                          bg-[#b8863a]
                        "
                      />
                    </div>

                    {latestBlogs.length ===
                    0 ? (
                      <p
                        className="
                          !m-0
                          py-10
                          text-center
                          !text-xs
                          !leading-6
                          !text-white/40
                        "
                      >
                        No latest blogs
                        available.
                      </p>
                    ) : (
                      <div className="space-y-5">
                        {latestBlogs.map(
                          (
                            latestBlog,
                            index,
                          ) => {
                            const detailUrl =
                              `/blog-detail?slug=${encodeURIComponent(
                                latestBlog.slug,
                              )}`;

                            return (
                              <Link
                                key={
                                  latestBlog.id
                                }
                                href={
                                  detailUrl
                                }
                                className="
                                  group block
                                  overflow-hidden
                                  border
                                  border-white/10
                                  bg-[#11100e]
                                  transition-all
                                  duration-300
                                  hover:-translate-y-1
                                  hover:border-[#b8863a]/50
                                  hover:shadow-[0_20px_55px_rgba(0,0,0,0.35)]
                                "
                              >
                                {/* Latest blog image */}

                                <div
                                  className="
                                    relative
                                    aspect-[16/9]
                                    overflow-hidden
                                    bg-[#15130f]
                                  "
                                >
                                  {latestBlog.image_url ? (
                                    <img
                                      src={
                                        latestBlog.image_url
                                      }
                                      alt={
                                        latestBlog.title
                                      }
                                      loading="lazy"
                                      className="
                                        h-full
                                        w-full
                                        object-cover
                                        transition-transform
                                        duration-[800ms]
                                        group-hover:scale-[1.06]
                                      "
                                    />
                                  ) : (
                                    <div
                                      className="
                                        flex h-full
                                        w-full
                                        items-center
                                        justify-center
                                        bg-white/[0.03]
                                        text-xs
                                        text-white/25
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
                                      via-transparent
                                      to-black/10
                                    "
                                  />

                                  <span
                                    className="
                                      absolute
                                      right-4 top-4
                                      flex h-8
                                      w-8
                                      items-center
                                      justify-center
                                      border
                                      border-white/20
                                      bg-black/35
                                      font-serif
                                      text-[11px]
                                      text-white/65
                                      backdrop-blur-md
                                    "
                                  >
                                    {String(
                                      index + 1,
                                    ).padStart(
                                      2,
                                      "0",
                                    )}
                                  </span>
                                </div>

                                {/* Latest blog title */}

                                <div className="p-5">
                                  <h3
                                    className="
                                      !m-0
                                      !font-serif
                                      !text-[19px]
                                      !font-medium
                                      !leading-[1.3]
                                      !tracking-normal
                                      !text-[#f3efe7]
                                      transition-colors
                                      duration-300
                                      group-hover:!text-[#e6c583]
                                    "
                                  >
                                    {
                                      latestBlog.title
                                    }
                                  </h3>

                                  <div
                                    className="
                                      mt-4
                                      flex items-center
                                      justify-between
                                      border-t
                                      border-white/10
                                      pt-4
                                    "
                                  >
                                    <span
                                      className="
                                        text-[8px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.23em]
                                        text-white/35
                                        transition-colors
                                        duration-300
                                        group-hover:text-[#e6c583]
                                      "
                                    >
                                      Read Article
                                    </span>

                                    <FaArrowRight
                                      size={13}
                                      className="
                                        text-[#b8863a]
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                      "
                                    />
                                  </div>
                                </div>
                              </Link>
                            );
                          },
                        )}
                      </div>
                    )}
                  </div>
                </motion.aside>
              </div>
            )}
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   SUSPENSE FALLBACK
========================================================= */

function BlogDetailFallback() {
  return (
    <main
      className="
        flex min-h-screen
        items-center
        justify-center
        bg-[#080807]
      "
    >
      <div
        className="
          flex items-center
          gap-3
          text-[#e6c583]
        "
      >
        <LoaderCircle
          size={22}
          className="animate-spin"
        />

        <span
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.24em]
          "
        >
          Loading Blog
        </span>
      </div>
    </main>
  );
}

/* =========================================================
   PAGE EXPORT
========================================================= */

export default function BlogDetailPage() {
  return (
    <Suspense
      fallback={
        <BlogDetailFallback />
      }
    >
      <BlogDetailContent />
    </Suspense>
  );
}