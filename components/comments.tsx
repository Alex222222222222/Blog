import { useEffect, useRef } from "react";

const UtterancCommentRepo = "Alex222222222222/Blog";

const Comments: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.crossOrigin = "anonymous";
    scriptElement.src = "https://utteranc.es/client.js";

    scriptElement.setAttribute("issue-term", "pathname");
    scriptElement.setAttribute("label", "comment");
    scriptElement.setAttribute("repo", UtterancCommentRepo);
    scriptElement.setAttribute("theme", "boxy-light");

    ref.current?.appendChild(scriptElement);
  }, []);

  return <div ref={ref} />;
};

export default Comments;
