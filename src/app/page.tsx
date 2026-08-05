// // "use client";

// // import { useCallback, useEffect, useState } from "react";
// // import Preloader from "./components/Preloader";
// // import Header from "./components/Header";
// // import Hero from "./components/Hero";
// // import About from "./components/About";
// // import Counters from "./components/Counters";
// // import Projects from "./components/Projects";
// // import Videos from "./components/Videos";
// // import Testimonials from "./components/Testimonials";
// // import Blog from "./components/Blog";
// // import Contact from "./components/Contact";
// // import Footer from "./components/Footer";

// // export default function Home() {
// //   const [preloaderVisible, setPreloaderVisible] = useState(true);
// //   const [contentReady, setContentReady] = useState(false);

// //   useEffect(() => {
// //     document.body.style.overflow = preloaderVisible ? "hidden" : "";

// //     return () => {
// //       document.body.style.overflow = "";
// //     };
// //   }, [preloaderVisible]);

// //   const enterHome = useCallback(() => {
// //     setContentReady(true);
// //     setPreloaderVisible(false);

// //     window.requestAnimationFrame(() => {
// //       window.scrollTo({ top: 0, behavior: "auto" });
// //     });
// //   }, []);

// //   return (
// //     <>
// //       <Preloader visible={preloaderVisible} onEnter={enterHome} />
// //       <Header logoVisible={contentReady} />
// //       <main>
// //         <Hero ready={contentReady} />
// //         <About />
// //         <Counters />
// //         {/* <Projects />
// //         <Videos /> */}
// //         <Testimonials />
// //         <Blog />
// //         {/* <Contact /> */}
// //       </main>
// //       <Footer />
// //     </>
// //   );
// // }


// "use client";

// import {
//   useCallback,
//   useEffect,
//   useState,
// } from "react";

// import Preloader from "./components/Preloader";
// // import Header from "./components/Header";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Counters from "./components/Counters";
// import Testimonials from "./components/Testimonials";
// import Blog from "./components/Blog";
// import Footer from "./components/Footer";
// import Projects from "./components/Projects";
// // import HeaderNew from "./components/HeaderNew";


// const PRELOADER_STORAGE_KEY = "hpi-preloader-viewed";

// export default function Home() {
//   const [pageInitialized, setPageInitialized] =
//     useState(false);

//   const [preloaderVisible, setPreloaderVisible] =
//     useState(false);

//   const [contentReady, setContentReady] =
//     useState(false);

//   /*
//    * Check whether the loader has already been shown
//    * in the current browser tab.
//    */
//   useEffect(() => {
//     const preloaderAlreadyViewed =
//       window.sessionStorage.getItem(
//         PRELOADER_STORAGE_KEY
//       ) === "true";

//     if (preloaderAlreadyViewed) {
//       // Refresh: directly display website content.
//       setPreloaderVisible(false);
//       setContentReady(true);
//     } else {
//       // First visit: display preloader.
//       setPreloaderVisible(true);
//       setContentReady(false);
//     }

//     setPageInitialized(true);
//   }, []);

//   /*
//    * Disable website scrolling while loader is visible.
//    */
//   useEffect(() => {
//     if (!pageInitialized) return;

//     document.body.style.overflow =
//       preloaderVisible ? "hidden" : "";

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [pageInitialized, preloaderVisible]);

//   /*
//    * Called when the user enters the homepage.
//    */
//   const enterHome = useCallback(() => {
//     window.sessionStorage.setItem(
//       PRELOADER_STORAGE_KEY,
//       "true"
//     );

//     setContentReady(true);
//     setPreloaderVisible(false);

//     window.requestAnimationFrame(() => {
//       window.scrollTo({
//         top: 0,
//         behavior: "auto",
//       });
//     });
//   }, []);

//   /*
//    * Prevent the homepage from flashing before
//    * sessionStorage has been checked.
//    */
//   if (!pageInitialized) {
//     return (
//       <div className="min-h-screen bg-[#0b0b0a]" />
//     );
//   }

//   return (
//     <>
//       <Preloader
//         visible={preloaderVisible}
//         onEnter={enterHome}
//       />

//       {/* <Header logoVisible={contentReady} /> */}

//       {/* <HeaderNew logoVisible={contentReady}/> */}

//       <main>
//         <Hero ready={contentReady} />

//         <About />

//         <Counters />

//         <Projects />
//         {/* <Videos /> */}

//         <Testimonials />

//         <Blog />

//         {/* <Contact /> */}
//       </main>

//       {/* <Footer /> */}
//     </>
//   );
// }

"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import About from "./components/About";
import Counters from "./components/Counters";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import { HomeDataProvider } from "./components/HomeDataContext";


const PRELOADER_STORAGE_KEY =
  "hpi-preloader-viewed";

export default function Home() {
  const [pageInitialized, setPageInitialized] =
    useState(false);

  const [preloaderVisible, setPreloaderVisible] =
    useState(false);

  const [contentReady, setContentReady] =
    useState(false);

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
      preloaderVisible ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [pageInitialized, preloaderVisible]);

  const enterHome = useCallback(() => {
    window.sessionStorage.setItem(
      PRELOADER_STORAGE_KEY,
      "true",
    );

    setContentReady(true);
    setPreloaderVisible(false);

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    });
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