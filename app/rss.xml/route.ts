import Post from "@/interfaces/post";
import getConfig from "@/lib/config";
import generateFeed from "@/lib/feed";
import fs from "fs";

export const dynamic = "force-static";

export async function GET() {
  const config = getConfig();

  const postsJson = fs.readFileSync(".build_cache/res/allPosts.json", "utf-8");
  const posts: Post[] = JSON.parse(postsJson.toString());

  return new Response(await generateFeed(posts, config), {
    headers: { "Content-Type": "application/xml" },
  });
}
