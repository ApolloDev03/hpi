"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";

import logo from "../assets/logo-white-hpi.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const projectLinks = [
  {
    href: "#projects",
    label: "Home",
  },
  {
    href: "#projects",
    label: "Showroom & Shop",
  },
  {
    href: "#projects",
    label: "Hospital",
  },
  {
    href: "#projects",
    label: "Corporate Office",
  },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
    icon: FaFacebookF,
  },
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
];

type HeaderProps = {
  logoVisible: boolean;
};

export default function HeaderNew({
  logoVisible,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] =
    useState(false);
  const [activeSection, setActiveSection] =
    useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = links
        .map((link) =>
          document.querySelector(link.href)
        )
        .filter(Boolean) as HTMLElement[];

      const currentSection = sections.find(
        (section) => {
          const rect =
            section.getBoundingClientRect();

          return (
            rect.top <= 160 &&
            rect.bottom >= 160
          );
        }
      );

      if (currentSection) {
        setActiveSection(
          `#${currentSection.id}`
        );
      }
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    const target =
      document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setActiveSection(href);
    setMobileMenuOpen(false);
    setMobileProjectsOpen(false);
  };

  const handleProjectNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    handleNavigation(event, href);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((current) => {
      const nextValue = !current;

      if (!nextValue) {
        setMobileProjectsOpen(false);
      }

      return nextValue;
    });
  };

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-[500]
          transition-all duration-500

          ${
            scrolled || mobileMenuOpen
              ? `
                border-b border-white/10
                bg-bg/90
                shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                backdrop-blur-xl
              `
              : `
                border-b border-transparent
                bg-transparent
              `
          }
        `}
      >
        <div
          className={`
            mx-auto grid w-full
            grid-cols-[auto_1fr_auto]
            items-center
            px-4 py-2
            transition-all duration-500

            sm:px-6
            lg:px-[5vw]

            ${
              scrolled
                ? "h-[90px] lg:h-[100px]"
                : "h-[82px] lg:h-[98px]"
            }
          `}
        >
          {/* Left: Logo */}
          <motion.a
            href="#home"
            onClick={(event) =>
              handleNavigation(
                event,
                "#home"
              )
            }
            initial={{
              opacity: 0,
              y: -12,
            }}
            animate={
              logoVisible
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: -12,
                  }
            }
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative z-[510]
              block w-[108px]
              shrink-0
            "
            aria-label="Go to homepage"
          >
            <Image
              src={logo}
              alt="HPI Studio"
              width={680}
              height={503}
              priority
              className="
                h-auto w-full
                object-contain
              "
            />
          </motion.a>

          {/* Center: Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="
              hidden justify-self-center
              md:block
            "
          >
            <ul
              className="
                flex items-center
                gap-6
                lg:gap-9
                xl:gap-10
              "
            >
              {links.map((link) => {
                const isActive =
                  activeSection === link.href;

                const isProjects =
                  link.label === "Projects";

                if (isProjects) {
                  return (
                    <li
                      key={link.href}
                      className="
                        group relative
                      "
                    >
                      {/* Projects trigger */}
                      <button
                        type="button"
                        className={`
                          relative flex
                          items-center gap-2
                          pb-2
                          text-[11px] font-bold
                          uppercase
                          tracking-[0.2em]
                          transition-colors
                          duration-300

                          lg:text-[12px]
                          lg:tracking-[0.24em]

                          ${
                            isActive
                              ? "text-gold"
                              : `
                                text-ivory
                                group-hover:text-gold
                              `
                          }
                        `}
                        aria-haspopup="true"
                      >
                        <span>
                          {link.label}
                        </span>

                        <FiChevronDown
                          size={14}
                          strokeWidth={1.8}
                          className="
                            transition-transform
                            duration-300

                            group-hover:rotate-180
                            group-focus-within:rotate-180
                          "
                        />

                        <span
                          aria-hidden="true"
                          className={`
                            absolute bottom-0 left-0
                            h-px bg-gold
                            transition-all
                            duration-300

                            ${
                              isActive
                                ? "w-full"
                                : `
                                  w-0
                                  group-hover:w-full
                                `
                            }
                          `}
                        />
                      </button>

                      {/* Projects dropdown */}
                      <div
                        className="
                          invisible absolute
                          left-1/2 top-full
                          z-[600]
                          w-[270px]
                          -translate-x-1/2
                          translate-y-4
                          pt-5
                          opacity-0
                          transition-all
                          duration-300

                          group-hover:visible
                          group-hover:translate-y-0
                          group-hover:opacity-100

                          group-focus-within:visible
                          group-focus-within:translate-y-0
                          group-focus-within:opacity-100
                        "
                      >
                        {/* Dropdown pointer */}
                        <span
                          aria-hidden="true"
                          className="
                            absolute left-1/2
                            top-[14px]
                            h-3 w-3
                            -translate-x-1/2
                            rotate-45
                            border-l border-t
                            border-gold/30
                            bg-[#0d0d0c]
                          "
                        />

                        <div
                          className="
                            relative overflow-hidden
                            border border-white/10
                            bg-[#0d0d0c]/95
                            p-2
                            shadow-[0_24px_65px_rgba(0,0,0,0.5)]
                            backdrop-blur-xl
                          "
                        >
                          <span
                            aria-hidden="true"
                            className="
                              absolute left-0 top-0
                              h-px w-full
                              bg-gradient-to-r
                              from-transparent
                              via-gold
                              to-transparent
                            "
                          />

                          {projectLinks.map(
                            (project) => (
                              <a
                                key={
                                  project.label
                                }
                                href={
                                  project.href
                                }
                                onClick={(
                                  event
                                ) =>
                                  handleProjectNavigation(
                                    event,
                                    project.href
                                  )
                                }
                                className="
                                  group/item
                                  relative flex
                                  items-center
                                  overflow-hidden
                                  border-b
                                  border-white/[0.07]
                                  px-4 py-4
                                  last:border-b-0
                                "
                              >
                                <span
                                  aria-hidden="true"
                                  className="
                                    absolute inset-0
                                    -translate-x-full
                                    bg-gold
                                    transition-transform
                                    duration-500
                                    ease-[cubic-bezier(0.16,1,0.3,1)]

                                    group-hover/item:translate-x-0
                                  "
                                />

                                <span
                                  className="
                                    relative z-10
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-ivory
                                    transition-colors
                                    duration-300

                                    group-hover/item:text-black
                                  "
                                >
                                  {
                                    project.label
                                  }
                                </span>
                              </a>
                            )
                          )}
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(event) =>
                        handleNavigation(
                          event,
                          link.href
                        )
                      }
                      className={`
                        group relative block
                        pb-2
                        text-[11px] font-bold
                        uppercase
                        tracking-[0.2em]
                        transition-colors
                        duration-300

                        lg:text-[12px]
                        lg:tracking-[0.24em]

                        ${
                          isActive
                            ? "text-gold"
                            : `
                              text-ivory
                              hover:text-gold
                            `
                        }
                      `}
                    >
                      {link.label}

                      <span
                        aria-hidden="true"
                        className={`
                          absolute bottom-0
                          left-0 h-px
                          bg-gold
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? "w-full"
                              : `
                                w-0
                                group-hover:w-full
                              `
                          }
                        `}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Desktop Social Media */}
          <div
            className="
              hidden justify-self-end
              items-center gap-2
              md:flex
            "
          >
            {socialLinks.map(
              ({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="
                    group/social
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    border border-white/10
                    bg-white/[0.03]
                    text-white/60
                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:border-gold
                    hover:bg-gold
                    hover:text-black

                    lg:h-10
                    lg:w-10
                  "
                >
                  <Icon
                    size={16}
                    strokeWidth={1.7}
                    className="
                      transition-transform
                      duration-300

                      group-hover/social:scale-105
                    "
                  />
                </a>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="
              relative z-[510]
              flex h-11 w-11
              items-center justify-center
              justify-self-end
              rounded-full
              border border-white/15
              bg-white/5
              text-white
              backdrop-blur-md
              transition-all
              duration-300

              hover:border-gold/60
              hover:bg-gold
              hover:text-black

              md:hidden
            "
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={
              mobileMenuOpen
            }
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {mobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <FiX size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <FiMenu size={23} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="
              fixed inset-0 z-[490]
              flex items-center
              justify-center
              bg-bg/98
              px-6
              backdrop-blur-2xl

              md:hidden
            "
            initial={{
              opacity: 0,
              clipPath:
                "circle(0% at 90% 7%)",
            }}
            animate={{
              opacity: 1,
              clipPath:
                "circle(150% at 90% 7%)",
            }}
            exit={{
              opacity: 0,
              clipPath:
                "circle(0% at 90% 7%)",
            }}
            transition={{
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Background decoration */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute left-1/2
                top-1/2
                h-[340px] w-[340px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border border-white/5
              "
            />

            <div
              className="
                relative z-10
                w-full max-w-sm
              "
            >
              <nav
                aria-label="Mobile navigation"
              >
                <ul className="space-y-2">
                  {links.map(
                    (link, index) => {
                      const isActive =
                        activeSection ===
                        link.href;

                      const isProjects =
                        link.label ===
                        "Projects";

                      if (isProjects) {
                        return (
                          <motion.li
                            key={
                              link.href
                            }
                            initial={{
                              opacity: 0,
                              y: 35,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              y: 20,
                            }}
                            transition={{
                              duration: 0.45,
                              delay:
                                0.15 +
                                index *
                                  0.07,
                              ease: [
                                0.16, 1,
                                0.3, 1,
                              ],
                            }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setMobileProjectsOpen(
                                  (
                                    current
                                  ) =>
                                    !current
                                )
                              }
                              className={`
                                group flex
                                w-full
                                items-center
                                justify-between
                                border-b py-3
                                transition-colors
                                duration-300

                                ${
                                  isActive ||
                                  mobileProjectsOpen
                                    ? `
                                      border-gold/50
                                      text-gold
                                    `
                                    : `
                                      border-white/10
                                      text-white
                                      hover:border-gold/50
                                      hover:text-gold
                                    `
                                }
                              `}
                              aria-expanded={
                                mobileProjectsOpen
                              }
                            >
                              <span
                                className="
                                  text-[20px]
                                  font-light
                                  uppercase
                                  tracking-[0.12em]
                                "
                              >
                                Projects
                              </span>

                              <FiChevronDown
                                size={19}
                                className={`
                                  transition-transform
                                  duration-300

                                  ${
                                    mobileProjectsOpen
                                      ? `
                                        rotate-180
                                        text-gold
                                      `
                                      : `
                                        text-white/40
                                      `
                                  }
                                `}
                              />
                            </button>

                            <AnimatePresence
                              initial={false}
                            >
                              {mobileProjectsOpen && (
                                <motion.div
                                  initial={{
                                    height: 0,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    height:
                                      "auto",
                                    opacity: 1,
                                  }}
                                  exit={{
                                    height: 0,
                                    opacity: 0,
                                  }}
                                  transition={{
                                    duration: 0.4,
                                    ease: [
                                      0.16,
                                      1,
                                      0.3,
                                      1,
                                    ],
                                  }}
                                  className="
                                    overflow-hidden
                                  "
                                >
                                  <div
                                    className="
                                      border-b
                                      border-gold/20
                                      bg-gold/[0.035]
                                      px-3 py-2
                                    "
                                  >
                                    {projectLinks.map(
                                      (
                                        project
                                      ) => (
                                        <a
                                          key={
                                            project.label
                                          }
                                          href={
                                            project.href
                                          }
                                          onClick={(
                                            event
                                          ) =>
                                            handleProjectNavigation(
                                              event,
                                              project.href
                                            )
                                          }
                                          className="
                                            group/sub
                                            flex
                                            items-center
                                            border-b
                                            border-white/[0.07]
                                            px-4 py-3.5
                                            last:border-b-0
                                          "
                                        >
                                          <span
                                            className="
                                              text-[12px]
                                              font-medium
                                              uppercase
                                              tracking-[0.17em]
                                              text-white/65
                                              transition-colors
                                              duration-300

                                              group-hover/sub:text-gold
                                            "
                                          >
                                            {
                                              project.label
                                            }
                                          </span>
                                        </a>
                                      )
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.li>
                        );
                      }

                      return (
                        <motion.li
                          key={link.href}
                          initial={{
                            opacity: 0,
                            y: 35,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: 20,
                          }}
                          transition={{
                            duration: 0.45,
                            delay:
                              0.15 +
                              index * 0.07,
                            ease: [
                              0.16, 1,
                              0.3, 1,
                            ],
                          }}
                        >
                          <a
                            href={
                              link.href
                            }
                            onClick={(
                              event
                            ) =>
                              handleNavigation(
                                event,
                                link.href
                              )
                            }
                            className={`
                              group flex
                              items-center
                              justify-between
                              border-b py-3
                              transition-colors
                              duration-300

                              ${
                                isActive
                                  ? `
                                    border-gold/50
                                    text-gold
                                  `
                                  : `
                                    border-white/10
                                    text-white
                                    hover:border-gold/50
                                    hover:text-gold
                                  `
                              }
                            `}
                          >
                            <span
                              className="
                                text-[20px]
                                font-light
                                uppercase
                                tracking-[0.12em]
                              "
                            >
                              {link.label}
                            </span>
                          </a>
                        </motion.li>
                      );
                    }
                  )}
                </ul>
              </nav>

              {/* Mobile Social Media */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.58,
                  duration: 0.5,
                }}
                className="
                  mt-8 flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                {socialLinks.map(
                  ({
                    href,
                    label,
                    icon: Icon,
                  }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="
                        flex h-11 w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/15
                        bg-white/[0.03]
                        text-white/60
                        transition-all
                        duration-300

                        hover:border-gold
                        hover:bg-gold
                        hover:text-black
                      "
                    >
                      <Icon
                        size={17}
                        strokeWidth={1.7}
                      />
                    </a>
                  )
                )}
              </motion.div>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.68,
                  duration: 0.5,
                }}
                className="
                  mt-7 text-center
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-white/35
                "
              >
                HPI Studio · Interior Design
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}