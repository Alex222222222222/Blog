import type { MetadataRoute } from "next";
import config from "@/config.json";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", config.baseUrl).toString(),
  };
}
