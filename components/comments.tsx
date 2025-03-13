"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import React from "react";

const UtterancCommentRepo = "Alex222222222222/Blog";

const Comments: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  useEffect(
    () => {
      const scriptElement = document.createElement("script");
      scriptElement.async = true;
      scriptElement.crossOrigin = "anonymous";
      scriptElement.src = "https://utteranc.es/client.js";

      scriptElement.setAttribute("issue-term", "pathname");
      scriptElement.setAttribute("label", "comment");
      scriptElement.setAttribute("repo", UtterancCommentRepo);
      scriptElement.setAttribute("theme", "boxy-light");

      console.log("Ut called");

      // wait 1 second for the page to load
      setTimeout(() => {
        while (ref.current?.firstChild) {
          ref.current.removeChild(ref.current.firstChild);
        }
        ref.current?.appendChild(scriptElement);
      }, 1000);
    },
    // depend on pathname, otherwise it will not update when go to new page
    [pathname],
  );

  return <div ref={ref} />;
};

export default Comments;
