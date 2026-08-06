import "server-only";

import type { Metadata } from "next";
import { cache } from "react";

const SEO_API_URL =
  "https://getdemo.in/hpi-design-studio/api/getSeoById";

/* =========================================================
   SEO TYPES
========================================================= */

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

type BuildSeoMetadataOptions = {
  id: string;
  fallbackTitle: string;
  fallbackDescription: string;
};

/* =========================================================
   BASIC HELPERS
========================================================= */

function cleanValue(
  value: string | null | undefined,
): string | undefined {
  const cleanedValue = value?.trim();

  return cleanedValue || undefined;
}

function escapeRegex(value: string): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
}

/* =========================================================
   READ HTML ATTRIBUTE
========================================================= */

function getHtmlAttribute(
  htmlTag: string,
  attributeName: string,
): string | undefined {
  const escapedAttribute =
    escapeRegex(attributeName);

  const pattern = new RegExp(
    `${escapedAttribute}\\s*=\\s*["']([^"']*)["']`,
    "i",
  );

  return cleanValue(
    htmlTag.match(pattern)?.[1],
  );
}

/* =========================================================
   READ META TAG FROM API HEAD
========================================================= */

function getMetaContent(
  html: string | null | undefined,
  attributeName: "name" | "property",
  attributeValue: string,
): string | undefined {
  if (!html?.trim()) {
    return undefined;
  }

  const metaTags =
    html.match(/<meta\b[^>]*>/gi) || [];

  for (const metaTag of metaTags) {
    const currentAttributeValue =
      getHtmlAttribute(
        metaTag,
        attributeName,
      );

    if (
      currentAttributeValue?.toLowerCase() ===
      attributeValue.toLowerCase()
    ) {
      return getHtmlAttribute(
        metaTag,
        "content",
      );
    }
  }

  return undefined;
}

/* =========================================================
   READ CANONICAL URL
========================================================= */

function getCanonicalUrl(
  html: string | null | undefined,
): string | undefined {
  if (!html?.trim()) {
    return undefined;
  }

  const linkTags =
    html.match(/<link\b[^>]*>/gi) || [];

  for (const linkTag of linkTags) {
    const rel =
      getHtmlAttribute(
        linkTag,
        "rel",
      );

    const relValues =
      rel
        ?.toLowerCase()
        .split(/\s+/)
        .filter(Boolean) || [];

    if (
      relValues.includes("canonical")
    ) {
      return getHtmlAttribute(
        linkTag,
        "href",
      );
    }
  }

  return undefined;
}

/* =========================================================
   CONVERT KEYWORDS
========================================================= */

function getKeywords(
  value: string | null | undefined,
): string[] | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  const keywords = value
    .split(/\r?\n|,/)
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  return keywords.length > 0
    ? keywords
    : undefined;
}

/* =========================================================
   FETCH SEO DATA
========================================================= */

export const getSeoData = cache(
  async (
    id: string,
  ): Promise<SeoData | null> => {
    try {
      const response = await fetch(
        SEO_API_URL,
        {
          method: "POST",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
          }),

          /*
           * Fetch latest SEO information
           * on every request.
           */
          cache: "no-store",
        },
      );

      if (!response.ok) {
        console.error(
          "SEO API request failed:",
          response.status,
          response.statusText,
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
          "Invalid SEO API response:",
          result.message,
        );

        return null;
      }

      return result.data;
    } catch (error) {
      console.error(
        "SEO API error:",
        error,
      );

      return null;
    }
  },
);

/* =========================================================
   BUILD NEXT.JS METADATA
========================================================= */

