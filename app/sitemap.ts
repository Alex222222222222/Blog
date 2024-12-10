import type { MetadataRoute } from "next";
import generateSitemap from "@/lib/sitemap";
import { get_all_posts } from "@/lib/markdown_file_meta";
import getConfig from "@/lib/config";

export const dynamic = "force-static";

/**
 * // TODO
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await get_all_posts();
  const config = getConfig();
  const sitemap = await generateSitemap(posts, config);

  // TODO check whether it can be both accessed at /sitemap.xml and /sitemap
  // fs.writeFileSync("public/sitemap.xml", sitemap);
  // fs.writeFileSync("public/sitemap", sitemap);

  return sitemap;
}
  */

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://acme.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://acme.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://acme.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
