import fs from "fs";
import generateFeed from "@/lib/feed";
import getConfig from "@/lib/config";
import { get_all_posts } from "@/lib/markdown_file_meta";
import { buildWordsJson } from "@/lib/buildWordsJson";

export default async function preBuild() {
  fs.mkdirSync(".build_cache/res/", { recursive: true });

  const posts = await get_all_posts();
  fs.writeFileSync(".build_cache/res/allPosts.json", JSON.stringify(posts));

  /**
  const config = getConfig();

  const rss_feed = await generateFeed(posts, config);
  fs.writeFileSync("public/rss.xml", rss_feed);
  fs.writeFileSync("public/feed.xml", rss_feed);
  fs.writeFileSync("public/rss", rss_feed);
  fs.writeFileSync("public/feed", rss_feed);

  buildWordsJson();
  */
}

// run preBuild
preBuild();
