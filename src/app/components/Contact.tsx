"use client";

import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="bg-panel2 py-[150px] px-[7vw]">
      <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-[90px]">
        <Reveal>
          <span className="eyebrow">Get in Touch</span>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] text-ivory my-4 mb-10">
            Contact us
          </h2>
          <div className="mb-8">
            <span className="eyebrow block mb-2">Studio</span>
            <div className="font-serif text-xl text-ivory">Ahmedabad, Gujarat, India</div>
          </div>
          <div className="mb-8">
            <span className="eyebrow block mb-2">Email</span>
            <div className="font-serif text-xl text-ivory">hello@hpistudio.in</div>
          </div>
          <div className="mb-8">
            <span className="eyebrow block mb-2">Phone</span>
            <div className="font-serif text-xl text-ivory">+91 98765 43210</div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-7"
          >
            <Field label="Full Name" type="text" />
            <Field label="Email Address" type="email" />
            <Field label="Tell us about your project" textarea />
            <button
              type="submit"
              className="self-start mt-2 px-10 py-3.5 border border-gold text-gold-light text-[0.7rem] uppercase tracking-widest2 transition-colors duration-300 hover:bg-gold hover:text-bg"
            >
              Send Enquiry
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  type,
  textarea,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <div className="relative group">
      {textarea ? (
        <textarea
          placeholder=" "
          required
          className="peer w-full bg-transparent border-0 border-b border-line text-ivory font-sans text-base py-3 px-0.5 outline-none resize-none h-[90px] transition-colors duration-300 focus:border-gold"
        />
      ) : (
        <input
          type={type}
          placeholder=" "
          required
          className="peer w-full bg-transparent border-0 border-b border-line text-ivory font-sans text-base py-3 px-0.5 outline-none transition-colors duration-300 focus:border-gold"
        />
      )}
      <label className="absolute left-0.5 top-3 text-muted text-[0.9rem] transition-all duration-300 pointer-events-none peer-focus:-top-3.5 peer-focus:text-[0.66rem] peer-focus:tracking-widest2 peer-focus:uppercase peer-focus:text-gold-light peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-[0.66rem] peer-[:not(:placeholder-shown)]:tracking-widest2 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:text-gold-light">
        {label}
      </label>
    </div>
  );
}
