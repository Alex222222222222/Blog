"use client";

import React, { useState } from "react";

const EncodeBase64: React.FC = ({}) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    const encoded = btoa(input);
    setOutput(encoded);
  };

  return (
    <>
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
      <button onClick={handleEncode} className="border-2 border-gray-300 mb-2">
        Encode
      </button>
    </>
  );
};

export default EncodeBase64;
