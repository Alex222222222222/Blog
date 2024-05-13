import { useEffect, useRef } from "react";
import words from "./words.json";

const FootBar: React.FC = () => {
  // chose a random word from the words.json file
  const randomWord = Math.floor(Math.random() * words.length);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    for (var index in words[randomWord]) {
      const word = words[randomWord][index];
      if (word.trim().length === 0) {
        const br_element = document.createElement("br");
        ref.current?.appendChild(br_element);
      } else {
        const p_element = document.createElement("p");
        p_element.innerText = word;
        p_element.className = "flex items-center justify-center";
        ref.current?.appendChild(p_element);
      }
    }
  }, []);

  return <div ref={ref} />;
};

export default FootBar;
