"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Header({ logoVisible }: { logoVisible: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-md border-b border-line py-3.5 px-[5vw]"
          : "border-b border-transparent py-5 px-[5vw]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={logoVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative transition-all duration-500 ${scrolled ? "w-[74px]" : "w-24"}`}
      >
        <Image
          src="/logo-white.png"
          alt="HPI"
          width={680}
          height={503}
          className="w-full h-auto"
        />
      </motion.div>

      <nav className="hidden md:block">
        <ul className="flex gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-[0.72rem] uppercase tracking-widest2 text-ivory pb-1"
              >
                {l.label}
                <span className="absolute left-0 bottom-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
