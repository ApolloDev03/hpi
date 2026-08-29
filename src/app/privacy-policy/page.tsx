import Breadcrumb from "@/app/components/Breadcrumb";
import banner from "@/app/assets/banner1.png";

export default function PrivacyPolicyPage() {
  return (
    <main className="overflow-hidden bg-white">
      {/* ================================================= */}
      {/* BREADCRUMB */}
      {/* ================================================= */}

      <Breadcrumb
        title="Privacy Policy"
        backgroundImage={banner}
        imagePosition="center"
        items={[
          {
            label: "Privacy Policy",
          },
        ]}
      />

      {/* ================================================= */}
      {/* PRIVACY CONTENT */}
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

            -right-48
            top-1/4

            h-[460px]
            w-[460px]

            rounded-full

            bg-gold/[0.04]

            blur-[160px]
          "
        />

        {/* Decorative line */}

        <span
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            left-0
            top-0

            h-px
            w-[42%]

            bg-gradient-to-r

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
                Your Privacy Matters
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
              Privacy Policy
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
              This Privacy Policy explains how HPI Design
              Studio may collect, use and protect
              information when you visit our website,
              submit an enquiry or communicate with us.
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
          {/* SECTIONS */}
          {/* ============================================= */}

          <div className="space-y-12">
            <PrivacySection
              number="01"
              title="Information We Collect"
            >
              <p>
                When you contact HPI Design Studio through
                our website, we may collect information
                that you voluntarily provide.
              </p>

              <ul>
                <li>Your full name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Project type</li>
                <li>Project location</li>
                <li>Estimated budget</li>
                <li>Project requirements and enquiry details</li>
              </ul>
            </PrivacySection>

            <PrivacySection
              number="02"
              title="How We Use Your Information"
            >
              <p>
                Information submitted through our website
                may be used to respond to your enquiry and
                understand your project requirements.
              </p>

              <ul>
                <li>
                  To contact you regarding your project
                  enquiry
                </li>

                <li>
                  To understand your design requirements
                </li>

                <li>
                  To provide information about our services
                </li>

                <li>
                  To improve our website and customer
                  experience
                </li>

                <li>
                  To maintain internal enquiry and project
                  records
                </li>
              </ul>
            </PrivacySection>

            <PrivacySection
              number="03"
              title="Information Sharing"
            >
              <p>
                HPI Design Studio does not sell or rent
                personal information submitted through this
                website.
              </p>

              <p>
                Information may be shared with trusted
                service providers or professional partners
                only when reasonably necessary for
                operating our website, communicating with
                you or providing our services.
              </p>
            </PrivacySection>

            <PrivacySection
              number="04"
              title="Data Security"
            >
              <p>
                We take reasonable administrative and
                technical precautions to protect
                information submitted through our website
                against unauthorized access, disclosure,
                alteration or misuse.
              </p>

              <p>
                However, no internet transmission or
                electronic storage method can be guaranteed
                to be completely secure.
              </p>
            </PrivacySection>

            <PrivacySection
              number="05"
              title="Cookies & Website Data"
            >
              <p>
                Our website may use cookies or similar
                technologies to support functionality,
                understand website usage and improve the
                visitor experience.
              </p>

              <p>
                You may control or disable cookies through
                your browser settings. Some website
                features may function differently if
                cookies are disabled.
              </p>
            </PrivacySection>

            <PrivacySection
              number="06"
              title="Third-Party Services"
            >
              <p>
                Our website may include third-party
                services such as maps, social media links,
                analytics services or external websites.
              </p>

              <p>
                These third parties may operate under their
                own privacy policies. HPI Design Studio is
                not responsible for the privacy practices
                of third-party websites or platforms.
              </p>
            </PrivacySection>

            <PrivacySection
              number="07"
              title="Data Retention"
            >
              <p>
                We may retain enquiry information for as
                long as reasonably necessary to respond to
                your request, manage potential or ongoing
                projects, maintain business records and
                comply with applicable obligations.
              </p>
            </PrivacySection>

            <PrivacySection
              number="08"
              title="Your Choices"
            >
              <p>
                You may contact us if you would like to
                update, correct or request deletion of
                personal information that you previously
                submitted to HPI Design Studio, subject to
                applicable legal and business record
                requirements.
              </p>
            </PrivacySection>

            <PrivacySection
              number="09"
              title="Changes to This Policy"
            >
              <p>
                We may update this Privacy Policy from time
                to time to reflect changes to our website,
                services or privacy practices.
              </p>

              <p>
                Updated versions will be published on this
                page with the revised date.
              </p>
            </PrivacySection>

            <PrivacySection
              number="10"
              title="Contact Information"
            >
              <p>
                For privacy-related questions or requests,
                please contact HPI Design Studio.
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
            </PrivacySection>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   PRIVACY SECTION
========================================================= */

function PrivacySection({
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

            [&_ul]:ml-5
            [&_ul]:list-disc
            [&_ul]:space-y-2

            [&_li::marker]:text-gold
          "
        >
          {children}
        </div>
      </div>
    </section>
  );
}