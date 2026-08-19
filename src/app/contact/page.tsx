"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import axios from "axios";

import toast, {
  Toaster,
} from "react-hot-toast";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  LoaderCircle,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  HiOutlineArrowUpRight,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";

import Breadcrumb from "../components/Breadcrumb";

import aboutBreadcrumb from "@/app/assets/banner1.png";

import {
  apiUrl,
} from "../config";

/* =========================================================
   CONTACT SEO
========================================================= */

const CONTACT_SEO_ID = "3";

const CONTACT_SEO_ATTRIBUTE =
  "data-hpi-contact-api-seo";

const CONTACT_FALLBACK_TITLE =
  "Contact HPI Design Studio | Start Your Interior Project";

const CONTACT_FALLBACK_DESCRIPTION =
  "Contact HPI Design Studio to discuss residential, commercial, showroom, hospital and corporate interior design projects.";

const CONTACT_FALLBACK_KEYWORDS =
  "HPI Design Studio contact, interior designer Ahmedabad, interior design consultation, residential interior designer, commercial interior designer";

type SeoData = {
  id: number;
  page_name: string | null;
  meta_title: string | null;
  meta_keyword: string | null;
  meta_description: string | null;
  head: string | null;
  body: string | null;
  h1_tag: string | null;
  h1_tag_grey: string | null;
  created_at: string | null;
  updated_at: string | null;
};

type SeoApiResponse = {
  success: boolean;
  message: string;
  data: SeoData | null;
};

/* =========================================================
   REMOVE PREVIOUS SEO
========================================================= */

function removePreviousContactSeoElements() {
  document
    .querySelectorAll(
      `[${CONTACT_SEO_ATTRIBUTE}="true"]`,
    )
    .forEach((element) => {
      element.remove();
    });
}

/* =========================================================
   ADD META TAG
========================================================= */

function addContactMetaTag({
  name,
  property,
  content,
}: {
  name?: string;
  property?: string;
  content?: string | null;
}) {
  const cleanContent =
    content?.trim();

  if (!cleanContent) {
    return;
  }

  const meta =
    document.createElement(
      "meta",
    );

  if (name) {
    meta.setAttribute(
      "name",
      name,
    );
  }

  if (property) {
    meta.setAttribute(
      "property",
      property,
    );
  }

  meta.setAttribute(
    "content",
    cleanContent,
  );

  meta.setAttribute(
    CONTACT_SEO_ATTRIBUTE,
    "true",
  );

  document.head.appendChild(
    meta,
  );
}

/* =========================================================
   CANONICAL
========================================================= */

function addContactCanonicalLink(
  href: string,
) {
  const cleanHref =
    href.trim();

  if (!cleanHref) {
    return;
  }

  const link =
    document.createElement(
      "link",
    );

  link.setAttribute(
    "rel",
    "canonical",
  );

  link.setAttribute(
    "href",
    cleanHref,
  );

  link.setAttribute(
    CONTACT_SEO_ATTRIBUTE,
    "true",
  );

  document.head.appendChild(
    link,
  );
}

/* =========================================================
   JSON LD
========================================================= */

function addContactJsonLdScript(
  content: string,
  index: number,
) {
  const cleanContent =
    content.trim();

  if (!cleanContent) {
    return;
  }

  try {
    const schema =
      JSON.parse(
        cleanContent,
      );

    const script =
      document.createElement(
        "script",
      );

    script.id =
      `contact-api-schema-${index}`;

    script.type =
      "application/ld+json";

    script.textContent =
      JSON.stringify(
        schema,
      );

    script.setAttribute(
      CONTACT_SEO_ATTRIBUTE,
      "true",
    );

    document.head.appendChild(
      script,
    );
  } catch (error) {
    console.error(
      "Invalid Contact JSON-LD schema:",
      error,
    );
  }
}

/* =========================================================
   APPLY HEAD HTML
========================================================= */

function applyContactApiHeadHtml(
  headHtml: string | null,
) {
  if (!headHtml?.trim()) {
    return;
  }

  const parser =
    new DOMParser();

  const parsedDocument =
    parser.parseFromString(
      headHtml,
      "text/html",
    );

  parsedDocument
    .querySelectorAll(
      "meta",
    )
    .forEach(
      (sourceMeta) => {
        const name =
          sourceMeta
            .getAttribute(
              "name",
            )
            ?.trim();

        const property =
          sourceMeta
            .getAttribute(
              "property",
            )
            ?.trim();

        const content =
          sourceMeta
            .getAttribute(
              "content",
            )
            ?.trim();

        addContactMetaTag({
          name,
          property,
          content,
        });
      },
    );

  parsedDocument
    .querySelectorAll(
      "link",
    )
    .forEach(
      (sourceLink) => {
        const rel =
          sourceLink
            .getAttribute(
              "rel",
            )
            ?.trim()
            .toLowerCase();

        const href =
          sourceLink
            .getAttribute(
              "href",
            )
            ?.trim();

        if (
          rel ===
            "canonical" &&
          href
        ) {
          addContactCanonicalLink(
            href,
          );
        }
      },
    );

  parsedDocument
    .querySelectorAll(
      'script[type="application/ld+json"]',
    )
    .forEach(
      (
        sourceScript,
        index,
      ) => {
        addContactJsonLdScript(
          sourceScript.textContent ||
            "",
          index + 1,
        );
      },
    );
}

