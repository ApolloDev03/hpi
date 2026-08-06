

// "use client";

// import Image, { StaticImageData } from "next/image";
// import Link from "next/link";
// import { motion, useReducedMotion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import Reveal from "../components/Reveal";
// import home1 from "../assets/blog2.webp";
// import home2 from "../assets/blog3.webp";
// import home3 from "../assets/blog3.webp";
// import home4 from "../assets/corporate1.webp";
// import home5 from "../assets/hospital2.webp";
// import home6 from "../assets/home2.webp";
// import Breadcrumb from "@/app/components/Breadcrumb";
// import banner from "../assets/banner1.png"
// type ProjectItem = {
//   id: number;
//   name: string;
//   image: StaticImageData;
//   href: string;
// };

// const homeProjects: ProjectItem[] = [
//   {
//     id: 1,
//     name: "Vira Residence",
//     image: home1,
//     href: "/product-detail",
//   },
//   {
//     id: 2,
//     name: "The Linden House",
//     image: home2,
//     href: "/product-detail",
//   },
//   {
//     id: 3,
//     name: "Kavi Bungalow",
//     image: home3,
//     href: "/product-detail",
//   },
//   {
//     id: 4,
//     name: "Aarambh Residence",
//     image: home4,
//     href: "/product-detail",
//   },
//   {
//     id: 5,
//     name: "The Courtyard Home",
//     image: home5,
//     href: "/product-detail",
//   },
//   {
//     id: 6,
//     name: "Serene Villa",
//     image: home6,
//     href: "/product-detail",
//   },
// ];
// export default function HomeProjects() {
//   const reduceMotion = useReducedMotion();

//   return (
//      <main className="overflow-hidden bg-[#080807]">
//        <Breadcrumb
//   title="Home Projects"
//   backgroundImage={banner}
//   imagePosition="center"
//   items={[
//     {
//       label: "Projects",
//       href: "/#projects",
//     },
//     {
//       label: "Home",
//     },
//   ]}
// />
//     <section
//       id="home-projects"
//       className="
//         relative overflow-hidden
//         bg-[#080807]
//         px-5 py-20
//         sm:px-8 sm:py-24
//         lg:px-[5vw] lg:py-[100px]
//       "
//     >
//       {/* Background glow */}
//       <div
//         aria-hidden="true"
//         className="
//           pointer-events-none
//           absolute -left-48 top-1/3
//           h-[460px] w-[460px]
//           rounded-full
//           bg-[#b8863a]/[0.045]
//           blur-[165px]
//         "
//       />

//       <div
//         aria-hidden="true"
//         className="
//           pointer-events-none
//           absolute -right-40 bottom-0
//           h-[400px] w-[400px]
//           rounded-full
//           bg-[#b8863a]/[0.035]
//           blur-[150px]
//         "
//       />

//       {/* Top decorative line */}
//       <span
//         aria-hidden="true"
//         className="
//           pointer-events-none
//           absolute right-0 top-0
//           h-px w-[42%]
//           bg-gradient-to-l
//           from-[#b8863a]/60
//           to-transparent
//         "
//       />

//       <div
//         className="
//           relative z-10
//           mx-auto w-full
//           max-w-[1500px]
//         "
//       >
//         {/* Heading */}
//         <Reveal>
//           <div
//             className="
//               mb-12 grid grid-cols-1
//               gap-8
//               md:mb-16
//               lg:grid-cols-[0.82fr_1.18fr]
//               lg:items-end
//               lg:gap-16
//             "
//           >
//             <div>
//               <div className="mb-5 flex items-center gap-4">
//                 <span className="h-px w-10 bg-[#b8863a]" />

//                 <span
//                   className="
//                     text-[10px] font-semibold
//                     uppercase tracking-[0.34em]
//                     text-[#d5a84f]
//                   "
//                 >
//                   Residential Interiors
//                 </span>
//               </div>

//               <h1
//                 className="
//                   font-serif
//                   text-[clamp(2.8rem,6vw,5.4rem)]
//                   font-medium
//                   leading-[0.96]
//                   tracking-[-0.045em]
//                   text-[#f3efe7]
//                 "
//               >
//                 Home
//                 <br />

//                 <em
//                   className="
//                     font-medium italic
//                     text-[#e6c583]
//                   "
//                 >
//                   Projects.
//                 </em>
//               </h1>
//             </div>

//             <div
//               className="
//                 flex max-w-[590px]
//                 items-start gap-7
//                 lg:pb-2
//               "
//             >
//               <span
//                 aria-hidden="true"
//                 className="
//                   mt-1 hidden
//                   h-[70px] w-px
//                   shrink-0
//                   bg-[#b8863a]
//                   sm:block
//                 "
//               />

//               <p
//                 className="
//                   max-w-[500px]
//                   text-[13px]
//                   leading-[1.9]
//                   text-white/48
//                   sm:text-[14px]
//                 "
//               >
//                 Explore thoughtfully designed homes shaped
//                 around comfort, natural light, functionality
//                 and the everyday lives of the people who
//                 inhabit them.
//               </p>
//             </div>
//           </div>
//         </Reveal>

//         {/* Project count */}
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: reduceMotion ? 0 : 18,
//           }}
//           whileInView={{
//             opacity: 1,
//             y: 0,
//           }}
//           viewport={{
//             once: true,
//           }}
//           transition={{
//             duration: 0.7,
//             ease: [0.16, 1, 0.3, 1],
//           }}
//           className="
//             mb-10 flex
//             items-center justify-between
//             border-y border-white/10
//             py-5
//           "
//         >
//           <span
//             className="
//               text-[9px] font-semibold
//               uppercase tracking-[0.27em]
//               text-[#e6c583]
//             "
//           >
//             Selected Residential Work
//           </span>

//           <span
//             className="
//               text-[8px] font-semibold
//               uppercase tracking-[0.25em]
//               text-white/30
//             "
//           >
//             {String(homeProjects.length).padStart(2, "0")} Projects
//           </span>
//         </motion.div>

//         {/* Home project listing */}
//         <div
//           className="
//             grid grid-cols-1
//             gap-x-7 gap-y-10
//             md:grid-cols-2
//             xl:grid-cols-3
//             xl:gap-x-8
//             xl:gap-y-12
//           "
//         >
//           {homeProjects.map((project, index) => (
//             <motion.article
//               key={project.id}
//               initial={{
//                 opacity: 0,
//                 y: reduceMotion ? 0 : 34,
//               }}
//               whileInView={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               viewport={{
//                 once: true,
//                 amount: 0.15,
//               }}
//               transition={{
//                 duration: reduceMotion ? 0.1 : 0.7,
//                 delay: reduceMotion ? 0 : index * 0.08,
//                 ease: [0.16, 1, 0.3, 1],
//               }}
//               className="
//                 group relative
//                 overflow-hidden
//                 border border-white/10
//                 bg-[#0d0d0c]
//                 shadow-[0_26px_75px_rgba(0,0,0,0.3)]
//                 transition-all duration-500

