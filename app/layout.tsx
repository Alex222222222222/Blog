// app/Layout.tsx
import { ReactNode } from "react";
import TopBar from "@/components/topbar";
import SeparateLine from "@/components/hr";
import config from "@/config.json";
import FootBar from "@/components/footbar";
import Comments from "@/components/comments";
import Scroll2Top from "@/components/scroll2TopBottom";
import localFont from "next/font/local";

import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s | ${config.pageTitle}`,
    default: config.pageTitle,
  },
  description: config.pageDescription,
  keywords: config.pageKeywords,
  authors: [{ name: config.author, url: config.baseUrl }],
  creator: config.author,
  publisher: config.author,
  metadataBase: new URL(config.baseUrl),
  openGraph: {
    title: config.pageTitle,
    description: config.pageDescription,
    url: config.baseUrl,
    siteName: config.pageTitle,
    images: [
      {
        url: new URL("/static/icons/1024.png", config.baseUrl), // Must be an absolute URL
        width: 32,
        height: 32,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    follow: true,
    index: true,
  },
  icons: {
    icon: "/static/icons/icon.svg",
    shortcut: ["/static/icons/32.png", "/static/icons/16.png"],
    apple: [
      "/static/icons/appstore.png",
      "/static/icons/1024.png",
      "/static/icons/512.png",
      "/static/icons/256.png",
      "/static/icons/128.png",
    ],
  },
};

const NEXT_PUBLIC_GA_ID = "G-49DZRF2KTW";

const krypton = localFont({
  src: [
    {
      path: "../fonts/MonaspaceKrypton/MonaspaceKrypton-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/MonaspaceKrypton/MonaspaceKrypton-BoldItalic.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/MonaspaceKrypton/MonaspaceKrypton-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/MonaspaceKrypton/MonaspaceKrypton-ExtraBoldItalic.woff",
      weight: "800",
      style: "italic",
    },
    {
      path: "../fonts/MonaspaceKrypton/MonaspaceKrypton-ExtraLight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/MonaspaceKrypton/MonaspaceKrypton-ExtraLightItalic.woff",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/MonaspaceKrypton/MonaspaceKrypton-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/MonaspaceKrypton/MonaspaceKrypton-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/MonaspaceKrypton/MonaspaceKrypton-LightItalic.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/MonaspaceKrypton/MonaspaceKrypton-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/MonaspaceKrypton/MonaspaceKrypton-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/MonaspaceKrypton/MonaspaceKrypton-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/MonaspaceKrypton/MonaspaceKrypton-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/MonaspaceKrypton/MonaspaceKrypton-SemiBoldItalic.woff",
      weight: "600",
      style: "italic",
    },
  ],
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={NEXT_PUBLIC_GA_ID} />
      <body>
        <div
          className={`max-w-3xl mx-auto lg:max-w-7xl bg-yellow-50 ${krypton.className}`}
        >
          <TopBar />
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="content">{children}</div>
            <Comments />
            <SeparateLine />
            <FootBar />
            <Scroll2Top />
          </div>
        </div>
      </body>
    </html>
  );
}
