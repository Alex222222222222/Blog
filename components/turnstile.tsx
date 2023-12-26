import Head from "next/head";

interface TurnstileProps {
  callback: (cf_turnstile_response: string) => void;
}

const Turnstile: React.FC<TurnstileProps> = ({ callback }) => {
  return (
    <>
      <Head>
        <script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        ></script>
      </Head>
      <div
        className="cf-turnstile m-2"
        data-sitekey={process.env.TURNSTILE_SITE_KEY}
        data-callback={callback}
      ></div>
    </>
  );
};

export default Turnstile;
