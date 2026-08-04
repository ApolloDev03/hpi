"use client";

import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FaImages,
  FaPlay,
  FaVideo,
} from "react-icons/fa";

import {
  HiArrowLeft,
  HiArrowRight,
  HiArrowUpRight,
  HiOutlineXMark,
} from "react-icons/hi2";

import Breadcrumb from "@/app/components/Breadcrumb";

import homeBanner from "../assets/banner1.png";
import home1 from "../assets/blog2.webp";
import home2 from "../assets/blog3.webp";
import home3 from "../assets/blog3.webp";
import home4 from "../assets/corporate1.webp";
import home5 from "../assets/hospital2.webp";
import home6 from "../assets/home2.webp";


type CategoryKey =
  | "home";

type MediaTab = "images" | "videos";

type ProjectImage = {
  id: number;
  image: StaticImageData;
};

type ProjectVideo = {
  id: number;
  video: string;
};

type CategoryData = {
  shortTitle: string;
  eyebrow: string;
  description: string;
  banner: StaticImageData;
  imagePosition: string;
  images: ProjectImage[];
  videos: ProjectVideo[];
};

const categoryData: Record<CategoryKey, CategoryData> = {
  home: {
    shortTitle: "Home",
    eyebrow: "Residential Interiors",
    description:
      "Explore thoughtfully designed residences shaped around comfort, functionality, natural light and everyday living.",
    banner: homeBanner,
    imagePosition: "center",
    images: [
      {
        id: 1,
        image: home1,
      },
      {
        id: 2,
        image: home2,
      },
      {
        id: 3,
        image: home3,
      },
      {
        id: 4,
        image: home4,
      },
      {
        id: 5,
        image: home5,
      },
      {
        id: 6,
        image: home6,
      },
    ],
    videos: [
      {
        id: 1,
        video: "/videos/home/home-video-1.mp4",
      },
      {
        id: 2,
        video: "/videos/home/home-video-2.mp4",
      },
      {
        id: 3,
        video: "/videos/home/home-video-3.mp4",
      },
    ],
  },


};



