// // import "server-only";

// // import type { Metadata } from "next";
// // import { cache } from "react";

// // const SEO_API_URL =
// //   "https://getdemo.in/hpi-design-studio/api/getSeoById";

// // /* =========================================================
// //    SEO TYPES
// // ========================================================= */

// // export type SeoData = {
// //   id: number;
// //   page_name: string | null;
// //   meta_title: string | null;
// //   meta_keyword: string | null;
// //   meta_description: string | null;
// //   head: string | null;
// //   body: string | null;
// //   h1_tag: string | null;
// //   h1_tag_grey: string | null;
// //   created_at: string | null;
// //   updated_at: string | null;
// // };

// // type SeoApiResponse = {
// //   success: boolean;
// //   message: string;
// //   data: SeoData | null;
// // };

// // type BuildSeoMetadataOptions = {
// //   id: string;
// //   fallbackTitle: string;
// //   fallbackDescription: string;
// // };

// // /* =========================================================
// //    BASIC HELPERS
// // ========================================================= */

// // function cleanValue(
// //   value: string | null | undefined,
// // ): string | undefined {
// //   const cleanedValue = value?.trim();

// //   return cleanedValue || undefined;
// // }

// // function escapeRegex(value: string): string {
// //   return value.replace(
// //     /[.*+?^${}()|[\]\\]/g,
// //     "\\$&",
// //   );
// // }

// // /* =========================================================
// //    READ HTML ATTRIBUTE
// // ========================================================= */

// // function getHtmlAttribute(
// //   htmlTag: string,
// //   attributeName: string,
// // ): string | undefined {
// //   const escapedAttribute =
// //     escapeRegex(attributeName);

// //   const pattern = new RegExp(
// //     `${escapedAttribute}\\s*=\\s*["']([^"']*)["']`,
// //     "i",
// //   );

// //   return cleanValue(
// //     htmlTag.match(pattern)?.[1],
// //   );
// // }

// // /* =========================================================
// //    READ META TAG FROM API HEAD
// // ========================================================= */

// // function getMetaContent(
// //   html: string | null | undefined,
// //   attributeName: "name" | "property",
// //   attributeValue: string,
// // ): string | undefined {
// //   if (!html?.trim()) {
// //     return undefined;
// //   }

// //   const metaTags =
// //     html.match(/<meta\b[^>]*>/gi) || [];

// //   for (const metaTag of metaTags) {
// //     const currentAttributeValue =
// //       getHtmlAttribute(
// //         metaTag,
// //         attributeName,
// //       );

// //     if (
// //       currentAttributeValue?.toLowerCase() ===
// //       attributeValue.toLowerCase()
// //     ) {
// //       return getHtmlAttribute(
// //         metaTag,
// //         "content",
// //       );
// //     }
// //   }

// //   return undefined;
// // }

// // /* =========================================================
// //    READ CANONICAL URL
// // ========================================================= */

// // function getCanonicalUrl(
// //   html: string | null | undefined,
// // ): string | undefined {
// //   if (!html?.trim()) {
// //     return undefined;
// //   }

// //   const linkTags =
// //     html.match(/<link\b[^>]*>/gi) || [];

// //   for (const linkTag of linkTags) {
// //     const rel =
// //       getHtmlAttribute(
// //         linkTag,
// //         "rel",
// //       );

// //     const relValues =
// //       rel
// //         ?.toLowerCase()
// //         .split(/\s+/)
// //         .filter(Boolean) || [];

// //     if (
// //       relValues.includes("canonical")
// //     ) {
// //       return getHtmlAttribute(
// //         linkTag,
// //         "href",
// //       );
// //     }
// //   }

// //   return undefined;
// // }

// // /* =========================================================
// //    CONVERT KEYWORDS
// // ========================================================= */

// // function getKeywords(
// //   value: string | null | undefined,
// // ): string[] | undefined {
// //   if (!value?.trim()) {
// //     return undefined;
// //   }

