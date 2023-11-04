// pages/encode.tsx
import Layout from "@/components/layout";
import Config from "@/interfaces/config";
import getConfig from "@/lib/config";
import React, { useState } from "react";

interface IntroPageProps {
  config: Config;
}

const EncodePage: React.FC<IntroPageProps> = ({ config }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    const encoded = btoa(input);
    setOutput(encoded);
  };

  return (
    <Layout config={config}>
      <h1>Online Base64 Encoder</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to encode"
        className="w-full border-2 border-gray-300"
      />
      <br />
      <textarea
        value={output}
        readOnly
        placeholder="Encoded text will appear here"
        className="w-full border-2 border-gray-300"
      />
      <br />
      <button onClick={handleEncode}
        className="border-2 border-gray-300 mb-2"
      >Encode</button>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const config = getConfig();

  return {
    props: {
      config,
    },
  };
};

export default EncodePage;