//                 hover:-translate-y-1
//                 hover:border-[#b8863a]/45
//                 hover:shadow-[0_35px_95px_rgba(0,0,0,0.42)]
//               "
//             >
//               <Link
//                 href={project.href}
//                 className="block"
//                 aria-label={`View ${project.name}`}
//               >
//                 {/* Project image */}
//                 <div
//                   className="
//                     relative aspect-[4/3]
//                     overflow-hidden
//                     bg-[#15130f]
//                   "
//                 >
//                   <Image
//                     src={project.image}
//                     alt={project.name}
//                     fill
//                     priority={index < 3}
//                     sizes="
//                       (max-width: 768px) 100vw,
//                       (max-width: 1280px) 50vw,
//                       33vw
//                     "
//                     className="
//                       object-cover
//                       transition-transform
//                       duration-[1100ms]
//                       ease-[cubic-bezier(0.16,1,0.3,1)]

//                       group-hover:scale-[1.055]
//                     "
//                   />

//                   <div
//                     aria-hidden="true"
//                     className="
//                       pointer-events-none
//                       absolute inset-0
//                       bg-gradient-to-t
//                       from-black/65
//                       via-black/5
//                       to-black/10
//                     "
//                   />

//                   {/* Project number */}
//                   <span
//                     className="
//                       absolute left-5 top-5
//                       flex h-9 min-w-9
//                       items-center justify-center
//                       border border-white/20
//                       bg-black/25
//                       px-2
//                       text-[8px] font-semibold
//                       tracking-[0.18em]
//                       text-white/65
//                       backdrop-blur-md
//                     "
//                   >
//                     {String(index + 1).padStart(2, "0")}
//                   </span>

//                   {/* View arrow */}
//                   <span
//                     className="
//                       absolute right-5 top-5
//                       flex h-11 w-11
//                       items-center justify-center
//                       border border-white/20
//                       bg-black/25
//                       text-white/65
//                       backdrop-blur-md
//                       transition-all duration-400

//                       group-hover:border-[#b8863a]
//                       group-hover:bg-[#b8863a]
//                       group-hover:text-[#080807]
//                     "
//                   >
//                     <ArrowRight
//                       size={19}
//                       strokeWidth={1.4}
//                       className="
//                         -rotate-45
//                         transition-transform duration-400

//                         group-hover:translate-x-0.5
//                         group-hover:-translate-y-0.5
//                       "
//                     />
//                   </span>

//                   {/* Inner border */}
//                   <span
//                     aria-hidden="true"
//                     className="
//                       pointer-events-none
//                       absolute inset-4
//                       border border-white/0
//                       transition-all duration-500

//                       group-hover:border-white/15
//                     "
//                   />
//                 </div>

//                 {/* Project title */}
//                 <div
//                   className="
//                     relative
//                     bg-[linear-gradient(180deg,#11110f_0%,#0b0b0a_100%)]
//                     px-6 py-6
//                     sm:px-7
//                   "
//                 >
//                   <span
//                     aria-hidden="true"
//                     className="
//                       mb-4 block
//                       h-px w-8
//                       bg-[#b8863a]
//                       transition-all duration-500

//                       group-hover:w-14
//                     "
//                   />

//                   <h2
//                     className="
//                       font-serif
//                       text-[clamp(1.5rem,2.2vw,2.15rem)]
//                       leading-[1.15]
//                       tracking-[-0.02em]
//                       text-[#f3efe7]
//                       transition-colors duration-400

//                       group-hover:text-[#e6c583]
//                     "
//                   >
//                     {project.name}
//                   </h2>

//                   <div
//                     className="
//                       mt-5 flex
//                       items-center justify-between
//                     "
//                   >
//                     <span
//                       className="
//                         text-[9px] font-semibold
//                         uppercase tracking-[0.24em]
//                         text-[#c9973d]
//                       "
//                     >
//                       View Project
//                     </span>

//                     <ArrowRight
//                       size={18}
//                       strokeWidth={1.4}
//                       className="
//                         text-[#c9973d]
//                         transition-transform duration-400

//                         group-hover:translate-x-1.5
//                       "
//                     />
//                   </div>

//                   <span
//                     aria-hidden="true"
//                     className="
//                       pointer-events-none
//                       absolute bottom-0 left-0
//                       h-[2px] w-0
//                       bg-[#b8863a]
//                       transition-all duration-500

//                       group-hover:w-full
//                     "
//                   />
//                 </div>
//               </Link>
//             </motion.article>
//           ))}
//         </div>
//       </div>
//     </section>
//      </main>
//   );
// }

/* eslint-disable @next/next/no-img-element */

// "use client";

// import {
//   Suspense,
//   useCallback,
//   useEffect,
//   useMemo,
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
//   ArrowLeft,
//   ArrowRight,
//   LoaderCircle,
//   RefreshCw,
// } from "lucide-react";

// import Reveal from "../components/Reveal";
// import Breadcrumb from "@/app/components/Breadcrumb";
// import banner from "../assets/banner1.png";
// import { apiUrl } from "../config";

// const PER_PAGE = 10;

// type PhotoGalleryItem = {
//   title: string;
//   slug: string;
//   image_url: string;
//   description: string | null;
// };

// type ApiPagination = {
//   total: number;
//   per_page: number | string;
//   current_page: number | string;
//   last_page: number;
//   from: number | null;
//   to: number | null;
// };

// type CategoryProjectApiResponse = {
//   success: boolean;
//   message: string;
//   data: {
//     photo_gallery: PhotoGalleryItem[];
//   };
//   pagination: ApiPagination;
// };

// type PaginationState = {
//   total: number;
//   perPage: number;
//   currentPage: number;
//   lastPage: number;
//   from: number | null;
//   to: number | null;
// };

// const INITIAL_PAGINATION: PaginationState = {
//   total: 0,
//   perPage: PER_PAGE,
//   currentPage: 1,
//   lastPage: 1,
//   from: null,
//   to: null,
// };

// function formatCategoryTitle(slug: string): string {
//   if (!slug.trim()) {
//     return "Projects";
//   }

//   return slug
//     .replace(/[-_]+/g, " ")
//     .trim()
//     .split(/\s+/)
//     .map(
//       (word) =>
//         word.charAt(0).toUpperCase() +
//         word.slice(1).toLowerCase(),
//     )
//     .join(" ");
// }

// function getApiErrorMessage(error: unknown): string {
//   if (!axios.isAxiosError(error)) {
//     return error instanceof Error && error.message
//       ? error.message
//       : "Unable to load projects.";
//   }

//   const responseMessage = error.response?.data?.message;

//   if (
//     typeof responseMessage === "string" &&
//     responseMessage.trim()
//   ) {
//     return responseMessage;
//   }

//   return error.message || "Unable to load projects.";
// }

// function ProductProjectsContent() {
//   const reduceMotion = useReducedMotion();
//   const searchParams = useSearchParams();

//   const categorySlug =
//     searchParams.get("slug")?.trim() || "home";

//   const categoryTitle = useMemo(
//     () => formatCategoryTitle(categorySlug),
//     [categorySlug],
//   );

//   const [projects, setProjects] = useState<
//     PhotoGalleryItem[]
//   >([]);