/* =========================================================
   BODY SCHEMA
========================================================= */

function applyContactApiBodySchema(
  bodyHtml: string | null,
) {
  if (!bodyHtml?.trim()) {
    return;
  }

  const cleanBody =
    bodyHtml.trim();

  const parser =
    new DOMParser();

  const parsedDocument =
    parser.parseFromString(
      cleanBody,
      "text/html",
    );

  const schemaScripts =
    parsedDocument.querySelectorAll(
      'script[type="application/ld+json"]',
    );

  schemaScripts.forEach(
    (
      sourceScript,
      index,
    ) => {
      addContactJsonLdScript(
        sourceScript.textContent ||
          "",
        index + 101,
      );
    },
  );

  if (
    schemaScripts.length ===
      0 &&
    (
      cleanBody.startsWith(
        "{",
      ) ||
      cleanBody.startsWith(
        "[",
      )
    )
  ) {
    addContactJsonLdScript(
      cleanBody,
      101,
    );
  }
}

/* =========================================================
   APPLY SEO
========================================================= */

function applyContactSeoData(
  seo: SeoData,
) {
  removePreviousContactSeoElements();

  const pageTitle =
    seo.meta_title?.trim() ||
    seo.page_name?.trim() ||
    CONTACT_FALLBACK_TITLE;

  const pageDescription =
    seo.meta_description?.trim() ||
    CONTACT_FALLBACK_DESCRIPTION;

  const pageKeywords =
    seo.meta_keyword?.trim() ||
    CONTACT_FALLBACK_KEYWORDS;

  document.title =
    pageTitle;

  addContactMetaTag({
    name: "description",
    content:
      pageDescription,
  });

  addContactMetaTag({
    name: "keywords",
    content:
      pageKeywords,
  });

  applyContactApiHeadHtml(
    seo.head,
  );

  applyContactApiBodySchema(
    seo.body,
  );
}

/* =========================================================
   FALLBACK SEO
========================================================= */

function applyContactFallbackSeo() {
  removePreviousContactSeoElements();

  document.title =
    CONTACT_FALLBACK_TITLE;

  addContactMetaTag({
    name: "description",
    content:
      CONTACT_FALLBACK_DESCRIPTION,
  });

  addContactMetaTag({
    name: "keywords",
    content:
      CONTACT_FALLBACK_KEYWORDS,
  });
}

/* =========================================================
   CONTACT DETAILS
========================================================= */

const contactDetails = [
  {
    label: "Phone",

    value:
      "+91 99984 15438",

    href:
      "tel:+919998415438",

    icon:
      HiOutlinePhone,
  },

  {
    label: "Email",

    value:
      "info@hpidesignstudio.com",

    href:
      "mailto:info@hpidesignstudio.com",

    icon:
      HiOutlineEnvelope,
  },

  {
    label: "Studio",

    value:
      "03, First Floor, Natkamal Complex, Jawaharchowk, Maninagar, ahmedabad -380008, Gujarat",

    href:
      "https://www.google.com/maps/search/?api=1&query=Natkamal+Complex,+Jawahar+Chowk,+Maninagar,+Ahmedabad,+Gujarat+380008",

    icon:
      HiOutlineMapPin,

    external: true,
  },
];

/* =========================================================
   SOCIAL LINKS
========================================================= */

const socialLinks = [
  {
    label:
      "Instagram",

    href:
      "https://www.instagram.com/",

    icon:
      FaInstagram,
  },

  {
    label:
      "Facebook",

    href:
      "https://www.facebook.com/",

    icon:
      FaFacebookF,
  },

  {
    label:
      "LinkedIn",

    href:
      "https://www.linkedin.com/",

    icon:
      FaLinkedinIn,
  },
];

/* =========================================================
   PROJECT TYPES
========================================================= */

const projectTypes = [
  {
    id: 1,
    name: "Home",
  },

  {
    id: 2,
    name:
      "Showroom & Shop",
  },

  {
    id: 3,
    name: "Hospital",
  },

  {
    id: 4,
    name:
      "Corporate Office",
  },
] as const;

