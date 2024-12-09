import words from "../components/words.json";
import path from "path";
import fs from "fs";

const WORDS_LOCAL_DIR = "./public/words";

export function getWordsNumber() {
  return words.length;
}

export function buildWordsJson() {
  // create the words directory
  fs.mkdirSync(WORDS_LOCAL_DIR, { recursive: true });
  fs.writeFileSync(path.join(WORDS_LOCAL_DIR, "num.json"), JSON.stringify({
    num: words.length,
  }));

  words.forEach((word, index) => {
    const wordJson = JSON.stringify(word);
    const fileName = path.join(WORDS_LOCAL_DIR, `${index}.json`);

    // write the word to a file
    fs.writeFileSync(fileName, wordJson);
  });
}
