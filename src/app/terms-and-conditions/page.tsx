import Breadcrumb from "@/app/components/Breadcrumb";
import banner from "@/app/assets/banner1.png";

export default function TermsAndConditionsPage() {
  return (
    <main className="overflow-hidden bg-white">
      {/* ================================================= */}
      {/* BREADCRUMB */}
      {/* ================================================= */}

      <Breadcrumb
        title="Terms & Conditions"
        backgroundImage={banner}
        imagePosition="center"
        items={[
          {
            label: "Terms & Conditions",
          },
        ]}
      />

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <section
        className="
          relative
          overflow-hidden
          bg-white
          px-5
          py-20

          sm:px-8
          sm:py-24

          lg:px-[5vw]
          lg:py-[100px]
        "
      >
        {/* Background Glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -left-48
            top-1/4

            h-[460px]
            w-[460px]

            rounded-full

            bg-gold/[0.04]

            blur-[160px]
          "
        />

        {/* Top Line */}

        <span
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            right-0
            top-0

            h-px
            w-[42%]

            bg-gradient-to-l

            from-gold/40
            to-transparent
          "
        />

        <div
          className="
            relative
            z-10

            mx-auto

            w-full
            max-w-[1200px]
          "
        >
          {/* ============================================= */}
          {/* INTRO */}
          {/* ============================================= */}

          <div
            className="
              mb-12

              border-b
              border-black/10

              pb-10
            "
          >
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
                  w-10

                  bg-gold
                "
              />

              <span
                className="
                  text-[10px]

                  font-semibold

                  uppercase

                  tracking-[0.34em]

                  text-gold
                "
              >
                Legal Information
              </span>
            </div>

            <h1
              className="
                max-w-[850px]

                font-serif

                text-[40px]

                font-semibold

                leading-[1]

                tracking-[-0.04em]

                text-[#111827]
              "
            >
              Terms & Conditions
            </h1>

            <p
              className="
                mt-6

                max-w-[760px]

                text-[13px]

                leading-[1.9]

                text-black

                sm:text-[14px]
              "
            >
              These Terms and Conditions govern your use of
              the HPI Design Studio website. By accessing or
              using this website, you agree to comply with
              and be bound by the terms described below.
            </p>

            <p
              className="
                mt-4

                text-[10px]

                font-semibold

                uppercase

                tracking-[0.22em]

                text-gold
              "
            >
              Last Updated: August 2026
            </p>
          </div>

          {/* ============================================= */}
          {/* TERMS */}
          {/* ============================================= */}

          <div
            className="
              space-y-12
            "
          >
            <LegalSection
              number="01"
              title="About HPI Design Studio"
            >
              <p>
                HPI Design Studio provides architecture,
                interior design, planning, consultation and
                related design services for residential,
                commercial, showroom, healthcare and
                corporate spaces.
              </p>

              <p>
                The information provided on this website is
                intended to offer a general overview of our
                studio, services, portfolio and approach.
              </p>
            </LegalSection>

            <LegalSection
              number="02"
              title="Use of This Website"
            >
              <p>
                You may use this website for lawful,
                personal and informational purposes only.
                You must not use the website in any manner
                that may damage, disable, interfere with or
                impair the website or its functionality.
              </p>

              <p>
                You may not attempt to gain unauthorized
                access to any part of the website, server,
                systems or data connected with HPI Design
                Studio.
              </p>
            </LegalSection>

            <LegalSection
              number="03"
              title="Project Information"
            >
              <p>
                Images, drawings, descriptions, project
                details and other materials displayed on
                this website are provided for presentation
                and portfolio purposes.
              </p>

              <p>
                Actual project specifications, finishes,
                materials, dimensions, costs and timelines
                may vary depending on site conditions,
                client requirements, availability and other
                project-specific factors.
              </p>
            </LegalSection>

            <LegalSection
              number="04"
              title="Intellectual Property"
            >
              <p>
                Unless otherwise stated, all website
                content including designs, photographs,
                project images, graphics, logos, text,
                layouts and visual elements belongs to HPI
                Design Studio or is used with appropriate
                authorization.
              </p>

              <p>
                Content may not be reproduced, copied,
                republished, distributed, modified or used
                for commercial purposes without prior
                written permission.
              </p>
            </LegalSection>

            <LegalSection
              number="05"
              title="Project Enquiries"
            >
              <p>
                Submitting an enquiry through this website
                does not create a contractual relationship
                between you and HPI Design Studio.
              </p>

              <p>
                A project engagement becomes effective only
                after the scope, fees, responsibilities,
                timelines and other terms have been
                mutually agreed upon and documented.
              </p>
            </LegalSection>

            <LegalSection
              number="06"
              title="Accuracy of Information"
            >
              <p>
                We aim to keep the information on this
                website accurate and current. However,
                information may occasionally contain
                typographical errors, outdated details or
                other inaccuracies.
              </p>

              <p>
                HPI Design Studio reserves the right to
                modify website content at any time without
                prior notice.
              </p>
            </LegalSection>

            <LegalSection
              number="07"
              title="Third-Party Links"
            >
              <p>
                This website may contain links to external
                websites or third-party platforms. HPI
                Design Studio does not control these
                websites and is not responsible for their
                content, availability, policies or
                practices.
              </p>
            </LegalSection>

            <LegalSection
              number="08"
              title="Limitation of Liability"
            >
              <p>
                HPI Design Studio will not be liable for
                any direct, indirect, incidental or
                consequential loss arising from the use of
                or inability to use this website.
              </p>

              <p>
                Website information should not be treated
                as a substitute for project-specific
                professional consultation.
              </p>
            </LegalSection>

            <LegalSection
              number="09"
              title="Changes to These Terms"
            >
              <p>
                HPI Design Studio may update or revise these
                Terms and Conditions whenever necessary.
                Any updated version will be published on
                this page.
              </p>

              <p>
                Continued use of the website after changes
                are published will constitute acceptance
                of the updated terms.
              </p>
            </LegalSection>

            <LegalSection
              number="10"
              title="Contact Us"
            >
              <p>
                If you have any questions about these Terms
                and Conditions, you may contact HPI Design
                Studio using the details below.
              </p>

              <div
                className="
                  mt-6

                  border-l-2
                  border-gold

                  bg-[#f7faf7]

                  px-5
                  py-5
                "
              >
                <p className="font-semibold text-[#111827]">
                  HPI Design Studio
                </p>

                <p className="mt-2">
                  03, First Floor, Natkamal Complex,
                  Jawaharchowk, Maninagar, Ahmedabad -
                  380008, Gujarat
                </p>

                <p className="mt-2">
                  Email: info@hpidesignstudio.com
                </p>

                <p className="mt-2">
                  Phone: +91 99984 15438
                </p>
              </div>
            </LegalSection>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   LEGAL SECTION
========================================================= */

function LegalSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="
        grid
        grid-cols-1

        gap-5

        border-b
        border-black/10

        pb-10

        md:grid-cols-[90px_1fr]

        md:gap-8
      "
    >
      <div>
        <span
          className="
            font-serif

            text-[34px]

            leading-none

            text-gold
          "
        >
          {number}
        </span>
      </div>

      <div>
        <h2
          className="
            font-serif

            text-[25px]

            font-semibold

            leading-[1.15]

            tracking-[-0.02em]

            text-[#111827]
          "
        >
          {title}
        </h2>

        <div
          className="
            mt-5

            space-y-4

            text-[13px]

            leading-[1.9]

            text-black

            sm:text-[14px]
          "
        >
          {children}
        </div>
      </div>
    </section>
  );
}