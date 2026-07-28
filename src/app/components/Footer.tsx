// import Image from "next/image";

// export default function Footer() {
//   return (
//     <footer className="py-16 px-[7vw] pb-10 text-center border-t border-line">
//       <div className="relative w-[70px] mx-auto mb-4 opacity-90">
//         <Image src="/logo-white.png" alt="HPI Studio" width={680} height={503} className="w-full h-auto" />
//       </div>
//       <div className="text-muted text-[0.7rem] uppercase tracking-widest2">
//         HPI Design Studio &nbsp;·&nbsp; Infused Your Dreams &nbsp;·&nbsp; © 2026
//       </div>
//     </footer>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Blogs", href: "#blogs" },
  { name: "Contact", href: "#contact" },
];

const services = [
  "Architecture Design",
  "Interior Design",
  "Landscape Design",
  "Turnkey Projects",
  "Project Management",
  "Design Consultation",
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedinIn,
  },
];
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#050505] text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#d4af37]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-52 -left-36 h-[420px] w-[420px] rounded-full bg-[#d4af37]/5 blur-[130px]" />

      {/* Top CTA */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-[#d4af37]">
                <span className="h-px w-8 bg-[#d4af37]" />
                Start Your Project
              </span>

              <h2 className="max-w-3xl text-3xl font-light leading-tight sm:text-4xl lg:text-5xl">
                Let&apos;s create a space that feels
                <span className="font-medium text-[#d4af37]"> truly yours.</span>
              </h2>
            </div>

            <Link
              href="#contact"
              className="group inline-flex min-h-14 items-center gap-4 rounded-full border border-[#d4af37] bg-[#d4af37] px-7 py-4 font-medium text-black transition-all duration-500 hover:bg-transparent hover:text-[#d4af37]"
            >
              Discuss Your Project
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#d4af37] group-hover:text-black">
                <ArrowUpRight size={17} />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="#home" className="inline-block">
              <Image
                src="/logo-white.png"
                alt="HPI Design Studio"
                width={190}
                height={80}
                className="h-auto w-[160px] object-contain md:w-[190px]"
              />
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-white/55">
              HPI Design Studio creates timeless architecture and thoughtfully
              designed interiors that combine creativity, functionality, and
              refined craftsmanship.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <FooterHeading title="Quick Links" />

            <ul className="mt-7 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/55 transition-colors duration-300 hover:text-[#d4af37]"
                  >
                    <span className="h-px w-0 bg-[#d4af37] transition-all duration-300 group-hover:w-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <FooterHeading title="Our Expertise" />

            <ul className="mt-7 space-y-4">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-sm text-white/55 transition-colors duration-300 hover:text-[#d4af37]"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <FooterHeading title="Contact Us" />

            <div className="mt-7 space-y-6">
              <ContactItem
                icon={MapPin}
                title="Studio"
                content="Ahmedabad, Gujarat, India"
              />

              <ContactItem
                icon={Phone}
                title="Call Us"
                content="+91 98765 43210"
                href="tel:+919876543210"
              />

              <ContactItem
                icon={Mail}
                title="Email Us"
                content="info@hpidesignstudio.com"
                href="mailto:info@hpidesignstudio.com"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {currentYear} HPI Design Studio. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-[#d4af37]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="transition-colors hover:text-[#d4af37]"
            >
              Terms & Conditions
            </Link>

            <p>
              Designed by{" "}
              <Link
                href="https://apolloinfotech.in"
                target="_blank"
                className="text-white/70 transition-colors hover:text-[#d4af37]"
              >
                Apollo Infotech
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Large background text */}
      <div className="pointer-events-none absolute bottom-12 right-4 hidden select-none text-[120px] font-bold leading-none tracking-tighter text-white/[0.015] xl:block">
        HPI
      </div>
    </footer>
  );
}

function FooterHeading({ title }: { title: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
        {title}
      </h3>
      <span className="mt-3 block h-px w-10 bg-[#d4af37]" />
    </div>
  );
}

type ContactItemProps = {
  icon: React.ElementType;
  title: string;
  content: string;
  href?: string;
};

function ContactItem({
  icon: Icon,
  title,
  content,
  href,
}: ContactItemProps) {
  const text = (
    <div>
      <p className="mb-1 text-xs uppercase tracking-[0.16em] text-[#d4af37]">
        {title}
      </p>
      <p className="text-sm leading-6 text-white/55 transition-colors duration-300 group-hover:text-white">
        {content}
      </p>
    </div>
  );

  return (
    <div className="group flex items-start gap-4">
      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/30 text-[#d4af37]">
        <Icon size={15} />
      </div>

      {href ? (
        <Link href={href} className="block">
          {text}
        </Link>
      ) : (
        text
      )}
    </div>
  );
}