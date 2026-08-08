// // "use client";

// // import {
// //   useCallback,
// //   useEffect,
// //   useState,
// // } from "react";

// // import Preloader from "./components/Preloader";
// // import Hero from "./components/Hero";
// // import About from "./components/About";
// // import Counters from "./components/Counters";
// // import Projects from "./components/Projects";
// // import Testimonials from "./components/Testimonials";
// // import Blog from "./components/Blog";
// // import SeoJsonLd from "./components/SeoJsonLd";

// // import {
// //   buildSeoMetadata,
// //   extractJsonLdSchemas,
// //   getSeoData,
// // } from "./lib/seo";
// // import {
// //   HomeDataProvider,
// // } from "./components/HomeDataContext";
// // import { Metadata } from "next";


// // const PRELOADER_STORAGE_KEY =
// //   "hpi-preloader-viewed";

// // export const dynamic =
// //   "force-dynamic";

// // const HOME_SEO_ID = "1";

// // /* =========================================================
// //    DYNAMIC HOME SEO
// // ========================================================= */

// // export async function generateMetadata(): Promise<Metadata> {
// //   return buildSeoMetadata({
// //     id: HOME_SEO_ID,

// //     fallbackTitle:
// //       "HPI Design Studio | Premium Interior Design Studio",

// //     fallbackDescription:
// //       "HPI Design Studio creates refined, functional and timeless residential and commercial interior spaces.",
// //   });
// // }
// // export default function Home() {
// //     const seo = await
// //      getSeoData(
// //     HOME_SEO_ID,
// //   );
// //   const [
// //     pageInitialized,
// //     setPageInitialized,
// //   ] = useState(false);

// //   const [
// //     preloaderVisible,
// //     setPreloaderVisible,
// //   ] = useState(false);

// //   const [
// //     contentReady,
// //     setContentReady,
// //   ] = useState(false);



// //   /* =======================================================
// //      CHECK PRELOADER SESSION
// //   ======================================================= */

// //   useEffect(() => {
// //     const preloaderAlreadyViewed =
// //       window.sessionStorage.getItem(
// //         PRELOADER_STORAGE_KEY,
// //       ) === "true";

// //     if (
// //       preloaderAlreadyViewed
// //     ) {
// //       setPreloaderVisible(
// //         false,
// //       );

// //       setContentReady(true);
// //     } else {
// //       setPreloaderVisible(
// //         true,
// //       );

// //       setContentReady(false);
// //     }

// //     setPageInitialized(true);
// //   }, []);

// //   /* =======================================================
// //      DISABLE SCROLL DURING PRELOADER
// //   ======================================================= */

// //   useEffect(() => {
// //     if (!pageInitialized) {
// //       return;
// //     }

// //     document.body.style.overflow =
// //       preloaderVisible
// //         ? "hidden"
// //         : "";

// //     return () => {
// //       document.body.style.overflow =
// //         "";
// //     };
// //   }, [
// //     pageInitialized,
// //     preloaderVisible,
// //   ]);

// //   /* =======================================================
// //      ENTER HOME
// //   ======================================================= */

// //   const enterHome =
// //     useCallback(() => {
// //       window.sessionStorage.setItem(
// //         PRELOADER_STORAGE_KEY,
// //         "true",
// //       );

// //       setContentReady(true);
// //       setPreloaderVisible(
// //         false,
// //       );

// //       window.requestAnimationFrame(
// //         () => {
// //           window.scrollTo({
// //             top: 0,
// //             behavior: "auto",
// //           });
// //         },
// //       );
// //     }, []);

// //   /* =======================================================
// //      INITIAL SCREEN
// //   ======================================================= */

// //   if (!pageInitialized) {
// //     return (
// //       <div className="min-h-screen bg-[#0b0b0a]" />
// //     );
// //   }
// //     const schemas =
// //     extractJsonLdSchemas(
// //       seo?.head,
// //       seo?.body,
// //     );


// //   /* =======================================================
// //      HOME CONTENT
// //   ======================================================= */

// //   return (
// //     <>
// //         <SeoJsonLd
// //         schemas={schemas}
// //         idPrefix="home-api-schema"
// //       />
// //       <Preloader
// //         visible={
// //           preloaderVisible
// //         }
// //         onEnter={enterHome}
// //       />

// //       <HomeDataProvider>
// //         <main>
// //           <Hero
// //             ready={contentReady}
// //           />

// //           <About />

// //           <Counters />

// //           <Projects />

// //           <Testimonials />

// //           <Blog />
// //         </main>
// //       </HomeDataProvider>

     
// //     </>
// //   );
// // }

