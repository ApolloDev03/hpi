/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
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
  HiOutlineXMark,
} from "react-icons/hi2";
import {
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import Breadcrumb from "@/app/components/Breadcrumb";
import homeBanner from "../assets/banner1.png";
import { apiUrl } from "../config";

const PER_PAGE = 10;

type MediaTab = "images" | "videos";
type MediaType = "image" | "video";

type PhotoGallery = {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  description: string | null;
};

type AlbumItem = {
  id: number;
  title: string;
  image_video_type: MediaType;
  description: string | null;
  status: string;

  /*
   * Image response:
   * image_url contains the image.
   *
   * Video response may provide video_url or media_url.
   * image_url is kept as a final fallback.
   */
  image_url?: string | null;
  video_url?: string | null;
  media_url?: string | null;
  thumbnail_url?: string | null;
};

type ApiPagination = {
  total: number | string;
  per_page: number | string;
  current_page: number | string;
  last_page: number | string;
  from: number | string | null;
  to: number | string | null;
};

type CategoryProjectDetailResponse = {
  success: boolean;
  message: string;
  data: {
    photo_gallery: PhotoGallery;
    albums: AlbumItem[];
  };
  pagination: ApiPagination;
};

type PaginationState = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  from: number | null;
  to: number | null;
};

const INITIAL_PAGINATION: PaginationState = {
  total: 0,
  perPage: PER_PAGE,
  currentPage: 1,
  lastPage: 1,
  from: null,
  to: null,
};

function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error && error.message
      ? error.message
      : "Unable to load project details.";
  }

  const responseMessage = error.response?.data?.message;

  if (
    typeof responseMessage === "string" &&
    responseMessage.trim()
  ) {
    return responseMessage;
  }

  return (
    error.message ||
    "Unable to load project details."
  );
}

function getImageUrl(album: AlbumItem): string {
  return album.image_url?.trim() || "";
}

function getVideoUrl(album: AlbumItem): string {
  return (
    album.video_url?.trim() ||
    album.media_url?.trim() ||
    album.image_url?.trim() ||
    ""
  );
}

function getVideoThumbnail(
  album: AlbumItem,
): string {
  return (
    album.thumbnail_url?.trim() ||
    ""
  );
}

function normalizePagination(
  pagination: ApiPagination,
  requestedPage: number,
): PaginationState {
  return {
    total: Number(pagination.total) || 0,
    perPage:
      Number(pagination.per_page) ||
      PER_PAGE,
    currentPage:
      Number(pagination.current_page) ||
      requestedPage,
    lastPage:
      Number(pagination.last_page) || 1,
    from:
      pagination.from === null
        ? null
        : Number(pagination.from),
    to:
      pagination.to === null
        ? null
        : Number(pagination.to),
  };
}