//   const [pagination, setPagination] =
//     useState<PaginationState>(
//       INITIAL_PAGINATION,
//     );

//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] =
//     useState("");

//   const requestController =
//     useRef<AbortController | null>(null);

//   const fetchProjects = useCallback(
//     async (
//       page: number,
//       options?: {
//         scrollToListing?: boolean;
//       },
//     ) => {
//       requestController.current?.abort();

//       const controller = new AbortController();
//       requestController.current = controller;

//       setLoading(true);
//       setErrorMessage("");

//       try {
//         const response =
//           await axios.post<CategoryProjectApiResponse>(
//             `${apiUrl}/category_project`,
//             {
//               category_slug: categorySlug,
//               page: String(page),
//               per_page: String(PER_PAGE),
//             },
//             {
//               signal: controller.signal,
//               headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//               },
//             },
//           );

//         if (
//           !response.data.success ||
//           !response.data.data ||
//           !Array.isArray(
//             response.data.data.photo_gallery,
//           )
//         ) {
//           throw new Error(
//             response.data.message ||
//               "Invalid project response received.",
//           );
//         }

//         if (controller.signal.aborted) {
//           return;
//         }

//         const apiPagination =
//           response.data.pagination;

//         setProjects(
//           response.data.data.photo_gallery,
//         );

//         setPagination({
//           total: Number(apiPagination.total) || 0,
//           perPage:
//             Number(apiPagination.per_page) ||
//             PER_PAGE,
//           currentPage:
//             Number(apiPagination.current_page) ||
//             page,
//           lastPage:
//             Number(apiPagination.last_page) || 1,
//           from:
//             apiPagination.from === null
//               ? null
//               : Number(apiPagination.from),
//           to:
//             apiPagination.to === null
//               ? null
//               : Number(apiPagination.to),
//         });

//         if (options?.scrollToListing) {
//           window.requestAnimationFrame(() => {
//             document
//               .getElementById("project-listing")
//               ?.scrollIntoView({
//                 behavior: "smooth",
//                 block: "start",
//               });
//           });
//         }
//       } catch (error: unknown) {
//         if (
//           controller.signal.aborted ||
//           (axios.isAxiosError(error) &&
//             error.code === "ERR_CANCELED")
//         ) {
//           return;
//         }

//         setProjects([]);
//         setPagination(INITIAL_PAGINATION);
//         setErrorMessage(
//           getApiErrorMessage(error),
//         );
//       } finally {
//         if (!controller.signal.aborted) {
//           setLoading(false);
//         }
//       }
//     },
//     [categorySlug],
//   );

//   useEffect(() => {
//     void fetchProjects(1);

//     return () => {
//       requestController.current?.abort();
//     };
//   }, [fetchProjects]);

//   const changePage = (page: number) => {
//     if (
//       loading ||
//       page < 1 ||
//       page > pagination.lastPage ||
//       page === pagination.currentPage
//     ) {
//       return;
//     }

//     void fetchProjects(page, {
//       scrollToListing: true,
//     });
//   };

//   const visiblePages = useMemo(() => {
//     const pages: number[] = [];
//     const maxVisiblePages = 5;

//     let startPage = Math.max(
//       1,
//       pagination.currentPage -
//         Math.floor(maxVisiblePages / 2),
//     );

//     const endPage = Math.min(
//       pagination.lastPage,
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
//   }, [
//     pagination.currentPage,
//     pagination.lastPage,
//   ]);

//   return (
//     <main className="overflow-hidden bg-[#080807]">
//       <Breadcrumb
//         title={`${categoryTitle}`}
//         backgroundImage={banner}
//         imagePosition="center"
//         items={[
//           {
//             label: "Projects",
//           },
//           {
//             label: categoryTitle,
//           },
//         ]}
//       />

//       <section
//         id="home-projects"
//         className="
//           relative overflow-hidden
//           bg-[#080807]
//           px-5 py-20
//           sm:px-8 sm:py-24
//           lg:px-[5vw] lg:py-[100px]
//         "
//       >
//         {/* Background glow */}
//         <div
//           aria-hidden="true"
//           className="
//             pointer-events-none
//             absolute -left-48 top-1/3
//             h-[460px] w-[460px]
//             rounded-full
//             bg-[#b8863a]/[0.045]
//             blur-[165px]
//           "
//         />

//         <div
//           aria-hidden="true"
//           className="
//             pointer-events-none
//             absolute -right-40 bottom-0
//             h-[400px] w-[400px]
//             rounded-full
//             bg-[#b8863a]/[0.035]
//             blur-[150px]
//           "
//         />

//         <span
//           aria-hidden="true"
//           className="
//             pointer-events-none
//             absolute right-0 top-0
//             h-px w-[42%]
//             bg-gradient-to-l
//             from-[#b8863a]/60
//             to-transparent
//           "
//         />

//         <div
//           className="
//             relative z-10
//             mx-auto w-full
//             max-w-[1500px]
//           "
//         >
//           {/* Heading */}
//           <Reveal>
//             <div
//               className="
//                 mb-12 grid grid-cols-1
//                 gap-8
//                 md:mb-16
//                 lg:grid-cols-[1.18fr_0.82fr]
//                 lg:items-end
//                 lg:gap-16
//               "
//             >
//               <div>
//                 <div
//                   className="
//                     mb-5 flex
//                     items-center gap-4
//                   "
//                 >
//                   <span
//                     className="
//                       h-px w-10
//                       bg-[#b8863a]
//                     "
//                   />

//                   <span
//                     className="
//                       text-[10px] font-semibold
//                       uppercase tracking-[0.34em]
//                       text-[#d5a84f]
//                     "
//                   >
//                     Interior Design Projects
//                   </span>
//                 </div>

//                 <h1
//                   className="
//                     font-serif
//                     text-[clamp(2.8rem,6vw,5.4rem)]
//                     font-medium
//                     leading-[0.96]
//                     tracking-[-0.045em]
//                     text-[#f3efe7]
//                   "
//                 >
//                   {categoryTitle}
//                   <br />

               
//                 </h1>
//               </div>

//               <div
//                 className="
//                   flex max-w-[590px]
//                   items-start gap-7
//                   lg:pb-2
//                 "
//               >
//                 <span
//                   aria-hidden="true"
//                   className="
//                     mt-1 hidden
//                     h-[70px] w-px
//                     shrink-0
//                     bg-[#b8863a]
//                     sm:block
//                   "
//                 />

//                 <p
//                   className="
//                     max-w-[500px]
//                     text-[13px]
//                     leading-[1.9]
//                     text-white/48
//                     sm:text-[14px]
//                   "
//                 >
//                   Explore our carefully designed{" "}
//                   {categoryTitle.toLowerCase()} projects,
//                   created with thoughtful planning,
//                   functionality, material balance and
//                   timeless visual character.
//                 </p>
//               </div>
//             </div>
//           </Reveal>