// "use client";

// import {
//   useCallback,
//   useEffect,
//   useState,
// } from "react";

// import Preloader from "./components/Preloader";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Counters from "./components/Counters";
// import Projects from "./components/Projects";
// import Testimonials from "./components/Testimonials";
// import Blog from "./components/Blog";

// import {
//   HomeDataProvider,
// } from "./components/HomeDataContext";

// /* =========================================================
//    CONSTANTS
// ========================================================= */

// const PRELOADER_STORAGE_KEY =
//   "hpi-preloader-viewed";

// const SEO_API_URL =
//   "https://getdemo.in/hpi-design-studio/api/getSeoById";

// const HOME_SEO_ID = "1";

// const API_SEO_ATTRIBUTE =
//   "data-hpi-home-seo";

// const FALLBACK_TITLE =
//   "HPI Design Studio | Premium Interior Design Studio";

// const FALLBACK_DESCRIPTION =
//   "HPI Design Studio creates refined, functional and timeless residential and commercial interior spaces.";

// const FALLBACK_KEYWORDS =
//   "HPI Design Studio, interior design studio, residential interior design, commercial interior design, luxury interiors";

// /* =========================================================
//    TYPES
// ========================================================= */

// type SeoData = {
//   id: number;
//   page_name: string | null;
//   meta_title: string | null;
//   meta_keyword: string | null;
//   meta_description: string | null;
//   head: string | null;
//   body: string | null;
//   h1_tag: string | null;
//   h1_tag_grey: string | null;
//   created_at: string | null;
//   updated_at: string | null;
// };

// type SeoApiResponse = {
//   success: boolean;
//   message: string;
//   data: SeoData | null;
// };

// /* =========================================================
//    REMOVE PREVIOUS DYNAMIC SEO
// ========================================================= */

// function removePreviousApiSeoElements() {
//   document
//     .querySelectorAll(
//       `[${API_SEO_ATTRIBUTE}="true"]`,
//     )
//     .forEach((element) => {
//       element.remove();
//     });
// }

// /* =========================================================
//    ADD META TAG
// ========================================================= */

// function addMetaTag({
//   name,
//   property,
//   content,
// }: {
//   name?: string;
//   property?: string;
//   content?: string | null;
// }) {
//   const cleanContent =
//     content?.trim();

//   if (!cleanContent) {
//     return;
//   }

//   const meta =
//     document.createElement("meta");

//   if (name) {
//     meta.setAttribute(
//       "name",
//       name,
//     );
//   }

//   if (property) {
//     meta.setAttribute(
//       "property",
//       property,
//     );
//   }

//   meta.setAttribute(
//     "content",
//     cleanContent,
//   );

//   meta.setAttribute(
//     API_SEO_ATTRIBUTE,
//     "true",
//   );

//   document.head.appendChild(meta);
// }

// /* =========================================================
//    ADD CANONICAL LINK
// ========================================================= */

// function addCanonicalLink(
//   href: string,
// ) {
//   const cleanHref =
//     href.trim();

//   if (!cleanHref) {
//     return;
//   }

//   const canonicalLink =
//     document.createElement("link");

//   canonicalLink.setAttribute(
//     "rel",
//     "canonical",
//   );

//   canonicalLink.setAttribute(
//     "href",
//     cleanHref,
//   );

//   canonicalLink.setAttribute(
//     API_SEO_ATTRIBUTE,
//     "true",
//   );

//   document.head.appendChild(
//     canonicalLink,
//   );
// }

// /* =========================================================
//    ADD JSON-LD SCHEMA
// ========================================================= */

// function addJsonLdScript(
//   content: string,
//   index: number,
// ) {
//   const cleanContent =
//     content.trim();

//   if (!cleanContent) {
//     return;
//   }

//   try {
//     /*
//      * Validate that API schema
//      * contains valid JSON.
//      */
//     const schema =
//       JSON.parse(cleanContent);

//     const script =
//       document.createElement(
//         "script",
//       );

//     script.id =
//       `home-api-schema-${index}`;

//     script.type =
//       "application/ld+json";

//     script.textContent =
//       JSON.stringify(schema);

//     script.setAttribute(
//       API_SEO_ATTRIBUTE,
//       "true",
//     );

//     document.head.appendChild(
//       script,
//     );
//   } catch (error) {
//     console.error(
//       "Invalid Home JSON-LD schema:",
//       error,
//     );
//   }
// }

// /* =========================================================
//    APPLY API HEAD HTML
// ========================================================= */

// function applyApiHeadHtml(
//   headHtml: string | null,
// ) {
//   if (!headHtml?.trim()) {
//     return;
//   }