// //   const keywords = value
// //     .split(/\r?\n|,/)
// //     .map((keyword) => keyword.trim())
// //     .filter(Boolean);

// //   return keywords.length > 0
// //     ? keywords
// //     : undefined;
// // }

// // /* =========================================================
// //    FETCH SEO DATA
// // ========================================================= */

// // export const getSeoData = cache(
// //   async (
// //     id: string,
// //   ): Promise<SeoData | null> => {
// //     try {
// //       const response = await fetch(
// //         SEO_API_URL,
// //         {
// //           method: "POST",

// //           headers: {
// //             Accept:
// //               "application/json",

// //             "Content-Type":
// //               "application/json",
// //           },

// //           body: JSON.stringify({
// //             id,
// //           }),

// //           /*
// //            * Fetch latest SEO information
// //            * on every request.
// //            */
// //           cache: "no-store",
// //         },
// //       );

// //       if (!response.ok) {
// //         console.error(
// //           "SEO API request failed:",
// //           response.status,
// //           response.statusText,
// //         );

// //         return null;
// //       }

// //       const result =
// //         (await response.json()) as SeoApiResponse;

// //       if (
// //         !result.success ||
// //         !result.data
// //       ) {
// //         console.error(
// //           "Invalid SEO API response:",
// //           result.message,
// //         );

// //         return null;
// //       }

// //       return result.data;
// //     } catch (error) {
// //       console.error(
// //         "SEO API error:",
// //         error,
// //       );

// //       return null;
// //     }
// //   },
// // );

// // /* =========================================================
// //    BUILD NEXT.JS METADATA
// // ========================================================= */

// // export async function buildSeoMetadata({
// //   id,
// //   fallbackTitle,
// //   fallbackDescription,
// // }: BuildSeoMetadataOptions): Promise<Metadata> {
// //   const seo = await getSeoData(id);

// //   if (!seo) {
// //     return {
// //       title: fallbackTitle,
// //       description:
// //         fallbackDescription,
// //     };
// //   }

// //   const title =
// //     cleanValue(seo.meta_title) ||
// //     cleanValue(seo.page_name) ||
// //     fallbackTitle;

// //   const description =
// //     cleanValue(
// //       seo.meta_description,
// //     ) || fallbackDescription;

// //   const head = seo.head;

// //   /* Open Graph values */

// //   const openGraphType =
// //     getMetaContent(
// //       head,
// //       "property",
// //       "og:type",
// //     );

// //   const openGraphTitle =
// //     getMetaContent(
// //       head,
// //       "property",
// //       "og:title",
// //     );

// //   const openGraphDescription =
// //     getMetaContent(
// //       head,
// //       "property",
// //       "og:description",
// //     );

// //   const openGraphUrl =
// //     getMetaContent(
// //       head,
// //       "property",
// //       "og:url",
// //     );

// //   const openGraphSiteName =
// //     getMetaContent(
// //       head,
// //       "property",
// //       "og:site_name",
// //     );

// //   const openGraphImage =
// //     getMetaContent(
// //       head,
// //       "property",
// //       "og:image",
// //     );

// //   const openGraphImageAlt =
// //     getMetaContent(
// //       head,
// //       "property",
// //       "og:image:alt",
// //     );

// //   const openGraphImageType =
// //     getMetaContent(
// //       head,
// //       "property",
// //       "og:image:type",
// //     );

// //   /* Twitter values */

// //   const twitterCard =
// //     getMetaContent(
// //       head,
// //       "name",
// //       "twitter:card",
// //     );

// //   const twitterTitle =
// //     getMetaContent(
// //       head,
// //       "name",
// //       "twitter:title",
// //     );

// //   const twitterDescription =
// //     getMetaContent(
// //       head,
// //       "name",
// //       "twitter:description",
// //     );

// //   const twitterImage =
// //     getMetaContent(
// //       head,
// //       "name",
// //       "twitter:image",
// //     );

// //   const twitterImageAlt =
// //     getMetaContent(
// //       head,
// //       "name",
// //       "twitter:image:alt",
// //     );

