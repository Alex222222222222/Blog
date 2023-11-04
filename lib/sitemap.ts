import Config from "@/interfaces/config";
import Post from "@/interfaces/post";

const generateSitemap = async (posts: Post[], config: Config) => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  posts.forEach((post) => {
    sitemap += `
        <url>
          <loc>${config.baseUrl}/posts/${post.filename}</loc>
          <lastmod>${new Date(post.date).toISOString()}</lastmod>
        </url>`;
  });

  sitemap += `</urlset>`;

  return sitemap;
};

export default generateSitemap;