//   const parser =
//     new DOMParser();

//   const parsedDocument =
//     parser.parseFromString(
//       headHtml,
//       "text/html",
//     );

//   /*
//    * Add Open Graph, Twitter,
//    * robots and other meta tags.
//    */
//   parsedDocument
//     .querySelectorAll("meta")
//     .forEach((sourceMeta) => {
//       const name =
//         sourceMeta
//           .getAttribute("name")
//           ?.trim();

//       const property =
//         sourceMeta
//           .getAttribute(
//             "property",
//           )
//           ?.trim();

//       const content =
//         sourceMeta
//           .getAttribute(
//             "content",
//           )
//           ?.trim();

//       addMetaTag({
//         name,
//         property,
//         content,
//       });
//     });

//   /*
//    * Add canonical URL.
//    */
//   parsedDocument
//     .querySelectorAll("link")
//     .forEach((sourceLink) => {
//       const rel =
//         sourceLink
//           .getAttribute("rel")
//           ?.trim()
//           .toLowerCase();

//       const href =
//         sourceLink
//           .getAttribute("href")
//           ?.trim();

//       if (
//         rel === "canonical" &&
//         href
//       ) {
//         addCanonicalLink(href);
//       }
//     });

//   /*
//    * Add JSON-LD from API head.
//    */
//   parsedDocument
//     .querySelectorAll(
//       'script[type="application/ld+json"]',
//     )
//     .forEach(
//       (
//         sourceScript,
//         index,
//       ) => {
//         addJsonLdScript(
//           sourceScript.textContent ||
//             "",
//           index + 1,
//         );
//       },
//     );
// }

// /* =========================================================
//    APPLY JSON-LD FROM API BODY
// ========================================================= */

// function applyApiBodySchema(
//   bodyHtml: string | null,
// ) {
//   if (!bodyHtml?.trim()) {
//     return;
//   }

//   const cleanBody =
//     bodyHtml.trim();

//   const parser =
//     new DOMParser();

//   const parsedDocument =
//     parser.parseFromString(
//       cleanBody,
//       "text/html",
//     );

//   const schemaScripts =
//     parsedDocument.querySelectorAll(
//       'script[type="application/ld+json"]',
//     );

//   /*
//    * Body contains schema script tags.
//    */
//   schemaScripts.forEach(
//     (
//       sourceScript,
//       index,
//     ) => {
//       addJsonLdScript(
//         sourceScript.textContent ||
//           "",
//         index + 101,
//       );
//     },
//   );

//   /*
//    * Body contains raw JSON only.
//    */
//   if (
//     schemaScripts.length === 0 &&
//     (
//       cleanBody.startsWith("{") ||
//       cleanBody.startsWith("[")
//     )
//   ) {
//     addJsonLdScript(
//       cleanBody,
//       101,
//     );
//   }
// }

// /* =========================================================
//    APPLY API SEO
// ========================================================= */

// function applySeoData(
//   seo: SeoData,
// ) {
//   removePreviousApiSeoElements();

//   const pageTitle =
//     seo.meta_title?.trim() ||
//     seo.page_name?.trim() ||
//     FALLBACK_TITLE;

//   const pageDescription =
//     seo.meta_description?.trim() ||
//     FALLBACK_DESCRIPTION;

//   const pageKeywords =
//     seo.meta_keyword?.trim() ||
//     FALLBACK_KEYWORDS;

//   document.title =
//     pageTitle;

//   addMetaTag({
//     name: "description",
//     content:
//       pageDescription,
//   });

//   addMetaTag({
//     name: "keywords",
//     content:
//       pageKeywords,
//   });

//   /*
//    * Add API Open Graph, Twitter,
//    * canonical and schema tags.
//    */
//   applyApiHeadHtml(
//     seo.head,
//   );

//   applyApiBodySchema(
//     seo.body,
//   );
// }

// /* =========================================================
//    APPLY FALLBACK SEO
// ========================================================= */

// function applyFallbackSeo() {
//   removePreviousApiSeoElements();

//   document.title =
//     FALLBACK_TITLE;

//   addMetaTag({
//     name: "description",
//     content:
//       FALLBACK_DESCRIPTION,
//   });

//   addMetaTag({
//     name: "keywords",
//     content:
//       FALLBACK_KEYWORDS,
//   });
// }

// /* =========================================================
//    HOME PAGE
// ========================================================= */

// export default function Home() {
//   const [
//     pageInitialized,
//     setPageInitialized,
//   ] = useState(false);

//   const [
//     preloaderVisible,
//     setPreloaderVisible,
//   ] = useState(false);

