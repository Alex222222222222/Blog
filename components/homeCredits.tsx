import React from "react";

const HomeCredits = () => {
  return (
    <div>
      <h2>Credits:</h2>
      <ul className="ml-5">
        <li>
          Built On:{" "}
          <a target="_blank" href="https://nextjs.org/" className="underline">
            Next.js
          </a>
          ,{" "}
          <a
            target="_blank"
            href="https://tailwindcss.com/"
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
            className="underline"
          >
            KaTeX
          </a>
          ,{" "}
          <a
            target="_blank"
            href="https://tikzjax.com/"
            className="underline"
          >
            TikZJax
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HomeCredits;
