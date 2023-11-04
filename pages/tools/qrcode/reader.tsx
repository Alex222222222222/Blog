import React, { useState } from "react";
import QRScanner from "qr-scanner";
import Layout from "@/components/layout";

const QRReaderPage: React.FC = ({}) => {
  const [result, setResult] = useState("");
  const [, setFile] = useState<File | null>(null);

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
      setFile(e.target.files[0]);
      QRScanner.scanImage(e.target.files[0])
        .then(handleScan)
        .catch(handleError);
    }
  };

  return (
    <Layout>
      <h1>QR Code Reader</h1>
      {
        // ask user to upload a file
      }
      <input type="file" onChange={handleFileChange} />
      <br />
      Result:
      <p
        className="border-2 border-gray-300 p-2 mb-2"
        style={{ wordWrap: "break-word" }}
      >
        {result}
      </p>
    </Layout>
  );
};

export default QRReaderPage;
