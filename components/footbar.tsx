"use client";

import { useEffect, useRef, useState } from "react";
import path from "path";
import React from "react";

const WORDS_API_END_POINT = "/words";

const FootBar: React.FC = () => {
  // chose a random word by the num of the words
  const [randomWord, setRandomWord] = useState(-1);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (randomWord === -1) {
      fetch(path.join(WORDS_API_END_POINT, "num"))
        .then((res) => {
          return res.json();
        })
        .then((num) => {
          setRandomWord(Math.floor(Math.random() * num.num));
        });
    } else {
      // get word from api
      fetch(path.join(WORDS_API_END_POINT, `${randomWord}`))
        .then((res) => {
          return res.json();
        })
        .then((words) => {
          // clean the ref first
          if (ref.current) {
            ref.current.innerHTML = "";
          }
          for (var index in words) {
            const word = words[index];
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
        });
    }
  }, [randomWord]);

  return <div ref={ref} />;
};

export default FootBar;
