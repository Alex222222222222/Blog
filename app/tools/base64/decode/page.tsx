import DecodeBase64 from "@/components/tools/base64/decode";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Decoder",
  description: "Decode base64 encoded text",
};

export default function Page() {
  return (
    <>
      <h1>Online Base64 Decoder</h1>
      <DecodeBase64 />
    </>
  );
}
