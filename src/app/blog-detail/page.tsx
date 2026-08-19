
"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import Breadcrumb from "../components/Breadcrumb";
import aboutBreadcrumb from "@/app/assets/banner1.png";
import { apiUrl } from "../config";

/* =========================================================
   TYPES
========================================================= */

type BlogDetail = {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  description: string | null;
  meta_title: string | null;
  meta_keyword: string | null;
  meta_description: string | null;
  head: string | null;
  body: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  image_url: string | null;
};

type LatestBlog = {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  image_url: string | null;
};

type BlogDetailApiResponse = {
  success: boolean;
  message: string;
  data: BlogDetail;
  latest_blogs: LatestBlog[];
};

/* =========================================================
   API ERROR
========================================================= */

function getApiErrorMessage(
  error: unknown,
): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error &&
      error.message
      ? error.message
      : "Unable to load blog details.";
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
    "Unable to load blog details."
  );
}

/* =========================================================
   HTML HELPERS
========================================================= */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeApiHtml(
  value: string | null,
): string {
  if (!value?.trim()) {
    return "";
  }

  const content = value.trim();

  /*
   * Check whether API content already contains HTML.
   * Example:
   * <p>Description</p>
   * <h2>Heading</h2>
   * <img src="..." />
   */
  const containsHtml =
    /<\/?[a-z][\s\S]*>/i.test(content);

  if (containsHtml) {
    return content;
  }

  /*
   * When API returns normal plain text,
   * safely convert it into paragraph HTML.
   */
  return `<p>${escapeHtml(content)}</p>`;
}

/* =========================================================
   BLOG DETAIL CONTENT
========================================================= */

