"use client";

import React, { useEffect, useState } from "react";
import { toCanvas } from "qrcode";
import Layout from "@/components/layout";
import SeparateLine from "../../hr";

const QRCodeGenerator: React.FC = () => {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (input.length > 0) {
      const canvas = document.getElementById(
        "qrcode-canvas"
      ) as HTMLCanvasElement;
      toCanvas(canvas, input, (error) => {
        if (error) {
          console.error(error);
        }
      });
    }
  }, [input]);

  return (
    <>
      <textarea
        value={input}
        onChange={(e) => {
          // set the input
          setInput(e.target.value);
        }}
        placeholder="Enter text to generate QR Code"
        className="w-full border-2 border-gray-300"
      />
      <div className="flex flex-row space-x-2">
        <button
          onClick={() => {
            // download qr code as png
            const canvas = document.getElementById(
              "qrcode-canvas"
            ) as HTMLCanvasElement;
            const a = document.createElement("a");
            a.href = canvas.toDataURL("image/png");
            a.download = "qrcode.png";
            a.click();
          }}
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Download QR Code
        </button>
      </div>
      <SeparateLine />

      <canvas id="qrcode-canvas" className="mb-3" />
    </>
  );
};

export default QRCodeGenerator;