function ProjectDetailContent() {
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();

  const projectSlug =
    searchParams.get("slug")?.trim() || "";

  /*
   * Images are selected and loaded by default.
   */
  const [activeTab, setActiveTab] =
    useState<MediaTab>("images");

  const [project, setProject] =
    useState<PhotoGallery | null>(null);

  const [albums, setAlbums] =
    useState<AlbumItem[]>([]);

  const [pagination, setPagination] =
    useState<PaginationState>(
      INITIAL_PAGINATION,
    );

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [
    selectedImageIndex,
    setSelectedImageIndex,
  ] = useState<number | null>(null);

  const [selectedVideo, setSelectedVideo] =
    useState<AlbumItem | null>(null);

  const abortControllerRef =
    useRef<AbortController | null>(null);

  const mediaType: MediaType =
    activeTab === "images"
      ? "image"
      : "video";

  const fetchProjectAlbums = useCallback(
    async (
      type: MediaType,
      page: number,
      scrollAfterLoad = false,
    ) => {
      if (!projectSlug) {
        setProject(null);
        setAlbums([]);
        setPagination(INITIAL_PAGINATION);
        setErrorMessage(
          "Project slug is missing from the URL.",
        );
        setLoading(false);
        return;
      }

      abortControllerRef.current?.abort();

      const controller =
        new AbortController();

      abortControllerRef.current =
        controller;

      setLoading(true);
      setErrorMessage("");
      setAlbums([]);

      try {
        const response =
          await axios.post<CategoryProjectDetailResponse>(
            `${apiUrl}/categoryprojectdetail`,
            {
              photo_gallery_slug:
                projectSlug,

              /*
               * Default tab sends "image".
               * Videos tab sends "video".
               */
              image_video_type: type,

              page,
              per_page: PER_PAGE,
            },
            {
              signal: controller.signal,
              headers: {
                Accept: "application/json",
                "Content-Type":
                  "application/json",
              },
            },
          );

        if (
          !response.data.success ||
          !response.data.data ||
          !response.data.data
            .photo_gallery ||
          !Array.isArray(
            response.data.data.albums,
          )
        ) {
          throw new Error(
            response.data.message ||
              "Invalid project detail response.",
          );
        }

        if (controller.signal.aborted) {
          return;
        }

        /*
         * The API should already filter by image_video_type.
         * This additional filter protects the UI if mixed
         * album records are returned.
         */
        const filteredAlbums =
          response.data.data.albums.filter(
            (album) =>
              album.status
                ?.trim()
                .toLowerCase() ===
                "active" &&
              album.image_video_type ===
                type,
          );

        setProject(
          response.data.data
            .photo_gallery,
        );

        setAlbums(filteredAlbums);

        setPagination(
          normalizePagination(
            response.data.pagination,
            page,
          ),
        );

        if (scrollAfterLoad) {
          window.requestAnimationFrame(
            () => {
              document
                .getElementById(
                  "project-media",
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            },
          );
        }
      } catch (error: unknown) {
        if (
          controller.signal.aborted ||
          (axios.isAxiosError(error) &&
            error.code ===
              "ERR_CANCELED")
        ) {
          return;
        }

        setAlbums([]);
        setPagination(
          INITIAL_PAGINATION,
        );
        setErrorMessage(
          getApiErrorMessage(error),
        );
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      }
    },
    [projectSlug],
  );

  /*
   * Initial request:
   * image_video_type = "image"
   * page = 1
   *
   * Tab change:
   * Images -> "image"
   * Videos -> "video"
   * page always resets to 1
   */
  useEffect(() => {
    setSelectedImageIndex(null);
    setSelectedVideo(null);
    setPagination(
      INITIAL_PAGINATION,
    );

    void fetchProjectAlbums(
      mediaType,
      1,
    );

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [
    mediaType,
    fetchProjectAlbums,
  ]);

  useEffect(() => {
    const modalOpen =
      selectedImageIndex !== null ||
      selectedVideo !== null;

    document.body.style.overflow =
      modalOpen ? "hidden" : "";

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setSelectedImageIndex(null);
        setSelectedVideo(null);
      }

      if (
        selectedImageIndex !== null &&
        albums.length > 0
      ) {
        if (
          event.key === "ArrowLeft"
        ) {
          setSelectedImageIndex(
            (current) => {
              if (current === null) {
                return null;
              }

              return current === 0
                ? albums.length - 1
                : current - 1;
            },
          );
        }

        if (
          event.key === "ArrowRight"
        ) {
          setSelectedImageIndex(
            (current) => {
              if (current === null) {
                return null;
              }

              return current ===
                albums.length - 1
                ? 0
                : current + 1;
            },
          );
        }
      }
    };

    if (modalOpen) {
      window.addEventListener(
        "keydown",
        handleKeyDown,
      );
    }

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    selectedImageIndex,
    selectedVideo,
    albums.length,
  ]);

  const selectedImage =
    selectedImageIndex !== null
      ? albums[selectedImageIndex] ??
        null
      : null;

  const selectedImageUrl =
    selectedImage
      ? getImageUrl(selectedImage)
      : "";

  const pageTitle =
    project?.title ||
    "";

  const pageDescription =
    project?.description ||
    "Explore project images and walkthrough videos.";

  const handleTabChange = (
    tab: MediaTab,
  ) => {
    if (tab === activeTab) {
      return;
    }

    /*
     * The effect will call the API with page 1
     * and the correct image_video_type.
     */
    setActiveTab(tab);
  };

  const changePage = (
    page: number,
  ) => {
    if (
      loading ||
      page < 1 ||
      page >
        pagination.lastPage ||
      page ===
        pagination.currentPage
    ) {
      return;
    }

    void fetchProjectAlbums(
      mediaType,
      page,
      true,
    );
  };

  const showPreviousImage = () => {
    if (
      selectedImageIndex === null ||
      albums.length === 0
    ) {
      return;
    }

    setSelectedImageIndex(
      selectedImageIndex === 0
        ? albums.length - 1
        : selectedImageIndex - 1,
    );
  };

  const showNextImage = () => {
    if (
      selectedImageIndex === null ||
      albums.length === 0
    ) {
      return;
    }

    setSelectedImageIndex(
      selectedImageIndex ===
        albums.length - 1
        ? 0
        : selectedImageIndex + 1,
    );
  };

  const visiblePages = useMemo(
    () => {
      const pages: number[] = [];
      const maximumPages = 5;

      let startPage = Math.max(
        1,
        pagination.currentPage -
          Math.floor(
            maximumPages / 2,
          ),
      );

      const endPage = Math.min(
        pagination.lastPage,
        startPage +
          maximumPages -
          1,
      );

      startPage = Math.max(
        1,
        endPage -
          maximumPages +
          1,
      );

      for (
        let page = startPage;
        page <= endPage;
        page += 1
      ) {
        pages.push(page);
      }

      return pages;
    },
    [
      pagination.currentPage,
      pagination.lastPage,
    ],
  );

return (
  <main
    className="
      overflow-hidden
      bg-white
    "
  >
    <Breadcrumb
      title={pageTitle}
      backgroundImage={homeBanner}
      imagePosition="center"
      items={[
        {
          label: "Projects",
          href: "/product?slug=home",
        },
        {
          label: pageTitle,
        },
      ]}
    />

    {/* ================================================= */}
    {/* PROJECT DETAIL */}
    {/* ================================================= */}

    <section
      className="
        relative overflow-hidden
        bg-white
        px-5 py-20
        sm:px-8 sm:py-24
        lg:px-[5vw]
        lg:py-[60px]
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-48
          top-1/3
          h-[500px]
          w-[500px]
          rounded-full
          bg-gold/[0.05]
          blur-[170px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-44
          bottom-0
          h-[430px]
          w-[430px]
          rounded-full
          bg-gold/[0.035]
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
        {/* ================================================= */}
        {/* INTRODUCTION */}
        {/* ================================================= */}

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
            mb-12 grid
            grid-cols-1 gap-7
            lg:mb-16
            lg:grid-cols-[1fr_0.55fr]
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
                  h-px w-11
                  bg-gold
                "
              />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.34em]
                  text-gold
                "
              >
                Project Showcase
              </span>
            </div>

            <h1
              className="
                max-w-[790px]
                font-serif
                font-medium
                text-[20px]
                leading-[1.04]
                tracking-[-0.04em]
                text-[#111827]
                capitalize
                lg:text-[50px]
              "
            >
              {pageTitle.toLowerCase()}.
            </h1>
          </div>

          <p
            className="
              max-w-[420px]
              text-[12px]
              leading-[1.9]
              text-[#6b7280]
              sm:text-[13px]
              lg:justify-self-end
            "
          >
            {pageDescription}
          </p>
        </motion.div>

        {/* ================================================= */}
        {/* MEDIA TABS */}
        {/* ================================================= */}

        <motion.div
          id="project-media"
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
            scroll-mt-28
            flex-col gap-5
            border-b
            border-black/10
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
              border
              border-black/10
              bg-[#f7f8f7]
              p-1.5
              sm:w-auto
            "
          >
            {/* Images */}

            <button
              type="button"
              role="tab"
              aria-selected={
                activeTab === "images"
              }
              onClick={() =>
                handleTabChange("images")
              }
              className={`
                relative flex
                min-h-12 flex-1
                items-center
                justify-center
                gap-3 overflow-hidden
                px-6
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.23em]
                transition-colors
                duration-400
                sm:min-w-[170px]

                ${
                  activeTab === "images"
                    ? "text-white"
                    : `
                        text-[#4b5563]
                        hover:text-gold
                      `
                }
              `}
            >
              {activeTab === "images" && (
                <motion.span
                  layoutId="active-media-tab"
                  className="
                    absolute inset-0
                    bg-gold
                  "
                  transition={{
                    duration:
                      reduceMotion
                        ? 0
                        : 0.4,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
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

            {/* Videos */}

            <button
              type="button"
              role="tab"
              aria-selected={
                activeTab === "videos"
              }
              onClick={() =>
                handleTabChange("videos")
              }
              className={`
                relative flex
                min-h-12 flex-1
                items-center
                justify-center
                gap-3 overflow-hidden
                px-6
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.23em]
                transition-colors
                duration-400
                sm:min-w-[170px]

                ${
                  activeTab === "videos"
                    ? "text-white"
                    : `
                        text-[#4b5563]
                        hover:text-gold
                      `
                }
              `}
            >
              {activeTab === "videos" && (
                <motion.span
                  layoutId="active-media-tab"
                  className="
                    absolute inset-0
                    bg-gold
                  "
                  transition={{
                    duration:
                      reduceMotion
                        ? 0
                        : 0.4,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
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

          {/* Total count */}

          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.26em]
              text-[#4b5563]
            "
          >
            {pagination.total}{" "}
            {activeTab === "images"
              ? pagination.total === 1
                ? "Project Image"
                : "Project Images"
              : pagination.total === 1
                ? "Project Video"
                : "Project Videos"}
          </span>
        </motion.div>

        {/* ================================================= */}
        {/* LOADING */}
        {/* ================================================= */}

        {loading && (
          <div
            aria-busy="true"
            aria-label={`Loading ${activeTab}`}
            className="
              grid grid-cols-1
              gap-7
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="
                  aspect-[4/3]
                  animate-pulse
                  border
                  border-black/10
                  bg-black/[0.04]
                "
              />
            ))}
          </div>
        )}

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {!loading && errorMessage && (
          <div
            role="alert"
            className="
              flex min-h-[280px]
              flex-col
              items-center
              justify-center
              border
              border-red-200
              bg-red-50
              px-6 py-12
              text-center
            "
          >
            <p
              className="
                max-w-[560px]
                text-sm
                leading-7
                text-red-600
              "
            >
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={() =>
                void fetchProjectAlbums(
                  mediaType,
                  pagination.currentPage || 1,
                )
              }
              className="
                mt-6 inline-flex
                items-center gap-3
                border
                border-gold/50
                px-6 py-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-gold
                transition-all
                duration-300
                hover:bg-gold
                hover:text-white
              "
            >
              <RefreshCw size={15} />

              Try Again
            </button>
          </div>
        )}

        {/* ================================================= */}
        {/* EMPTY */}
        {/* ================================================= */}

        {!loading &&
          !errorMessage &&
          albums.length === 0 && (
            <div
              className="
                flex min-h-[280px]
                items-center
                justify-center
                border
                border-black/10
                bg-white
                px-6 py-12
                text-center
              "
            >
              <p
                className="
                  text-sm
                  leading-7
                  text-[#6b7280]
                "
              >
                No {activeTab} are available
                for this project.
              </p>
            </div>
          )}

        {/* ================================================= */}
        {/* MEDIA */}
        {/* ================================================= */}

        {!loading &&
          !errorMessage &&
          albums.length > 0 && (
            <AnimatePresence mode="wait">
              {/* ============================================= */}
              {/* IMAGES */}
              {/* ============================================= */}

              {activeTab === "images" ? (
                <motion.div
                  key={`images-${pagination.currentPage}`}
                  role="tabpanel"
                  initial={{
                    opacity: 0,
                    y: reduceMotion
                      ? 0
                      : 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: reduceMotion
                      ? 0
                      : 15,
                  }}
                  transition={{
                    duration:
                      reduceMotion
                        ? 0.1
                        : 0.55,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  className="
                    grid grid-cols-1
                    gap-7
                    md:grid-cols-2
                    xl:grid-cols-3
                  "
                >
                  {albums.map(
                    (
                      album,
                      index,
                    ) => {
                      const imageUrl =
                        getImageUrl(
                          album,
                        );

                      return (
                        <motion.button
                          key={album.id}
                          type="button"
                          onClick={() =>
                            setSelectedImageIndex(
                              index,
                            )
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
                            duration:
                              reduceMotion
                                ? 0.1
                                : 0.65,
                            delay:
                              reduceMotion
                                ? 0
                                : index *
                                  0.08,
                          }}
                          className="
                            group relative
                            overflow-hidden
                            border
                            border-black/10
                            bg-white
                            text-left
                            shadow-[0_15px_45px_rgba(0,0,0,0.055)]
                            transition-all
                            duration-500
                            hover:-translate-y-1
                            hover:border-gold/45
                            hover:shadow-[0_28px_70px_rgba(17,94,40,0.12)]
                          "
                        >
                          <div
                            className="
                              relative
                              aspect-[4/3]
                              overflow-hidden
                              bg-[#f3f4f6]
                            "
                          >
                            {imageUrl ? (
                              <img
                                src={
                                  imageUrl
                                }
                                alt={
                                  album.title
                                }
                                loading={
                                  index < 3
                                    ? "eager"
                                    : "lazy"
                                }
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                  transition-transform
                                  duration-[1000ms]
                                  ease-[cubic-bezier(0.16,1,0.3,1)]
                                  group-hover:scale-[1.055]
                                "
                              />
                            ) : (
                              <div
                                className="
                                  flex h-full
                                  items-center
                                  justify-center
                                  text-xs
                                  text-[#6b7280]
                                "
                              >
                                Image unavailable
                              </div>
                            )}

                            {/* Keep image overlay subtle */}

                            <div
                              aria-hidden="true"
                              className="
                                pointer-events-none
                                absolute inset-0
                                bg-gradient-to-t
                                from-black/25
                                via-transparent
                                to-transparent
                              "
                            />

                            {/* Green hover border */}

                            <span
                              aria-hidden="true"
                              className="
                                pointer-events-none
                                absolute inset-4
                                border
                                border-white/0
                                transition-all
                                duration-500
                                group-hover:border-white/35
                              "
                            />
                          </div>
                        </motion.button>
                      );
                    },
                  )}
                </motion.div>
              ) : (
                /* =========================================== */
                /* VIDEOS */
                /* =========================================== */

                <motion.div
                  key={`videos-${pagination.currentPage}`}
                  role="tabpanel"
                  initial={{
                    opacity: 0,
                    y: reduceMotion
                      ? 0
                      : 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: reduceMotion
                      ? 0
                      : 15,
                  }}
                  transition={{
                    duration:
                      reduceMotion
                        ? 0.1
                        : 0.55,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  className="
                    grid grid-cols-1
                    gap-7
                    md:grid-cols-2
                    xl:grid-cols-3
                  "
                >
                  {albums.map(
                    (
                      album,
                      index,
                    ) => {
                      const thumbnail =
                        getVideoThumbnail(
                          album,
                        );

                      return (
                        <motion.button
                          key={album.id}
                          type="button"
                          onClick={() =>
                            setSelectedVideo(
                              album,
                            )
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
                            duration:
                              reduceMotion
                                ? 0.1
                                : 0.65,
                            delay:
                              reduceMotion
                                ? 0
                                : index *
                                  0.08,
                          }}
                          className="
                            group relative
                            overflow-hidden
                            border
                            border-black/10
                            bg-white
                            text-left
                            shadow-[0_15px_45px_rgba(0,0,0,0.055)]
                            transition-all
                            duration-500
                            hover:-translate-y-1
                            hover:border-gold/45
                            hover:shadow-[0_28px_70px_rgba(17,94,40,0.12)]
                          "
                        >
                          <div
                            className="
                              relative
                              aspect-video
                              overflow-hidden
                              bg-black
                            "
                          >
                            {thumbnail ? (
                              <img
                                src={
                                  thumbnail
                                }
                                alt={
                                  album.title
                                }
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                "
                              />
                            ) : (
                              <div
                                className="
                                  h-full w-full
                                  bg-[radial-gradient(circle_at_center,rgba(17,94,40,0.28),transparent_65%)]
                                "
                              />
                            )}

                            <div
                              aria-hidden="true"
                              className="
                                pointer-events-none
                                absolute inset-0
                                bg-black/40
                                transition-colors
                                duration-400
                                group-hover:bg-black/25
                              "
                            />

                            {/* Play button */}

                            <span
                              className="
                                absolute
                                left-1/2
                                top-1/2
                                flex h-16
                                w-16
                                -translate-x-1/2
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/70
                                bg-white/90
                                text-gold
                                backdrop-blur-md
                                transition-all
                                duration-400
                                group-hover:scale-110
                                group-hover:border-gold
                                group-hover:bg-gold
                                group-hover:text-white
                              "
                            >
                              <FaPlay
                                size={16}
                                className="ml-1"
                              />
                            </span>
                          </div>
                        </motion.button>
                      );
                    },
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}

        {/* ================================================= */}
        {/* PAGINATION */}
        {/* ================================================= */}

        {!loading &&
          !errorMessage &&
          pagination.lastPage > 1 && (
            <nav
              aria-label="Media pagination"
              className="
                mt-12 flex
                flex-wrap
                items-center
                justify-center
                gap-2
              "
            >
              <button
                type="button"
                onClick={() =>
                  changePage(
                    pagination.currentPage -
                      1,
                  )
                }
                disabled={
                  pagination.currentPage ===
                  1
                }
                className="
                  flex h-11
                  items-center gap-2
                  border
                  border-black/10
                  bg-white
                  px-4
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#4b5563]
                  transition-all
                  duration-300
                  hover:border-gold
                  hover:text-gold
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
              >
                <HiArrowLeft
                  size={16}
                />

                Previous
              </button>

              {visiblePages.map(
                (page) => {
                  const isCurrent =
                    page ===
                    pagination.currentPage;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() =>
                        changePage(page)
                      }
                      aria-current={
                        isCurrent
                          ? "page"
                          : undefined
                      }
                      className={`
                        flex h-11
                        w-11
                        items-center
                        justify-center
                        border
                        text-[10px]
                        font-semibold
                        transition-all
                        duration-300

                        ${
                          isCurrent
                            ? `
                                border-gold
                                bg-gold
                                text-white
                              `
                            : `
                                border-black/10
                                bg-white
                                text-[#4b5563]
                                hover:border-gold
                                hover:text-gold
                              `
                        }
                      `}
                    >
                      {String(page).padStart(
                        2,
                        "0",
                      )}
                    </button>
                  );
                },
              )}

              <button
                type="button"
                onClick={() =>
                  changePage(
                    pagination.currentPage +
                      1,
                  )
                }
                disabled={
                  pagination.currentPage ===
                  pagination.lastPage
                }
                className="
                  flex h-11
                  items-center gap-2
                  border
                  border-black/10
                  bg-white
                  px-4
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#4b5563]
                  transition-all
                  duration-300
                  hover:border-gold
                  hover:text-gold
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
              >
                Next

                <HiArrowRight
                  size={16}
                />
              </button>
            </nav>
          )}

        {/* Showing */}

        {!loading &&
          !errorMessage &&
          pagination.total > 0 && (
            <p
              className="
                mt-5 text-center
                text-[11px]
                uppercase
                tracking-[0.2em]
                text-[#6b7280]
              "
            >
              Showing{" "}
              {pagination.from ?? 0}–
              {pagination.to ?? 0} of{" "}
              {pagination.total}
            </p>
          )}
      </div>
    </section>

    {/* ================================================= */}
    {/* IMAGE LIGHTBOX */}
    {/* ================================================= */}

    <AnimatePresence>
      {selectedImage &&
        selectedImageUrl && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed inset-0
              z-[1000]
              flex items-center
              justify-center
              bg-black/95
              px-4 py-16
              backdrop-blur-xl
            "
          >
            {/* Close */}

            <button
              type="button"
              onClick={() =>
                setSelectedImageIndex(
                  null,
                )
              }
              aria-label="Close image"
              className="
                absolute right-5
                top-5 z-20
                flex h-12 w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                text-white/70
                transition-all
                duration-300
                hover:border-gold
                hover:bg-gold
                hover:text-white
              "
            >
              <HiOutlineXMark
                size={22}
              />
            </button>

            {/* Previous */}

            {albums.length > 1 && (
              <button
                type="button"
                onClick={
                  showPreviousImage
                }
                aria-label="Previous image"
                className="
                  absolute left-4
                  top-1/2 z-20
                  flex h-12 w-12
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/30
                  text-white/70
                  transition-all
                  duration-300
                  hover:border-gold
                  hover:bg-gold
                  hover:text-white
                  sm:left-8
                "
              >
                <HiArrowLeft
                  size={20}
                />
              </button>
            )}

            <motion.div
              key={
                selectedImage.id
              }
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
                relative flex
                h-full w-full
                max-h-[82vh]
                max-w-[1300px]
                items-center
                justify-center
              "
            >
              <img
                src={
                  selectedImageUrl
                }
                alt={
                  selectedImage.title
                }
                className="
                  max-h-full
                  max-w-full
                  object-contain
                "
              />
            </motion.div>

            {/* Next */}

            {albums.length > 1 && (
              <button
                type="button"
                onClick={
                  showNextImage
                }
                aria-label="Next image"
                className="
                  absolute right-4
                  top-1/2 z-20
                  flex h-12 w-12
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/30
                  text-white/70
                  transition-all
                  duration-300
                  hover:border-gold
                  hover:bg-gold
                  hover:text-white
                  sm:right-8
                "
              >
                <HiArrowRight
                  size={20}
                />
              </button>
            )}
          </motion.div>
        )}
    </AnimatePresence>

    {/* ================================================= */}
    {/* VIDEO MODAL */}
    {/* ================================================= */}

    <AnimatePresence>
      {selectedVideo && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
            fixed inset-0
            z-[1000]
            flex items-center
            justify-center
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
              absolute right-5
              top-5 z-20
              flex h-12 w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              text-white/70
              transition-all
              duration-300
              hover:border-gold
              hover:bg-gold
              hover:text-white
            "
          >
            <HiOutlineXMark
              size={22}
            />
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
              w-full
              max-w-[1200px]
              overflow-hidden
              border
              border-white/20
              bg-white
            "
          >
            <div
              className="
                aspect-video
                w-full
              "
            >
              {getVideoUrl(
                selectedVideo,
              ) ? (
                <video
                  key={getVideoUrl(
                    selectedVideo,
                  )}
                  controls
                  autoPlay
                  playsInline
                  poster={
                    getVideoThumbnail(
                      selectedVideo,
                    ) ||
                    undefined
                  }
                  className="
                    h-full w-full
                    bg-black
                    object-contain
                  "
                >
                  <source
                    src={getVideoUrl(
                      selectedVideo,
                    )}
                  />

                  Your browser does not
                  support video.
                </video>
              ) : (
                <div
                  className="
                    flex h-full
                    items-center
                    justify-center
                    bg-black
                    text-sm
                    text-white/50
                  "
                >
                  Video URL is unavailable.
                </div>
              )}
            </div>

            {/* Video content */}

            <div
              className="
                bg-white
                px-6 py-5
              "
            >
              <span
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-gold
                "
              >
                Project Walkthrough
              </span>

              <h3
                className="
                  mt-2
                  font-serif
                  text-xl
                  text-[#111827]
                "
              >
                {
                  selectedVideo.title
                }
              </h3>

              {selectedVideo.description && (
                <p
                  className="
                    mt-2
                    text-xs
                    leading-6
                    text-[#6b7280]
                  "
                >
                  {
                    selectedVideo.description
                  }
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </main>
);
}

function ProjectDetailFallback() {
  return (
    <main
      className="
        flex min-h-screen
        items-center
        justify-center
        bg-[#080807]
      "
    >
      <div
        className="
          flex items-center
          gap-3
          text-[#e6c583]
        "
      >
        <LoaderCircle
          size={22}
          className="
            animate-spin
          "
        />

        <span
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.24em]
          "
        >
          Loading Project
        </span>
      </div>
    </main>
  );
}

export default function ProjectDetailPage() {
  return (
    <Suspense
      fallback={
        <ProjectDetailFallback />
      }
    >
      <ProjectDetailContent />
    </Suspense>
  );
}