// //   const twitterSite =
// //     getMetaContent(
// //       head,
// //       "name",
// //       "twitter:site",
// //     );

// //   const twitterCreator =
// //     getMetaContent(
// //       head,
// //       "name",
// //       "twitter:creator",
// //     );

// //   const canonicalUrl =
// //     getCanonicalUrl(head);

// //   const robots =
// //     getMetaContent(
// //       head,
// //       "name",
// //       "robots",
// //     );

// //   return {
// //     title,
// //     description,

// //     keywords: getKeywords(
// //       seo.meta_keyword,
// //     ),

// //     alternates: canonicalUrl
// //       ? {
// //           canonical: canonicalUrl,
// //         }
// //       : undefined,

// //     robots: robots || undefined,

// //     openGraph: {
// //       type:
// //         openGraphType === "article"
// //           ? "article"
// //           : "website",

// //       title:
// //         openGraphTitle || title,

// //       description:
// //         openGraphDescription ||
// //         description,

// //       url:
// //         openGraphUrl ||
// //         canonicalUrl,

// //       siteName:
// //         openGraphSiteName,

// //       images: openGraphImage
// //         ? [
// //             {
// //               url:
// //                 openGraphImage,

// //               alt:
// //                 openGraphImageAlt ||
// //                 title,

// //               type:
// //                 openGraphImageType,
// //             },
// //           ]
// //         : undefined,
// //     },

// //     twitter: {
// //       card:
// //         twitterCard === "summary"
// //           ? "summary"
// //           : "summary_large_image",

// //       title:
// //         twitterTitle || title,

// //       description:
// //         twitterDescription ||
// //         description,

// //       site:
// //         twitterSite,

// //       creator:
// //         twitterCreator,

// //       images: twitterImage
// //         ? [
// //             {
// //               url:
// //                 twitterImage,

// //               alt:
// //                 twitterImageAlt ||
// //                 title,
// //             },
// //           ]
// //         : undefined,
// //     },
// //   };
// // }

// // /* =========================================================
// //    JSON-LD EXTRACTION
// // ========================================================= */

// // function extractSchemasFromSource(
// //   source: string | null | undefined,
// // ): unknown[] {
// //   if (!source?.trim()) {
// //     return [];
// //   }

// //   const schemas: unknown[] = [];

// //   const scriptPattern =
// //     /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

// //   let match:
// //     | RegExpExecArray
// //     | null;

// //   while (
// //     (match =
// //       scriptPattern.exec(source)) !==
// //     null
// //   ) {
// //     const schemaContent =
// //       match[1]?.trim();

// //     if (!schemaContent) {
// //       continue;
// //     }

// //     try {
// //       schemas.push(
// //         JSON.parse(schemaContent),
// //       );
// //     } catch (error) {
// //       console.error(
// //         "Invalid JSON-LD schema:",
// //         error,
// //       );
// //     }
// //   }

// //   /*
// //    * Support raw JSON in the API
// //    * body or head without script tags.
// //    */
// //   if (schemas.length === 0) {
// //     const trimmedSource =
// //       source.trim();

// //     const looksLikeJson =
// //       trimmedSource.startsWith("{") ||
// //       trimmedSource.startsWith("[");

// //     if (looksLikeJson) {
// //       try {
// //         schemas.push(
// //           JSON.parse(trimmedSource),
// //         );
// //       } catch {
// //         // Ignore invalid raw JSON.
// //       }
// //     }
// //   }

// //   return schemas;
// // }

// // export function extractJsonLdSchemas(
// //   ...sources: Array<
// //     string | null | undefined
// //   >
// // ): unknown[] {
// //   const extractedSchemas =
// //     sources.flatMap(
// //       extractSchemasFromSource,
// //     );

// //   const uniqueSchemas =
// //     new Map<string, unknown>();

// //   extractedSchemas.forEach(
// //     (schema) => {
// //       try {
// //         uniqueSchemas.set(
// //           JSON.stringify(schema),
// //           schema,
// //         );
// //       } catch {
// //         // Ignore unserializable schema.
// //       }
// //     },
// //   );

