// import type { Metadata } from "next";
// import {
//   Allura,
//   Cormorant_Garamond,
//   Montserrat,
//   Oswald,
// } from "next/font/google";

// import HeaderNew from "./components/HeaderNew";
// import Footer from "./components/Footer";

// import "./globals.css";
// import { Toaster } from "react-hot-toast";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   variable: "--font-montserrat",
//   display: "swap",
// });



// export const metadata: Metadata = {
//   title: "HPI Studio",
//   description:
//     "HPI Studio creates thoughtful architecture and interior spaces.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`
//           ${montserrat.variable}
         
//           font-sans font-light
//         `}
//       >
//          <Toaster
//                 position="top-right"
//                 toastOptions={{
//                   duration: 4500,
//                   style: {
//                     background: "#15130f",
//                     color: "#f3efe7",
//                     border:
//                       "1px solid rgba(184, 134, 58, 0.45)",
//                     borderRadius: "0px",
//                     padding: "14px 16px",
//                   },
//                   success: {
//                     iconTheme: {
//                       primary: "#b8863a",
//                       secondary: "#080807",
//                     },
//                   },
//                   error: {
//                     iconTheme: {
//                       primary: "#f87171",
//                       secondary: "#15130f",
//                     },
//                   },
//                 }}
//               />
//         <HeaderNew logoVisible={true} />
//         <main>{children}</main>
//            <Footer />
//       </body>
//     </html>
//   );
// }

import type {
  Metadata,
} from "next";

import {
  Montserrat,
} from "next/font/google";

import {
  Toaster,
} from "react-hot-toast";

import AppShell from "./components/AppShell";

import "./globals.css";

/* =========================================================
   FONT
========================================================= */

const montserrat =
  Montserrat({
    subsets: [
      "latin",
    ],

    variable:
      "--font-montserrat",

    display:
      "swap",
  });

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata =
  {
    title:
      "HPI Studio",

    description:
      "HPI Studio creates thoughtful architecture and interior spaces.",
  };

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${montserrat.variable}

          font-sans
          font-light
        `}
      >
        {/* =============================================== */}
        {/* GLOBAL TOAST */}
        {/* =============================================== */}

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
                "1px solid rgba(17, 94, 40, 0.30)",

              borderRadius:
                "0px",

              padding:
                "14px 16px",

              boxShadow:
                "0 15px 40px rgba(0,0,0,0.08)",
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

        {/* =============================================== */}
        {/* GLOBAL PRELOADER + WEBSITE */}
        {/* =============================================== */}

        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}