// pages/encode.tsx
import Layout from "@/components/layout";
import React, { useState } from "react";

const EncodePage: React.FC = ({}) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleDecode = () => {
    const decoded = atob(input);
    setOutput(decoded);
  };

  return (
    <Layout>
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
      <button onClick={handleDecode} className="border-2 border-gray-300 mb-2">
        Decode
      </button>
    </Layout>
  );
};

export default EncodePage;
