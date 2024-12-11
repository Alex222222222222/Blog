import React, { useState } from "react";
import Layout from "@/components/layout";
import getConfig from "@/lib/config";
import concatenateUrls from "@/lib/url";
import styles from "@/components/footbarTyping.module.css";
import Image from "next/image";
import Turnstile, { useTurnstile } from "react-turnstile";
import StableDiffusion from "@/components/tools/stableDiffusion";

import config from "@/config.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stable Diffusion XL",
  description: "Generate a stable diffusion image",
};

export default function Page() {
  return (
    <>
      <h1>Stable Diffusion XL</h1>
      <StableDiffusion site_base_url={config.baseUrl} />
    </>
  );
}
