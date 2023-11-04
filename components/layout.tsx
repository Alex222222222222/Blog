// components/Layout.tsx
import React, { ReactNode } from "react";
import TopBar from "./topbar";
import Config from "@/interfaces/config";
import SeparateLine from "./hr";
import Head from "next/head";

interface LayoutProps {
  config: Config;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, config }) => {
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
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <TopBar config={config} />
        <SeparateLine />
        <div className="content">{children}</div>
        <SeparateLine />
        <div className="footbar">This is the footbar</div>
      </div>
    </>
  );
};

export default Layout;
