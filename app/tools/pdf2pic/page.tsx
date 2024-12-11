import SeparateLine from "@/components/hr";
import Head from "next/head";
import { Metadata } from "next";
import PDF2Pic from "@/components/tools/pdf2pic";

export const metadata: Metadata = {
  title: "Convert PDF to Image",
  description:
    "Convert PDF to Image. And will only use your browser to do the conversion, which means there will be no data sent to the server.",
};

export default async function Page() {
  return (
    <>
      <Head>
        <title>Convert PDF to Image</title>
        <meta
          name="description"
          content="Convert PDF to Image. And will only use your browser to do the conversion, which means there will be no data sent to the server."
        />
      </Head>
      <h1>Convert PDF to Image</h1>
      This tool converts PDF to image. And will only use your browser to do the
      conversion, which means there will be no data sent to the server.
      <SeparateLine />
      Please select a PDF file to convert to an image.
      <br />
      <PDF2Pic />
    </>
  );
}