/* =========================================================
   BUDGET OPTIONS
========================================================= */

const budgetOptions = [
  "Under ₹10 Lakh",
  "₹10 – ₹25 Lakh",
  "₹25 – ₹50 Lakh",
  "Above ₹50 Lakh",
] as const;

/* =========================================================
   FORM TYPES
========================================================= */

type ContactFormData = {
  full_name: string;
  phone: string;
  email: string;
  category_id: string;
  location: string;
  estimated_budget: string;
  project_requirement: string;
};

type ContactFormErrors =
  Partial<
    Record<
      keyof ContactFormData,
      string
    >
  >;

type ContactInquiryResponse = {
  success: boolean;
  message: string;
};

type ContactApiErrorResponse = {
  message?: string;

  errors?: Record<
    string,
    string | string[]
  >;
};

/* =========================================================
   INITIAL FORM
========================================================= */

const INITIAL_FORM_DATA: ContactFormData =
  {
    full_name: "",
    phone: "",
    email: "",
    category_id: "",
    location: "",
    estimated_budget: "",
    project_requirement:
      "",
  };

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

/* =========================================================
   SERVER ERROR
========================================================= */

function getServerErrorMessage(
  error: unknown,
): string {
  if (
    !axios.isAxiosError<ContactApiErrorResponse>(
      error,
    )
  ) {
    return error instanceof
      Error &&
      error.message
      ? error.message
      : "Unable to submit the inquiry.";
  }

  const responseData =
    error.response?.data;

  if (
    responseData?.errors
  ) {
    const firstValidationError =
      Object.values(
        responseData.errors,
      )[0];

    if (
      Array.isArray(
        firstValidationError,
      )
    ) {
      return (
        firstValidationError[0] ||
        "Please check the submitted information."
      );
    }

    if (
      typeof firstValidationError ===
        "string" &&
      firstValidationError.trim()
    ) {
      return firstValidationError;
    }
  }

  if (
    typeof responseData?.message ===
      "string" &&
    responseData.message.trim()
  ) {
    return responseData.message;
  }

  return (
    error.message ||
    "Unable to submit the inquiry."
  );
}

/* =========================================================
   CONTACT PAGE
========================================================= */