//           {/* Project count */}
//           <motion.div
//             id="project-listing"
//             initial={{
//               opacity: 0,
//               y: reduceMotion ? 0 : 18,
//             }}
//             whileInView={{
//               opacity: 1,
//               y: 0,
//             }}
//             viewport={{
//               once: true,
//             }}
//             transition={{
//               duration: 0.7,
//               ease: [0.16, 1, 0.3, 1],
//             }}
//             className="
//               mb-10 flex
//               items-center justify-between
//               border-y border-white/10
//               py-5
//               scroll-mt-28
//             "
//           >
//             <span
//               className="
//                 text-[9px] font-semibold
//                 uppercase tracking-[0.27em]
//                 text-[#e6c583]
//               "
//             >
//               Selected {categoryTitle} Work
//             </span>

//             <span
//               className="
//                 text-[8px] font-semibold
//                 uppercase tracking-[0.25em]
//                 text-white/30
//               "
//             >
//               {String(pagination.total).padStart(
//                 2,
//                 "0",
//               )}{" "}
//               {pagination.total === 1
//                 ? "Project"
//                 : "Projects"}
//             </span>
//           </motion.div>

//           {/* Loading */}
//           {loading && (
//             <div
//               aria-busy="true"
//               aria-label="Loading projects"
//               className="
//                 grid grid-cols-1
//                 gap-x-7 gap-y-10
//                 md:grid-cols-2
//                 xl:grid-cols-3
//                 xl:gap-x-8
//                 xl:gap-y-12
//               "
//             >
//               {Array.from({
//                 length: 6,
//               }).map((_, index) => (
//                 <div
//                   key={index}
//                   className="
//                     overflow-hidden
//                     border border-white/10
//                     bg-[#0d0d0c]
//                   "
//                 >
//                   <div
//                     className="
//                       aspect-[4/3]
//                       animate-pulse
//                       bg-white/[0.045]
//                     "
//                   />

//                   <div className="px-7 py-7">
//                     <div
//                       className="
//                         h-px w-8
//                         bg-[#b8863a]/60
//                       "
//                     />

//                     <div
//                       className="
//                         mt-5 h-8 w-2/3
//                         animate-pulse
//                         bg-white/[0.05]
//                       "
//                     />

//                     <div
//                       className="
//                         mt-4 h-12
//                         animate-pulse
//                         bg-white/[0.035]
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
//                 flex min-h-[260px]
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
//                 onClick={() =>
//                   void fetchProjects(
//                     pagination.currentPage || 1,
//                   )
//                 }
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
//             </div>
//           )}

//           {/* Empty project response */}
//           {!loading &&
//             !errorMessage &&
//             projects.length === 0 && (
//               <div
//                 className="
//                   flex min-h-[260px]
//                   items-center justify-center
//                   border border-white/10
//                   bg-[#0d0d0c]
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
//                   No {categoryTitle.toLowerCase()} projects
//                   are available.
//                 </p>
//               </div>
//             )}

//           {/* Dynamic project listing */}
//           {!loading &&
//             !errorMessage &&
//             projects.length > 0 && (
//               <>
//                 <div
//                   className="
//                     grid grid-cols-1
//                     gap-x-7 gap-y-10
//                     md:grid-cols-2
//                     xl:grid-cols-3
//                     xl:gap-x-8
//                     xl:gap-y-12
//                   "
//                 >
//                   {projects.map(
//                     (project, index) => (
//                       <motion.article
//                         key={`${project.slug}-${index}`}
//                         initial={{
//                           opacity: 0,
//                           y: reduceMotion
//                             ? 0
//                             : 34,
//                         }}
//                         whileInView={{
//                           opacity: 1,
//                           y: 0,
//                         }}
//                         viewport={{
//                           once: true,
//                           amount: 0.15,
//                         }}
//                         transition={{
//                           duration: reduceMotion
//                             ? 0.1
//                             : 0.7,
//                           delay: reduceMotion
//                             ? 0
//                             : index * 0.08,
//                           ease: [
//                             0.16,
//                             1,
//                             0.3,
//                             1,
//                           ],
//                         }}
//                         className="
//                           group relative
//                           overflow-hidden
//                           border border-white/10
//                           bg-[#0d0d0c]
//                           shadow-[0_26px_75px_rgba(0,0,0,0.3)]
//                           transition-all duration-500
//                           hover:-translate-y-1
//                           hover:border-[#b8863a]/45
//                           hover:shadow-[0_35px_95px_rgba(0,0,0,0.42)]
//                         "
//                       >
//                         <Link
//                           href={`/product-detail?slug=${encodeURIComponent(
//                             project.slug,
//                           )}`}
//                           className="block h-full"
//                           aria-label={`View ${project.title}`}
//                         >
//                           {/* API project image */}
//                           <div
//                             className="
//                               relative aspect-[4/3]
//                               overflow-hidden
//                               bg-[#15130f]
//                             "
//                           >
//                             <img
//                               src={project.image_url}
//                               alt={project.title}
//                               loading={
//                                 index < 3
//                                   ? "eager"
//                                   : "lazy"
//                               }
//                               className="
//                                 h-full w-full
//                                 object-cover
//                                 transition-transform
//                                 duration-[1100ms]
//                                 ease-[cubic-bezier(0.16,1,0.3,1)]
//                                 group-hover:scale-[1.055]
//                               "
//                             />

//                             <div
//                               aria-hidden="true"
//                               className="
//                                 pointer-events-none
//                                 absolute inset-0
//                                 bg-gradient-to-t
//                                 from-black/65
//                                 via-black/5
//                                 to-black/10
//                               "
//                             />

//                             <span
//                               className="
//                                 absolute left-5 top-5
//                                 flex h-9 min-w-9
//                                 items-center justify-center
//                                 border border-white/20
//                                 bg-black/25
//                                 px-2
//                                 text-[8px] font-semibold
//                                 tracking-[0.18em]
//                                 text-white/65
//                                 backdrop-blur-md
//                               "
//                             >
//                               {String(
//                                 (pagination.currentPage -
//                                   1) *
//                                   pagination.perPage +
//                                   index +
//                                   1,
//                               ).padStart(2, "0")}
//                             </span>

//                             <span
//                               className="
//                                 absolute right-5 top-5
//                                 flex h-11 w-11
//                                 items-center justify-center
//                                 border border-white/20
//                                 bg-black/25
//                                 text-white/65
//                                 backdrop-blur-md
//                                 transition-all duration-400
//                                 group-hover:border-[#b8863a]
//                                 group-hover:bg-[#b8863a]
//                                 group-hover:text-[#080807]
//                               "
//                             >
//                               <ArrowRight
//                                 size={19}
//                                 strokeWidth={1.4}
//                                 className="
//                                   -rotate-45
//                                   transition-transform
//                                   duration-400
//                                   group-hover:translate-x-0.5
//                                   group-hover:-translate-y-0.5
//                                 "
//                               />
//                             </span>

//                             <span
//                               aria-hidden="true"
//                               className="
//                                 pointer-events-none
//                                 absolute inset-4
//                                 border border-white/0
//                                 transition-all duration-500
//                                 group-hover:border-white/15
//                               "
//                             />
//                           </div>

