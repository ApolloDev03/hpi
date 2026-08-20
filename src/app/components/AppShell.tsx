"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import HeaderNew from "./HeaderNew";
import Footer from "./Footer";
import Preloader from "./Preloader";

const PRELOADER_STORAGE_KEY =
  "hpi-preloader-viewed";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({
  children,
}: AppShellProps) {
  const [
    initialized,
    setInitialized,
  ] = useState(false);

  const [
    preloaderVisible,
    setPreloaderVisible,
  ] = useState(false);

  const [
    websiteVisible,
    setWebsiteVisible,
  ] = useState(false);

  /* =====================================================
     CHECK PRELOADER STATUS
  ===================================================== */

  useEffect(() => {
    const alreadyViewed =
      window.sessionStorage.getItem(
        PRELOADER_STORAGE_KEY,
      ) === "true";

    if (alreadyViewed) {
      /*
       * Preloader already viewed in this session.
       * Directly show website.
       */
      setPreloaderVisible(false);
      setWebsiteVisible(true);
    } else {
      /*
       * First visit.
       * Only show preloader.
       */
      setPreloaderVisible(true);
      setWebsiteVisible(false);
    }

    setInitialized(true);
  }, []);

  /* =====================================================
     BODY SCROLL LOCK
  ===================================================== */

  useEffect(() => {
    if (!initialized) {
      return;
    }

    if (preloaderVisible) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [
    initialized,
    preloaderVisible,
  ]);

  /* =====================================================
     ENTER WEBSITE
  ===================================================== */

  const enterWebsite =
    useCallback(() => {
      window.sessionStorage.setItem(
        PRELOADER_STORAGE_KEY,
        "true",
      );

      /*
       * Website becomes available when
       * preloader completes.
       */
      setWebsiteVisible(true);

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

  /* =====================================================
     INITIAL BLANK SCREEN
     Prevent header/footer flash before sessionStorage check.
  ===================================================== */

  if (!initialized) {
    return (
      <div
        className="
          min-h-screen
          bg-[#0b0b0a]
        "
      />
    );
  }

  return (
    <>
      {/* ================================================= */}
      {/* PRELOADER */}
      {/* ================================================= */}

      <Preloader
        visible={
          preloaderVisible
        }
        onEnter={
          enterWebsite
        }
      />

      {/* ================================================= */}
      {/* WEBSITE */}
      {/* ================================================= */}

      {websiteVisible && (
        <>
          <HeaderNew
            logoVisible={
              true
            }
          />

          {children}

          <Footer />
        </>
      )}
    </>
  );
}