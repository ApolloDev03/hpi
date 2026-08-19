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
