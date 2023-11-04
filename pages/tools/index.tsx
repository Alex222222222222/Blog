import Layout from "@/components/layout";
import Config from "@/interfaces/config";
import getConfig from "@/lib/config";

interface IntroPageProps {
  config: Config;
}

const IntroPage: React.FC<IntroPageProps> = ({ config }) => {
  return (
    <Layout config={config}>
      This is some tools on the site.
      <br />
      All the tools are run in the browser, so no data is sent to the server.
      <br />
      Encode and Decode:
      <ul
        className="ml-5"
      >
        <li>
          <a href="/tools/base64/encode"
            className="underline"
          >Base64 Encode</a>
        </li>
      </ul>
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
