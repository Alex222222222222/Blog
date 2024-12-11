import type { MetadataRoute } from "next";
import getConfig from "@/lib/config";
import Config from "@/interfaces/config";
import fs from "fs";
import Post from "@/interfaces/post";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = getConfig();
  const sitemap = await generateSitemap(config);

  return sitemap;
}

const otherPages = [
  {
    url: "/",
    lastmod: new Date().toISOString(),
  },
  {
    url: "/tags",
    lastmod: new Date().toISOString(),
  },
  {
    url: "/categories",
    lastmod: new Date().toISOString(),
  },
  {
    url: "/tools",
    lastmod: new Date().toISOString(),
  },
  {
    url: "/tools/base64/encode",
    lastmod: new Date().toISOString(),
  },
  {
    url: "/tools/base64/decode",
    lastmod: new Date().toISOString(),
  },
  {
    url: "/tools/base64/encode",
    lastmod: new Date().toISOString(),
  },
  {
    url: "tools/qrcode/generator",
    lastmod: new Date().toISOString(),
  },
  {
    url: "tools/qrcode/reader",
    lastmod: new Date().toISOString(),
  },
  {
    url: "tools/stable_diffusion",
    lastmod: new Date().toISOString(),
  },
  {
    url: "tools/pdf2pic",
    lastmod: new Date().toISOString(),
  },
  {
    url: "tools/password_gen",
    lastmod: new Date().toISOString(),
  },
];

const generateSitemap = async (
  config: Config
): Promise<MetadataRoute.Sitemap> => {
  const postsJson = fs.readFileSync(".build_cache/res/allPosts.json", "utf-8");
  const posts: Post[] = JSON.parse(postsJson.toString());

  let baseUrls = config.sitemapBaseUrl;
  if (!baseUrls) {
    baseUrls = [config.baseUrl];
  }
  if (!baseUrls.includes(config.baseUrl)) {
    baseUrls.push(config.baseUrl);
  }

  const sitemap: MetadataRoute.Sitemap = [];
  baseUrls.forEach((baseUrl) => {
    posts.forEach((post) => {
      const url = new URL(`/posts/${post.filename}`, baseUrl).toString();
      sitemap.push({
        url,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });

    otherPages.forEach((page) => {
      const url = new URL(page.url, baseUrl).toString();
      sitemap.push({
        url,
        lastModified: page.lastmod,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });
  });

  return sitemap;
};
