import React, { useState } from "react";
import QRScanner from "qr-scanner";
import { Metadata } from "next";
import QRCodeReader from "@/components/tools/qrcode/reader";

export const metadata: Metadata = {
  title: "QR Code Reader",
  description: "Read QR code from an image",
};

export default function Page() {
  return (
    <>
      <h1>QR Code Reader</h1>
      <QRCodeReader />
    </>
  );
}
