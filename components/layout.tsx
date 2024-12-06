// components/Layout.tsx
import React, { ReactNode } from "react";
import TopBar from "./topbar";
import SeparateLine from "./hr";
import Head from "next/head";
import config from "@/config.json";
import FootBar from "./footbar";
import Comments from "./comments";
import Scroll2Top from "./scroll2TopBottom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>{config.pageTitle}</title>
        <meta name="description" content={config.pageDescription} />
        <meta name="keywords" content={config.pageKeywords.join(", ")} />
        <link rel="mask-icon" href="/icon.svg" color="#000000" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <div className="max-w-3xl mx-auto lg:max-w-7xl bg-yellow-50">
        <TopBar />
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="content">{children}</div>
          <Comments />
          <SeparateLine />
          <FootBar />
          <Scroll2Top />
        </div>
      </div>
    </>
  );
};

export default Layout;
