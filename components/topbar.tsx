// components/TopBar.tsx
import Link from "next/link";
import ContactBadge from "./contactBadge";
import config from "@/config.json";
import { stringToContactType } from "@/lib/contactType";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SeparateLine from "./hr";

const TopBar: React.FC = () => {
  const [sevenDaysViews, sevenDaysViewsDispatch] = useState(0);
  const [thirtyDaysViews, thirtyDaysViewsDispatch] = useState(0);
  const [totalViews, totalViewsDispatch] = useState(0);
  const [siteSevenDaysViews, siteSevenDaysViewsDispatch] = useState(0);
  const [siteThirtyDaysViews, siteThirtyDaysViewsDispatch] = useState(0);
  const [siteTotalViews, siteTotalViewsDispatch] = useState(0);

  const router = useRouter();
  useEffect(() => {
    // Don't track views in development,
    // as the api is not available
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const path = window.location.pathname;
    fetch(`/views?days=7&path=${encodeURIComponent(path)}`)
      .then((response) => response.json())
      .then((data) => {
        sevenDaysViewsDispatch(data.views);
      });

    fetch(`/views?days=30&path=${encodeURIComponent(path)}`)
      .then((response) => response.json())
      .then((data) => {
        thirtyDaysViewsDispatch(data.views);
      });

    fetch(`/views?days=1000&path=${encodeURIComponent(path)}`)
      .then((response) => response.json())
      .then((data) => {
        totalViewsDispatch(data.views);
      });

    fetch(`/views?days=7`)
      .then((response) => response.json())
      .then((data) => {
        siteSevenDaysViewsDispatch(data.views);
      });

    fetch(`/views?days=30`)
      .then((response) => response.json())
      .then((data) => {
        siteThirtyDaysViewsDispatch(data.views);
      });

    fetch(`/views?days=1000`)
      .then((response) => response.json())
      .then((data) => {
        siteTotalViewsDispatch(data.views);
      });
  }, [router.events]);

  return (
    <div className="pt-2 sticky top-0 bg-yellow-100 px-4 sm:px-6 lg:px-8">
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
        <div>
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="pr-2">7 Days</td>
                <td className="pr-2">{sevenDaysViews}</td>
                <td className="pr-2">Site 7 Days</td>
                <td className="pr-2">{siteSevenDaysViews}</td>
              </tr>
              <tr>
                <td className="pr-2">30 Days</td>
                <td className="pr-2">{thirtyDaysViews}</td>
                <td className="pr-2">Site 30 Days</td>
                <td className="pr-2">{siteThirtyDaysViews}</td>
              </tr>
              <tr>
                <td className="pr-2">Total</td>
                <td className="pr-2">{totalViews}</td>
                <td className="pr-2">Site Total</td>
                <td className="pr-2">{siteTotalViews}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <SeparateLine />
    </div>
  );
};

export default TopBar;