//                           {/* API project content */}
//                           <div
//                             className="
//                               relative flex min-h-[205px]
//                               flex-col
//                               bg-[linear-gradient(180deg,#11110f_0%,#0b0b0a_100%)]
//                               px-6 py-6
//                               sm:px-7
//                             "
//                           >
//                             <span
//                               aria-hidden="true"
//                               className="
//                                 mb-4 block
//                                 h-px w-8
//                                 bg-[#b8863a]
//                                 transition-all duration-500
//                                 group-hover:w-14
//                               "
//                             />

//                             <h2
//                               className="
//                                 font-serif
//                                 text-[clamp(1.5rem,2.2vw,2.15rem)]
//                                 leading-[1.15]
//                                 tracking-[-0.02em]
//                                 text-[#f3efe7]
//                                 transition-colors duration-400
//                                 group-hover:text-[#e6c583]
//                               "
//                             >
//                               {project.title}
//                             </h2>

//                             {project.description && (
//                               <p
//                                 className="
//                                   mt-3 line-clamp-2
//                                   text-[12px]
//                                   leading-[1.8]
//                                   text-white/45
//                                 "
//                               >
//                                 {project.description}
//                               </p>
//                             )}

//                             <div
//                               className="
//                                 mt-auto flex
//                                 items-center
//                                 justify-between
//                                 pt-5
//                               "
//                             >
//                               <span
//                                 className="
//                                   text-[9px] font-semibold
//                                   uppercase
//                                   tracking-[0.24em]
//                                   text-[#c9973d]
//                                 "
//                               >
//                                 View Project
//                               </span>

//                               <ArrowRight
//                                 size={18}
//                                 strokeWidth={1.4}
//                                 className="
//                                   text-[#c9973d]
//                                   transition-transform
//                                   duration-400
//                                   group-hover:translate-x-1.5
//                                 "
//                               />
//                             </div>

//                             <span
//                               aria-hidden="true"
//                               className="
//                                 pointer-events-none
//                                 absolute bottom-0 left-0
//                                 h-[2px] w-0
//                                 bg-[#b8863a]
//                                 transition-all duration-500
//                                 group-hover:w-full
//                               "
//                             />
//                           </div>
//                         </Link>
//                       </motion.article>
//                     ),
//                   )}
//                 </div>

//                 {/* Pagination */}
//                 {pagination.lastPage > 1 && (
//                   <nav
//                     aria-label="Project pagination"
//                     className="
//                       mt-14 flex flex-wrap
//                       items-center justify-center
//                       gap-2
//                     "
//                   >
//                     <button
//                       type="button"
//                       onClick={() =>
//                         changePage(
//                           pagination.currentPage -
//                             1,
//                         )
//                       }
//                       disabled={
//                         loading ||
//                         pagination.currentPage === 1
//                       }
//                       className="
//                         inline-flex h-11
//                         items-center gap-2
//                         border border-white/10
//                         px-4
//                         text-[9px] font-semibold
//                         uppercase
//                         tracking-[0.18em]
//                         text-white/55
//                         transition-all duration-300
//                         hover:border-[#b8863a]
//                         hover:text-[#e6c583]
//                         disabled:cursor-not-allowed
//                         disabled:opacity-30
//                       "
//                     >
//                       <ArrowLeft size={15} />
//                       Previous
//                     </button>

//                     {visiblePages.map((page) => {
//                       const isCurrent =
//                         page ===
//                         pagination.currentPage;

//                       return (
//                         <button
//                           key={page}
//                           type="button"
//                           onClick={() =>
//                             changePage(page)
//                           }
//                           aria-current={
//                             isCurrent
//                               ? "page"
//                               : undefined
//                           }
//                           className={`
//                             flex h-11 w-11
//                             items-center justify-center
//                             border
//                             text-[10px]
//                             font-semibold
//                             transition-all
//                             duration-300

//                             ${
//                               isCurrent
//                                 ? `
//                                     border-[#b8863a]
//                                     bg-[#b8863a]
//                                     text-[#080807]
//                                   `
//                                 : `
//                                     border-white/10
//                                     text-white/55
//                                     hover:border-[#b8863a]
//                                     hover:text-[#e6c583]
//                                   `
//                             }
//                           `}
//                         >
//                           {String(page).padStart(
//                             2,
//                             "0",
//                           )}
//                         </button>
//                       );
//                     })}

//                     <button
//                       type="button"
//                       onClick={() =>
//                         changePage(
//                           pagination.currentPage +
//                             1,
//                         )
//                       }
//                       disabled={
//                         loading ||
//                         pagination.currentPage ===
//                           pagination.lastPage
//                       }
//                       className="
//                         inline-flex h-11
//                         items-center gap-2
//                         border border-white/10
//                         px-4
//                         text-[9px] font-semibold
//                         uppercase
//                         tracking-[0.18em]
//                         text-white/55
//                         transition-all duration-300
//                         hover:border-[#b8863a]
//                         hover:text-[#e6c583]
//                         disabled:cursor-not-allowed
//                         disabled:opacity-30
//                       "
//                     >
//                       Next
//                       <ArrowRight size={15} />
//                     </button>
//                   </nav>
//                 )}

//                 {/* Pagination information */}
//                 <p
//                   className="
//                     mt-5 text-center
//                     text-[9px] uppercase
//                     tracking-[0.2em]
//                     text-white/30
//                   "
//                 >
//                   Showing{" "}
//                   {pagination.from ?? 0}–
//                   {pagination.to ?? 0} of{" "}
//                   {pagination.total}
//                 </p>
//               </>
//             )}
//         </div>
//       </section>
//     </main>
//   );
// }

// function ProductPageFallback() {
//   return (
//     <main
//       className="
//         flex min-h-screen
//         items-center justify-center
//         bg-[#080807]
//       "
//     >
//       <div
//         className="
//           flex items-center gap-3
//           text-[#e6c583]
//         "
//       >
//         <LoaderCircle
//           size={22}
//           className="animate-spin"
//         />

//         <span
//           className="
//             text-[10px] font-semibold
//             uppercase tracking-[0.24em]
//           "
//         >
//           Loading Projects
//         </span>
//       </div>
//     </main>
//   );
// }

// export default function HomeProjects() {
//   return (
//     <Suspense fallback={<ProductPageFallback />}>
//       <ProductProjectsContent />
//     </Suspense>
//   );
// }

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

const PROJECTS_SEO_ID = "4";

const PROJECTS_SEO_ATTRIBUTE =
  "data-hpi-projects-api-seo";

const PROJECTS_FALLBACK_DESCRIPTION =
  "Explore residential, commercial, showroom, hospital and corporate interior design projects by HPI Design Studio.";

const PROJECTS_FALLBACK_KEYWORDS =
  "HPI Design Studio projects, interior design projects, residential interiors, commercial interiors, showroom interiors, hospital interiors";

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
   REMOVE PREVIOUS PROJECT SEO ELEMENTS
========================================================= */

function removePreviousProjectSeoElements() {
  document
    .querySelectorAll(
      `[${PROJECTS_SEO_ATTRIBUTE}="true"]`,
    )
    .forEach((element) => {
      element.remove();
    });
}

