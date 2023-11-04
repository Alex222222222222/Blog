import Layout from "@/components/layout";
import Config from "@/interfaces/config";
import getConfig from "@/lib/config";
import Link from "next/link";

interface IntroPageProps {
  config: Config;
}

const IntroPage: React.FC<IntroPageProps> = ({ config }) => {
  return (
    <Layout config={config}>
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
      {
        // TODO qrcode generator
        // TODO qrcode reader
        // TODO add inch to cm
        // TODO add cm to inch
        // TODO add fahrenheit to celsius
        // TODO add celsius to fahrenheit
        // TODO url encode
        // TODO url decode
        // TODO regex tester
        // TODO base32 encode/decode
      }
    </Layout>
  );
};

export const getStaticProps = async () => {
  const config = getConfig();

  return {
    props: {
      config,
    },
  };
};

export default IntroPage;
