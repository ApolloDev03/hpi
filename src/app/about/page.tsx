import type { Metadata } from "next";

import SeoJsonLd from "../components/SeoJsonLd";
import {
  buildSeoMetadata,
  extractJsonLdSchemas,
  getSeoData,
} from "../lib/seo";

import AboutClient from "./AboutClient";


const ABOUT_SEO_ID = "2";

/* =========================================================
   DYNAMIC ABOUT SEO
========================================================= */

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    id: ABOUT_SEO_ID,

    fallbackTitle:
      "About HPI Design Studio | Interior Design Practice",

    fallbackDescription:
      "Learn about HPI Design Studio, our creative vision, design philosophy, founder, mission and approach to creating timeless interior spaces.",
  });
}

/* =========================================================
   ABOUT PAGE
========================================================= */

export default async function AboutPage() {
  const seo = await getSeoData(
    ABOUT_SEO_ID,
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
        idPrefix="about-api-schema"
      />

      <AboutClient />
    </>
  );
}