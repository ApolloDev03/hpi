"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo-white.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

type HeaderProps = {
  logoVisible: boolean;
};

export default function Header({ logoVisible }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          ${
            scrolled || mobileMenuOpen
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
            sm:px-6 lg:px-[5vw]

            ${
              scrolled
                ? "h-[72px] lg:h-[76px]"
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

              ${
                scrolled
                  ? "w-[68px] sm:w-[74px]"
                  : "w-[78px] sm:w-[88px] lg:w-24"
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

                        ${
                          isActive
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

                          ${
                            isActive
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
            onClick={() => setMobileMenuOpen((current) => !current)}
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
                            border-b py-4
                            transition-colors duration-300

                            ${
                              isActive
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
                              text-[28px] font-light uppercase
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

                              ${
                                isActive
                                  ? "text-gold"
                                  : "text-white/30"
                              }
                            `}
                          >
                            0{index + 1}
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