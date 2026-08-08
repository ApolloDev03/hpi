"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo-white.png"
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { usePathname, useRouter } from "next/navigation";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "#about" },
  // { name: "Projects", href: "#projects" },
  { name: "Blogs", href: "#blogs" },
  { name: "Contact", href: "#contact" },
];

const services = [
  "Home",
  "Showroom & Shop",
  "Hospital",
  "Corporate Office"
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

  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();

    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const pathname = usePathname();
  const router = useRouter();

  const handleLogoClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (pathname === "/") {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    router.push("/");
  };

  return (
    <footer
      id="contact"
      className="
        relative overflow-hidden
        border-t border-white/10
        bg-[#070706]
        text-white
      "
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-40 top-0
          h-[420px] w-[420px]
          rounded-full
          bg-gold/[0.06]
          blur-[140px]
        "
      />

      {/* Large background word */}
      {/* <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          bottom-4 right-[3vw]
          hidden select-none
          font-serif text-[clamp(7rem,13vw,13rem)]
          font-semibold uppercase
          leading-none tracking-[-0.06em]
          text-white/[0.018]
          xl:block
        "
      >
        Studio
      </div> */}

      <div
        className="
          relative z-10 mx-auto
          w-full max-w-[1600px]
          px-5
          sm:px-8
          lg:px-[5vw]
        "
      >

        {/* Main footer area */}
        <div
          className="
            grid grid-cols-1 gap-12
            py-14

            sm:grid-cols-2

            lg:grid-cols-[1.35fr_0.7fr_0.7fr_1.3fr]
            lg:gap-14
            lg:py-16
          "
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="inline-block"
              aria-label="Go to homepage"
            >
              <Image
                src={logo}
                alt="HPI Design Studio"
                width={190}
                height={100}
                className="
                  h-auto w-[135px]
                  object-contain
                  sm:w-[150px]
                "
              />
            </Link>

            <p
              className="
                mt-6 max-w-[390px]
                text-[12px] leading-[1.9]
                text-white

                sm:text-[13px]
              "
            >
              HPI Design Studio creates considered architecture and
              refined interiors shaped around people, proportion,
              material and light.
            </p>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-2.5">
              {socialLinks.map(
                ({ name, href, icon: Icon }) => (
                  <Link
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    className="
                      group flex h-10 w-10
                      items-center justify-center
                      rounded-full
                      border border-white/12
                      bg-white/[0.02]
                      text-white/55
                      transition-all duration-300

                      hover:-translate-y-1
                      hover:border-gold
                      hover:bg-gold
                      hover:text-black
                    "
                  >
                    <Icon
                      size={15}
                      className="
                        transition-transform duration-300
                        group-hover:scale-110
                      "
                    />
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <FooterHeading title="Quick Links" />

            <ul className="mt-6 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(event) =>
                      handleScroll(event, link.href)
                    }
                    className="
                      group inline-flex
                      items-center gap-3
                      text-[14px]
                      text-white
                      transition-colors duration-300

                      hover:text-gold-light
                    "
                  >
                    <span
                      className="
                        h-px w-0 bg-gold
                        transition-all duration-300
                        group-hover:w-4
                      "
                    />

                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <FooterHeading title="Projects" />

            <ul className="mt-6 space-y-2.5">
              {services.map((service) => (
                <li
                  key={service}
                  className="
                    text-[14px]
                    leading-6
                    text-white
                    transition-colors duration-300

                    hover:text-gold-light
                  "
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <FooterHeading title="Studio Details" />

            <div className="mt-6 space-y-5">
              <ContactItem
                icon={MapPin}
                label="Location"
                content="03, First Floor, Natkamal Complex, Jawaharchowk, Maninagar, ahmedabad -380008, Gujarat"
                href="https://maps.app.goo.gl/qrwNZtBRzRBULF9S7"
              />

              <ContactItem
                icon={Phone}
                label="Phone"
                content="+91 99984 15438"
                href="tel:+919998415438"
              />

              <ContactItem
                icon={Mail}
                label="Email"
                content="info@hpidesignstudio.com"
                href="mailto:info@hpidesignstudio.com"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="
            relative flex flex-col gap-4
            border-t border-white/10
            py-6
            text-[10px]
            uppercase
            tracking-[0.16em]
            text-white/70

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {currentYear} HPI Design Studio. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="#"
              className="
                transition-colors duration-300
                hover:text-gold-light
              "
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="
                transition-colors duration-300
                hover:text-gold-light
              "
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({
  title,
}: {
  title: string;
}) {
  return (
    <div>
      <h3
        className="
          text-[15px] font-semibold
          uppercase tracking-[0.25em]
          text-ivory
        "
      >
        {title}
      </h3>

      <span
        className="
          mt-3 block
          h-px w-8
          bg-gold
        "
      />
    </div>
  );
}

type ContactItemProps = {
  icon: React.ElementType;
  label: string;
  content: string;
  href?: string;
};

function ContactItem({
  icon: Icon,
  label,
  content,
  href,
}: ContactItemProps) {
  const itemContent = (
    <>
      <span
        className="
          flex h-9 w-9
          shrink-0 items-center justify-center
          rounded-full
          border border-gold/25
          text-gold-light
          transition-all duration-300

          group-hover:border-gold
          group-hover:bg-gold
          group-hover:text-black
        "
      >
        <Icon size={14} />
      </span>

      <span>
        <span
          className="
            mb-1 block
            text-[13px] font-medium
            uppercase tracking-[0.23em]
            text-gold
          "
        >
          {label}
        </span>

        <span
          className="
            block max-w-[240px]
            text-[14px]  leading-6
            text-white
            transition-colors duration-300

          "
        >
          {content}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        className="
          group flex items-start gap-3.5
        "
      >
        {itemContent}
      </Link>
    );
  }

  return (
    <div className="group flex items-start gap-3.5">
      {itemContent}
    </div>
  );
}