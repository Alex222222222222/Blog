// components/TopBar.tsx
import Link from "next/link";
import ContactBadge from "./contactBadge";
import config from "@/config.json";
import { stringToContactType } from "@/lib/contactType";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const TopBar: React.FC = () => {
  const [sevenDaysViews, sevenDaysViewsDispatch] = useState(0);
  const [thirtyDaysViews, thirtyDaysViewsDispatch] = useState(0);
  const [totalViews, totalViewsDispatch] = useState(0);
  const [siteSevenDaysViews, siteSevenDaysViewsDispatch] = useState(0);
  const [siteThirtyDaysViews, siteThirtyDaysViewsDispatch] = useState(0);
  const [siteTotalViews, siteTotalViewsDispatch] = useState(0);

  const router = useRouter();
  useEffect(() => {
    const path = router.pathname;
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
  }, [router.pathname]);

  return (
    <div className="flex flex-row pt-2">
      <div className="grow">
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
              <td className="px-2">7 Days</td>
              <td className="pr-2">{sevenDaysViews}</td>
              <td className="pr-2">Site 7 Days</td>
              <td className="pr-2">{siteSevenDaysViews}</td>
            </tr>
            <tr>
              <td className="px-2">30 Days</td>
              <td className="pr-2">{thirtyDaysViews}</td>
              <td className="pr-2">Site 30 Days</td>
              <td className="pr-2">{siteThirtyDaysViews}</td>
            </tr>
            <tr>
              <td className="px-2">Total</td>
              <td className="pr-2">{totalViews}</td>
              <td className="pr-2">Site Total</td>
              <td className="pr-2">{siteTotalViews}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopBar;
