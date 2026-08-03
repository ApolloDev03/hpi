"use client";

import Breadcrumb from "../components/Breadcrumb";
import aboutBreadcrumb from "@/app/assets/banner1.png";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  HiOutlineArrowUpRight,
  HiOutlineClock,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";

const contactInfo = [
  {
    label: "Call Us",
    value: "+91 99999 99999",
    href: "tel:+919999999999",
    icon: HiOutlinePhone,
  },
  {
    label: "Email Us",
    value: "hello@hpistudio.com",
    href: "mailto:hello@hpistudio.com",
    icon: HiOutlineEnvelope,
  },
  {
    label: "Visit Studio",
    value: "Ahmedabad, Gujarat, India",
    href: "https://maps.google.com",
    icon: HiOutlineMapPin,
  },
  {
    label: "Working Hours",
    value: "Monday – Saturday · 10 AM – 7 PM",
    href: "#",
    icon: HiOutlineClock,
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: FaFacebookF,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
  },
];

export default function ContactPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-[#080807]">
      <Breadcrumb
        title="Contact Us"
        backgroundImage={aboutBreadcrumb}
        imagePosition="center"
        items={[
          {
            label: "Contact Us",
          },
        ]}
      />

      <section
        id="contact-page"
        className="
          relative overflow-hidden
          bg-[#080807]
          px-5 py-20
          sm:px-8 sm:py-24
          lg:px-[5vw] lg:py-[110px]
        "
      >
        {/* Background glow */}
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
            absolute -right-40 bottom-0
            h-[420px] w-[420px]
            rounded-full
            bg-[#b8863a]/[0.035]
            blur-[150px]
          "
        />

        {/* Architectural grid */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            opacity-[0.13]
            bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
            bg-[size:82px_82px]
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
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 24,
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
              lg:grid-cols-[1fr_0.52fr]
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
                  Start a Conversation
                </span>
              </div>

              <h1
                className="
                  max-w-[820px]
                  font-serif font-medium
                  text-[clamp(2.4rem,4.8vw,4.8rem)]
                  leading-[1.03]
                  tracking-[-0.04em]
                  text-[#f3efe7]
                "
              >
                Let’s create a space
                <br />

                <em
                  className="
                    font-medium italic
                    text-[#e6c583]
                  "
                >
                  that feels truly yours.
                </em>
              </h1>
            </div>

            <p
              className="
                max-w-[410px]
                text-[12px] leading-[1.9]
                text-white/44
                sm:text-[13px]
                lg:justify-self-end
              "
            >
              Share your ideas, requirements and project
              goals with us. Our team will connect with you
              to understand the space and guide you through
              the next step.
            </p>
          </motion.div>

          {/* Contact information */}
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 28,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              mb-10 grid grid-cols-1
              border border-white/10
              bg-[#0d0d0c]
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              const isLink = item.href !== "#";

              const content = (
                <>
                  <div
                    className="
                      flex h-12 w-12
                      items-center justify-center
                      border border-[#b8863a]/35
                      bg-[#b8863a]/[0.05]
                      text-[#e6c583]
                      transition-all duration-400

                      group-hover:border-[#b8863a]
                      group-hover:bg-[#b8863a]
                      group-hover:text-[#080807]
                    "
                  >
                    <Icon size={21} />
                  </div>

                  <div className="mt-7">
                    <span
                      className="
                        block text-[8px]
                        font-semibold uppercase
                        tracking-[0.28em]
                        text-white/30
                      "
                    >
                      {item.label}
                    </span>

                    <span
                      className="
                        mt-3 block
                        max-w-[270px]
                        font-serif text-lg
                        leading-[1.45]
                        text-[#f3efe7]
                        transition-colors duration-300

                        group-hover:text-[#e6c583]
                      "
                    >
                      {item.value}
                    </span>
                  </div>

                  <span
                    className="
                      mt-7 block h-px
                      w-10 bg-[#b8863a]
                      transition-all duration-500

                      group-hover:w-20
                    "
                  />
                </>
              );

              return (
                <div
                  key={item.label}
                  className={`
                    group relative
                    min-h-[230px]
                    border-b border-white/10
                    px-6 py-7

                    sm:min-h-[250px]
                    sm:px-7
                    sm:py-8

                    ${
                      index % 2 === 0
                        ? "sm:border-r"
                        : ""
                    }

                    ${
                      index < 2
                        ? "xl:border-b-0"
                        : ""
                    }

                    ${
                      index < contactInfo.length - 1
                        ? "xl:border-r"
                        : ""
                    }

                    xl:border-b-0
                  `}
                >
                  {isLink ? (
                    <a
                      href={item.href}
                      target={
                        item.label === "Visit Studio"
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        item.label === "Visit Studio"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block h-full"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}

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
              );
            })}
          </motion.div>

          {/* Contact form and studio note */}
          <div
            className="
              grid grid-cols-1
              overflow-hidden
              border border-white/10
              bg-[#0d0d0c]
              lg:grid-cols-[0.72fr_1.28fr]
            "
          >
            {/* Left content */}
            <motion.div
              initial={{
                opacity: 0,
                x: reduceMotion ? 0 : -35,
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
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                relative overflow-hidden
                border-b border-white/10
                px-6 py-9
                sm:px-10 sm:py-11
                lg:min-h-[720px]
                lg:border-b-0
                lg:border-r
                lg:px-12 lg:py-12
              "
            >
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute -right-5 -top-20
                  select-none
                  font-serif text-[260px]
                  leading-none
                  text-[#b8863a]/[0.035]
                "
              >
                C
              </span>

              <div className="relative z-10">
                <span
                  className="
                    text-[9px] font-semibold
                    uppercase tracking-[0.3em]
                    text-[#e6c583]
                  "
                >
                  Project Enquiry
                </span>

                <h2
                  className="
                    mt-7 max-w-[470px]
                    font-serif font-medium
                    text-[clamp(2rem,3.5vw,3.6rem)]
                    leading-[1.12]
                    tracking-[-0.03em]
                    text-[#f3efe7]
                  "
                >
                  Tell us what you are
                  planning.
                </h2>

                <p
                  className="
                    mt-6 max-w-[470px]
                    text-[12px] leading-[1.95]
                    text-white/44
                    sm:text-[13px]
                  "
                >
                  Whether you are planning a new residence,
                  showroom, hospital or corporate workspace,
                  share the basic details and our team will
                  get back to you.
                </p>

                <div className="mt-10 space-y-6">
                  {[
                    {
                      title: "Share Your Requirement",
                      text:
                        "Tell us about your project type, location and expectations.",
                    },
                    {
                      title: "Initial Discussion",
                      text:
                        "We understand the scope, timeline and design direction.",
                    },
                    {
                      title: "Project Consultation",
                      text:
                        "Our team suggests the most suitable next steps for your space.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.title}
                      className="
                        grid grid-cols-[42px_1fr]
                        gap-4
                        border-b border-white/10
                        pb-6
                        last:border-b-0
                        last:pb-0
                      "
                    >
                      <span
                        className="
                          flex h-9 w-9
                          items-center justify-center
                          border border-[#b8863a]/35
                          font-serif text-xs
                          text-[#e6c583]
                        "
                      >
                        0{index + 1}
                      </span>

                      <div>
                        <h3
                          className="
                            font-serif text-lg
                            text-[#f3efe7]
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            mt-2 text-[11px]
                            leading-[1.75]
                            text-white/36
                            sm:text-[12px]
                          "
                        >
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social media */}
              <div
                className="
                  absolute bottom-9
                  left-6 right-6
                  border-t border-white/10
                  pt-7
                  sm:left-10 sm:right-10
                  lg:left-12 lg:right-12
                "
              >
                <div
                  className="
                    flex items-center
                    justify-between gap-5
                  "
                >
                  <span
                    className="
                      text-[8px] font-semibold
                      uppercase tracking-[0.26em]
                      text-white/30
                    "
                  >
                    Follow HPI Studio
                  </span>

                  <div className="flex items-center gap-3">
                    {socialLinks.map(
                      ({ label, href, icon: Icon }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="
                            flex h-10 w-10
                            items-center justify-center
                            rounded-full
                            border border-white/15
                            text-white/45
                            transition-all duration-300

                            hover:-translate-y-1
                            hover:border-[#b8863a]
                            hover:bg-[#b8863a]
                            hover:text-[#080807]
                          "
                        >
                          <Icon size={15} />
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{
                opacity: 0,
                x: reduceMotion ? 0 : 35,
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
                duration: 0.9,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                px-6 py-9
                sm:px-10 sm:py-11
                lg:px-12 lg:py-12
                xl:px-14
              "
            >
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
                className="space-y-8"
              >
                <div
                  className="
                    grid grid-cols-1 gap-7
                    md:grid-cols-2
                  "
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="
                        mb-3 block
                        text-[8px] font-semibold
                        uppercase tracking-[0.26em]
                        text-[#e6c583]
                      "
                    >
                      Your Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="
                        h-14 w-full
                        border-b border-white/15
                        bg-transparent
                        px-0
                        text-[13px]
                        text-[#f3efe7]
                        outline-none
                        transition-colors duration-300

                        placeholder:text-white/25
                        focus:border-[#b8863a]
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="
                        mb-3 block
                        text-[8px] font-semibold
                        uppercase tracking-[0.26em]
                        text-[#e6c583]
                      "
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="Enter your phone number"
                      className="
                        h-14 w-full
                        border-b border-white/15
                        bg-transparent
                        px-0
                        text-[13px]
                        text-[#f3efe7]
                        outline-none
                        transition-colors duration-300

                        placeholder:text-white/25
                        focus:border-[#b8863a]
                      "
                    />
                  </div>
                </div>

                <div
                  className="
                    grid grid-cols-1 gap-7
                    md:grid-cols-2
                  "
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="
                        mb-3 block
                        text-[8px] font-semibold
                        uppercase tracking-[0.26em]
                        text-[#e6c583]
                      "
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email address"
                      className="
                        h-14 w-full
                        border-b border-white/15
                        bg-transparent
                        px-0
                        text-[13px]
                        text-[#f3efe7]
                        outline-none
                        transition-colors duration-300

                        placeholder:text-white/25
                        focus:border-[#b8863a]
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="projectType"
                      className="
                        mb-3 block
                        text-[8px] font-semibold
                        uppercase tracking-[0.26em]
                        text-[#e6c583]
                      "
                    >
                      Project Type
                    </label>

                    <select
                      id="projectType"
                      name="projectType"
                      required
                      defaultValue=""
                      className="
                        h-14 w-full
                        border-b border-white/15
                        bg-[#0d0d0c]
                        px-0
                        text-[13px]
                        text-[#f3efe7]
                        outline-none
                        transition-colors duration-300

                        focus:border-[#b8863a]
                      "
                    >
                      <option value="" disabled>
                        Select project type
                      </option>

                      <option value="home">
                        Home
                      </option>

                      <option value="showroom">
                        Showroom & Shop
                      </option>

                      <option value="hospital">
                        Hospital
                      </option>

                      <option value="corporate">
                        Corporate Office
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  className="
                    grid grid-cols-1 gap-7
                    md:grid-cols-2
                  "
                >
                  <div>
                    <label
                      htmlFor="location"
                      className="
                        mb-3 block
                        text-[8px] font-semibold
                        uppercase tracking-[0.26em]
                        text-[#e6c583]
                      "
                    >
                      Project Location
                    </label>

                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="City or project location"
                      className="
                        h-14 w-full
                        border-b border-white/15
                        bg-transparent
                        px-0
                        text-[13px]
                        text-[#f3efe7]
                        outline-none
                        transition-colors duration-300

                        placeholder:text-white/25
                        focus:border-[#b8863a]
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="
                        mb-3 block
                        text-[8px] font-semibold
                        uppercase tracking-[0.26em]
                        text-[#e6c583]
                      "
                    >
                      Estimated Budget
                    </label>

                    <select
                      id="budget"
                      name="budget"
                      defaultValue=""
                      className="
                        h-14 w-full
                        border-b border-white/15
                        bg-[#0d0d0c]
                        px-0
                        text-[13px]
                        text-[#f3efe7]
                        outline-none
                        transition-colors duration-300

                        focus:border-[#b8863a]
                      "
                    >
                      <option value="" disabled>
                        Select budget range
                      </option>

                      <option value="under-10">
                        Under ₹10 Lakh
                      </option>

                      <option value="10-25">
                        ₹10 – ₹25 Lakh
                      </option>

                      <option value="25-50">
                        ₹25 – ₹50 Lakh
                      </option>

                      <option value="50-plus">
                        Above ₹50 Lakh
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="
                      mb-3 block
                      text-[8px] font-semibold
                      uppercase tracking-[0.26em]
                      text-[#e6c583]
                    "
                  >
                    Tell Us About Your Project
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Share your requirements, ideas and expectations"
                    className="
                      w-full resize-none
                      border-b border-white/15
                      bg-transparent
                      px-0 py-4
                      text-[13px]
                      leading-[1.8]
                      text-[#f3efe7]
                      outline-none
                      transition-colors duration-300

                      placeholder:text-white/25
                      focus:border-[#b8863a]
                    "
                  />
                </div>

                <button
                  type="submit"
                  className="
                    group relative
                    flex min-h-14 w-full
                    items-center justify-between
                    overflow-hidden
                    bg-[#b8863a]
                    px-6
                    text-[#080807]
                    transition-colors duration-400

                    hover:bg-[#e6c583]
                    sm:w-auto
                    sm:min-w-[260px]
                  "
                >
                  <span
                    className="
                      relative z-10
                      text-[9px] font-bold
                      uppercase tracking-[0.26em]
                    "
                  >
                    Send Enquiry
                  </span>

                  <HiOutlineArrowUpRight
                    size={18}
                    className="
                      relative z-10
                      transition-transform duration-400

                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />

                  <span
                    aria-hidden="true"
                    className="
                      absolute inset-0
                      -translate-x-full
                      bg-[#f3efe7]
                      transition-transform duration-500
                      ease-[cubic-bezier(0.16,1,0.3,1)]

                      group-hover:translate-x-0
                    "
                  />
                </button>
              </form>
            </motion.div>
          </div>

          {/* Map section */}
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 30,
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
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              mt-10 grid grid-cols-1
              overflow-hidden
              border border-white/10
              bg-[#0d0d0c]
              lg:grid-cols-[0.35fr_0.65fr]
            "
          >
            {/* Map information */}
            <div
              className="
                relative flex
                min-h-[320px]
                flex-col justify-between
                border-b border-white/10
                px-6 py-8
                sm:px-9 sm:py-10
                lg:min-h-[460px]
                lg:border-b-0
                lg:border-r
                lg:px-10
              "
            >
              <div>
                <span
                  className="
                    text-[9px] font-semibold
                    uppercase tracking-[0.3em]
                    text-[#e6c583]
                  "
                >
                  Visit Our Studio
                </span>

                <h2
                  className="
                    mt-6
                    font-serif text-[clamp(2rem,3vw,3.2rem)]
                    leading-[1.12]
                    tracking-[-0.03em]
                    text-[#f3efe7]
                  "
                >
                  Let’s meet and discuss your space.
                </h2>

                <p
                  className="
                    mt-6
                    text-[12px] leading-[1.9]
                    text-white/42
                    sm:text-[13px]
                  "
                >
                  Visit our studio for a detailed discussion
                  about your project, ideas and design
                  expectations.
                </p>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group mt-9
                  flex items-center
                  justify-between
                  border-t border-white/10
                  pt-6
                "
              >
                <span
                  className="
                    text-[9px] font-semibold
                    uppercase tracking-[0.25em]
                    text-[#e6c583]
                  "
                >
                  Open in Google Maps
                </span>

                <HiOutlineArrowUpRight
                  size={18}
                  className="
                    text-white/55
                    transition-all duration-300

                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-[#e6c583]
                  "
                />
              </a>
            </div>

            {/* Google map */}
            <div
              className="
                relative min-h-[380px]
                bg-[#15130f]
                lg:min-h-[460px]
              "
            >
              <iframe
                title="HPI Studio Location"
                src="https://www.google.com/maps?q=Ahmedabad,Gujarat,India&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="
                  absolute inset-0
                  h-full w-full
                  grayscale
                  contrast-[1.05]
                  opacity-80
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute inset-0
                  bg-[#b8863a]/[0.07]
                  mix-blend-color
                "
              />

              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute inset-5
                  border border-white/15
                "
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}