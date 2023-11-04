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

  const handleDecode = () => {
    const decoded = atob(input);
    setOutput(decoded);
  };

  return (
    <Layout config={config}>
      <h1>Online Base64 Decoder</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to decode"
        className="w-full border-2 border-gray-300"
      />
      <br />
      <textarea
        value={output}
        readOnly
        placeholder="Decoded text will appear here"
        className="w-full border-2 border-gray-300"
      />
      <br />
      <button onClick={handleDecode}
        className="border-2 border-gray-300 mb-2"
      >Decode</button>
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