// //   return Array.from(
// //     uniqueSchemas.values(),
// //   );
// // }


// import type { Metadata } from "next";
// import { cache } from "react";
// import axios from "axios";

// import { apiUrl } from "../config";

// export type SeoData = {
//   id: number;
//   page_name: string;
//   meta_title: string | null;
//   meta_keyword: string | null;
//   meta_description: string | null;
//   head: string | null;
//   body: string | null;
//   h1_tag: string | null;
//   h1_tag_grey: string | null;
//   created_at: string;
//   updated_at: string;
// };

// type SeoApiResponse = {
//   success: boolean;
//   message: string;
//   data: SeoData | null;
// };

// type SeoMetadataOptions = {
//   id: string;
//   fallbackTitle: string;
//   fallbackDescription: string;
// };

// export type JsonLdSchema = Record<
//   string,
//   unknown
// >;

// /* =========================================
//    SEO API
//    ========================================= */

// /*
//  * React cache prevents duplicate Axios calls
//  * when generateMetadata() and page component
//  * request the same SEO ID during one render/build.
//  */
// export const getSeoData = cache(
//   async (
//     id: string,
//   ): Promise<SeoData | null> => {
//     try {
//       const response =
//         await axios.post<SeoApiResponse>(
//           `${apiUrl}/getSeoById`,
//           {
//             id,
//           },
//           {
//             headers: {
//               Accept:
//                 "application/json",

//               "Content-Type":
//                 "application/json",
//             },

//             timeout: 15000,
//           },
//         );

//       if (
//         !response.data?.success ||
//         !response.data?.data
//       ) {
//         console.error(
//           `SEO API failed for ID ${id}:`,
//           response.data?.message,
//         );

//         return null;
//       }

