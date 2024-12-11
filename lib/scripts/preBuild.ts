import fs from "fs";
import { get_all_posts } from "@/lib/markdown_file_meta";

export default async function preBuild() {
  fs.mkdirSync(".build_cache/res/", { recursive: true });

  const posts = await get_all_posts();
  fs.writeFileSync(".build_cache/res/allPosts.json", JSON.stringify(posts));

  // TODO RSS feed
}

// run preBuild
preBuild();
