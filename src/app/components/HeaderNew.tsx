"use client";

import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
} from "react";

import axios from "axios";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

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

import logo from "../assets/logo-black.png";
import { apiUrl } from "../config";

/* =========================================================
   NAVIGATION
========================================================= */

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/product",
    label: "Projects",
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/contact",
    label: "Contact",
  },
] as const;

/* =========================================================
   SOCIAL LINKS
========================================================= */

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
] as const;

/* =========================================================
   TYPES
========================================================= */

type ApiCategory = {
  id: number;
  name: string;
  slug: string;
  module: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type CategoriesApiResponse = {
  success: boolean;
  message: string;
  data: ApiCategory[];
};

type HeaderProps = {
  logoVisible: boolean;
};

/* =========================================================
   HELPERS
========================================================= */

function getProjectUrl(
  slug: string,
): string {
  return `/product?slug=${encodeURIComponent(
    slug,
  )}`;
}

function normalizePathname(
  pathname: string,
) {
  if (pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "");
}

function getApiErrorMessage(
  error: unknown,
): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error &&
      error.message
      ? error.message
      : "Unable to load project categories.";
  }

  const responseMessage =
    error.response?.data?.message;

  if (
    typeof responseMessage === "string" &&
    responseMessage.trim()
  ) {
    return responseMessage;
  }

  return (
    error.message ||
    "Unable to load project categories."
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function HeaderNew({
  logoVisible,
}: HeaderProps) {
  const [
    scrolled,
    setScrolled,
  ] = useState(false);

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  const [
    mobileProjectsOpen,
    setMobileProjectsOpen,
  ] = useState(false);

  const [
    activePath,
    setActivePath,
  ] = useState("/");

  const [
    activeProjectSlug,
    setActiveProjectSlug,
  ] = useState("");

  const [
    projectCategories,
    setProjectCategories,
  ] = useState<ApiCategory[]>([]);

  const [
    projectCategoriesLoading,
    setProjectCategoriesLoading,
  ] = useState(true);

  const [
    projectCategoriesError,
    setProjectCategoriesError,
  ] = useState("");

  /* =======================================================
     PROJECT CATEGORY API
  ======================================================= */

  const fetchProjectCategories =
    useCallback(
      async (
        signal?: AbortSignal,
      ) => {
        setProjectCategoriesLoading(
          true,
        );

        setProjectCategoriesError("");

        try {
          const response =
            await axios.post<CategoriesApiResponse>(
              `${apiUrl}/categorieslist`,
              {},
              {
                signal,

                headers: {
                  Accept:
                    "application/json",

                  "Content-Type":
                    "application/json",
                },
              },
            );

          if (
            !response.data.success ||
            !Array.isArray(
              response.data.data,
            )
          ) {
            throw new Error(
              response.data.message ||
                "Invalid categories response received.",
            );
          }

          const filtered =
            response.data.data.filter(
              (category) =>
                category.status
                  ?.trim()
                  .toLowerCase() ===
                  "active" &&
                category.module
                  ?.trim()
                  .toLowerCase() ===
                  "photo_gallery",
            );

          if (!signal?.aborted) {
            setProjectCategories(
              filtered,
            );
          }
        } catch (
          error: unknown
        ) {
          if (
            signal?.aborted ||
            (axios.isAxiosError(
              error,
            ) &&
              error.code ===
                "ERR_CANCELED")
          ) {
            return;
          }

          setProjectCategories([]);

          setProjectCategoriesError(
            getApiErrorMessage(
              error,
            ),
          );
        } finally {
          if (!signal?.aborted) {
            setProjectCategoriesLoading(
              false,
            );
          }
        }
      },
      [],
    );

  useEffect(() => {
    const controller =
      new AbortController();

    void fetchProjectCategories(
      controller.signal,
    );

    return () => {
      controller.abort();
    };
  }, [
    fetchProjectCategories,
  ]);

  /* =======================================================
     CURRENT LOCATION
  ======================================================= */

  useEffect(() => {
    const updateLocation = () => {
      setActivePath(
        normalizePathname(
          window.location.pathname,
        ),
      );

      const params =
        new URLSearchParams(
          window.location.search,
        );

      setActiveProjectSlug(
        params.get("slug") ?? "",
      );
    };

    updateLocation();

    window.addEventListener(
      "popstate",
      updateLocation,
    );

    return () => {
      window.removeEventListener(
        "popstate",
        updateLocation,
      );
    };
  }, []);

  /* =======================================================
     SCROLL
  ======================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 30,
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  /* =======================================================
     MOBILE BODY LOCK
  ======================================================= */

  useEffect(() => {
    document.body.style.overflow =
      mobileMenuOpen
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [mobileMenuOpen]);

  /* =======================================================
     HANDLERS
  ======================================================= */

  const handleNavigation = (
    _event:
      MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setActivePath(href);

    setMobileMenuOpen(false);

    setMobileProjectsOpen(false);
  };

  const handleProjectNavigation =
    () => {
      setMobileMenuOpen(false);

      setMobileProjectsOpen(false);
    };

  const toggleMobileMenu =
    () => {
      setMobileMenuOpen(
        (current) => {
          const next =
            !current;

          if (!next) {
            setMobileProjectsOpen(
              false,
            );
          }

          return next;
        },
      );
    };

  const projectsMenuActive =
    activePath === "/product" ||
    activePath.startsWith(
      "/product/",
    );

  return (
    <>
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header
        className={`
          fixed inset-x-0 top-0
          z-[500]

          w-full

          border-b
          border-black/[0.07]

          bg-white

          transition-all
          duration-300

          ${
            scrolled ||
            mobileMenuOpen
              ? `
                  shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                `
              : ""
          }
        `}
      >
        {/* Main Header Row */}

        <div
          className="
            mx-auto

            flex
            h-[76px]
            w-full
            max-w-[1600px]

            items-center
            justify-between

            px-5

            sm:h-[80px]
            sm:px-8

            lg:h-[84px]
            lg:px-[5vw]
          "
        >
          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <motion.a
            href="/"
            onClick={(event) =>
              handleNavigation(
                event,
                "/",
              )
            }
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={
              logoVisible
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: -8,
                  }
            }
            transition={{
              duration: 0.65,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            className="
              relative z-[510]

              flex
              h-full
              w-[94px]

              shrink-0

              items-center
              justify-center

              sm:w-[102px]

              lg:w-[110px]
            "
            aria-label="HPI Studio Home"
          >
            <Image
              src={logo}
              alt="HPI Studio"
              width={680}
              height={503}
              priority
              className="
                block
                h-auto
                w-full

                object-contain
                object-center
              "
            />
          </motion.a>

          {/* ================================================= */}
          {/* DESKTOP NAV */}
          {/* ================================================= */}

          <nav
            aria-label="Main navigation"
            className="
              absolute
              left-1/2
              hidden

              -translate-x-1/2

              md:block
            "
          >
            <ul
              className="
                flex
                items-center

                gap-7

                lg:gap-9

                xl:gap-11
              "
            >
              {links.map(
                (link) => {
                  const isActive =
                    activePath ===
                    link.href;

                  const isProjects =
                    link.label ===
                    "Projects";

                  /* ========================================= */
                  /* PROJECTS */
                  /* ========================================= */

                  if (
                    isProjects
                  ) {
                    return (
                      <li
                        key={
                          link.href
                        }
                        className="
                          group
                          relative
                        "
                      >
                        <button
                          type="button"
                          aria-haspopup="true"
                          className={`
                            relative

                            flex
                            items-center
                            gap-1.5

                            py-8

                            text-[11px]
                            font-semibold
                            uppercase

                            tracking-[0.19em]

                            transition-colors
                            duration-300

                            lg:text-[12px]
                            lg:tracking-[0.22em]

                            ${
                              projectsMenuActive
                                ? `
                                    text-gold
                                  `
                                : `
                                    text-[#111827]

                                    group-hover:text-gold
                                  `
                            }
                          `}
                        >
                          <span>
                            {
                              link.label
                            }
                          </span>

                          <FiChevronDown
                            size={13}
                            strokeWidth={
                              1.8
                            }
                            className="
                              transition-transform
                              duration-300

                              group-hover:rotate-180
                            "
                          />

                          {/* Active underline */}

                          <span
                            aria-hidden="true"
                            className={`
                              absolute
                              bottom-[18px]
                              left-0

                              h-[2px]

                              bg-gold

                              transition-all
                              duration-300

                              ${
                                projectsMenuActive
                                  ? "w-full"
                                  : `
                                      w-0
                                      group-hover:w-full
                                    `
                              }
                            `}
                          />
                        </button>

                        {/* ================================= */}
                        {/* PROJECT DROPDOWN */}
                        {/* ================================= */}

                        <div
                          className="
                            invisible

                            absolute
                            left-1/2
                            top-full

                            z-[650]

                            w-[285px]

                            -translate-x-1/2
                            translate-y-2

                            opacity-0

                            transition-all
                            duration-300

                            group-hover:visible
                            group-hover:translate-y-0
                            group-hover:opacity-100
                          "
                        >
                          {/* Bridge so hover won't break */}

                          <div className="h-3" />

                          {/* Dropdown */}

                          <div
                            className="
                              relative

                              overflow-hidden

                              rounded-[2px]

                              border
                              border-black/[0.08]

                              bg-white

                              p-2

                              shadow-[0_20px_55px_rgba(0,0,0,0.14)]
                            "
                          >
                            {/* Green top accent */}

                            <span
                              aria-hidden="true"
                              className="
                                absolute
                                left-0
                                top-0

                                h-[2px]
                                w-full

                                bg-gradient-to-r
                                from-transparent
                                via-gold
                                to-transparent
                              "
                            />

                            {/* Loading */}

                            {projectCategoriesLoading && (
                              <div
                                className="
                                  space-y-2
                                  p-1
                                "
                              >
                                {Array.from(
                                  {
                                    length:
                                      4,
                                  },
                                ).map(
                                  (
                                    _,
                                    index,
                                  ) => (
                                    <div
                                      key={
                                        index
                                      }
                                      className="
                                        h-[46px]
                                        animate-pulse
                                        bg-black/[0.035]
                                      "
                                    />
                                  ),
                                )}
                              </div>
                            )}

                            {/* Error */}

                            {!projectCategoriesLoading &&
                              projectCategoriesError && (
                                <div
                                  className="
                                    px-4
                                    py-5

                                    text-center
                                  "
                                >
                                  <p
                                    className="
                                      text-[10px]
                                      leading-5
                                      text-red-500
                                    "
                                  >
                                    {
                                      projectCategoriesError
                                    }
                                  </p>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      void fetchProjectCategories()
                                    }
                                    className="
                                      mt-3

                                      text-[9px]
                                      font-semibold
                                      uppercase

                                      tracking-[0.18em]

                                      text-gold
                                    "
                                  >
                                    Try Again
                                  </button>
                                </div>
                              )}

                            {/* Empty */}

                            {!projectCategoriesLoading &&
                              !projectCategoriesError &&
                              projectCategories.length ===
                                0 && (
                                <p
                                  className="
                                    px-4
                                    py-5

                                    text-center

                                    text-[10px]

                                    text-[#6b7280]
                                  "
                                >
                                  No project
                                  categories
                                  available.
                                </p>
                              )}

                            {/* Category Items */}

                            {!projectCategoriesLoading &&
                              !projectCategoriesError &&
                              projectCategories.map(
                                (
                                  category,
                                ) => {
                                  const isSelected =
                                    activeProjectSlug ===
                                    category.slug;

                                  return (
                                    <a
                                      key={
                                        category.id
                                      }
                                      href={getProjectUrl(
                                        category.slug,
                                      )}
                                      onClick={
                                        handleProjectNavigation
                                      }
                                      aria-current={
                                        isSelected
                                          ? "page"
                                          : undefined
                                      }
                                      className={`
                                        group/item
                                        relative

                                        flex
                                        min-h-[48px]

                                        items-center

                                        overflow-hidden

                                        border-b
                                        border-black/[0.06]

                                        px-4

                                        last:border-b-0

                                        ${
                                          isSelected
                                            ? `
                                                bg-[#eef7f0]
                                              `
                                            : `
                                                bg-white
                                              `
                                        }
                                      `}
                                    >
                                      {/* Hover */}

                                      <span
                                        aria-hidden="true"
                                        className="
                                          absolute
                                          inset-0

                                          -translate-x-full

                                          bg-[#eef7f0]

                                          transition-transform
                                          duration-400

                                          ease-[cubic-bezier(0.16,1,0.3,1)]

                                          group-hover/item:translate-x-0
                                        "
                                      />

                                      {/* Dot */}

                                      <span
                                        aria-hidden="true"
                                        className={`
                                          relative
                                          z-10

                                          mr-3

                                          h-[5px]
                                          w-[5px]

                                          rotate-45

                                          transition-colors
                                          duration-300

                                          ${
                                            isSelected
                                              ? `
                                                  bg-gold
                                                `
                                              : `
                                                  bg-black/15

                                                  group-hover/item:bg-gold
                                                `
                                          }
                                        `}
                                      />

                                      {/* Text */}

                                      <span
                                        className={`
                                          relative
                                          z-10

                                          text-[10px]
                                          font-semibold
                                          uppercase

                                          tracking-[0.17em]

                                          transition-colors
                                          duration-300

                                          ${
                                            isSelected
                                              ? `
                                                  text-gold
                                                `
                                              : `
                                                  text-[#111827]

                                                  group-hover/item:text-gold
                                                `
                                          }
                                        `}
                                      >
                                        {
                                          category.name
                                        }
                                      </span>
                                    </a>
                                  );
                                },
                              )}
                          </div>
                        </div>
                      </li>
                    );
                  }

                  /* ========================================= */
                  /* NORMAL LINKS */
                  /* ========================================= */

                  return (
                    <li
                      key={
                        link.href
                      }
                    >
                      <a
                        href={
                          link.href
                        }
                        onClick={(
                          event,
                        ) =>
                          handleNavigation(
                            event,
                            link.href,
                          )
                        }
                        className={`
                          group
                          relative

                          block

                          py-8

                          text-[11px]
                          font-semibold
                          uppercase

                          tracking-[0.19em]

                          transition-colors
                          duration-300

                          lg:text-[12px]
                          lg:tracking-[0.22em]

                          ${
                            isActive
                              ? `
                                  text-gold
                                `
                              : `
                                  text-[#111827]

                                  hover:text-gold
                                `
                          }
                        `}
                      >
                        {
                          link.label
                        }

                        <span
                          aria-hidden="true"
                          className={`
                            absolute
                            bottom-[18px]
                            left-0

                            h-[2px]

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
                },
              )}
            </ul>
          </nav>

          {/* ================================================= */}
          {/* DESKTOP SOCIAL */}
          {/* ================================================= */}

          <div
            className="
              hidden

              items-center
              gap-2

              md:flex
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
                  aria-label={
                    label
                  }
                  title={
                    label
                  }
                  className="
                    group

                    flex
                    h-10
                    w-10

                    items-center
                    justify-center

                    rounded-full

                    border
                    border-black/10

                    bg-white

                    text-[#111827]/70

                    transition-all
                    duration-300

                    hover:-translate-y-0.5

                    hover:border-gold

                    hover:bg-gold

                    hover:text-white

                    hover:shadow-[0_6px_18px_rgba(17,94,40,0.16)]
                  "
                >
                  <Icon
                    size={15}
                  />
                </a>
              ),
            )}
          </div>

          {/* ================================================= */}
          {/* MOBILE BUTTON */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={
              toggleMobileMenu
            }
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={
              mobileMenuOpen
            }
            className="
              relative
              z-[510]

              flex
              h-10
              w-10

              items-center
              justify-center

              rounded-full

              border
              border-black/10

              bg-white

              text-[#111827]

              shadow-[0_4px_14px_rgba(0,0,0,0.05)]

              transition-all
              duration-300

              hover:border-gold
              hover:bg-gold
              hover:text-white

              md:hidden
            "
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
                    rotate:
                      -90,
                    scale:
                      0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale:
                      0.7,
                  }}
                  transition={{
                    duration:
                      0.2,
                  }}
                >
                  <FiX
                    size={21}
                  />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale:
                      0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate:
                      -90,
                    scale:
                      0.7,
                  }}
                  transition={{
                    duration:
                      0.2,
                  }}
                >
                  <FiMenu
                    size={22}
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ================================================= */}
      {/* MOBILE MENU */}
      {/* ================================================= */}

      <AnimatePresence>
        {mobileMenuOpen && (
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
            transition={{
              duration: 0.3,
            }}
            className="
              fixed
              inset-0
              z-[490]

              bg-white

              px-6
              pt-[96px]

              md:hidden
            "
          >
            <div
              className="
                mx-auto

                flex
                min-h-[calc(100svh-96px)]

                w-full
                max-w-sm

                flex-col
                justify-center

                pb-10
              "
            >
              <nav
                aria-label="Mobile navigation"
              >
                <ul>
                  {links.map(
                    (
                      link,
                      index,
                    ) => {
                      const isActive =
                        activePath ===
                        link.href;

                      const isProjects =
                        link.label ===
                        "Projects";

                      if (
                        isProjects
                      ) {
                        return (
                          <motion.li
                            key={
                              link.href
                            }
                            initial={{
                              opacity: 0,
                              y: 20,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              duration:
                                0.4,

                              delay:
                                index *
                                0.05,
                            }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setMobileProjectsOpen(
                                  (
                                    current,
                                  ) =>
                                    !current,
                                )
                              }
                              className={`
                                flex
                                w-full

                                items-center
                                justify-between

                                border-b
                                border-black/10

                                py-4

                                text-left

                                ${
                                  projectsMenuActive ||
                                  mobileProjectsOpen
                                    ? `
                                        text-gold
                                      `
                                    : `
                                        text-[#111827]
                                      `
                                }
                              `}
                            >
                              <span
                                className="
                                  text-[20px]
                                  font-medium
                                  uppercase

                                  tracking-[0.12em]
                                "
                              >
                                Projects
                              </span>

                              <FiChevronDown
                                size={18}
                                className={`
                                  transition-transform
                                  duration-300

                                  ${
                                    mobileProjectsOpen
                                      ? `
                                          rotate-180
                                        `
                                      : ""
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
                                    duration:
                                      0.35,
                                  }}
                                  className="
                                    overflow-hidden
                                  "
                                >
                                  <div
                                    className="
                                      bg-[#f7faf8]
                                      py-2
                                    "
                                  >
                                    {projectCategoriesLoading && (
                                      <div
                                        className="
                                          space-y-2
                                          px-3
                                          py-2
                                        "
                                      >
                                        {Array.from(
                                          {
                                            length:
                                              4,
                                          },
                                        ).map(
                                          (
                                            _,
                                            loadingIndex,
                                          ) => (
                                            <div
                                              key={
                                                loadingIndex
                                              }
                                              className="
                                                h-11
                                                animate-pulse
                                                bg-black/[0.035]
                                              "
                                            />
                                          ),
                                        )}
                                      </div>
                                    )}

                                    {!projectCategoriesLoading &&
                                      projectCategoriesError && (
                                        <div
                                          className="
                                            px-4
                                            py-5

                                            text-center
                                          "
                                        >
                                          <p
                                            className="
                                              text-[11px]
                                              text-red-500
                                            "
                                          >
                                            {
                                              projectCategoriesError
                                            }
                                          </p>

                                          <button
                                            type="button"
                                            onClick={() =>
                                              void fetchProjectCategories()
                                            }
                                            className="
                                              mt-3

                                              text-[9px]
                                              font-semibold
                                              uppercase

                                              tracking-[0.18em]

                                              text-gold
                                            "
                                          >
                                            Try Again
                                          </button>
                                        </div>
                                      )}

                                    {!projectCategoriesLoading &&
                                      !projectCategoriesError &&
                                      projectCategories.map(
                                        (
                                          category,
                                        ) => {
                                          const isSelected =
                                            activeProjectSlug ===
                                            category.slug;

                                          return (
                                            <a
                                              key={
                                                category.id
                                              }
                                              href={getProjectUrl(
                                                category.slug,
                                              )}
                                              onClick={
                                                handleProjectNavigation
                                              }
                                              className={`
                                                flex
                                                items-center

                                                border-b
                                                border-black/[0.06]

                                                px-4
                                                py-3.5

                                                last:border-b-0

                                                ${
                                                  isSelected
                                                    ? `
                                                        bg-[#eef7f0]
                                                        text-gold
                                                      `
                                                    : `
                                                        text-[#4b5563]
                                                      `
                                                }
                                              `}
                                            >
                                              <span
                                                className="
                                                  mr-3

                                                  h-[5px]
                                                  w-[5px]

                                                  rotate-45

                                                  bg-gold
                                                "
                                              />

                                              <span
                                                className="
                                                  text-[11px]
                                                  font-medium
                                                  uppercase

                                                  tracking-[0.15em]
                                                "
                                              >
                                                {
                                                  category.name
                                                }
                                              </span>
                                            </a>
                                          );
                                        },
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
                          key={
                            link.href
                          }
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration:
                              0.4,

                            delay:
                              index *
                              0.05,
                          }}
                        >
                          <a
                            href={
                              link.href
                            }
                            onClick={(
                              event,
                            ) =>
                              handleNavigation(
                                event,
                                link.href,
                              )
                            }
                            className={`
                              flex

                              border-b
                              border-black/10

                              py-4

                              text-[20px]
                              font-medium
                              uppercase

                              tracking-[0.12em]

                              transition-colors
                              duration-300

                              ${
                                isActive
                                  ? `
                                      text-gold
                                    `
                                  : `
                                      text-[#111827]

                                      hover:text-gold
                                    `
                              }
                            `}
                          >
                            {
                              link.label
                            }
                          </a>
                        </motion.li>
                      );
                    },
                  )}
                </ul>
              </nav>

              {/* Mobile Social */}

              <div
                className="
                  mt-8

                  flex
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
                      key={
                        label
                      }
                      href={
                        href
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        label
                      }
                      className="
                        flex
                        h-11
                        w-11

                        items-center
                        justify-center

                        rounded-full

                        border
                        border-black/10

                        bg-white

                        text-[#111827]/70

                        transition-all
                        duration-300

                        hover:border-gold
                        hover:bg-gold
                        hover:text-white
                      "
                    >
                      <Icon
                        size={16}
                      />
                    </a>
                  ),
                )}
              </div>

              <p
                className="
                  mt-7
                  text-center

                  text-[9px]
                  uppercase

                  tracking-[0.28em]

                  text-[#6b7280]
                "
              >
                HPI Studio · Interior Design
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}