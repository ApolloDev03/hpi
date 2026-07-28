# HPI Design Studio — Next.js + Tailwind + Framer Motion

A dark, gold-accented one-page site for HPI Design Studio, rebuilt from the static HTML
version into a proper Next.js 14 (App Router) + TypeScript + Tailwind CSS project.

**Animation library: Framer Motion** is used everywhere — the preloader's logo zoom-in,
the nav logo fade-in, the hero banner slider crossfade, scroll-triggered reveals on every
section, and the testimonial slider. One library, used consistently, instead of mixing
several animation approaches.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/
    layout.tsx      – fonts (Cormorant Garamond + Jost) and global <html>/<body>
    page.tsx         – assembles all sections, drives the preloader timing
    globals.css      – Tailwind directives + the corner-bracket signature motif
  components/
    Preloader.tsx     – logo zoom-in-and-settle animation on load
    Header.tsx        – fixed nav, scroll-aware background, logo fade-in
    Hero.tsx          – banner slider (3 slides, autoplay, arrows, dots)
    About.tsx         – studio story + corner-bracket visual
    Counters.tsx      – animated count-up stats, triggered on scroll into view
    Projects.tsx      – project grid with category tags and hover reveal
    Videos.tsx        – video gallery placeholders
    Testimonials.tsx  – crossfade testimonial slider with dot navigation
    Blog.tsx          – "From the Studio" journal grid
    Contact.tsx        – contact details + floating-label form
    Footer.tsx
public/
  logo-white.png     – the white, transparent HPI logo used throughout
```

## Notes for the next step

- All project photos, video thumbnails, and blog images are CSS gradient placeholders —
  swap them for real photography (e.g. via `next/image` with your own asset paths or a CMS).
- The contact form only prevents default submission; wire it up to an email service or
  API route (`src/app/api/contact/route.ts`) when you're ready to receive real enquiries.
- Colors, type scale and the corner-bracket motif are defined once in
  `tailwind.config.ts` and `globals.css` — change them there and they propagate everywhere.
