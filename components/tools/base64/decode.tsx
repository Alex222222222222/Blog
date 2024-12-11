"use client";

import React, { useState } from "react";

const DecodeBase64: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleDecode = () => {
    const decoded = atob(input);
    setOutput(decoded);
  };

  return (
    <>
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
    </>
  );
};

export default DecodeBase64;