//       return response.data.data;
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         console.error(
//           `SEO Axios error for ID ${id}:`,
//           {
//             message: error.message,
//             status:
//               error.response?.status,
//             data:
//               error.response?.data,
//           },
//         );
//       } else {
//         console.error(
//           `SEO unknown error for ID ${id}:`,
//           error,
//         );
//       }

//       return null;
//     }
//   },
// );

// /* =========================================
//    Metadata parsing helpers
//    ========================================= */

// function escapeRegExp(
//   value: string,
// ): string {
//   return value.replace(
//     /[.*+?^${}()|[\]\\]/g,
//     "\\$&",
//   );
// }

// function getHtmlAttribute(
//   tag: string,
//   attribute: string,
// ): string | undefined {
//   const expression = new RegExp(
//     `${escapeRegExp(
//       attribute,
//     )}\\s*=\\s*["']([^"']*)["']`,
//     "i",
//   );

//   return (
//     tag.match(expression)?.[1]?.trim() ||
//     undefined
//   );
// }

// function getMetaContent(
//   head: string,
//   metaName: string,
// ): string | undefined {
//   if (!head) {
//     return undefined;
//   }

//   const metaTags =
//     head.match(/<meta\b[^>]*>/gi) ?? [];

//   const requiredName =
//     metaName.toLowerCase();

//   const matchedTag = metaTags.find(
//     (tag) => {
//       const property =
//         getHtmlAttribute(
//           tag,
//           "property",
//         )?.toLowerCase();

//       const name =
//         getHtmlAttribute(
//           tag,
//           "name",
//         )?.toLowerCase();

//       return (
//         property === requiredName ||
//         name === requiredName
//       );
//     },
//   );

//   return matchedTag
//     ? getHtmlAttribute(
//         matchedTag,
//         "content",
//       )
//     : undefined;
// }

// function getCanonicalUrl(
//   head: string,
// ): string | undefined {
//   if (!head) {
//     return undefined;
//   }

//   const linkTags =
//     head.match(/<link\b[^>]*>/gi) ?? [];

//   const canonicalTag = linkTags.find(
//     (tag) => {
//       const rel =
//         getHtmlAttribute(
//           tag,
//           "rel",
//         )?.toLowerCase();

//       return rel === "canonical";
//     },
//   );

//   return canonicalTag
//     ? getHtmlAttribute(
//         canonicalTag,
//         "href",
//       )
//     : undefined;
// }

// function parseKeywords(
//   keywords: string | null,
// ): string[] | undefined {
//   if (!keywords) {
//     return undefined;
//   }

//   const values = keywords
//     .split(/\r?\n|,/)
//     .map((keyword) =>
//       keyword.trim(),
//     )
//     .filter(Boolean);

//   return values.length > 0
//     ? values
//     : undefined;
// }

// /* =========================================
//    Dynamic JSON-LD extraction
//    ========================================= */

// /*
//  * Schema is extracted only from API head/body.
//  * No static or hardcoded schema is added.
//  */
// export function extractJsonLdSchemas(
//   ...sources: Array<
//     string | null | undefined
//   >
// ): JsonLdSchema[] {
//   const schemas: JsonLdSchema[] = [];

//   for (const source of sources) {
//     if (!source?.trim()) {
//       continue;
//     }

//     /*
//      * Supports:
//      * <script type="application/ld+json">
//      * {...}
//      * </script>
//      */
//     const scriptPattern =
//       /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

//     let match:
//       | RegExpExecArray
//       | null;

//     let scriptFound = false;

//     while (
//       (match =
//         scriptPattern.exec(source)) !==
//       null
//     ) {
//       scriptFound = true;

//       const jsonText =
//         match[1]?.trim();

//       if (!jsonText) {
//         continue;
//       }

//       try {
//         const parsed =
//           JSON.parse(jsonText);

//         if (Array.isArray(parsed)) {
//           for (const schema of parsed) {
//             if (
//               schema &&
//               typeof schema ===
//                 "object"
//             ) {
//               schemas.push(
//                 schema as JsonLdSchema,
//               );
//             }
//           }
//         } else if (
//           parsed &&
//           typeof parsed === "object"
//         ) {
//           schemas.push(
//             parsed as JsonLdSchema,
//           );
//         }
//       } catch (error) {
//         console.error(
//           "Invalid API JSON-LD schema:",
//           error,
//         );
//       }
//     }

//     /*
//      * Optional support:
//      * API body may contain raw JSON without
//      * <script> tag.
//      */
//     if (!scriptFound) {
//       const cleanSource =
//         source.trim();

//       if (
//         cleanSource.startsWith("{") ||
//         cleanSource.startsWith("[")
//       ) {
//         try {
//           const parsed =
//             JSON.parse(cleanSource);

//           if (Array.isArray(parsed)) {
//             for (const schema of parsed) {
//               if (
//                 schema &&
//                 typeof schema ===
//                   "object"
//               ) {
//                 schemas.push(
//                   schema as JsonLdSchema,
//                 );
//               }
//             }
//           } else if (
//             parsed &&
//             typeof parsed === "object"
//           ) {
//             schemas.push(
//               parsed as JsonLdSchema,
//             );
//           }
//         } catch (error) {
//           console.error(
//             "Invalid raw API schema:",
//             error,
//           );
//         }
//       }
//     }
//   }

//   return schemas;
// }

// /* =========================================
//    Dynamic metadata
//    ========================================= */

// export async function buildSeoMetadata({
//   id,
//   fallbackTitle,
//   fallbackDescription,
// }: SeoMetadataOptions): Promise<Metadata> {
//   const seo = await getSeoData(id);

//   if (!seo) {
//     return {
//       title: fallbackTitle,

//       description:
//         fallbackDescription,

//       robots: {
//         index: true,
//         follow: true,
//       },
//     };
//   }

//   const head = seo.head ?? "";

//   const title =
//     seo.meta_title ||
//     getMetaContent(
//       head,
//       "og:title",
//     ) ||
//     seo.page_name ||
//     fallbackTitle;

//   const description =
//     seo.meta_description ||
//     getMetaContent(
//       head,
//       "og:description",
//     ) ||
//     fallbackDescription;

//   const canonicalUrl =
//     getCanonicalUrl(head) ||
//     getMetaContent(
//       head,
//       "og:url",
//     );

//   const openGraphImage =
//     getMetaContent(
//       head,
//       "og:image",
//     );

//   const openGraphImageAlt =
//     getMetaContent(
//       head,
//       "og:image:alt",
//     );

//   const openGraphImageType =
//     getMetaContent(
//       head,
//       "og:image:type",
//     );

//   const twitterImage =
//     getMetaContent(
//       head,
//       "twitter:image",
//     ) || openGraphImage;

//   const twitterImageAlt =
//     getMetaContent(
//       head,
//       "twitter:image:alt",
//     ) ||
//     openGraphImageAlt ||
//     title;

//   const twitterUrl =
//     getMetaContent(
//       head,
//       "twitter:url",
//     );

//   const otherMetadata: Record<
//     string,
//     string
//   > = {};

//   if (twitterUrl) {
//     otherMetadata["twitter:url"] =
//       twitterUrl;
//   }

//   return {
//     title,
//     description,

//     keywords: parseKeywords(
//       seo.meta_keyword,
//     ),

//     robots: {
//       index: true,
//       follow: true,

//       googleBot: {
//         index: true,
//         follow: true,

//         "max-image-preview":
//           "large",

//         "max-snippet": -1,

//         "max-video-preview": -1,
//       },
//     },

//     alternates: canonicalUrl
//       ? {
//           canonical:
//             canonicalUrl,
//         }
//       : undefined,

//     openGraph: {
//       type: "website",

//       title:
//         getMetaContent(
//           head,
//           "og:title",
//         ) || title,

//       description:
//         getMetaContent(
//           head,
//           "og:description",
//         ) || description,

//       url:
//         getMetaContent(
//           head,
//           "og:url",
//         ) || canonicalUrl,

//       siteName:
//         getMetaContent(
//           head,
//           "og:site_name",
//         ),

//       locale:
//         getMetaContent(
//           head,
//           "og:locale",
//         ),

//       images: openGraphImage
//         ? [
//             {
//               url:
//                 openGraphImage,

//               alt:
//                 openGraphImageAlt ||
//                 title,

//               type:
//                 openGraphImageType,
//             },
//           ]
//         : undefined,
//     },

//     twitter: {
//       card:
//         "summary_large_image",

//       title:
//         getMetaContent(
//           head,
//           "twitter:title",
//         ) || title,

//       description:
//         getMetaContent(
//           head,
//           "twitter:description",
//         ) || description,

//       site:
//         getMetaContent(
//           head,
//           "twitter:site",
//         ),

//       creator:
//         getMetaContent(
//           head,
//           "twitter:creator",
//         ),

//       images: twitterImage
//         ? [
//             {
//               url:
//                 twitterImage,

//               alt:
//                 twitterImageAlt,
//             },
//           ]
//         : undefined,
//     },

//     other:
//       Object.keys(otherMetadata)
//         .length > 0
//         ? otherMetadata
//         : undefined,
//   };
// }

import "server-only";

import type { Metadata } from "next";

/*
 * This must be an absolute URL because this file runs
 * on the server during `next dev` and `next build`.
 */
const SEO_API_URL =
  process.env.SEO_API_URL?.trim() ||
  "https://getdemo.in/hpi-design-studio/api/getSeoById";

export type SeoData = {
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

type SeoMetadataOptions = {
  id: string;
  fallbackTitle: string;
  fallbackDescription: string;
};

export type JsonLdSchema =
  Record<string, unknown>;

/* =========================================================
   BASIC HELPERS
========================================================= */

function cleanValue(
  value: string | null | undefined,
): string | undefined {
  const cleaned = value?.trim();

  return cleaned || undefined;
}

function escapeRegExp(
  value: string,
): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
}

function getHtmlAttribute(
  tag: string,
  attribute: string,
): string | undefined {
  const expression = new RegExp(
    `${escapeRegExp(
      attribute,
    )}\\s*=\\s*["']([^"']*)["']`,
    "i",
  );

  return cleanValue(
    tag.match(expression)?.[1],
  );
}

function getMetaContent(
  head: string | null | undefined,
  metaName: string,
): string | undefined {
  if (!head?.trim()) {
    return undefined;
  }

  const requiredName =
    metaName.toLowerCase();

  const metaTags =
    head.match(/<meta\b[^>]*>/gi) ?? [];

  for (const tag of metaTags) {
    const property =
      getHtmlAttribute(
        tag,
        "property",
      )?.toLowerCase();

    const name =
      getHtmlAttribute(
        tag,
        "name",
      )?.toLowerCase();

    if (
      property === requiredName ||
      name === requiredName
    ) {
      return getHtmlAttribute(
        tag,
        "content",
      );
    }
  }

  return undefined;
}

function getCanonicalUrl(
  head: string | null | undefined,
): string | undefined {
  if (!head?.trim()) {
    return undefined;
  }

  const linkTags =
    head.match(/<link\b[^>]*>/gi) ?? [];

  for (const tag of linkTags) {
    const rel =
      getHtmlAttribute(
        tag,
        "rel",
      )
        ?.toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

    if (rel?.includes("canonical")) {
      return getHtmlAttribute(
        tag,
        "href",
      );
    }
  }

  return undefined;
}

function parseKeywords(
  value: string | null | undefined,
): string[] | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  const keywords = value
    .split(/\r?\n|,/)
    .map((keyword) =>
      keyword.trim(),
    )
    .filter(Boolean);

  return keywords.length
    ? keywords
    : undefined;
}