export default function ProjectCategoryPage() {
  const params = useParams();
  const reduceMotion = useReducedMotion();

  const [activeTab, setActiveTab] =
    useState<MediaTab>("images");

  const [selectedImage, setSelectedImage] =
    useState<number | null>(null);

  const [selectedVideo, setSelectedVideo] =
    useState<ProjectVideo | null>(null);

  const category = useMemo(() => {
    const routeCategory = Array.isArray(
      params.category
    )
      ? params.category[0]
      : params.category;

    if (
      routeCategory &&
      routeCategory in categoryData
    ) {
      return routeCategory as CategoryKey;
    }

    return "home";
  }, [params.category]);

  const data = categoryData[category];

  const selectedImageData =
    selectedImage !== null
      ? data.images[selectedImage]
      : null;

  const showPreviousImage = () => {
    if (selectedImage === null) return;

    setSelectedImage(
      selectedImage === 0
        ? data.images.length - 1
        : selectedImage - 1
    );
  };

  const showNextImage = () => {
    if (selectedImage === null) return;

    setSelectedImage(
      selectedImage === data.images.length - 1
        ? 0
        : selectedImage + 1
    );
  };

  return (
    <main className="overflow-hidden bg-[#080807]">
      <Breadcrumb
        title="Home Detail"
        backgroundImage={data.banner}
        imagePosition={data.imagePosition}
        items={[
          {
            label: "Projects",
            href: "/#projects",
          },
          {
            label: data.shortTitle,
          },
        ]}
      />

      <section
        className="
          relative overflow-hidden
          bg-[#080807]
          px-5 py-20
          sm:px-8 sm:py-24
          lg:px-[5vw] lg:py-[100px]
        "
      >
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-48 top-1/3
            h-[500px] w-[500px]
            rounded-full
            bg-[#b8863a]/[0.05]
            blur-[170px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-44 bottom-0
            h-[430px] w-[430px]
            rounded-full
            bg-[#b8863a]/[0.035]
            blur-[155px]
          "
        />

        <div
          className="
            relative z-10
            mx-auto w-full
            max-w-[1500px]
          "
        >
          {/* Page introduction */}
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              mb-12 grid grid-cols-1
              gap-7
              lg:mb-16
              lg:grid-cols-[1fr_0.55fr]
              lg:items-end
              lg:gap-16
            "
          >
            <div>
              <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-11 bg-[#b8863a]" />

                <span
                  className="
                    text-[9px] font-semibold
                    uppercase tracking-[0.34em]
                    text-[#e6c583]
                  "
                >
                  {data.eyebrow}
                </span>
              </div>

              <h1
                className="
                  max-w-[790px]
                  font-serif font-medium
                  text-[clamp(2.4rem,4.7vw,4.6rem)]
                  leading-[1.04]
                  tracking-[-0.04em]
                  text-[#f3efe7]
                "
              >
                Selected work from
                <br />

                <em
                  className="
                    font-medium italic
                    text-[#e6c583]
                  "
                >
                  {data.shortTitle.toLowerCase()}.
                </em>
              </h1>
            </div>

            <p
              className="
                max-w-[420px]
                text-[12px] leading-[1.9]
                text-white/44
                sm:text-[13px]
                lg:justify-self-end
              "
            >
              {data.description}
            </p>
          </motion.div>

        

          {/* Images and videos tabs */}
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 22,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.12,
            }}
            className="
              mb-10 flex
              flex-col gap-5
              border-b border-white/10
              pb-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div
              role="tablist"
              aria-label="Project media"
              className="
                inline-flex w-full
                border border-white/10
                bg-[#0d0d0c]
                p-1.5
                sm:w-auto
              "
            >
              <button
                type="button"
                role="tab"
                aria-selected={
                  activeTab === "images"
                }
                onClick={() =>
                  setActiveTab("images")
                }
                className={`
                  relative flex min-h-12
                  flex-1 items-center
                  justify-center gap-3
                  overflow-hidden
                  px-6
                  text-[9px] font-semibold
                  uppercase tracking-[0.23em]
                  transition-colors duration-400
                  sm:min-w-[170px]

                  ${
                    activeTab === "images"
                      ? "text-[#080807]"
                      : `
                        text-white/45
                        hover:text-[#e6c583]
                      `
                  }
                `}
              >
                {activeTab === "images" && (
                  <motion.span
                    layoutId="active-media-tab"
                    className="
                      absolute inset-0
                      bg-[#b8863a]
                    "
                    transition={{
                      duration: reduceMotion
                        ? 0
                        : 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                )}

                <FaImages
                  size={14}
                  className="relative z-10"
                />

                <span className="relative z-10">
                  Images
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={
                  activeTab === "videos"
                }
                onClick={() =>
                  setActiveTab("videos")
                }
                className={`
                  relative flex min-h-12
                  flex-1 items-center
                  justify-center gap-3
                  overflow-hidden
                  px-6
                  text-[9px] font-semibold
                  uppercase tracking-[0.23em]
                  transition-colors duration-400
                  sm:min-w-[170px]

                  ${
                    activeTab === "videos"
                      ? "text-[#080807]"
                      : `
                        text-white/45
                        hover:text-[#e6c583]
                      `
                  }
                `}
              >
                {activeTab === "videos" && (
                  <motion.span
                    layoutId="active-media-tab"
                    className="
                      absolute inset-0
                      bg-[#b8863a]
                    "
                    transition={{
                      duration: reduceMotion
                        ? 0
                        : 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                )}

                <FaVideo
                  size={14}
                  className="relative z-10"
                />

                <span className="relative z-10">
                  Videos
                </span>
              </button>
            </div>

            <span
              className="
                text-[8px] font-semibold
                uppercase tracking-[0.26em]
                text-white/25
              "
            >
              {activeTab === "images"
                ? `${data.images.length} Project Images`
                : `${data.videos.length} Project Videos`}
            </span>
          </motion.div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {activeTab === "images" ? (
              <motion.div
                key="images"
                role="tabpanel"
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 15,
                }}
                transition={{
                  duration: reduceMotion
                    ? 0.1
                    : 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  grid grid-cols-1
                  gap-7
                  md:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {data.images.map(
                  (item, index) => (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setSelectedImage(index)
                      }
                      initial={{
                        opacity: 0,
                        y: reduceMotion
                          ? 0
                          : 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: reduceMotion
                          ? 0.1
                          : 0.65,
                        delay: reduceMotion
                          ? 0
                          : index * 0.08,
                      }}
                      className="
                        group relative
                        overflow-hidden
                        border border-white/10
                        bg-[#0d0d0c]
                        text-left
                        transition-all duration-500

                        hover:-translate-y-1
                        hover:border-[#b8863a]/45
                        hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)]
                      "
                    >
                      <div
                        className="
                          relative aspect-[4/3]
                          overflow-hidden
                        "
                      >
                        <Image
                          src={item.image}
                          alt=""
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
                            duration-[1000ms]
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
                            from-black/80
                            via-transparent
                            to-black/10
                          "
                        />

                     
                      </div>

                   
                    </motion.button>
                  )
                )}
              </motion.div>
            ) : (
              <motion.div
                key="videos"
                role="tabpanel"
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 15,
                }}
                transition={{
                  duration: reduceMotion
                    ? 0.1
                    : 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  grid grid-cols-1
                  gap-7
                  md:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {data.videos.map(
                  (item, index) => (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setSelectedVideo(item)
                      }
                      initial={{
                        opacity: 0,
                        y: reduceMotion
                          ? 0
                          : 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: reduceMotion
                          ? 0.1
                          : 0.65,
                        delay: reduceMotion
                          ? 0
                          : index * 0.08,
                      }}
                      className="
                        group relative
                        overflow-hidden
                        border border-white/10
                        bg-[#0d0d0c]
                        text-left
                        transition-all duration-500

                        hover:-translate-y-1
                        hover:border-[#b8863a]/45
                        hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)]
                      "
                    >
                      <div
                        className="
                          relative aspect-video
                          overflow-hidden
                        "
                      >
                        <Image
                          src={item.video}
                          alt=""
                          fill
                          sizes="
                            (max-width: 768px) 100vw,
                            (max-width: 1280px) 50vw,
                            33vw
                          "
                          className="
                            object-cover
                            transition-transform
                            duration-[1000ms]

                            group-hover:scale-[1.055]
                          "
                        />

                        <div
                          aria-hidden="true"
                          className="
                            pointer-events-none
                            absolute inset-0
                            bg-black/45
                            transition-colors duration-400

                            group-hover:bg-black/30
                          "
                        />

                        <span
                          className="
                            absolute left-1/2 top-1/2
                            flex h-16 w-16
                            -translate-x-1/2
                            -translate-y-1/2
                            items-center justify-center
                            rounded-full
                            border border-[#e6c583]/50
                            bg-black/45
                            text-[#e6c583]
                            backdrop-blur-md
                            transition-all duration-400

                            group-hover:scale-110
                            group-hover:border-[#b8863a]
                            group-hover:bg-[#b8863a]
                            group-hover:text-[#080807]
                          "
                        >
                          <FaPlay
                            size={16}
                            className="ml-1"
                          />
                        </span>

                     
                      </div>

                   
                    </motion.button>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Image lightbox */}
      <AnimatePresence>
        {selectedImageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-[1000]
              flex items-center justify-center
              bg-black/95
              px-4 py-16
              backdrop-blur-xl
            "
          >
            <button
              type="button"
              onClick={() =>
                setSelectedImage(null)
              }
              aria-label="Close image"
              className="
                absolute right-5 top-5
                z-20 flex h-12 w-12
                items-center justify-center
                rounded-full
                border border-white/15
                text-white/60
                transition-all duration-300

                hover:border-[#b8863a]
                hover:bg-[#b8863a]
                hover:text-[#080807]
              "
            >
              <HiOutlineXMark size={22} />
            </button>

            <button
              type="button"
              onClick={showPreviousImage}
              aria-label="Previous image"
              className="
                absolute left-4 top-1/2
                z-20 flex h-12 w-12
                -translate-y-1/2
                items-center justify-center
                rounded-full
                border border-white/15
                bg-black/30
                text-white/60
                transition-all duration-300

                hover:border-[#b8863a]
                hover:bg-[#b8863a]
                hover:text-[#080807]

                sm:left-8
              "
            >
              <HiArrowLeft size={20} />
            </button>

            <motion.div
              key={selectedImageData.id}
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              transition={{
                duration: 0.35,
              }}
              className="
                relative h-full
                max-h-[82vh] w-full
                max-w-[1300px]
              "
            >
              <Image
                src={selectedImageData.image}
                alt=""
                fill
                sizes="100vw"
                className="object-contain"
              />

            
            </motion.div>

            <button
              type="button"
              onClick={showNextImage}
              aria-label="Next image"
              className="
                absolute right-4 top-1/2
                z-20 flex h-12 w-12
                -translate-y-1/2
                items-center justify-center
                rounded-full
                border border-white/15
                bg-black/30
                text-white/60
                transition-all duration-300

                hover:border-[#b8863a]
                hover:bg-[#b8863a]
                hover:text-[#080807]

                sm:right-8
              "
            >
              <HiArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-[1000]
              flex items-center justify-center
              bg-black/95
              px-4 py-16
              backdrop-blur-xl
            "
          >
            <button
              type="button"
              onClick={() =>
                setSelectedVideo(null)
              }
              aria-label="Close video"
              className="
                absolute right-5 top-5
                z-20 flex h-12 w-12
                items-center justify-center
                rounded-full
                border border-white/15
                text-white/60
                transition-all duration-300

                hover:border-[#b8863a]
                hover:bg-[#b8863a]
                hover:text-[#080807]
              "
            >
              <HiOutlineXMark size={22} />
            </button>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              className="
                w-full max-w-[1200px]
                overflow-hidden
                border border-white/10
                bg-[#0d0d0c]
              "
            >
              <div className="aspect-video w-full">
                <video
                  key={selectedVideo.video}
                  controls
                  autoPlay
                  playsInline
                  className="
                    h-full w-full
                    bg-black object-contain
                  "
                >
                  <source
                    src={selectedVideo.video}
                    type="video/mp4"
                  />

                  Your browser does not support video.
                </video>
              </div>

              <div className="px-6 py-5">
                <span
                  className="
                    text-[8px] font-semibold
                    uppercase tracking-[0.25em]
                    text-[#b8863a]
                  "
                >
                  Project Walkthrough
                </span>

              
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}