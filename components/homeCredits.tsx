import React from "react";

const HomeCredits: React.FC = () => {
  return (
    <div>
      <h2>Credits:</h2>
      <ul className="ml-5">
        <li>
          Built On:{" "}
          <a
            target="_blank"
            href="https://nextjs.org/"
            rel="noreferrer"
            className="underline"
          >
            Next.js
          </a>
          ,{" "}
          <a
            target="_blank"
            href="https://tailwindcss.com/"
            rel="noreferrer"
            className="underline"
          >
            Tailwind CSS
          </a>
          .
        </li>
        <li>
          Hosted On:{" "}
          <a
            target="_blank"
            href="https://www.cloudflare.com/"
            rel="noreferrer"
            className="underline"
          >
            Cloudflare Pages
          </a>
          .
        </li>
        <li>
          Fonts:{" "}
          <a
            target="_blank"
            href="https://github.com/githubnext/monaspace"
            rel="noreferrer"
            className="underline"
          >
            Github Next&apos;s Monaspace Krypton
          </a>
        </li>
        <li>
          Markdown Parser:{" "}
          <a
            target="_blank"
            href="https://unifiedjs.com"
            rel="noreferrer"
            className="underline"
          >
            Unified.js
          </a>
        </li>
        <li>
          Math Rendering:{" "}
          <a
            target="_blank"
            href="https://katex.org/"
            rel="noreferrer"
            className="underline"
          >
            KaTeX
          </a>
          ,{" "}
          <a
            target="_blank"
            href="https://tikzjax.com/"
            rel="noreferrer"
            className="underline"
          >
            TikZJax
          </a>
        </li>
        <li>
          Comments:{" "}
          <a
            target="_blank"
            href="https://utteranc.es/"
            rel="noreferrer"
            className="underline"
          >
            Utterances
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HomeCredits;