/* =========================================================
   SEO API — STATIC/BUILD-TIME SAFE
========================================================= */

export async function getSeoData(
  id: string,
): Promise<SeoData | null> {
  try {
    const response = await fetch(
      SEO_API_URL,
      {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          id,
        }),

        /*
         * Required for output: "export".
         * The API response is resolved while prerendering.
         */
        cache: "force-cache",
      },
    );

    if (!response.ok) {
      console.error(
        `[SEO] HTTP ${response.status} ${response.statusText} for ID ${id}`,
      );

      return null;
    }

    const result =
      (await response.json()) as SeoApiResponse;

    if (
      !result.success ||
      !result.data
    ) {
      console.error(
        `[SEO] Invalid response for ID ${id}:`,
        result.message,
      );

      return null;
    }

    return result.data;
  } catch (error) {
    console.error(
      `[SEO] Request failed for ID ${id}:`,
      error,
    );

    return null;
  }
}

/* =========================================================
   JSON-LD EXTRACTION
========================================================= */

function addParsedSchema(
  value: unknown,
  schemas: JsonLdSchema[],
) {
  if (Array.isArray(value)) {
    value.forEach((item) => {
      if (
        item &&
        typeof item === "object" &&
        !Array.isArray(item)
      ) {
        schemas.push(
          item as JsonLdSchema,
        );
      }
    });

    return;
  }

  if (
    value &&
    typeof value === "object"
  ) {
    schemas.push(
      value as JsonLdSchema,
    );
  }
}

