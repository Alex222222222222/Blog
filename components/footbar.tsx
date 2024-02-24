import words from "./words.json";

const FootBar: React.FC = () => {
  // chose a random word from the words.json file
  const randomWord = Math.floor(Math.random() * words.length);
  return (
    <div>
      {
        // for each word in the words.json file, create a <p> tag
      }
      {words[randomWord].map((word: string, index: number) => {
        if (word.trim().length === 0) {
          return <br key={index} />;
        }

        return (
          <p key={index} className="flex items-center justify-center">
            {word}
          </p>
        );
      })}
    </div>
  );
};

export default FootBar;