export async function buildSeoMetadata({
  id,
  fallbackTitle,
  fallbackDescription,
}: BuildSeoMetadataOptions): Promise<Metadata> {
  const seo = await getSeoData(id);

  if (!seo) {
    return {
      title: fallbackTitle,
      description:
        fallbackDescription,
    };
  }

  const title =
    cleanValue(seo.meta_title) ||
    cleanValue(seo.page_name) ||
    fallbackTitle;

  const description =
    cleanValue(
      seo.meta_description,
    ) || fallbackDescription;

  const head = seo.head;

  /* Open Graph values */

  const openGraphType =
    getMetaContent(
      head,
      "property",
      "og:type",
    );

  const openGraphTitle =
    getMetaContent(
      head,
      "property",
      "og:title",
    );

  const openGraphDescription =
    getMetaContent(
      head,
      "property",
      "og:description",
    );

  const openGraphUrl =
    getMetaContent(
      head,
      "property",
      "og:url",
    );

  const openGraphSiteName =
    getMetaContent(
      head,
      "property",
      "og:site_name",
    );

  const openGraphImage =
    getMetaContent(
      head,
      "property",
      "og:image",
    );

  const openGraphImageAlt =
    getMetaContent(
      head,
      "property",
      "og:image:alt",
    );

  const openGraphImageType =
    getMetaContent(
      head,
      "property",
      "og:image:type",
    );

  /* Twitter values */

  const twitterCard =
    getMetaContent(
      head,
      "name",
      "twitter:card",
    );

  const twitterTitle =
    getMetaContent(
      head,
      "name",
      "twitter:title",
    );

  const twitterDescription =
    getMetaContent(
      head,
      "name",
      "twitter:description",
    );

  const twitterImage =
    getMetaContent(
      head,
      "name",
      "twitter:image",
    );

  const twitterImageAlt =
    getMetaContent(
      head,
      "name",
      "twitter:image:alt",
    );

  const twitterSite =
    getMetaContent(
      head,
      "name",
      "twitter:site",
    );

  const twitterCreator =
    getMetaContent(
      head,
      "name",
      "twitter:creator",
    );

  const canonicalUrl =
    getCanonicalUrl(head);

  const robots =
    getMetaContent(
      head,
      "name",
      "robots",
    );

  return {
    title,
    description,

    keywords: getKeywords(
      seo.meta_keyword,
    ),

    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,

    robots: robots || undefined,

    openGraph: {
      type:
        openGraphType === "article"
          ? "article"
          : "website",

      title:
        openGraphTitle || title,

      description:
        openGraphDescription ||
        description,

      url:
        openGraphUrl ||
        canonicalUrl,

      siteName:
        openGraphSiteName,

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
        twitterTitle || title,

      description:
        twitterDescription ||
        description,

      site:
        twitterSite,

      creator:
        twitterCreator,

      images: twitterImage
        ? [
            {
              url:
                twitterImage,

              alt:
                twitterImageAlt ||
                title,
            },
          ]
        : undefined,
    },
  };
}

/* =========================================================
   JSON-LD EXTRACTION
========================================================= */

function extractSchemasFromSource(
  source: string | null | undefined,
): unknown[] {
  if (!source?.trim()) {
    return [];
  }

  const schemas: unknown[] = [];

  const scriptPattern =
    /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  let match:
    | RegExpExecArray
    | null;

  while (
    (match =
      scriptPattern.exec(source)) !==
    null
  ) {
    const schemaContent =
      match[1]?.trim();

    if (!schemaContent) {
      continue;
    }

    try {
      schemas.push(
        JSON.parse(schemaContent),
      );
    } catch (error) {
      console.error(
        "Invalid JSON-LD schema:",
        error,
      );
    }
  }

  /*
   * Support raw JSON in the API
   * body or head without script tags.
   */
  if (schemas.length === 0) {
    const trimmedSource =
      source.trim();

    const looksLikeJson =
      trimmedSource.startsWith("{") ||
      trimmedSource.startsWith("[");

    if (looksLikeJson) {
      try {
        schemas.push(
          JSON.parse(trimmedSource),
        );
      } catch {
        // Ignore invalid raw JSON.
      }
    }
  }

  return schemas;
}

export function extractJsonLdSchemas(
  ...sources: Array<
    string | null | undefined
  >
): unknown[] {
  const extractedSchemas =
    sources.flatMap(
      extractSchemasFromSource,
    );

  const uniqueSchemas =
    new Map<string, unknown>();

  extractedSchemas.forEach(
    (schema) => {
      try {
        uniqueSchemas.set(
          JSON.stringify(schema),
          schema,
        );
      } catch {
        // Ignore unserializable schema.
      }
    },
  );

  return Array.from(
    uniqueSchemas.values(),
  );
}