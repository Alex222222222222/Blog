import Config from "@/interfaces/config";
import Post from "@/interfaces/post";
import concatenateUrls from "./url";
import { MetadataRoute } from "next";

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
  posts: Post[],
  config: Config
): Promise<MetadataRoute.Sitemap> => {
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
      const url = concatenateUrls(baseUrl, `/posts/${post.filename}`);
      sitemap.push({
        url,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });

    otherPages.forEach((page) => {
      const url = concatenateUrls(baseUrl, page.url);
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

export default generateSitemap;
