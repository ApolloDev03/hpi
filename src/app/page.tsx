"use client";

import { useCallback, useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Counters from "./components/Counters";
import Projects from "./components/Projects";
import Videos from "./components/Videos";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    document.body.style.overflow = preloaderVisible ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [preloaderVisible]);

  const enterHome = useCallback(() => {
    setContentReady(true);
    setPreloaderVisible(false);

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }, []);

  return (
    <>
      <Preloader visible={preloaderVisible} onEnter={enterHome} />
      {/* <Header logoVisible={contentReady} /> */}
      <main>
        <Hero ready={contentReady} />
        {/* <About />
        <Counters />
        <Projects />
        <Videos />
        <Testimonials />
        <Blog />
        <Contact /> */}
      </main>
      {/* <Footer /> */}
    </>
  );
}