//   const [
//     contentReady,
//     setContentReady,
//   ] = useState(false);

//   /* =======================================================
//      FETCH HOME SEO API
//   ======================================================= */

//   useEffect(() => {
//     const controller =
//       new AbortController();

//     async function fetchHomeSeo() {
//       try {
//         const response =
//           await fetch(
//             SEO_API_URL,
//             {
//               method: "POST",

//               headers: {
//                 Accept:
//                   "application/json",

//                 "Content-Type":
//                   "application/json",
//               },

//               body: JSON.stringify({
//                 id: HOME_SEO_ID,
//               }),

//               signal:
//                 controller.signal,
//             },
//           );

//         if (!response.ok) {
//           throw new Error(
//             `SEO API request failed with status ${response.status}.`,
//           );
//         }

//         const result =
//           (await response.json()) as SeoApiResponse;

//         if (
//           !result.success ||
//           !result.data
//         ) {
//           throw new Error(
//             result.message ||
//               "Home SEO data not found.",
//           );
//         }

//         applySeoData(
//           result.data,
//         );
//       } catch (error) {
//         if (
//           error instanceof DOMException &&
//           error.name === "AbortError"
//         ) {
//           return;
//         }

//         console.error(
//           "Home SEO API error:",
//           error,
//         );

//         applyFallbackSeo();
//       }
//     }

//     void fetchHomeSeo();

//     return () => {
//       controller.abort();

//       removePreviousApiSeoElements();
//     };
//   }, []);

//   /* =======================================================
//      CHECK PRELOADER SESSION
//   ======================================================= */

//   useEffect(() => {
//     const preloaderAlreadyViewed =
//       window.sessionStorage.getItem(
//         PRELOADER_STORAGE_KEY,
//       ) === "true";

//     if (preloaderAlreadyViewed) {
//       setPreloaderVisible(false);
//       setContentReady(true);
//     } else {
//       setPreloaderVisible(true);
//       setContentReady(false);
//     }

//     setPageInitialized(true);
//   }, []);

//   /* =======================================================
//      DISABLE SCROLL DURING PRELOADER
//   ======================================================= */

//   useEffect(() => {
//     if (!pageInitialized) {
//       return;
//     }

//     document.body.style.overflow =
//       preloaderVisible
//         ? "hidden"
//         : "";

//     return () => {
//       document.body.style.overflow =
//         "";
//     };
//   }, [
//     pageInitialized,
//     preloaderVisible,
//   ]);

//   /* =======================================================
//      ENTER HOME
//   ======================================================= */

//   const enterHome =
//     useCallback(() => {
//       window.sessionStorage.setItem(
//         PRELOADER_STORAGE_KEY,
//         "true",
//       );

//       setContentReady(true);
//       setPreloaderVisible(false);

//       window.requestAnimationFrame(
//         () => {
//           window.scrollTo({
//             top: 0,
//             behavior: "auto",
//           });
//         },
//       );
//     }, []);

//   /* =======================================================
//      INITIAL SCREEN
//   ======================================================= */

//   if (!pageInitialized) {
//     return (
//       <div className="min-h-screen bg-[#0b0b0a]" />
//     );
//   }

//   /* =======================================================
//      HOME CONTENT
//   ======================================================= */

//   return (
//     <>
//       <Preloader
//         visible={
//           preloaderVisible
//         }
//         onEnter={
//           enterHome
//         }
//       />

//       <HomeDataProvider>
//         <main>
//           <Hero
//             ready={
//               contentReady
//             }
//           />

//           <About />

//           <Counters />

//           <Projects />

//           <Testimonials />

//           <Blog />
//         </main>
//       </HomeDataProvider>
//     </>
//   );
// }

import type { Metadata } from "next";

import SeoJsonLd from "./components/SeoJsonLd";

import {
  buildSeoMetadata,
  extractJsonLdSchemas,
  getSeoData,
} from "./lib/seo";
import HomeClient from "./components/HomeClient";

const HOME_SEO_ID = "1";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    id: HOME_SEO_ID,

    fallbackTitle:
      "HPI Design Studio | Premium Interior Design Studio",

    fallbackDescription:
      "HPI Design Studio creates refined, functional and timeless residential and commercial interior spaces.",
  });
}

export default async function HomePage() {
  const seo = await getSeoData(
    HOME_SEO_ID,
  );

  const schemas =
    extractJsonLdSchemas(
      seo?.head,
      seo?.body,
    );

  return (
    <>
      <SeoJsonLd
        schemas={schemas}
        idPrefix="home-api-schema"
      />

      <HomeClient />
    </>
  );
}
