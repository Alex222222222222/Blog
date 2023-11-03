// components/Layout.tsx
import React, { ReactNode } from "react";
import TopBar from "./topbar";
import Config from "@/interfaces/config";
import SeparateLine from "./hr";

interface LayoutProps {
  config: Config;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, config }) => {
  return (
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
  );
};

export default Layout;
