"use client";

import React, { useState } from "react";
import QRScanner from "qr-scanner";
import { Metadata } from "next";
import SeparateLine from "../../hr";

const QRCodeReader: React.FC = () => {
  const [result, setResult] = useState("");

  const handleScan = (data: string | null) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      QRScanner.scanImage(e.target.files[0])
        .then(handleScan)
        .catch(handleError);
    }
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <SeparateLine />
      Result:
      <p className="border-2 border-gray-300 p-2 mb-2 break-words">{result}</p>
    </>
  );
};

export default QRCodeReader;
