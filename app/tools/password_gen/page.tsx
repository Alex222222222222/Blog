import SeparateLine from "@/components/hr";
import Head from "next/head";
import { Metadata } from "next";
import PasswordGen from "@/components/tools/passwordGen";

export const metadata: Metadata = {
  title: "Online Password Generator",
  description: "This tool could generate a random password for you.",
};

export default function Page() {
  return (
    <>
      <Head>
        <title>Online Password Generator</title>
        <meta
          name="description"
          content="This tool could generate a random password for you."
        />
      </Head>
      <h1>Online Password Generator</h1>
      <p>This tool could generate a random password for you.</p>
      <SeparateLine />
      <PasswordGen />
    </>
  );
}