/* =========================================================
   ADD META TAG
========================================================= */

function addProjectMetaTag({
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
    PROJECTS_SEO_ATTRIBUTE,
    "true",
  );

  document.head.appendChild(meta);
}

/* =========================================================
   ADD CANONICAL LINK
========================================================= */

function addProjectCanonicalLink(
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
    PROJECTS_SEO_ATTRIBUTE,
    "true",
  );

  document.head.appendChild(link);
}

/* =========================================================
   ADD JSON-LD SCHEMA
========================================================= */

function addProjectJsonLdScript(
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
      `projects-api-schema-${index}`;

    script.type =
      "application/ld+json";

    script.textContent =
      JSON.stringify(schema);

    script.setAttribute(
      PROJECTS_SEO_ATTRIBUTE,
      "true",
    );

    document.head.appendChild(script);
  } catch (error) {
    console.error(
      "Invalid Projects JSON-LD schema:",
      error,
    );
  }
}

/* =========================================================
   APPLY API HEAD HTML
========================================================= */

function applyProjectApiHeadHtml(
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

      addProjectMetaTag({
        name,
        property,
        content,
      });
    });

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
        addProjectCanonicalLink(href);
      }
    });

  parsedDocument
    .querySelectorAll(
      'script[type="application/ld+json"]',
    )
    .forEach(
      (sourceScript, index) => {
        addProjectJsonLdScript(
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

function applyProjectApiBodySchema(
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
      addProjectJsonLdScript(
        sourceScript.textContent ||
          "",
        index + 101,
      );
    },
  );

  if (
    schemaScripts.length === 0 &&
    (
      cleanBody.startsWith("{") ||
      cleanBody.startsWith("[")
    )
  ) {
    addProjectJsonLdScript(
      cleanBody,
      101,
    );
  }
}

/* =========================================================
   APPLY PROJECT SEO DATA
========================================================= */

function applyProjectSeoData(
  seo: SeoData,
  categoryTitle: string,
) {
  removePreviousProjectSeoElements();

  const fallbackTitle =
    `${categoryTitle} Projects | HPI Design Studio`;

  const pageTitle =
    seo.meta_title?.trim() ||
    seo.page_name?.trim() ||
    fallbackTitle;

  const pageDescription =
    seo.meta_description?.trim() ||
    PROJECTS_FALLBACK_DESCRIPTION;

  const pageKeywords =
    seo.meta_keyword?.trim() ||
    PROJECTS_FALLBACK_KEYWORDS;

  document.title = pageTitle;

  addProjectMetaTag({
    name: "description",
    content: pageDescription,
  });

  addProjectMetaTag({
    name: "keywords",
    content: pageKeywords,
  });

  applyProjectApiHeadHtml(seo.head);
  applyProjectApiBodySchema(seo.body);
}

/* =========================================================
   APPLY PROJECT FALLBACK SEO
========================================================= */

function applyProjectFallbackSeo(
  categoryTitle: string,
) {
  removePreviousProjectSeoElements();

  document.title =
    `${categoryTitle} Projects | HPI Design Studio`;

  addProjectMetaTag({
    name: "description",
    content:
      PROJECTS_FALLBACK_DESCRIPTION,
  });

  addProjectMetaTag({
    name: "keywords",
    content:
      PROJECTS_FALLBACK_KEYWORDS,
  });
}


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

const INITIAL_PAGINATION: PaginationState = {
  total: 0,
  perPage: PER_PAGE,
  currentPage: 1,
  lastPage: 1,
  from: null,
  to: null,
};

function formatCategoryTitle(slug: string): string {
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

function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error && error.message
      ? error.message
      : "Unable to load projects.";
  }

  const responseMessage = error.response?.data?.message;

  if (
    typeof responseMessage === "string" &&
    responseMessage.trim()
  ) {
    return responseMessage;
  }

  return error.message || "Unable to load projects.";
}

