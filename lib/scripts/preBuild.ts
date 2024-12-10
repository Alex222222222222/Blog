import fs from "fs";
import generateSitemap from "@/lib/sitemap";
import generateFeed from "@/lib/feed";
import getConfig from "@/lib/config";
import { get_all_posts } from "@/lib/markdown_file_meta";
import { buildWordsJson } from "@/lib/buildWordsJson";

export default async function preBuild() {
  const posts = await get_all_posts();
  const config = getConfig();

  const rss_feed = await generateFeed(posts, config);
  fs.writeFileSync("public/rss.xml", rss_feed);
  fs.writeFileSync("public/feed.xml", rss_feed);
  fs.writeFileSync("public/rss", rss_feed);
  fs.writeFileSync("public/feed", rss_feed);

  buildWordsJson();
}
