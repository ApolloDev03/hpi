

"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
 import Reveal from "../components/Reveal";
import home1 from "../assets/blog2.webp";
import home2 from "../assets/blog3.webp";
import home3 from "../assets/blog3.webp";
import home4 from "../assets/corporate1.webp";
import home5 from "../assets/hospital2.webp";
import home6 from "../assets/home2.webp";
import Breadcrumb from "@/app/components/Breadcrumb";
import banner from "../assets/banner1.png"
type ProjectItem = {
  id: number;
  name: string;
  image: StaticImageData;
  href: string;
};

const homeProjects: ProjectItem[] = [
  {
    id: 1,
    name: "Vira Residence",
    image: home1,
    href: "/product-detail",
  },
  {
    id: 2,
    name: "The Linden House",
    image: home2,
    href: "/product-detail",
  },
  {
    id: 3,
    name: "Kavi Bungalow",
    image: home3,
    href: "/product-detail",
  },
  {
    id: 4,
    name: "Aarambh Residence",
    image: home4,
    href: "/product-detail",
  },
  {
    id: 5,
    name: "The Courtyard Home",
    image: home5,
    href: "/product-detail",
  },
  {
    id: 6,
    name: "Serene Villa",
    image: home6,
    href: "/product-detail",
  },
];
export default function HomeProjects() {
  const reduceMotion = useReducedMotion();

  return (
     <main className="overflow-hidden bg-[#080807]">
       <Breadcrumb
  title="Home Projects"
  backgroundImage={banner}
  imagePosition="center"
  items={[
    {
      label: "Projects",
      href: "/#projects",
    },
    {
      label: "Home",
    },
  ]}
/>
    <section
      id="home-projects"
      className="
        relative overflow-hidden
        bg-[#080807]
        px-5 py-20
        sm:px-8 sm:py-24
        lg:px-[5vw] lg:py-[100px]
      "
    >
      {/* Background glow */}
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

      {/* Top decorative line */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-0 top-0
          h-px w-[42%]
          bg-gradient-to-l
          from-[#b8863a]/60
          to-transparent
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
              md:mb-16
              lg:grid-cols-[0.82fr_1.18fr]
              lg:items-end
              lg:gap-16
            "
          >
            <div>
              <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-10 bg-[#b8863a]" />

                <span
                  className="
                    text-[10px] font-semibold
                    uppercase tracking-[0.34em]
                    text-[#d5a84f]
                  "
                >
                  Residential Interiors
                </span>
              </div>

              <h1
                className="
                  font-serif
                  text-[clamp(2.8rem,6vw,5.4rem)]
                  font-medium
                  leading-[0.96]
                  tracking-[-0.045em]
                  text-[#f3efe7]
                "
              >
                Home
                <br />

                <em
                  className="
                    font-medium italic
                    text-[#e6c583]
                  "
                >
                  Projects.
                </em>
              </h1>
            </div>

            <div
              className="
                flex max-w-[590px]
                items-start gap-7
                lg:pb-2
              "
            >
              <span
                aria-hidden="true"
                className="
                  mt-1 hidden
                  h-[70px] w-px
                  shrink-0
                  bg-[#b8863a]
                  sm:block
                "
              />

              <p
                className="
                  max-w-[500px]
                  text-[13px]
                  leading-[1.9]
                  text-white/48
                  sm:text-[14px]
                "
              >
                Explore thoughtfully designed homes shaped
                around comfort, natural light, functionality
                and the everyday lives of the people who
                inhabit them.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Project count */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mb-10 flex
            items-center justify-between
            border-y border-white/10
            py-5
          "
        >
          <span
            className="
              text-[9px] font-semibold
              uppercase tracking-[0.27em]
              text-[#e6c583]
            "
          >
            Selected Residential Work
          </span>

          <span
            className="
              text-[8px] font-semibold
              uppercase tracking-[0.25em]
              text-white/30
            "
          >
            {String(homeProjects.length).padStart(2, "0")} Projects
          </span>
        </motion.div>

        {/* Home project listing */}
        <div
          className="
            grid grid-cols-1
            gap-x-7 gap-y-10
            md:grid-cols-2
            xl:grid-cols-3
            xl:gap-x-8
            xl:gap-y-12
          "
        >
          {homeProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 34,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: reduceMotion ? 0.1 : 0.7,
                delay: reduceMotion ? 0 : index * 0.08,
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
              <Link
                href={project.href}
                className="block"
                aria-label={`View ${project.name}`}
              >
                {/* Project image */}
                <div
                  className="
                    relative aspect-[4/3]
                    overflow-hidden
                    bg-[#15130f]
                  "
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    priority={index < 3}
                    sizes="
                      (max-width: 768px) 100vw,
                      (max-width: 1280px) 50vw,
                      33vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-[1100ms]
                      ease-[cubic-bezier(0.16,1,0.3,1)]

                      group-hover:scale-[1.055]
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute inset-0
                      bg-gradient-to-t
                      from-black/65
                      via-black/5
                      to-black/10
                    "
                  />

                  {/* Project number */}
                  <span
                    className="
                      absolute left-5 top-5
                      flex h-9 min-w-9
                      items-center justify-center
                      border border-white/20
                      bg-black/25
                      px-2
                      text-[8px] font-semibold
                      tracking-[0.18em]
                      text-white/65
                      backdrop-blur-md
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* View arrow */}
                  <span
                    className="
                      absolute right-5 top-5
                      flex h-11 w-11
                      items-center justify-center
                      border border-white/20
                      bg-black/25
                      text-white/65
                      backdrop-blur-md
                      transition-all duration-400

                      group-hover:border-[#b8863a]
                      group-hover:bg-[#b8863a]
                      group-hover:text-[#080807]
                    "
                  >
                    <ArrowRight
                      size={19}
                      strokeWidth={1.4}
                      className="
                        -rotate-45
                        transition-transform duration-400

                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </span>

                  {/* Inner border */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute inset-4
                      border border-white/0
                      transition-all duration-500

                      group-hover:border-white/15
                    "
                  />
                </div>

                {/* Project title */}
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

                  <h2
                    className="
                      font-serif
                      text-[clamp(1.5rem,2.2vw,2.15rem)]
                      leading-[1.15]
                      tracking-[-0.02em]
                      text-[#f3efe7]
                      transition-colors duration-400

                      group-hover:text-[#e6c583]
                    "
                  >
                    {project.name}
                  </h2>

                  <div
                    className="
                      mt-5 flex
                      items-center justify-between
                    "
                  >
                    <span
                      className="
                        text-[9px] font-semibold
                        uppercase tracking-[0.24em]
                        text-[#c9973d]
                      "
                    >
                      View Project
                    </span>

                    <ArrowRight
                      size={18}
                      strokeWidth={1.4}
                      className="
                        text-[#c9973d]
                        transition-transform duration-400

                        group-hover:translate-x-1.5
                      "
                    />
                  </div>

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
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
     </main>
  );
}