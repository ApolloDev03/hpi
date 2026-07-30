"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Menu, X, } from "lucide-react";
import logo from "../assets/logo-white.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const projectLinks = [
  {
    href: "#",
    label: "Home",
  },
  {
    href: "#",
    label: "Showroom & Shop",
  },
  {
    href: "#",
    label: "Hospital",
  },
  {
    href: "#",
    label: "Corporate Office",
  },
];

type HeaderProps = {
  logoVisible: boolean;
};

export default function Header({ logoVisible }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] =
    useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = links
        .map((link) => document.querySelector(link.href))
        .filter(Boolean) as HTMLElement[];

      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();

        return rect.top <= 160 && rect.bottom >= 160;
      });

      if (currentSection) {
        setActiveSection(`#${currentSection.id}`);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setActiveSection(href);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-[500]
          transition-all duration-500
          ${scrolled || mobileMenuOpen
            ? `
                border-b border-white/10
                bg-bg/90
                shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                backdrop-blur-xl
              `
            : "border-b border-transparent bg-transparent"
          }
        `}
      >
        <div
          className={`
            mx-auto flex w-full items-center justify-between
            px-4 transition-all duration-500
            sm:px-6 lg:px-[5vw] py-2

            ${scrolled
              ? "h-[72px] lg:h-[100px]"
              : "h-[82px] lg:h-[98px]"
            }
          `}
        >
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(event) => handleNavigation(event, "#home")}
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
            className={`
              relative z-[510] block shrink-0
              transition-all duration-500

              ${scrolled
                ? "w-[108px] "
                : "w-[108px] "
              }
            `}
            aria-label="Go to homepage"
          >
            <Image
              src={logo}
              alt="HPI Studio"
              width={680}
              height={503}
              priority
              className="h-auto w-full object-contain"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-7 lg:gap-10">
              {links.map((link) => {
                const isActive = activeSection === link.href;
                const isProjects = link.label === "Projects";

                if (isProjects) {
                  return (
                    <li
                      key={link.href}
                      className="group relative"
                    >
                      {/* Projects trigger */}
                      <button
                        type="button"
                        className={`
            relative flex items-center gap-2 pb-2
            text-[12px] font-bold uppercase
            tracking-[0.24em]
            transition-colors duration-300

            ${isActive
                            ? "text-gold"
                            : "text-ivory group-hover:text-gold"
                          }
          `}
                      >
                        <span>{link.label}</span>

                        <ChevronDown
                          size={14}
                          strokeWidth={1.8}
                          className="
              transition-transform duration-300
              group-hover:rotate-180
              group-focus-within:rotate-180
            "
                        />

                        <span
                          className={`
              absolute bottom-0 left-0 h-px
              bg-gold
              transition-all duration-300

              ${isActive
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                            }
            `}
                        />
                      </button>

                      {/* Dropdown */}
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
            transition-all duration-300

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
              absolute left-1/2 top-[14px]
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
                          {/* Gold top line */}
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

                          {projectLinks.map((project, index) => (
                            <a
                              key={project.href}
                              href={project.href}
                              className="
                  group/item relative
                  flex items-center
                  justify-between
                  overflow-hidden
                  border-b border-white/[0.07]
                  px-4 py-4
                  last:border-b-0
                "
                            >
                              {/* Hover background */}
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:translate-x-0" />

                              <span
                                className="
                    relative z-10
                    text-[10px] font-semibold
                    uppercase tracking-[0.2em]
                    text-ivory
                    transition-colors duration-300

                    group-hover/item:text-black
                  "
                              >
                                {project.label}
                              </span>

                              <span
                                className="relative z-10 text-[9px] font-semibold tracking-[0.16em]
                              text-gold/60 transition-all duration-300 group-hover/item:translate-x-1
                              group-hover/item:text-black/55"
                              >
                                {/* 0{index + 1} */}
                              </span>
                            </a>
                          ))}
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
                        handleNavigation(event, link.href)
                      }
                      className={`
          group relative block pb-2
          text-[12px] font-bold uppercase
          tracking-[0.24em]
          transition-colors duration-300

          ${isActive
                          ? "text-gold"
                          : "text-ivory hover:text-gold"
                        }
        `}
                    >
                      {link.label}

                      <span
                        className={`
            absolute bottom-0 left-0 h-px
            bg-gold
            transition-all duration-300

            ${isActive
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                          }
          `}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((current) => !current);

              if (mobileMenuOpen) {
                setMobileProjectsOpen(false);
              }
            }}
            className="
              relative z-[510]
              flex h-11 w-11 items-center justify-center
              rounded-full border border-white/15
              bg-white/5 text-white
              backdrop-blur-md
              transition-all duration-300
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
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
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
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
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
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={23} />
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
              flex items-center justify-center
              bg-bg/98 px-6
              backdrop-blur-2xl
              md:hidden
            "
            initial={{
              opacity: 0,
              clipPath: "circle(0% at 90% 7%)",
            }}
            animate={{
              opacity: 1,
              clipPath: "circle(150% at 90% 7%)",
            }}
            exit={{
              opacity: 0,
              clipPath: "circle(0% at 90% 7%)",
            }}
            transition={{
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Background decoration */}
            <div
              className="
                pointer-events-none absolute
                left-1/2 top-1/2
                h-[340px] w-[340px]
                -translate-x-1/2 -translate-y-1/2
                rounded-full
                border border-white/5
              "
            />

            <div className="relative z-10 w-full max-w-sm">
              <nav>
                <ul className="space-y-2">
                  {links.map((link, index) => {
                    const isActive = activeSection === link.href;
                    const isProjects = link.label === "Projects";

                    if (isProjects) {
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
                            delay: 0.15 + index * 0.07,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          {/* Mobile Projects button */}
                          <button
                            type="button"
                            onClick={() =>
                              setMobileProjectsOpen(
                                (current) => !current
                              )
                            }
                            className={`
            group flex w-full
            items-center justify-between
            border-b py-1
            transition-colors duration-300

            ${isActive || mobileProjectsOpen
                                ? "border-gold/50 text-gold"
                                : `
                  border-white/10 text-white
                  hover:border-gold/50
                  hover:text-gold
                `
                              }
          `}
                            aria-expanded={mobileProjectsOpen}
                          >
                            <span
                              className="
              text-[20px] font-light
              uppercase tracking-[0.12em]
            "
                            >
                              Projects
                            </span>

                            <span
                              className="
              flex items-center gap-3
            "
                            >
                              <span
                                className={`
                text-xs tracking-widest

                ${isActive || mobileProjectsOpen
                                    ? "text-gold"
                                    : "text-white/30"
                                  }
              `}
                              >
                                {/* 0{index + 1} */}
                              </span>

                              <ChevronDown
                                size={19}
                                className={`
                transition-transform duration-300

                ${mobileProjectsOpen
                                    ? "rotate-180 text-gold"
                                    : "text-white/40"
                                  }
              `}
                              />
                            </span>
                          </button>

                          {/* Mobile dropdown */}
                          <AnimatePresence initial={false}>
                            {mobileProjectsOpen && (
                              <motion.div
                                initial={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                }}
                                exit={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                transition={{
                                  duration: 0.4,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className="overflow-hidden"
                              >
                                <div
                                  className="
                  border-b border-gold/20
                  bg-gold/[0.035]
                  px-3 py-3
                "
                                >
                                  {projectLinks.map(
                                    (project, projectIndex) => (
                                      <a
                                        key={project.href}
                                        href={project.href}
                                        onClick={() => {
                                          setMobileMenuOpen(false);
                                          setMobileProjectsOpen(false);
                                        }}
                                        className="
                        group/sub flex
                        items-center justify-between
                        border-b border-white/[0.07]
                        px-4 py-4
                        last:border-b-0
                      "
                                      >
                                        <span
                                          className="
                          text-[13px] font-medium
                          uppercase tracking-[0.17em]
                          text-white/65
                          transition-colors duration-300

                          group-hover/sub:text-gold
                        "
                                        >
                                          {project.label}
                                        </span>

                                        <span
                                          className="
                          text-[9px] tracking-[0.18em]
                          text-gold/50
                          transition-transform duration-300

                          group-hover/sub:translate-x-1
                        "
                                        >
                                          {/* 0{projectIndex + 1} */}
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
                          delay: 0.15 + index * 0.07,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <a
                          href={link.href}
                          onClick={(event) =>
                            handleNavigation(event, link.href)
                          }
                          className={`
          group flex items-center justify-between
          border-b py-1
          transition-colors duration-300

          ${isActive
                              ? "border-gold/50 text-gold"
                              : `
                border-white/10 text-white
                hover:border-gold/50
                hover:text-gold
              `
                            }
        `}
                        >
                          <span
                            className="
            text-[20px] font-light uppercase
            tracking-[0.12em]
          "
                          >
                            {link.label}
                          </span>

                          <span
                            className={`
            text-xs tracking-widest
            transition-transform duration-300
            group-hover:translate-x-1

            ${isActive
                                ? "text-gold"
                                : "text-white/30"
                              }
          `}
                          >
                            {/* 0{index + 1} */}
                          </span>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

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
                  delay: 0.65,
                  duration: 0.5,
                }}
                className="
                  mt-10 text-center
                  text-[10px] uppercase
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