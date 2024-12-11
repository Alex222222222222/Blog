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
