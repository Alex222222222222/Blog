import Config from "@/interfaces/config";
import Post from "@/interfaces/post";
import concatenateUrls from "./url";

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
];

const generateSitemap = async (posts: Post[], config: Config) => {
  let baseUrls = config.sitemapBaseUrl;
  if (!baseUrls) {
    baseUrls = [config.baseUrl];
  }
  if (!baseUrls.includes(config.baseUrl)) {
    baseUrls.push(config.baseUrl);
  }

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  baseUrls.forEach((baseUrl) => {
    posts.forEach((post) => {
      const url = concatenateUrls(baseUrl, `/posts/${post.filename}`);
      sitemap += `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date(post.date).toISOString()}</lastmod>
        </url>`;
    });

    otherPages.forEach((page) => {
      const url = concatenateUrls(baseUrl, page.url);
      sitemap += `
        <url>
          <loc>${url}</loc>
          <lastmod>${page.lastmod}</lastmod>
        </url>`;
    });
  });
  sitemap += `</urlset>`;

  return sitemap;
};

export default generateSitemap;
