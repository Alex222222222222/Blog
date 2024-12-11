// components/topBar.tsx
import Link from "next/link";
import ContactBadge from "./contactBadge";
import config from "@/config.json";
import { stringToContactType } from "@/lib/contactType";
import ViewsCount from "./viewsCount";
import SeparateLine from "./hr";
import React from "react";

const TopBar: React.FC = () => {
  return (
    <div className="pt-2 sticky top-0 bg-yellow-100 px-4 sm:px-6 lg:px-8 z-[999]">
      <div className="lg:flex lg:flex-row">
        <div className="lg:grow">
          <ul className="flex underline">
            <li className="mr-3">
              <Link href="/">{config.pageTitle}</Link>
            </li>
            <li className="mr-3">
              <Link href="/tools/">{"Tools"}</Link>
            </li>
            <li className="mr-3">
              <Link href="/rss.xml">{"RSS"}</Link>
            </li>
            <li className="mr-3">
              <a
                href="https://www.travellings.cn/go.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                🚇 Travelling
              </a>
            </li>
          </ul>
          <ul className="flex underline">
            <li className="mr-3">
              <Link href="/categories/">{"Categories"}</Link>
            </li>
            <li className="mr-3">
              <Link href="/tags/">{"Tags"}</Link>
            </li>
            <li className="mr-3">
              <Link href="/search">{"Search"}</Link>
            </li>
          </ul>
          <ul className="flex underline">
            {config.contact.map((c, index) => {
              if (!c.link) {
                return null;
              }

              return (
                <li key={index}>
                  <ContactBadge
                    type={stringToContactType(c.type)}
                    link={c.link}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <ViewsCount></ViewsCount>
      </div>
      <SeparateLine />
    </div>
  );
};

export default TopBar;
