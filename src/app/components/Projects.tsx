  "use client";

  import { useState } from "react";
  import {
    AnimatePresence,
    motion,
    useReducedMotion,
  } from "framer-motion";
  import {
    ArrowRight,
    Building2,
    Hospital,
    House,
    Store,
    type LucideIcon,
  } from "lucide-react";

  import Image, { StaticImageData } from "next/image";

  import Reveal from "./Reveal";
  // import ImageReveal from "./ImageReveal";
  import home1 from "../assets/home1.webp"
  import home2 from "../assets/home2.webp"
  import home3 from "../assets/home3.webp"
  import showroom1 from "../assets/showroom1.webp";
  import showroom2 from "../assets/showroom2.webp";
  import showroom3 from "../assets/showroom3.webp";
  import hospital1 from "../assets/hospital1.webp";
  import hospital2 from "../assets/hospital2.webp";
  import hospital3 from "../assets/hospital3.webp";
  import corporate1 from "../assets/corporate1.webp";
  import corporate2 from "../assets/corporate2.webp";
  import corporate3 from "../assets/corporate3.webp";

  type ProjectCategory =
    | "home"
    | "showroom"
    | "hospital"
    | "corporate";

  type ProjectItem = {
    name: string;
    image: StaticImageData;
    href: string;
  };

  type ProjectTab = {
    id: ProjectCategory;
    label: string;
    icon: LucideIcon;
  };

  const tabs: ProjectTab[] = [
    {
      id: "home",
      label: "Home",
      icon: House,
    },
    {
      id: "showroom",
      label: "Showroom & Shop",
      icon: Store,
    },
    {
      id: "hospital",
      label: "Hospital",
      icon: Hospital,
    },
    {
      id: "corporate",
      label: "Corporate Office",
      icon: Building2,
    },
  ];

  const projects: Record<ProjectCategory, ProjectItem[]> = {
    home: [
      {
        name: "Vira Residence",
        image: home1,
        href: "#",
      },
      {
        name: "The Linden House",
        image: home2,
        href: "#",
      },
      {
        name: "Kavi Bungalow",
        image: home3,
        href: "#",
      },
    ],

    showroom: [
      {
        name: "Aurelia Jewellery",
        image: showroom1,
        href: "#",
      },
      {
        name: "Loom & Line",
        image:
          showroom2,
        href: "#",
      },
      {
        name: "Maison Living",
        image:
          showroom3,
        href: "#",
      },
    ],

    hospital: [
      {
        name: "Aster Care Hospital",
        image:
          hospital1,
        href: "#",
      },
      {
        name: "Nova Women’s Clinic",
        image:
          hospital2,
        href: "#",
      },
      {
        name: "Sanjeevani Medical Centre",
        image:
          hospital3,
        href: "#",
      },
    ],

    corporate: [
      {
        name: "Axis Corporate Office",
        image:
          corporate1,
        href: "#",
      },
      {
        name: "Orion Workspace",
        image:
          corporate2,
        href: "#",
      },
      {
        name: "Vertex Headquarters",
        image:
          corporate3,
        href: "#",
      },
    ],
  };

  export default function Projects() {
    const reduceMotion = useReducedMotion();

    const [activeTab, setActiveTab] =
      useState<ProjectCategory>("home");

    const activeProjects = projects[activeTab];

    return (
      <section
        id="projects"
        className="
          relative overflow-hidden
          bg-[#080807]
          px-5 py-20
          sm:px-8 sm:py-24
          lg:px-[5vw] lg:py-[110px]
        "
      >
        {/* Background glows */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-48 top-1/3
            h-[460px] w-[460px]
            rounded-full
            bg-[#b8863a]/[0.045]
            blur-[165px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-40 bottom-0
            h-[400px] w-[400px]
            rounded-full
            bg-[#b8863a]/[0.035]
            blur-[150px]
          "
        />

        <div
          className="
            relative z-10
            mx-auto w-full
            max-w-[1500px]
          "
        >
          {/* Heading */}
          <Reveal>
            <div
              className="
                mb-12 grid grid-cols-1
                gap-8
                md:mb-14
                lg:grid-cols-[0.82fr_1.18fr]
                lg:items-end
                lg:gap-16
              "
            >
              <div>
                <div
                  className="
                    mb-5 flex
                    items-center gap-4
                  "
                >
                  <span
                    className="
                      text-[10px] font-semibold
                      uppercase tracking-[0.34em]
                      text-[#d5a84f]
                    "
                  >
                    Our Work
                  </span>
                </div>

                <h2
                  className="
                    font-serif
                    text-[clamp(3rem,6vw,5.7rem)]
                    font-medium
                    leading-[0.95]
                    tracking-[-0.045em]
                    text-[#f3efe7]
                  "
                >
                  Projects
                </h2>
              </div>

              <div
                className="
                  flex max-w-[570px]
                  items-start gap-7
                  lg:pb-2
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    mt-1 hidden
                    h-[58px] w-px shrink-0
                    bg-[#b8863a]
                    sm:block
                  "
                />

                <p
                  className="
                    max-w-[470px]
                    text-[13px]
                    leading-[1.85]
                    text-white/48
                    sm:text-[14px]
                  "
                >
                  Spaces that reflect purpose, craftsmanship and
                  timeless design.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Tabs */}
          <Reveal delay={0.08}>
            <div
              role="tablist"
              aria-label="Project categories"
              className="
                mb-12 grid grid-cols-2
                overflow-hidden
                border border-[#b8863a]/45
                bg-[#0d0d0c]

                lg:grid-cols-4
                lg:rounded-[12px]
              "
            >
              {tabs.map((tab, index) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.id}
                    id={`project-tab-${tab.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`project-panel-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      group relative
                      min-h-[132px]
                      overflow-hidden
                      border-white/10
                      px-5 py-6
                      transition-colors duration-400

                      ${index % 2 === 0
                        ? "border-r"
                        : ""
                      }

                      ${index < 2
                        ? "border-b lg:border-b-0"
                        : ""
                      }

                      ${index < tabs.length - 1
                        ? "lg:border-r"
                        : ""
                      }

                      ${isActive
                        ? "text-[#090908]"
                        : `
                            bg-[#0d0d0c]
                            text-[#f3efe7]
                            hover:bg-[#12110f]
                            hover:text-[#e6c583]
                          `
                      }

                      lg:min-h-[145px]
                    `}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-project-category"
                        className="
                          absolute inset-0
                          bg-[linear-gradient(135deg,#e7c26f_0%,#c5963f_55%,#ad7729_100%)]
                        "
                        transition={{
                          duration: reduceMotion ? 0 : 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    )}

                    <span
                      className="
                        relative z-10
                        flex h-full
                        flex-col items-center
                        justify-center gap-4
                      "
                    >
                      <Icon
                        size={36}
                        strokeWidth={1.35}
                        className={`
                          transition-transform duration-400

                          ${isActive
                            ? "text-[#090908]"
                            : `
                                text-[#b8863a]
                                group-hover:-translate-y-1
                              `
                          }
                        `}
                      />

                      <span
                        className="
                          text-center
                          text-[10px] font-bold
                          uppercase tracking-[0.22em]
                          sm:text-[11px]
                        "
                      >
                        {tab.label}
                      </span>
                    </span>

                    {isActive && (
                      <motion.span
                        layoutId="active-project-tab-line"
                        className="
                          absolute bottom-0 left-1/2
                          z-20 h-[3px] w-[105px]
                          -translate-x-1/2
                          bg-[#f6d98f]
                          shadow-[0_0_18px_rgba(246,217,143,0.55)]
                        "
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Project cards */}
          <div
            id={`project-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`project-tab-${activeTab}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 28,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 18,
                }}
                transition={{
                  duration: reduceMotion ? 0.1 : 0.58,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  grid grid-cols-1 gap-7
                  md:grid-cols-2
                  xl:grid-cols-3
                  xl:gap-8
                "
              >
                {activeProjects.map((project, index) => (
                  <motion.article
                    key={project.name}
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 32,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: reduceMotion ? 0.1 : 0.65,
                      delay: reduceMotion ? 0 : index * 0.09,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                      group relative
                      overflow-hidden
                      border border-white/10
                      bg-[#0d0d0c]
                      shadow-[0_26px_75px_rgba(0,0,0,0.3)]
                      transition-all duration-500

                      hover:-translate-y-1
                      hover:border-[#b8863a]/45
                      hover:shadow-[0_35px_95px_rgba(0,0,0,0.42)]
                    "
                  >
                    {/* Image */}
                    <div
                      className="
                        relative h-auto
                        overflow-hidden
                        bg-[#15130f]
                      "
                    >
                      {/* <ImageReveal
                        className="absolute inset-0"
                        direction={
                          index % 2 === 0
                            ? "left"
                            : "right"
                        }
                        delay={index * 0.07}
                        parallax={18 + index * 3}
                        hoverScale={1.055}
                      > */}
                      <Image
                        src={project.image}
                        alt={project.name}

                        priority={index === 0}
                        sizes="
                            (max-width: 768px) 100vw,
                            (max-width: 1280px) 50vw,
                            33vw
                          "
                        className="object-contain h-auto w-full block transition-transform
                        duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]group-hover:scale-[1.055]
        "
                      />
                      {/* </ImageReveal> */}

                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute inset-0
                          bg-gradient-to-t
                          from-black/20
                          via-transparent
                          to-black/5
                        "
                      />
                    </div>

                    {/* Footer */}
                    <div
                      className="
                        relative
                        bg-[linear-gradient(180deg,#11110f_0%,#0b0b0a_100%)]
                        px-6 py-6
                        sm:px-7
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="
                          mb-4 block
                          h-px w-8
                          bg-[#b8863a]
                          transition-all duration-500

                          group-hover:w-14
                        "
                      />

                      <h3
                        className="
                          font-serif
                          text-[clamp(1.55rem,2.2vw,2.2rem)]
                          leading-[1.15]
                          tracking-[-0.02em]
                          text-[#f3efe7]
                          transition-colors duration-400

                          group-hover:text-[#e6c583]
                        "
                      >
                        {project.name}
                      </h3>

                      <a
                        href={project.href}
                        aria-label={`View ${project.name}`}
                        className="
                          mt-5 inline-flex
                          items-center gap-4
                          text-[10px] font-medium
                          text-[#c9973d]
                          transition-colors duration-300

                          hover:text-[#edcd82]
                        "
                      >
                        <span>View Project</span>

                        <ArrowRight
                          size={19}
                          strokeWidth={1.4}
                          className="
                            transition-transform duration-400
                            group-hover:translate-x-1.5
                          "
                        />
                      </a>

                      <span
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute bottom-0 left-0
                          h-[2px] w-0
                          bg-[#b8863a]
                          transition-all duration-500

                          group-hover:w-full
                        "
                      />
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    );
  }