import QRCodeGenerator from "@/components/qrcode/generator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Generate QR Code",
};

export default function Page() {
  return (
    <>
      <h1>QR Code Generator</h1>
      <QRCodeGenerator />
    </>
  );
}
