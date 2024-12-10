import type { MetadataRoute } from "next";
import config from "@/config.json";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: config.pageTitle,
    short_name: config.pageTitle,
    description: config.pageDescription,
    start_url: "/",
    display: "standalone",
    background_color: '#FEFCE8',
    theme_color: '#FEFCE8',
    icons: [
      {
        src: "/static/icons/1024.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