export function extractJsonLdSchemas(
  ...sources: Array<
    string | null | undefined
  >
): JsonLdSchema[] {
  const schemas: JsonLdSchema[] = [];

  for (const source of sources) {
    if (!source?.trim()) {
      continue;
    }

    const scriptPattern =
      /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

    let match:
      | RegExpExecArray
      | null;

    let scriptFound = false;

    while (
      (match =
        scriptPattern.exec(source)) !==
      null
    ) {
      scriptFound = true;

      const jsonText =
        match[1]?.trim();

      if (!jsonText) {
        continue;
      }

      try {
        addParsedSchema(
          JSON.parse(jsonText),
          schemas,
        );
      } catch (error) {
        console.error(
          "[SEO] Invalid JSON-LD:",
          error,
        );
      }
    }

    if (!scriptFound) {
      const cleanSource =
        source.trim();

      if (
        cleanSource.startsWith("{") ||
        cleanSource.startsWith("[")
      ) {
        try {
          addParsedSchema(
            JSON.parse(cleanSource),
            schemas,
          );
        } catch {
          // Not raw JSON-LD.
        }
      }
    }
  }

  const uniqueSchemas =
    new Map<string, JsonLdSchema>();

  schemas.forEach((schema) => {
    uniqueSchemas.set(
      JSON.stringify(schema),
      schema,
    );
  });

  return Array.from(
    uniqueSchemas.values(),
  );
}

