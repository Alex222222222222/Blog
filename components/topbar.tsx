// components/TopBar.tsx
import Link from "next/link";
import ContactBadge from "./contactBadge";
import config from "@/config.json";
import { stringToContactType } from "@/lib/contactType";

const TopBar: React.FC = () => {
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
        <li style={{ marginRight: "10px" }}>
          <Link href="/categories/">{"Categories"}</Link>
        </li>
        <li style={{ marginRight: "10px" }}>
          <Link href="/tags/">{"Tags"}</Link>
        </li>
        <li style={{ marginRight: "10px" }}>
          <Link href="/tools/">{"Tools"}</Link>
        </li>
        <li style={{ marginRight: "10px" }}>
          <Link href="/rss.xml">{"RSS"}</Link>
        </li>
      </ul>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          paddingLeft: 0,
          color: "#000",
        }}
      >
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
