import React, { useState } from "react";
import QRCode from "qrcode.react";
import Layout from "@/components/layout";

const QRCodePage: React.FC = ({}) => {
  const [input, setInput] = useState("");
  const [size, setSize] = useState(256);

  return (
    <Layout>
      <h1>QR Code Generator</h1>
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          // change size based on input length
          if (e.target.value.length > 100) {
            setSize(512);
          } else {
            setSize(256);
          }
        }}
        placeholder="Enter text to generate QR Code"
        className="w-full border-2 border-gray-300"
      />
      <QRCode value={input} className="mb-3" size={size} />

      {
        // export button to export qr code as png
      }
    </Layout>
  );
};

export default QRCodePage;