/* =========================================================
   NEXT.JS METADATA
========================================================= */

export async function buildSeoMetadata({
  id,
  fallbackTitle,
  fallbackDescription,
}: SeoMetadataOptions): Promise<Metadata> {
  const seo = await getSeoData(id);

  if (!seo) {
    return {
      title: fallbackTitle,
      description:
        fallbackDescription,

      robots: {
        index: true,
        follow: true,
      },
    };
  }

  const head = seo.head;

  const title =
    cleanValue(seo.meta_title) ||
    getMetaContent(
      head,
      "og:title",
    ) ||
    cleanValue(seo.page_name) ||
    fallbackTitle;

  const description =
    cleanValue(
      seo.meta_description,
    ) ||
    getMetaContent(
      head,
      "og:description",
    ) ||
    fallbackDescription;

  const canonicalUrl =
    getCanonicalUrl(head) ||
    getMetaContent(
      head,
      "og:url",
    );

  const openGraphType =
    getMetaContent(
      head,
      "og:type",
    );

  const openGraphImage =
    getMetaContent(
      head,
      "og:image",
    );

  const openGraphImageAlt =
    getMetaContent(
      head,
      "og:image:alt",
    );

  const openGraphImageType =
    getMetaContent(
      head,
      "og:image:type",
    );

  const twitterCard =
    getMetaContent(
      head,
      "twitter:card",
    );

  const twitterImage =
    getMetaContent(
      head,
      "twitter:image",
    ) || openGraphImage;

  const twitterImageAlt =
    getMetaContent(
      head,
      "twitter:image:alt",
    ) ||
    openGraphImageAlt ||
    title;

  const twitterUrl =
    getMetaContent(
      head,
      "twitter:url",
    );

  return {
    title,
    description,

    keywords: parseKeywords(
      seo.meta_keyword,
    ),

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        "max-image-preview":
          "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    alternates: canonicalUrl
      ? {
          canonical:
            canonicalUrl,
        }
      : undefined,

    openGraph: {
      type:
        openGraphType === "article"
          ? "article"
          : "website",

      title:
        getMetaContent(
          head,
          "og:title",
        ) || title,

      description:
        getMetaContent(
          head,
          "og:description",
        ) || description,

      url:
        getMetaContent(
          head,
          "og:url",
        ) || canonicalUrl,

      siteName:
        getMetaContent(
          head,
          "og:site_name",
        ),

      locale:
        getMetaContent(
          head,
          "og:locale",
        ),

      images: openGraphImage
        ? [
            {
              url:
                openGraphImage,

              alt:
                openGraphImageAlt ||
                title,

              type:
                openGraphImageType,
            },
          ]
        : undefined,
    },

    twitter: {
      card:
        twitterCard === "summary"
          ? "summary"
          : "summary_large_image",

      title:
        getMetaContent(
          head,
          "twitter:title",
        ) || title,

      description:
        getMetaContent(
          head,
          "twitter:description",
        ) || description,

      site:
        getMetaContent(
          head,
          "twitter:site",
        ),

      creator:
        getMetaContent(
          head,
          "twitter:creator",
        ),

      images: twitterImage
        ? [
            {
              url:
                twitterImage,

              alt:
                twitterImageAlt,
            },
          ]
        : undefined,
    },

    other: twitterUrl
      ? {
          "twitter:url":
            twitterUrl,
        }
      : undefined,
  };
}