function ProductProjectsContent() {
  const reduceMotion = useReducedMotion();
  const searchParams = useSearchParams();

  const categorySlug =
    searchParams.get("slug")?.trim() || "home";

  const categoryTitle = useMemo(
    () => formatCategoryTitle(categorySlug),
    [categorySlug],
  );

  /* =======================================================
     FETCH PROJECTS SEO API
  ======================================================= */

  useEffect(() => {
    const controller =
      new AbortController();

    async function fetchProjectsSeo() {
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
              id: PROJECTS_SEO_ID,
            }),

            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(
            `Projects SEO API request failed with status ${response.status}.`,
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
              "Projects SEO data not found.",
          );
        }

        applyProjectSeoData(
          result.data,
          categoryTitle,
        );
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Projects SEO API error:",
          error,
        );

        applyProjectFallbackSeo(
          categoryTitle,
        );
      }
    }

    void fetchProjectsSeo();

    return () => {
      controller.abort();
      removePreviousProjectSeoElements();
    };
  }, [categoryTitle]);

  const [projects, setProjects] = useState<
    PhotoGalleryItem[]
  >([]);

  const [pagination, setPagination] =
    useState<PaginationState>(
      INITIAL_PAGINATION,
    );

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] =
    useState("");

  const requestController =
    useRef<AbortController | null>(null);

  const fetchProjects = useCallback(
    async (
      page: number,
      options?: {
        scrollToListing?: boolean;
      },
    ) => {
      requestController.current?.abort();

      const controller = new AbortController();
      requestController.current = controller;

      setLoading(true);
      setErrorMessage("");

      try {
        const response =
          await axios.post<CategoryProjectApiResponse>(
            `${apiUrl}/category_project`,
            {
              category_slug: categorySlug,
              page: String(page),
              per_page: String(PER_PAGE),
            },
            {
              signal: controller.signal,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            },
          );

        if (
          !response.data.success ||
          !response.data.data ||
          !Array.isArray(
            response.data.data.photo_gallery,
          )
        ) {
          throw new Error(
            response.data.message ||
              "Invalid project response received.",
          );
        }

        if (controller.signal.aborted) {
          return;
        }

        const apiPagination =
          response.data.pagination;

        setProjects(
          response.data.data.photo_gallery,
        );

        setPagination({
          total: Number(apiPagination.total) || 0,
          perPage:
            Number(apiPagination.per_page) ||
            PER_PAGE,
          currentPage:
            Number(apiPagination.current_page) ||
            page,
          lastPage:
            Number(apiPagination.last_page) || 1,
          from:
            apiPagination.from === null
              ? null
              : Number(apiPagination.from),
          to:
            apiPagination.to === null
              ? null
              : Number(apiPagination.to),
        });

        if (options?.scrollToListing) {
          window.requestAnimationFrame(() => {
            document
              .getElementById("project-listing")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
          });
        }
      } catch (error: unknown) {
        if (
          controller.signal.aborted ||
          (axios.isAxiosError(error) &&
            error.code === "ERR_CANCELED")
        ) {
          return;
        }

        setProjects([]);
        setPagination(INITIAL_PAGINATION);
        setErrorMessage(
          getApiErrorMessage(error),
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    [categorySlug],
  );

  useEffect(() => {
    void fetchProjects(1);

    return () => {
      requestController.current?.abort();
    };
  }, [fetchProjects]);

  const changePage = (page: number) => {
    if (
      loading ||
      page < 1 ||
      page > pagination.lastPage ||
      page === pagination.currentPage
    ) {
      return;
    }

    void fetchProjects(page, {
      scrollToListing: true,
    });
  };

  const visiblePages = useMemo(() => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(
      1,
      pagination.currentPage -
        Math.floor(maxVisiblePages / 2),
    );

    const endPage = Math.min(
      pagination.lastPage,
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
  }, [
    pagination.currentPage,
    pagination.lastPage,
  ]);

  return (
    <main className="overflow-hidden bg-[#080807]">
      <Breadcrumb
        title={`${categoryTitle}`}
        backgroundImage={banner}
        imagePosition="center"
        items={[
          {
            label: "Projects",
          },
          {
            label: categoryTitle,
          },
        ]}
      />

      <section
        id="home-projects"
        className="
          relative overflow-hidden
          bg-[#080807]
          px-5 py-20
          sm:px-8 sm:py-24
          lg:px-[5vw] lg:py-[100px]
        "
      >
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-48 top-1/3
            h-[460px] w-[460px]
            rounded-full
            bg-[#b8863a]/[0.045]
            blur-[165px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-40 bottom-0
            h-[400px] w-[400px]
            rounded-full
            bg-[#b8863a]/[0.035]
            blur-[150px]
          "
        />

        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute right-0 top-0
            h-px w-[42%]
            bg-gradient-to-l
            from-[#b8863a]/60
            to-transparent
          "
        />

        <div
          className="
            relative z-10
            mx-auto w-full
            max-w-[1500px]
          "
        >
          {/* Heading */}
          <Reveal>
            <div
              className="
                mb-12 grid grid-cols-1
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
                    mb-5 flex
                    items-center gap-4
                  "
                >
                  <span
                    className="
                      h-px w-10
                      bg-[#b8863a]
                    "
                  />

                  <span
                    className="
                      text-[10px] font-semibold
                      uppercase tracking-[0.34em]
                      text-[#d5a84f]
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
                    text-[#f3efe7]
                  "
                >
                  {categoryTitle}
                  <br />

               
                </h1>
              </div>

              <div
                className="
                  flex max-w-[590px]
                  items-start gap-7
                  lg:pb-2
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    mt-1 hidden
                    h-[70px] w-px
                    shrink-0
                    bg-[#b8863a]
                    sm:block
                  "
                />

                <p
                  className="
                    max-w-[500px]
                    text-[13px]
                    leading-[1.9]
                    text-white/48
                    sm:text-[14px]
                  "
                >
                  Explore our carefully designed{" "}
                  {categoryTitle.toLowerCase()} projects,
                  created with thoughtful planning,
                  functionality, material balance and
                  timeless visual character.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Project count */}
          <motion.div
            id="project-listing"
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              mb-10 flex
              items-center justify-between
              border-y border-white/10
              py-5
              scroll-mt-28
            "
          >
            <span
              className="
                text-[9px] font-semibold
                uppercase tracking-[0.27em]
                text-[#e6c583]
              "
            >
              Selected {categoryTitle} Work
            </span>

            <span
              className="
                text-[8px] font-semibold
                uppercase tracking-[0.25em]
                text-white/30
              "
            >
              {String(pagination.total).padStart(
                2,
                "0",
              )}{" "}
              {pagination.total === 1
                ? "Project"
                : "Projects"}
            </span>
          </motion.div>

          {/* Loading */}
          {loading && (
            <div
              aria-busy="true"
              aria-label="Loading projects"
              className="
                grid grid-cols-1
                gap-x-7 gap-y-10
                md:grid-cols-2
                xl:grid-cols-3
                xl:gap-x-8
                xl:gap-y-12
              "
            >
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <div
                  key={index}
                  className="
                    overflow-hidden
                    border border-white/10
                    bg-[#0d0d0c]
                  "
                >
                  <div
                    className="
                      aspect-[4/3]
                      animate-pulse
                      bg-white/[0.045]
                    "
                  />

                  <div className="px-7 py-7">
                    <div
                      className="
                        h-px w-8
                        bg-[#b8863a]/60
                      "
                    />

                    <div
                      className="
                        mt-5 h-8 w-2/3
                        animate-pulse
                        bg-white/[0.05]
                      "
                    />

                    <div
                      className="
                        mt-4 h-12
                        animate-pulse
                        bg-white/[0.035]
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
                flex min-h-[260px]
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
                  max-w-[580px]
                  text-sm leading-7
                  text-red-200
                "
              >
                {errorMessage}
              </p>

              <button
                type="button"
                onClick={() =>
                  void fetchProjects(
                    pagination.currentPage || 1,
                  )
                }
                className="
                  mt-6 inline-flex
                  items-center gap-3
                  border border-[#b8863a]/50
                  px-6 py-3
                  text-[10px] font-semibold
                  uppercase tracking-[0.2em]
                  text-[#e6c583]
                  transition-all duration-300
                  hover:bg-[#b8863a]
                  hover:text-[#080807]
                "
              >
                <RefreshCw size={15} />
                Try Again
              </button>
            </div>
          )}

          {/* Empty project response */}
          {!loading &&
            !errorMessage &&
            projects.length === 0 && (
              <div
                className="
                  flex min-h-[260px]
                  items-center justify-center
                  border border-white/10
                  bg-[#0d0d0c]
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
                  No {categoryTitle.toLowerCase()} projects
                  are available.
                </p>
              </div>
            )}

          {/* Dynamic project listing */}
          {!loading &&
            !errorMessage &&
            projects.length > 0 && (
              <>
                <div
                  className="
                    grid grid-cols-1
                    gap-x-7 gap-y-10
                    md:grid-cols-2
                    xl:grid-cols-3
                    xl:gap-x-8
                    xl:gap-y-12
                  "
                >
                  {projects.map(
                    (project, index) => (
                      <motion.article
                        key={`${project.slug}-${index}`}
                        initial={{
                          opacity: 0,
                          y: reduceMotion
                            ? 0
                            : 34,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.15,
                        }}
                        transition={{
                          duration: reduceMotion
                            ? 0.1
                            : 0.7,
                          delay: reduceMotion
                            ? 0
                            : index * 0.08,
                          ease: [
                            0.16,
                            1,
                            0.3,
                            1,
                          ],
                        }}
                        className="
                          group relative
                          overflow-hidden
                          border border-white/10
                          bg-[#0d0d0c]
                          shadow-[0_26px_75px_rgba(0,0,0,0.3)]
                          transition-all duration-500
                          hover:-translate-y-1
                          hover:border-[#b8863a]/45
                          hover:shadow-[0_35px_95px_rgba(0,0,0,0.42)]
                        "
                      >
                        <Link
                          href={`/product-detail?slug=${encodeURIComponent(
                            project.slug,
                          )}`}
                          className="block h-full"
                          aria-label={`View ${project.title}`}
                        >
                          {/* API project image */}
                          <div
                            className="
                              relative aspect-[4/3]
                              overflow-hidden
                              bg-[#15130f]
                            "
                          >
                            <img
                              src={project.image_url}
                              alt={project.title}
                              loading={
                                index < 3
                                  ? "eager"
                                  : "lazy"
                              }
                              className="
                                h-full w-full
                                object-cover
                                transition-transform
                                duration-[1100ms]
                                ease-[cubic-bezier(0.16,1,0.3,1)]
                                group-hover:scale-[1.055]
                              "
                            />

                            <div
                              aria-hidden="true"
                              className="
                                pointer-events-none
                                absolute inset-0
                                bg-gradient-to-t
                                from-black/65
                                via-black/5
                                to-black/10
                              "
                            />

                            <span
                              className="
                                absolute left-5 top-5
                                flex h-9 min-w-9
                                items-center justify-center
                                border border-white/20
                                bg-black/25
                                px-2
                                text-[8px] font-semibold
                                tracking-[0.18em]
                                text-white/65
                                backdrop-blur-md
                              "
                            >
                              {String(
                                (pagination.currentPage -
                                  1) *
                                  pagination.perPage +
                                  index +
                                  1,
                              ).padStart(2, "0")}
                            </span>

                            <span
                              className="
                                absolute right-5 top-5
                                flex h-11 w-11
                                items-center justify-center
                                border border-white/20
                                bg-black/25
                                text-white/65
                                backdrop-blur-md
                                transition-all duration-400
                                group-hover:border-[#b8863a]
                                group-hover:bg-[#b8863a]
                                group-hover:text-[#080807]
                              "
                            >
                              <ArrowRight
                                size={19}
                                strokeWidth={1.4}
                                className="
                                  -rotate-45
                                  transition-transform
                                  duration-400
                                  group-hover:translate-x-0.5
                                  group-hover:-translate-y-0.5
                                "
                              />
                            </span>

                            <span
                              aria-hidden="true"
                              className="
                                pointer-events-none
                                absolute inset-4
                                border border-white/0
                                transition-all duration-500
                                group-hover:border-white/15
                              "
                            />
                          </div>

                          {/* API project content */}
                          <div
                            className="
                              relative flex min-h-[205px]
                              flex-col
                              bg-[linear-gradient(180deg,#11110f_0%,#0b0b0a_100%)]
                              px-6 py-6
                              sm:px-7
                            "
                          >
                            <span
                              aria-hidden="true"
                              className="
                                mb-4 block
                                h-px w-8
                                bg-[#b8863a]
                                transition-all duration-500
                                group-hover:w-14
                              "
                            />

                            <h2
                              className="
                                font-serif
                                text-[clamp(1.5rem,2.2vw,2.15rem)]
                                leading-[1.15]
                                tracking-[-0.02em]
                                text-[#f3efe7]
                                transition-colors duration-400
                                group-hover:text-[#e6c583]
                              "
                            >
                              {project.title}
                            </h2>

                            {project.description && (
                              <p
                                className="
                                  mt-3 line-clamp-2
                                  text-[12px]
                                  leading-[1.8]
                                  text-white/45
                                "
                              >
                                {project.description}
                              </p>
                            )}

                            <div
                              className="
                                mt-auto flex
                                items-center
                                justify-between
                                pt-5
                              "
                            >
                              <span
                                className="
                                  text-[9px] font-semibold
                                  uppercase
                                  tracking-[0.24em]
                                  text-[#c9973d]
                                "
                              >
                                View Project
                              </span>

                              <ArrowRight
                                size={18}
                                strokeWidth={1.4}
                                className="
                                  text-[#c9973d]
                                  transition-transform
                                  duration-400
                                  group-hover:translate-x-1.5
                                "
                              />
                            </div>

                            <span
                              aria-hidden="true"
                              className="
                                pointer-events-none
                                absolute bottom-0 left-0
                                h-[2px] w-0
                                bg-[#b8863a]
                                transition-all duration-500
                                group-hover:w-full
                              "
                            />
                          </div>
                        </Link>
                      </motion.article>
                    ),
                  )}
                </div>

                {/* Pagination */}
                {pagination.lastPage > 1 && (
                  <nav
                    aria-label="Project pagination"
                    className="
                      mt-14 flex flex-wrap
                      items-center justify-center
                      gap-2
                    "
                  >
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
                        pagination.currentPage === 1
                      }
                      className="
                        inline-flex h-11
                        items-center gap-2
                        border border-white/10
                        px-4
                        text-[9px] font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-white/55
                        transition-all duration-300
                        hover:border-[#b8863a]
                        hover:text-[#e6c583]
                        disabled:cursor-not-allowed
                        disabled:opacity-30
                      "
                    >
                      <ArrowLeft size={15} />
                      Previous
                    </button>

                    {visiblePages.map((page) => {
                      const isCurrent =
                        page ===
                        pagination.currentPage;

                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() =>
                            changePage(page)
                          }
                          aria-current={
                            isCurrent
                              ? "page"
                              : undefined
                          }
                          className={`
                            flex h-11 w-11
                            items-center justify-center
                            border
                            text-[10px]
                            font-semibold
                            transition-all
                            duration-300

                            ${
                              isCurrent
                                ? `
                                    border-[#b8863a]
                                    bg-[#b8863a]
                                    text-[#080807]
                                  `
                                : `
                                    border-white/10
                                    text-white/55
                                    hover:border-[#b8863a]
                                    hover:text-[#e6c583]
                                  `
                            }
                          `}
                        >
                          {String(page).padStart(
                            2,
                            "0",
                          )}
                        </button>
                      );
                    })}

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
                        inline-flex h-11
                        items-center gap-2
                        border border-white/10
                        px-4
                        text-[9px] font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-white/55
                        transition-all duration-300
                        hover:border-[#b8863a]
                        hover:text-[#e6c583]
                        disabled:cursor-not-allowed
                        disabled:opacity-30
                      "
                    >
                      Next
                      <ArrowRight size={15} />
                    </button>
                  </nav>
                )}

                {/* Pagination information */}
                <p
                  className="
                    mt-5 text-center
                    text-[9px] uppercase
                    tracking-[0.2em]
                    text-white/30
                  "
                >
                  Showing{" "}
                  {pagination.from ?? 0}–
                  {pagination.to ?? 0} of{" "}
                  {pagination.total}
                </p>
              </>
            )}
        </div>
      </section>
    </main>
  );
}

function ProductPageFallback() {
  return (
    <main
      className="
        flex min-h-screen
        items-center justify-center
        bg-[#080807]
      "
    >
      <div
        className="
          flex items-center gap-3
          text-[#e6c583]
        "
      >
        <LoaderCircle
          size={22}
          className="animate-spin"
        />

        <span
          className="
            text-[10px] font-semibold
            uppercase tracking-[0.24em]
          "
        >
          Loading Projects
        </span>
      </div>
    </main>
  );
}

export default function HomeProjects() {
  return (
    <Suspense fallback={<ProductPageFallback />}>
      <ProductProjectsContent />
    </Suspense>
  );
}