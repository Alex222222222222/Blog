// components/TopBar.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import Config from "@/interfaces/config";
import ContactBadge from "./contactBadge";

interface TopBarProps {
  config: Config;
}

const TopBar: React.FC<TopBarProps> = ({ config }) => {
  return (
    <div className="topbar">
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          paddingLeft: 0,
          color: "#000",
          textDecoration: "underline",
        }}
      >
        <li style={{ marginRight: "10px" }}>
          <Link href="/">{config.pageTitle}</Link>
        </li>
        {config.contact.map((c, index) => {
          if (!c.link) {
            return null;
          }

          return (
            <li key={index}>
              <ContactBadge type={c.type} link={c.link} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopBar;