function BlogDetailContent() {
  const reduceMotion = useReducedMotion();
  const searchParams = useSearchParams();

  const blogSlug =
    searchParams.get("slug")?.trim() || "";

  const [blog, setBlog] =
    useState<BlogDetail | null>(null);

  const [latestBlogs, setLatestBlogs] =
    useState<LatestBlog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [currentUrl, setCurrentUrl] =
    useState("");

  const abortControllerRef =
    useRef<AbortController | null>(null);

  /* =======================================================
     FETCH BLOG DETAILS
  ======================================================= */

  const fetchBlogDetail = useCallback(
    async (signal?: AbortSignal) => {
      if (!blogSlug) {
        setBlog(null);
        setLatestBlogs([]);
        setLoading(false);

        setErrorMessage(
          "Blog slug is missing from the URL.",
        );

        return;
      }

      setLoading(true);
      setErrorMessage("");

      try {
        const response =
          await axios.post<BlogDetailApiResponse>(
            `${apiUrl}/blogdetail`,
            {
              slug: blogSlug,
            },
            {
              signal,
              headers: {
                Accept: "application/json",
                "Content-Type":
                  "application/json",
              },
            },
          );

        if (
          !response.data.success ||
          !response.data.data
        ) {
          throw new Error(
            response.data.message ||
              "Invalid blog detail response received.",
          );
        }

        if (signal?.aborted) {
          return;
        }

        const blogData =
          response.data.data;

        setBlog(blogData);

        const latestBlogData =
          Array.isArray(
            response.data.latest_blogs,
          )
            ? response.data.latest_blogs.filter(
                (item) =>
                  item.slug !== blogData.slug,
              )
            : [];

        setLatestBlogs(latestBlogData);
      } catch (error: unknown) {
        if (
          signal?.aborted ||
          (axios.isAxiosError(error) &&
            error.code === "ERR_CANCELED")
        ) {
          return;
        }

        setBlog(null);
        setLatestBlogs([]);

        setErrorMessage(
          getApiErrorMessage(error),
        );
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [blogSlug],
  );

  /* =======================================================
     INITIAL API CALL
  ======================================================= */

  useEffect(() => {
    abortControllerRef.current?.abort();

    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    void fetchBlogDetail(
      controller.signal,
    );

    return () => {
      controller.abort();
    };
  }, [fetchBlogDetail]);

  /* =======================================================
     CURRENT PAGE URL
  ======================================================= */

  useEffect(() => {
    setCurrentUrl(
      window.location.href,
    );
  }, [blogSlug]);

  /* =======================================================
     DYNAMIC DOCUMENT TITLE
  ======================================================= */

  useEffect(() => {
    if (!blog) {
      return;
    }

    document.title =
      blog.meta_title?.trim() ||
      blog.title;
  }, [blog]);

  /* =======================================================
     SHARE URLS
  ======================================================= */

  const facebookShareUrl =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl,
    )}`;

  const linkedInShareUrl =
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl,
    )}`;

  /* =======================================================
     RETRY API
  ======================================================= */

  const handleRetry = () => {
    abortControllerRef.current?.abort();

    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    void fetchBlogDetail(
      controller.signal,
    );
  };

return (
  <main className="overflow-hidden bg-white">
    <Breadcrumb
      title={blog?.title || "Blog Detail"}
      backgroundImage={aboutBreadcrumb}
      imagePosition="center"
      items={[
        {
          label: "Blog",
          href: "/blog",
        },
        {
          label: blog?.title || "Blog Detail",
        },
      ]}
    />

    <section
      className="
        relative
        bg-white
        px-5 py-16
        sm:px-8 sm:py-20
        lg:px-[5vw] lg:py-[90px]
      "
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-56 top-1/3
          h-[500px] w-[500px]
          rounded-full
          bg-gold/[0.04]
          blur-[170px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-0 top-0
          h-px w-[42%]
          bg-gradient-to-l
          from-gold/40
          to-transparent
        "
      />

      <div
        className="
          relative z-10
          mx-auto
          w-full max-w-[1500px]
        "
      >
        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div
            aria-busy="true"
            aria-label="Loading blog details"
            className="
              grid grid-cols-1
              gap-12
              lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]
              lg:gap-10
              xl:gap-14
            "
          >
            <div>
              <div
                className="
                  aspect-[16/9]
                  animate-pulse
                  bg-black/[0.04]
                "
              />

              <div
                className="
                  mt-10 h-14
                  w-3/4
                  animate-pulse
                  bg-black/[0.06]
                "
              />

              <div
                className="
                  mt-6 h-16
                  w-full max-w-[850px]
                  animate-pulse
                  bg-black/[0.04]
                "
              />

              <div
                className="
                  mt-10 h-[340px]
                  animate-pulse
                  bg-black/[0.025]
                "
              />
            </div>

            <div
              className="
                h-[520px]
                animate-pulse
                border border-black/10
                bg-black/[0.025]
              "
            />
          </div>
        )}

        {/* =================================================
            API ERROR
        ================================================= */}

        {!loading && errorMessage && (
          <div
            role="alert"
            className="
              flex min-h-[360px]
              flex-col items-center
              justify-center
              border border-red-200
              bg-red-50
              px-6 py-12
              text-center
            "
          >
            <p
              className="
                !m-0
                max-w-[580px]
                !text-sm
                !leading-7
                !text-red-600
              "
            >
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="
                mt-6
                !inline-flex
                !w-auto
                items-center
                gap-3
                !border
                !border-gold/50
                !bg-transparent
                !px-6
                !py-3
                !text-[10px]
                !font-semibold
                !uppercase
                !tracking-[0.2em]
                !text-gold
                transition-all
                duration-300
                hover:!bg-gold
                hover:!text-white
              "
            >
              <RefreshCw size={15} />

              Try Again
            </button>

            <Link
              href="/blog"
              className="
                mt-5
                inline-flex
                items-center
                gap-3
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#6b7280]
                transition-colors
                hover:text-gold
              "
            >
              <FaArrowLeft size={12} />

              Back to Blog
            </Link>
          </div>
        )}

        {/* =================================================
            DYNAMIC BLOG DETAIL
        ================================================= */}

        {!loading &&
          !errorMessage &&
          blog && (
            <div
              className="
                grid grid-cols-1
                gap-12
                lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]
                lg:items-start
                lg:gap-10
                xl:gap-14
              "
            >
              {/* =============================================
                  LEFT BLOG DETAIL
              ============================================= */}

              <motion.article
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: reduceMotion ? 0.1 : 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="min-w-0"
              >
                {/* MAIN IMAGE */}

                <div
                  className="
                    relative
                    aspect-[16/9]
                    overflow-hidden
                    bg-[#f3f4f6]
                  "
                >
                  {blog.image_url ? (
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      loading="eager"
                      className="
                        h-full w-full
                        object-cover
                        transition-transform
                        duration-[1200ms]
                        hover:scale-[1.025]
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex h-full
                        w-full
                        items-center
                        justify-center
                        text-sm
                        text-[#6b7280]
                      "
                    >
                      Image unavailable
                    </div>
                  )}

                  {/* Image overlay only */}
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

                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute inset-4
                      border border-white/20
                      sm:inset-5
                    "
                  />

                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute left-0 top-0
                      h-12 w-12
                      border-l-2
                      border-t-2
                      border-gold
                      sm:h-16 sm:w-16
                    "
                  />
                </div>

                {/* ===========================================
                    TITLE + DESCRIPTION
                =========================================== */}

                <div
                  className="
                    mt-8
                    sm:mt-10
                    lg:mt-12
                  "
                >
                  <h1
                    className="
                      !m-0
                      max-w-[980px]
                      !font-serif
                      text-[20px]
                      !font-medium
                      !leading-[1.04]
                      !tracking-[-0.04em]
                      !text-[#111827]
                      lg:text-[40px]
                    "
                  >
                    {blog.title}
                  </h1>

                  {blog.description?.trim() && (
                    <div
                      className="
                        blog-api-description
                        mt-5
                        max-w-[900px]
                        text-[#6b7280]
                        sm:mt-6

                        [&_a]:!text-gold
                        [&_a]:!underline
                        [&_a]:!underline-offset-4

                        [&_b]:!font-semibold
                        [&_b]:!text-[#111827]

                        [&_br]:block

                        [&_p]:!mb-5
                        [&_p]:!mt-0
                        [&_p]:!font-sans
                        [&_p]:!text-[clamp(0.875rem,1vw,1rem)]
                        [&_p]:!font-normal
                        [&_p]:!leading-[1.9]
                        [&_p]:!tracking-[0.01em]
                        [&_p]:!text-[#6b7280]

                        [&_p:last-child]:!mb-0

                        [&_strong]:!font-semibold
                        [&_strong]:!text-[#111827]
                      "
                      dangerouslySetInnerHTML={{
                        __html:
                          normalizeApiHtml(
                            blog.description,
                          ),
                      }}
                    />
                  )}
                </div>

                {/* ===========================================
                    BODY HTML
                =========================================== */}

                {blog.body?.trim() && (
                  <div
                    className="
                      blog-api-content
                      mt-9
                      max-w-[900px]
                      border-t
                      border-black/10
                      pt-9
                      text-[#6b7280]

                      sm:mt-12
                      sm:pt-12

                      [&>*:first-child]:!mt-0
                      [&>*:last-child]:!mb-0

                      [&_a]:!text-gold
                      [&_a]:!underline
                      [&_a]:!decoration-1
                      [&_a]:!underline-offset-4

                      [&_b]:!font-semibold
                      [&_b]:!text-[#111827]

                      [&_blockquote]:!relative
                      [&_blockquote]:!my-10
                      [&_blockquote]:!border-l-2
                      [&_blockquote]:!border-gold
                      [&_blockquote]:!bg-[#f0f8f2]
                      [&_blockquote]:!px-5
                      [&_blockquote]:!py-6
                      [&_blockquote]:!font-serif
                      [&_blockquote]:!text-[clamp(1.35rem,2.5vw,2rem)]
                      [&_blockquote]:!italic
                      [&_blockquote]:!leading-[1.5]
                      [&_blockquote]:!text-gold

                      sm:[&_blockquote]:!px-8
                      sm:[&_blockquote]:!py-8

                      [&_blockquote_p]:!m-0
                      [&_blockquote_p]:!font-inherit
                      [&_blockquote_p]:!text-inherit
                      [&_blockquote_p]:!leading-inherit

                      [&_figcaption]:!mt-3
                      [&_figcaption]:!text-center
                      [&_figcaption]:!text-xs
                      [&_figcaption]:!leading-6
                      [&_figcaption]:!text-[#9ca3af]

                      [&_figure]:!my-8
                      [&_figure]:!w-full
                      sm:[&_figure]:!my-10
                      lg:[&_figure]:!my-14

                      [&_figure_img]:!m-0

                      [&_h1]:!mb-5
                      [&_h1]:!mt-10
                      [&_h1]:!font-serif
                      [&_h1]:!text-[clamp(2rem,4vw,3.75rem)]
                      [&_h1]:!font-medium
                      [&_h1]:!leading-[1.05]
                      [&_h1]:!tracking-[-0.035em]
                      [&_h1]:!text-[#111827]

                      [&_h2]:!mb-5
                      [&_h2]:!mt-10
                      [&_h2]:!font-serif
                      [&_h2]:!text-[clamp(1.8rem,3.5vw,3.2rem)]
                      [&_h2]:!font-medium
                      [&_h2]:!leading-[1.1]
                      [&_h2]:!tracking-[-0.025em]
                      [&_h2]:!text-[#111827]

                      [&_h3]:!mb-4
                      [&_h3]:!mt-8
                      [&_h3]:!font-serif
                      [&_h3]:!text-[clamp(1.5rem,2.5vw,2.25rem)]
                      [&_h3]:!font-medium
                      [&_h3]:!leading-[1.2]
                      [&_h3]:!text-gold

                      [&_h4]:!mb-4
                      [&_h4]:!mt-8
                      [&_h4]:!font-serif
                      [&_h4]:!text-[clamp(1.25rem,2vw,1.75rem)]
                      [&_h4]:!font-medium
                      [&_h4]:!leading-[1.3]
                      [&_h4]:!text-[#111827]

                      [&_h5]:!mb-3
                      [&_h5]:!mt-7
                      [&_h5]:!font-serif
                      [&_h5]:!text-[clamp(1.15rem,1.8vw,1.5rem)]
                      [&_h5]:!font-medium
                      [&_h5]:!text-[#111827]

                      [&_h6]:!mb-3
                      [&_h6]:!mt-7
                      [&_h6]:!font-serif
                      [&_h6]:!text-[clamp(1rem,1.5vw,1.25rem)]
                      [&_h6]:!font-medium
                      [&_h6]:!text-gold

                      [&_iframe]:!my-8
                      [&_iframe]:!aspect-video
                      [&_iframe]:!h-auto
                      [&_iframe]:!w-full
                      [&_iframe]:!max-w-full
                      [&_iframe]:!border-0

                      sm:[&_iframe]:!my-10
                      lg:[&_iframe]:!my-14

                      [&_img]:!my-8
                      [&_img]:!block
                      [&_img]:!h-auto
                      [&_img]:!w-full
                      [&_img]:!max-w-full
                      [&_img]:!object-cover

                      sm:[&_img]:!my-10
                      lg:[&_img]:!my-14

                      [&_li]:!mb-3
                      [&_li]:!pl-1
                      [&_li]:!font-sans
                      [&_li]:!text-[clamp(0.875rem,1vw,1rem)]
                      [&_li]:!leading-[1.8]
                      [&_li]:!text-[#6b7280]

                      [&_li::marker]:!text-gold

                      [&_ol]:!my-6
                      [&_ol]:!list-decimal
                      [&_ol]:!pl-6

                      [&_p]:!mb-7
                      [&_p]:!mt-0
                      [&_p]:!font-sans
                      [&_p]:!text-[clamp(0.875rem,1vw,1rem)]
                      [&_p]:!font-normal
                      [&_p]:!leading-[2]
                      [&_p]:!tracking-[0.01em]
                      [&_p]:!text-[#6b7280]

                      [&_strong]:!font-semibold
                      [&_strong]:!text-[#111827]

                      [&_table]:!my-8
                      [&_table]:!w-full
                      [&_table]:!border-collapse
                      [&_table]:!overflow-hidden

                      [&_td]:!border
                      [&_td]:!border-black/10
                      [&_td]:!p-3
                      [&_td]:!text-sm
                      [&_td]:!leading-6
                      [&_td]:!text-[#6b7280]

                      [&_th]:!border
                      [&_th]:!border-black/10
                      [&_th]:!bg-[#f0f8f2]
                      [&_th]:!p-3
                      [&_th]:!text-left
                      [&_th]:!text-sm
                      [&_th]:!font-semibold
                      [&_th]:!text-gold

                      [&_ul]:!my-6
                      [&_ul]:!list-disc
                      [&_ul]:!pl-6

                      [&_video]:!my-8
                      [&_video]:!h-auto
                      [&_video]:!w-full
                      [&_video]:!max-w-full

                      sm:[&_video]:!my-10
                      lg:[&_video]:!my-14
                    "
                    dangerouslySetInnerHTML={{
                      __html:
                        normalizeApiHtml(
                          blog.body,
                        ),
                    }}
                  />
                )}

                {/* ===========================================
                    SHARE + BACK
                =========================================== */}

                <div
                  className="
                    mt-12
                    border-y
                    border-black/10
                    py-7
                  "
                >
                  <div
                    className="
                      flex flex-col
                      gap-6
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div
                      className="
                        flex items-center
                        gap-4
                      "
                    >
                      <div
                        className="
                          flex items-center
                          gap-2
                        "
                      >
                        <a
                          href={facebookShareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on Facebook"
                          className="
                            flex h-9 w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-black/10
                            bg-white
                            text-[#4b5563]
                            transition-all
                            duration-300
                            hover:border-gold
                            hover:bg-gold
                            hover:text-white
                          "
                        >
                          <FaFacebookF size={13} />
                        </a>

                        <a
                          href={currentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open article"
                          className="
                            flex h-9 w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-black/10
                            bg-white
                            text-[#4b5563]
                            transition-all
                            duration-300
                            hover:border-gold
                            hover:bg-gold
                            hover:text-white
                          "
                        >
                          <FaInstagram size={13} />
                        </a>

                        <a
                          href={linkedInShareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on LinkedIn"
                          className="
                            flex h-9 w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-black/10
                            bg-white
                            text-[#4b5563]
                            transition-all
                            duration-300
                            hover:border-gold
                            hover:bg-gold
                            hover:text-white
                          "
                        >
                          <FaLinkedinIn size={13} />
                        </a>
                      </div>
                    </div>

                    <Link
                      href="/blog"
                      className="
                        inline-flex
                        items-center
                        gap-3
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.24em]
                        text-gold
                        transition-colors
                        duration-300
                        hover:text-[#111827]
                      "
                    >
                      <FaArrowLeft size={12} />

                      Back to Blog
                    </Link>
                  </div>
                </div>
              </motion.article>

              {/* =============================================
                  RIGHT SIDE LATEST BLOGS
              ============================================= */}

              <motion.aside
                initial={{
                  opacity: 0,
                  x: reduceMotion ? 0 : 30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: reduceMotion ? 0.1 : 0.8,
                  delay: 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  lg:sticky
                  lg:top-[120px]
                  lg:self-start
                "
              >
                <div
                  className="
                    border
                    border-black/10
                    bg-white
                    p-5
                    shadow-[0_15px_45px_rgba(0,0,0,0.05)]
                    sm:p-6
                  "
                >
                  <div
                    className="
                      mb-7
                      flex items-center
                      justify-between
                      gap-5
                      border-b
                      border-black/10
                      pb-5
                    "
                  >
                    <div>
                      <span
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.28em]
                          text-gold
                        "
                      >
                        Continue Reading
                      </span>

                      <h2
                        className="
                          !mb-0
                          !mt-2
                          !font-serif
                          !text-2xl
                          !font-medium
                          !leading-tight
                          !tracking-normal
                          !text-[#111827]
                        "
                      >
                        Latest Blogs
                      </h2>
                    </div>

                    <span
                      aria-hidden="true"
                      className="
                        h-2 w-2
                        rotate-45
                        bg-gold
                      "
                    />
                  </div>

                  {latestBlogs.length === 0 ? (
                    <p
                      className="
                        !m-0
                        py-10
                        text-center
                        !text-xs
                        !leading-6
                        !text-[#6b7280]
                      "
                    >
                      No latest blogs available.
                    </p>
                  ) : (
                    <div className="space-y-5">
                      {latestBlogs.map(
                        (
                          latestBlog,
                          index,
                        ) => {
                          const detailUrl =
                            `/blog-detail?slug=${encodeURIComponent(
                              latestBlog.slug,
                            )}`;

                          return (
                            <Link
                              key={latestBlog.id}
                              href={detailUrl}
                              className="
                                group block
                                overflow-hidden
                                border
                                border-black/10
                                bg-white
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-gold/50
                                hover:shadow-[0_20px_55px_rgba(17,94,40,0.1)]
                              "
                            >
                              {/* Image */}
                              <div
                                className="
                                  relative
                                  aspect-[16/9]
                                  overflow-hidden
                                  bg-[#f3f4f6]
                                "
                              >
                                {latestBlog.image_url ? (
                                  <img
                                    src={latestBlog.image_url}
                                    alt={latestBlog.title}
                                    loading="lazy"
                                    className="
                                      h-full
                                      w-full
                                      object-cover
                                      transition-transform
                                      duration-[800ms]
                                      group-hover:scale-[1.06]
                                    "
                                  />
                                ) : (
                                  <div
                                    className="
                                      flex h-full
                                      w-full
                                      items-center
                                      justify-center
                                      bg-[#f3f4f6]
                                      text-xs
                                      text-[#6b7280]
                                    "
                                  >
                                    Image unavailable
                                  </div>
                                )}

                                <div
                                  aria-hidden="true"
                                  className="
                                    pointer-events-none
                                    absolute inset-0
                                    bg-gradient-to-t
                                    from-black/35
                                    via-transparent
                                    to-transparent
                                  "
                                />

                                <span
                                  className="
                                    absolute
                                    right-4 top-4
                                    flex h-8
                                    w-8
                                    items-center
                                    justify-center
                                    border
                                    border-white/50
                                    bg-white/90
                                    font-serif
                                    text-[11px]
                                    text-[#111827]
                                    backdrop-blur-md
                                  "
                                >
                                  {String(
                                    index + 1,
                                  ).padStart(
                                    2,
                                    "0",
                                  )}
                                </span>
                              </div>

                              {/* Latest blog title */}

                              <div
                                className="
                                  bg-white
                                  p-5
                                "
                              >
                                <h3
                                  className="
                                    !m-0
                                    !font-serif
                                    !text-[19px]
                                    !font-medium
                                    !leading-[1.3]
                                    !tracking-normal
                                    !text-[#111827]
                                    transition-colors
                                    duration-300
                                    group-hover:!text-gold
                                  "
                                >
                                  {latestBlog.title}
                                </h3>

                                <div
                                  className="
                                    mt-4
                                    flex items-center
                                    justify-between
                                    border-t
                                    border-black/10
                                    pt-4
                                  "
                                >
                                  <span
                                    className="
                                      text-[10px]
                                      font-semibold
                                      uppercase
                                      tracking-[0.23em]
                                      text-[#4b5563]
                                      transition-colors
                                      duration-300
                                      group-hover:text-gold
                                    "
                                  >
                                    Read Article
                                  </span>

                                  <FaArrowRight
                                    size={13}
                                    className="
                                      text-gold
                                      transition-transform
                                      duration-300
                                      group-hover:translate-x-1
                                    "
                                  />
                                </div>
                              </div>
                            </Link>
                          );
                        },
                      )}
                    </div>
                  )}
                </div>
              </motion.aside>
            </div>
          )}
      </div>
    </section>
  </main>
);
}

/* =========================================================
   SUSPENSE FALLBACK
========================================================= */

function BlogDetailFallback() {
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
          className="animate-spin"
        />

        <span
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.24em]
          "
        >
          Loading Blog
        </span>
      </div>
    </main>
  );
}

/* =========================================================
   PAGE EXPORT
========================================================= */

export default function BlogDetailPage() {
  return (
    <Suspense
      fallback={
        <BlogDetailFallback />
      }
    >
      <BlogDetailContent />
    </Suspense>
  );
}