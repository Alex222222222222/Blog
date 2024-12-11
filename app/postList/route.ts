/**
 * @api {get} /postList/:category/:tag
 *   Get a list of posts with the specified category and tag
 *   use "e" to represent all categories or tags
 *   all tags and categories are in lowercase
 */

import Post from "@/interfaces/post";
import fs from "fs";

export const dynamic = "force-static";

export async function GET(_request: Request) {
  const postsJson = fs.readFileSync(".build_cache/res/allPosts.json", "utf-8");
  const posts: Post[] = JSON.parse(postsJson.toString());

  // set the content and html of the posts to empty
  for (const post of posts) {
    post.html = "";
  }

  return Response.json(posts);
}
