"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import Preloader from "./Preloader";
import { HomeDataProvider } from "./HomeDataContext";
import Hero from "./Hero";
import About from "./About";
import Counters from "./Counters";
import Projects from "./Projects";
import Testimonials from "./Testimonials";
import Blog from "./Blog";



const PRELOADER_STORAGE_KEY =
  "hpi-preloader-viewed";

export default function HomeClient() {
  const [
    pageInitialized,
    setPageInitialized,
  ] = useState(false);

  const [
    preloaderVisible,
    setPreloaderVisible,
  ] = useState(false);

  const [
    contentReady,
    setContentReady,
  ] = useState(false);

  useEffect(() => {
    const preloaderAlreadyViewed =
      window.sessionStorage.getItem(
        PRELOADER_STORAGE_KEY,
      ) === "true";

    if (preloaderAlreadyViewed) {
      setPreloaderVisible(false);
      setContentReady(true);
    } else {
      setPreloaderVisible(true);
      setContentReady(false);
    }

    setPageInitialized(true);
  }, []);

  useEffect(() => {
    if (!pageInitialized) {
      return;
    }

    document.body.style.overflow =
      preloaderVisible
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [
    pageInitialized,
    preloaderVisible,
  ]);

  const enterHome =
    useCallback(() => {
      window.sessionStorage.setItem(
        PRELOADER_STORAGE_KEY,
        "true",
      );

      setContentReady(true);
      setPreloaderVisible(false);

      window.requestAnimationFrame(
        () => {
          window.scrollTo({
            top: 0,
            behavior: "auto",
          });
        },
      );
    }, []);

  if (!pageInitialized) {
    return (
      <div className="min-h-screen bg-[#0b0b0a]" />
    );
  }

  return (
    <>
      <Preloader
        visible={preloaderVisible}
        onEnter={enterHome}
      />

      <HomeDataProvider>
        <main>
          <Hero ready={contentReady} />
          <About />
          <Counters />
          <Projects />
          <Testimonials />
          <Blog />
        </main>
      </HomeDataProvider>
    </>
  );
}