export default function ContactPage() {
  const reduceMotion =
    useReducedMotion();

  /* =======================================================
     SEO API
  ======================================================= */

  useEffect(() => {
    const controller =
      new AbortController();

    async function fetchContactSeo() {
      try {
        const response =
          await fetch(
            `${apiUrl}/getSeoById`,
            {
              method: "POST",

              headers: {
                Accept:
                  "application/json",

                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
                    id:
                      CONTACT_SEO_ID,
                  },
                ),

              signal:
                controller.signal,
            },
          );

        if (
          !response.ok
        ) {
          throw new Error(
            `Contact SEO API request failed with status ${response.status}.`,
          );
        }

        const result =
          (await response.json()) as SeoApiResponse;

        if (
          !result.success ||
          !result.data
        ) {
          throw new Error(
            result.message ||
              "Contact SEO data not found.",
          );
        }

        applyContactSeoData(
          result.data,
        );
      } catch (error) {
        if (
          error instanceof
            DOMException &&
          error.name ===
            "AbortError"
        ) {
          return;
        }

        console.error(
          "Contact SEO API error:",
          error,
        );

        applyContactFallbackSeo();
      }
    }

    void fetchContactSeo();

    return () => {
      controller.abort();

      removePreviousContactSeoElements();
    };
  }, []);

  /* =======================================================
     FORM STATE
  ======================================================= */

  const [
    formData,
    setFormData,
  ] =
    useState<ContactFormData>(
      INITIAL_FORM_DATA,
    );

  const [
    fieldErrors,
    setFieldErrors,
  ] =
    useState<ContactFormErrors>(
      {},
    );

  const [
    isSubmitting,
    setIsSubmitting,
  ] =
    useState(false);

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm =
    (): ContactFormErrors => {
      const errors: ContactFormErrors =
        {};

      if (
        !formData.full_name.trim()
      ) {
        errors.full_name =
          "Full name is required.";
      } else if (
        formData.full_name
          .trim().length < 2
      ) {
        errors.full_name =
          "Please enter a valid full name.";
      }

      if (
        !formData.phone.trim()
      ) {
        errors.phone =
          "Phone number is required.";
      } else if (
        !/^\d{10}$/.test(
          formData.phone,
        )
      ) {
        errors.phone =
          "Phone number must contain exactly 10 digits.";
      }

      if (
        !formData.email.trim()
      ) {
        errors.email =
          "Email address is required.";
      } else if (
        !EMAIL_PATTERN.test(
          formData.email.trim(),
        )
      ) {
        errors.email =
          "Please enter a valid email address.";
      }

      if (
        !formData.category_id
      ) {
        errors.category_id =
          "Project type is required.";
      }

      if (
        !formData.location.trim()
      ) {
        errors.location =
          "Project location is required.";
      }

      if (
        !formData.estimated_budget
      ) {
        errors.estimated_budget =
          "Estimated budget is required.";
      }

      if (
        !formData.project_requirement.trim()
      ) {
        errors.project_requirement =
          "Project requirement is required.";
      } else if (
        formData.project_requirement
          .trim().length < 10
      ) {
        errors.project_requirement =
          "Please enter at least 10 characters.";
      }

      return errors;
    };

  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleInputChange = (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >,
  ) => {
    const {
      name,
      value,
    } = event.target;

    const fieldName =
      name as keyof ContactFormData;

    const nextValue =
      fieldName === "phone"
        ? value
            .replace(
              /\D/g,
              "",
            )
            .slice(
              0,
              10,
            )
        : value;

    setFormData(
      (current) => ({
        ...current,

        [fieldName]:
          nextValue,
      }),
    );

    if (
      fieldErrors[fieldName]
    ) {
      setFieldErrors(
        (current) => ({
          ...current,

          [fieldName]:
            undefined,
        }),
      );
    }
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();

      if (
        isSubmitting
      ) {
        return;
      }

      const errors =
        validateForm();

      if (
        Object.keys(
          errors,
        ).length > 0
      ) {
        setFieldErrors(
          errors,
        );

        const firstError =
          Object.values(
            errors,
          )[0];

        toast.error(
          firstError ||
            "Please complete all required fields.",
        );

        return;
      }

      setIsSubmitting(
        true,
      );

      setFieldErrors(
        {},
      );

      try {
        const response =
          await axios.post<ContactInquiryResponse>(
            `${apiUrl}/contact_inquiry`,
            {
              full_name:
                formData.full_name.trim(),

              phone:
                formData.phone,

              email:
                formData.email
                  .trim()
                  .toLowerCase(),

              category_id:
                Number(
                  formData.category_id,
                ),

              location:
                formData.location.trim(),

              estimated_budget:
                formData.estimated_budget,

              project_requirement:
                formData.project_requirement.trim(),
            },
            {
              headers: {
                Accept:
                  "application/json",

                "Content-Type":
                  "application/json",
              },
            },
          );

        if (
          !response.data.success
        ) {
          throw new Error(
            response.data.message ||
              "Unable to submit the inquiry.",
          );
        }

        toast.success(
          response.data.message ||
            "Contact inquiry submitted successfully.",
        );

        setFormData(
          INITIAL_FORM_DATA,
        );
      } catch (
        error: unknown
      ) {
        toast.error(
          getServerErrorMessage(
            error,
          ),
        );
      } finally {
        setIsSubmitting(
          false,
        );
      }
    };

  /* =======================================================
     FIELD STYLE - WHITE THEME
  ======================================================= */

  const getFieldClassName = (
    field:
      keyof ContactFormData,
    extraClasses = "",
  ): string => {
    const hasError =
      Boolean(
        fieldErrors[field],
      );

    return `
      mt-3 w-full
      border-b
      bg-transparent
      text-[13px]
      text-[#111827]
      outline-none
      transition-colors duration-300
      placeholder:text-[#9ca3af]

      ${
        hasError
          ? "border-red-400 focus:border-red-400"
          : "border-black/15 focus:border-gold"
      }

      ${extraClasses}
    `;
  };

  return (
    <main
      className="
        overflow-hidden
        bg-white
      "
    >
      {/* ================================================= */}
      {/* TOASTER */}
      {/* ================================================= */}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4500,

          style: {
            background:
              "#ffffff",

            color:
              "#111827",

            border:
              "1px solid rgba(17, 94, 40, 0.28)",

            borderRadius:
              "0px",

            padding:
              "14px 16px",

            boxShadow:
              "0 16px 45px rgba(0,0,0,0.08)",
          },

          success: {
            iconTheme: {
              primary:
                "#115e28",

              secondary:
                "#ffffff",
            },
          },

          error: {
            iconTheme: {
              primary:
                "#f87171",

              secondary:
                "#ffffff",
            },
          },
        }}
      />

      {/* ================================================= */}
      {/* BREADCRUMB */}
      {/* ================================================= */}

      <Breadcrumb
        title="Contact Us"
        backgroundImage={
          aboutBreadcrumb
        }
        imagePosition="center"
        items={[
          {
            label:
              "Contact Us",
          },
        ]}
      />

      {/* ================================================= */}
      {/* CONTACT SECTION */}
      {/* ================================================= */}

      <section
        id="contact"
        className="
          relative
          overflow-hidden

          bg-white

          px-5
          py-20

          sm:px-8
          sm:py-24

          lg:px-[5vw]
          lg:py-[60px]
        "
      >
        {/* =============================================== */}
        {/* GREEN BACKGROUND GLOWS */}
        {/* =============================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -left-52
            top-1/3

            h-[520px]
            w-[520px]

            rounded-full

            bg-gold/[0.055]

            blur-[175px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -right-48
            bottom-0

            h-[460px]
            w-[460px]

            rounded-full

            bg-gold/[0.035]

            blur-[160px]
          "
        />

        <div
          className="
            relative
            z-10

            mx-auto

            w-full
            max-w-[1500px]
          "
        >
          {/* ============================================= */}
          {/* HEADING */}
          {/* ============================================= */}

          <motion.div
            initial={{
              opacity: 0,

              y: reduceMotion
                ? 0
                : 28,
            }}
            whileInView={{
              opacity: 1,

              y: 0,
            }}
            viewport={{
              once: true,

              amount: 0.4,
            }}
            transition={{
              duration: 0.8,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            className="
              mb-14

              grid
              grid-cols-1

              gap-8

              lg:mb-20

              lg:grid-cols-[1fr_0.55fr]

              lg:items-end

              lg:gap-16
            "
          >
            <div>
              <div
                className="
                  mb-5

                  flex
                  items-center

                  gap-4
                "
              >
                <span
                  className="
                    h-px
                    w-11

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
                  Start a Conversation
                </span>
              </div>

              <h1
                className="
                  max-w-[820px]

                  font-serif
                  font-medium

                  text-[clamp(2.4rem,4.8vw,4.7rem)]

                  leading-[1.03]

                  tracking-[-0.04em]

                  text-[#111827]
                "
              >
                Tell us about
                <br />

                <em
                  className="
                    font-medium
                    italic

                    text-gold
                  "
                >
                  your next space.
                </em>
              </h1>
            </div>

            <p
              className="
                max-w-[410px]

                text-[12px]

                leading-[1.9]

                text-black

                sm:text-[13px]

                lg:justify-self-end
              "
            >
              Whether you are planning a residence,
              showroom, hospital or corporate workspace,
              share your ideas with us and our team will
              guide you through the next step.
            </p>
          </motion.div>

          {/* ============================================= */}
          {/* MAIN CONTACT GRID */}
          {/* ============================================= */}

          <div
            className="
              grid
              grid-cols-1

              gap-10

              lg:grid-cols-[0.72fr_1.28fr]

              lg:gap-16
            "
          >
            {/* =========================================== */}
            {/* CONTACT INFO */}
            {/* =========================================== */}

            <motion.aside
              initial={{
                opacity: 0,

                x: reduceMotion
                  ? 0
                  : -35,
              }}
              whileInView={{
                opacity: 1,

                x: 0,
              }}
              viewport={{
                once: true,

                amount: 0.2,
              }}
              transition={{
                duration: 0.85,

                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="
                relative

                border-y
                border-black/10

                py-8

                lg:py-10
              "
            >
              <div
                className="
                  flex

                  items-center

                  justify-between

                  gap-5
                "
              >
                <span
                  className="
                    text-[9px]

                    font-semibold

                    uppercase

                    tracking-[0.3em]

                    text-gold
                  "
                >
                  Contact Information
                </span>

                <span
                  aria-hidden="true"
                  className="
                    h-2
                    w-2

                    rotate-45

                    bg-gold
                  "
                />
              </div>

              <h2
                className="
                  mt-7

                  max-w-[470px]

                  font-serif
                  font-medium

                  text-[clamp(2rem,3.2vw,3.15rem)]

                  leading-[1.13]

                  tracking-[-0.03em]

                  text-[#111827]
                "
              >
                A thoughtful project begins with a
                conversation.
              </h2>

              <p
                className="
                  mt-6

                  max-w-[470px]

                  text-[12px]

                  leading-[1.95]

                  text-black

                  sm:text-[13px]
                "
              >
                Connect with HPI Studio to discuss your
                requirements, timeline, location and design
                expectations.
              </p>

              {/* ========================================= */}
              {/* CONTACT ITEMS */}
              {/* ========================================= */}

              <div
                className="
                  mt-10
                "
              >
                {contactDetails.map(
                  (item) => {
                    const Icon =
                      item.icon;

                    const content = (
                      <div
                        className="
                          group

                          flex

                          items-center

                          gap-5

                          border-b

                          border-black/10

                          py-6

                          first:border-t
                        "
                      >
                        <span
                          className="
                            flex
                            h-12
                            w-12

                            shrink-0

                            items-center
                            justify-center

                            border

                            border-gold/30

                            bg-[#f0f8f2]

                            text-gold

                            transition-all
                            duration-300

                            group-hover:border-gold

                            group-hover:bg-gold

                            group-hover:text-white
                          "
                        >
                          <Icon
                            size={
                              20
                            }
                          />
                        </span>

                        <span
                          className="
                            min-w-0
                          "
                        >
                          <span
                            className="
                              block

                              text-[13px]

                              font-semibold

                              uppercase

                              tracking-[0.27em]

                              text-black
                            "
                          >
                            {
                              item.label
                            }
                          </span>

                          <span
                            className="
                              mt-2

                              block

                              font-serif

                              text-[17px]

                              leading-[1.4]

                              text-[#111827]

                              transition-colors
                              duration-300

                              group-hover:text-gold
                            "
                          >
                            {
                              item.value
                            }
                          </span>
                        </span>
                      </div>
                    );

                    if (
                      !item.href
                    ) {
                      return (
                        <div
                          key={
                            item.label
                          }
                        >
                          {
                            content
                          }
                        </div>
                      );
                    }

                    return (
                      <a
                        key={
                          item.label
                        }
                        href={
                          item.href
                        }
                        target={
                          item.external
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          item.external
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="
                          block
                        "
                      >
                        {
                          content
                        }
                      </a>
                    );
                  },
                )}
              </div>

              {/* ========================================= */}
              {/* SOCIAL LINKS */}
              {/* ========================================= */}

              <div
                className="
                  mt-8

                  flex
                  flex-col

                  gap-5

                  sm:flex-row

                  sm:items-center

                  sm:justify-between
                "
              >
                <span
                  className="
                    text-[13px]

                    font-semibold

                    uppercase

                    tracking-[0.27em]

                    text-black
                  "
                >
                  Follow HPI Studio
                </span>

                <div
                  className="
                    flex
                    items-center

                    gap-3
                  "
                >
                  {socialLinks.map(
                    ({
                      label,
                      href,
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
                          h-10
                          w-10

                          items-center
                          justify-center

                          rounded-full

                          border

                          border-black/10

                          bg-white

                          text-black

                          transition-all
                          duration-300

                          hover:-translate-y-1

                          hover:border-gold

                          hover:bg-gold

                          hover:text-white
                        "
                      >
                        <Icon
                          size={
                            15
                          }
                        />
                      </a>
                    ),
                  )}
                </div>
              </div>
            </motion.aside>

            {/* =========================================== */}
            {/* CONTACT FORM */}
            {/* =========================================== */}

            <motion.div
              initial={{
                opacity: 0,

                x: reduceMotion
                  ? 0
                  : 35,
              }}
              whileInView={{
                opacity: 1,

                x: 0,
              }}
              viewport={{
                once: true,

                amount: 0.2,
              }}
              transition={{
                duration: 0.85,

                delay: 0.08,

                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="
                relative

                overflow-hidden

                border

                border-black/10

                bg-white

                px-6
                py-8

                shadow-[0_20px_60px_rgba(0,0,0,0.06)]

                sm:px-9
                sm:py-10

                lg:px-12
                lg:py-12

                xl:px-14
              "
            >
              {/* Decorative C */}


              <div
                className="
                  relative
                  z-10
                "
              >
                {/* Form heading */}

                <div
                  className="
                    flex
                    flex-col

                    gap-4

                    border-b

                    border-black/10

                    pb-7

                    sm:flex-row

                    sm:items-end

                    sm:justify-between
                  "
                >
                  <div>
                    <span
                      className="
                        text-[9px]

                        font-semibold

                        uppercase

                        tracking-[0.3em]

                        text-gold
                      "
                    >
                      Project Enquiry
                    </span>

                    <h2
                      className="
                        mt-4

                        font-serif

                        text-[clamp(2rem,3vw,3rem)]

                        leading-[1.12]

                        tracking-[-0.03em]

                        text-[#111827]
                      "
                    >
                      Share your project details.
                    </h2>
                  </div>

                </div>

                {/* ======================================= */}
                {/* FORM */}
                {/* ======================================= */}

                <form
                  onSubmit={
                    handleSubmit
                  }
                  noValidate
                  className="
                    mt-8
                  "
                >
                  <div
                    className="
                      grid
                      grid-cols-1

                      gap-x-8
                      gap-y-7

                      md:grid-cols-2
                    "
                  >
                    {/* Full Name */}

                    <div>
                      <label
                        htmlFor="full_name"
                        className="
                          text-[13px]

                          font-semibold

                          uppercase

                          tracking-[0.25em]

                          text-gold
                        "
                      >
                        Full Name *
                      </label>

                      <input
                        id="full_name"
                        name="full_name"
                        type="text"
                        autoComplete="name"
                        value={
                          formData.full_name
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="Enter your full name"
                        aria-invalid={Boolean(
                          fieldErrors.full_name,
                        )}
                        className={getFieldClassName(
                          "full_name",
                          "h-12",
                        )}
                      />
                    </div>

                    {/* Phone */}

                    <div>
                      <label
                        htmlFor="phone"
                        className="
                          text-[13px]

                          font-semibold

                          uppercase

                          tracking-[0.25em]

                          text-gold
                        "
                      >
                        Phone Number *
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        value={
                          formData.phone
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="Enter 10-digit number"
                        aria-invalid={Boolean(
                          fieldErrors.phone,
                        )}
                        className={getFieldClassName(
                          "phone",
                          "h-12",
                        )}
                      />
                    </div>

                    {/* Email */}

                    <div>
                      <label
                        htmlFor="email"
                        className="
                          text-[13px]

                          font-semibold

                          uppercase

                          tracking-[0.25em]

                          text-gold
                        "
                      >
                        Email Address *
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={
                          formData.email
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="Enter your email address"
                        aria-invalid={Boolean(
                          fieldErrors.email,
                        )}
                        className={getFieldClassName(
                          "email",
                          "h-12",
                        )}
                      />
                    </div>

                    {/* Project Type */}

                    <div>
                      <label
                        htmlFor="category_id"
                        className="
                          text-[13px]

                          font-semibold

                          uppercase

                          tracking-[0.25em]

                          text-gold
                        "
                      >
                        Project Type *
                      </label>

                      <select
                        id="category_id"
                        name="category_id"
                        value={
                          formData.category_id
                        }
                        onChange={
                          handleInputChange
                        }
                        aria-invalid={Boolean(
                          fieldErrors.category_id,
                        )}
                        className={`
                          ${getFieldClassName(
                            "category_id",
                            "h-12",
                          )}

                          bg-white

                          !text-[#111827]

                          [color-scheme:light]
                        `}
                      >
                        <option
                          value=""
                          className="
                            bg-white
                            text-black
                          "
                        >
                          Select project type
                        </option>

                        {projectTypes.map(
                          (
                            type,
                          ) => (
                            <option
                              key={
                                type.id
                              }
                              value={String(
                                type.id,
                              )}
                              className="
                                bg-white

                                text-[#111827]
                              "
                            >
                              {
                                type.name
                              }
                            </option>
                          ),
                        )}
                      </select>
                    </div>

                    {/* Location */}

                    <div>
                      <label
                        htmlFor="location"
                        className="
                          text-[13px]

                          font-semibold

                          uppercase

                          tracking-[0.25em]

                          text-gold
                        "
                      >
                        Project Location *
                      </label>

                      <input
                        id="location"
                        name="location"
                        type="text"
                        autoComplete="address-level2"
                        value={
                          formData.location
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="Enter city or location"
                        aria-invalid={Boolean(
                          fieldErrors.location,
                        )}
                        className={getFieldClassName(
                          "location",
                          "h-12",
                        )}
                      />
                    </div>

                    {/* Budget */}

                    <div>
                      <label
                        htmlFor="estimated_budget"
                        className="
                          text-[13px]

                          font-semibold

                          uppercase

                          tracking-[0.25em]

                          text-gold
                        "
                      >
                        Estimated Budget *
                      </label>

                      <select
                        id="estimated_budget"
                        name="estimated_budget"
                        value={
                          formData.estimated_budget
                        }
                        onChange={
                          handleInputChange
                        }
                        aria-invalid={Boolean(
                          fieldErrors.estimated_budget,
                        )}
                        className={`
                          ${getFieldClassName(
                            "estimated_budget",
                            "h-12",
                          )}

                          bg-white

                          !text-[#111827]

                          [color-scheme:light]
                        `}
                      >
                        <option
                          value=""
                          className="
                            bg-white
                            text-black
                          "
                        >
                          Select budget range
                        </option>

                        {budgetOptions.map(
                          (
                            budget,
                          ) => (
                            <option
                              key={
                                budget
                              }
                              value={
                                budget
                              }
                              className="
                                bg-white

                                text-[#111827]
                              "
                            >
                              {
                                budget
                              }
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                  </div>

                  {/* ===================================== */}
                  {/* REQUIREMENT */}
                  {/* ===================================== */}

                  <div
                    className="
                      mt-8
                    "
                  >
                    <label
                      htmlFor="project_requirement"
                      className="
                        text-[13px]

                        font-semibold

                        uppercase

                        tracking-[0.25em]

                        text-gold
                      "
                    >
                      Project Requirement *
                    </label>

                    <textarea
                      id="project_requirement"
                      name="project_requirement"
                      rows={5}
                      value={
                        formData.project_requirement
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="Tell us about your project, requirements and expectations"
                      aria-invalid={Boolean(
                        fieldErrors.project_requirement,
                      )}
                      className={getFieldClassName(
                        "project_requirement",
                        "resize-none py-3 leading-[1.8]",
                      )}
                    />
                  </div>

                  {/* ===================================== */}
                  {/* SUBMIT */}
                  {/* ===================================== */}

                  <div
                    className="
                      mt-9

                      flex
                      flex-col

                      gap-5

                      border-t

                      border-black/10

                      pt-7

                      sm:flex-row

                      sm:items-center

                      sm:justify-between
                    "
                  >
                    <p
                      className="
                        max-w-[420px]

                        text-[10px]

                        leading-[1.7]

                        text-[#9ca3af]
                      "
                    >
                      By submitting this form, you agree
                      to be contacted regarding your project
                      enquiry.
                    </p>

                    <button
                      type="submit"
                      disabled={
                        isSubmitting
                      }
                      className="
                        group
                        relative

                        flex
                        min-h-14

                        min-w-[235px]

                        items-center

                        justify-between

                        overflow-hidden

                        bg-gold

                        px-6

                        text-white

                        transition-opacity

                        disabled:cursor-not-allowed

                        disabled:opacity-60
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="
                          absolute
                          inset-0

                          -translate-x-full

                          bg-[#2f8f46]

                          transition-transform

                          duration-500

                          ease-[cubic-bezier(0.16,1,0.3,1)]

                          group-hover:translate-x-0
                        "
                      />

                      <span
                        className="
                          relative
                          z-10

                          inline-flex

                          items-center

                          gap-3

                          text-[9px]

                          font-bold

                          uppercase

                          tracking-[0.25em]
                        "
                      >
                        {isSubmitting && (
                          <LoaderCircle
                            size={
                              16
                            }
                            className="
                              animate-spin
                            "
                          />
                        )}

                        {isSubmitting
                          ? "Submitting..."
                          : "Submit Enquiry"}
                      </span>

                      {!isSubmitting && (
                        <HiOutlineArrowUpRight
                          size={
                            18
                          }
                          className="
                            relative
                            z-10

                            transition-transform
                            duration-300

                            group-hover:-translate-y-0.5

                            group-hover:translate-x-0.5
                          "
                        />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>

          {/* ============================================= */}
          {/* MAP SECTION */}
          {/* ============================================= */}

          <motion.div
            initial={{
              opacity: 0,

              y: reduceMotion
                ? 0
                : 30,
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
              duration: 0.9,

              delay: 0.1,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            className="
              mt-20

              border-y

              border-black/10

              pt-10

              lg:mt-24

              lg:pt-12
            "
          >
            <div
              className="
                mb-8

                flex
                flex-col

                gap-6

                sm:flex-row

                sm:items-end

                sm:justify-between
              "
            >
              <div>
                <span
                  className="
                    text-[9px]

                    font-semibold

                    uppercase

                    tracking-[0.3em]

                    text-gold
                  "
                >
                  Find the Studio
                </span>

                <h2
                  className="
                    mt-5

                    font-serif

                    text-[clamp(2rem,3.5vw,3.5rem)]

                    leading-[1.1]

                    tracking-[-0.03em]

                    text-[#111827]
                  "
                >
                  Visit us for a detailed
                  <br />

                  project discussion.
                </h2>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Natkamal+Complex,+Jawahar+Chowk,+Maninagar,+Ahmedabad,+Gujarat+380008"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group

                  inline-flex

                  items-center

                  gap-4

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
                Open in Google Maps

                <HiOutlineArrowUpRight
                  size={
                    17
                  }
                  className="
                    transition-transform
                    duration-300

                    group-hover:-translate-y-0.5

                    group-hover:translate-x-0.5
                  "
                />
              </a>
            </div>

            {/* =========================================== */}
            {/* MAP */}
            {/* =========================================== */}

            <div
              className="
                relative

                min-h-[420px]

                overflow-hidden

                border

                border-black/10

                bg-[#f3f4f6]

                shadow-[0_20px_60px_rgba(0,0,0,0.06)]

                lg:min-h-[520px]
              "
            >
              <iframe
                title="HPI Design Studio Location"
                src="https://maps.google.com/maps?hl=en&q=Natkamal%20Complex%2C%20Jawahar%20Chowk%2C%20Maninagar%2C%20Ahmedabad%2C%20Gujarat%20380008&t=&z=17&ie=UTF8&iwloc=B&output=embed"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="
                  absolute
                  inset-0

                  h-full
                  w-full

                  border-0
                "
              />

              {/* Green tint */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  inset-0

                  bg-gold/[0.02]

                  mix-blend-color
                "
              />

              {/* Inner frame */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  inset-5

                  border

                  border-black/10
                "
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}