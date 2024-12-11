import { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Tools",
  description: "Tools on the site",
};

export default async function Page() {
  return (
    <>
      Here is some tools on the site.
      <br />
      All the tools are run in the browser, so no data is sent to the server.
      <br />
      Encode and Decode:
      <ul className="ml-5">
        <li>
          <Link href="/tools/base64/encode" className="underline">
            Base64 Encode
          </Link>
        </li>
        <li>
          <Link href="/tools/base64/decode" className="underline">
            Base64 Decode
          </Link>
        </li>
      </ul>
      <br />
      QRCode:
      <ul className="ml-5">
        <li>
          <Link href="/tools/qrcode/generator" className="underline">
            QRCode Generator
          </Link>
        </li>
        <li>
          <Link href="/tools/qrcode/reader" className="underline">
            QRCode Reader
          </Link>
        </li>
      </ul>
      <br />
      Stable Diffusion:
      <ul className="ml-5">
        <li>
          <Link href="/tools/stable_diffusion" className="underline">
            Stable Diffusion
          </Link>
        </li>
      </ul>
      <br />
      PDF2Pic:
      <ul className="ml-5">
        <li>
          <Link href="/tools/pdf2pic" className="underline">
            Convert PDF to Image
          </Link>
        </li>
      </ul>
      <br />
      Password Generator:
      <ul className="ml-5">
        <li>
          <Link href="/tools/password_gen" className="underline">
            Password Generator
          </Link>
        </li>
      </ul>
      {
        // TODO add inch to cm
        // TODO add cm to inch
        // TODO add fahrenheit to celsius
        // TODO add celsius to fahrenheit
        // TODO url encode
        // TODO url decode
        // TODO regex tester
        // TODO base32 encode/decode
      }
    </>
  );
}
