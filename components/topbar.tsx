// components/TopBar.tsx
import Link from "next/link";
import ContactBadge from "./contactBadge";
import config from "@/config.json";
import { stringToContactType } from "@/lib/contactType";

const TopBar: React.FC = () => {
  return (
    <div className="topbar">
      <ul className="flex underline">
        <li className="mr-3">
          <Link href="/">{config.pageTitle}</Link>
        </li>
        <li className="mr-3">
          <Link href="/categories/">{"Categories"}</Link>
        </li>
        <li className="mr-3">
          <Link href="/tags/">{"Tags"}</Link>
        </li>
        <li className="mr-3">
          <Link href="/tools/">{"Tools"}</Link>
        </li>
        <li className="mr-3">
          <Link href="/rss.xml">{"RSS"}</Link>
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
              <ContactBadge type={stringToContactType(c.type)} link={c.link} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopBar;
