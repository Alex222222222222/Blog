import EncodeBase64 from "@/components/tools/base64/encode";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder",
  description: "Encode text to base64",
};

export default function Page() {
  return (
    <>
      <h1>Online Base64 Encoder</h1>
      <EncodeBase64 />
    </>
  );
}
