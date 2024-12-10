/**
 * @api {get} /postList/:category/:tag
 *   Get a list of posts with the specified category and tag
 *   use "e" to represent all categories or tags
 *   all tags and categories are in lowercase
 */

import Post from "@/interfaces/post";
import fs from "fs";

export async function generateStaticParams() {
  const postsJson = fs.readFileSync(".build_cache/res/allPosts.json", "utf-8");
  const posts = JSON.parse(postsJson.toString());
  const categories = new Set<string>();
  const tags = new Set<string>();
  categories.add("e");
  tags.add("e");

  for (const post of posts) {
    for (const category of post.categories) {
      categories.add(category.toLowerCase());
    }
    for (const tag of post.tags) {
      tags.add(tag.toLowerCase());
    }
  }

  const params = [];

  for (const category of categories) {
    for (const tag of tags) {
      params.push({ category: category, tag: tag, emptyContent: "t" });
      params.push({ category: category, tag: tag, emptyContent: "f" });
    }
  }

  return params;
}

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ category: string; tag: string; emptyContent: string }>;
  }
) {
  const postsJson = fs.readFileSync(".build_cache/res/allPosts.json", "utf-8");
  const allPosts = JSON.parse(postsJson.toString());

  const { category, tag, emptyContent } = await params;

  const posts = allPosts.filter((post: Post) => {
    const categories = post.categories.map((category) =>
      category.toLowerCase()
    );
    if (category != "e" && !categories.includes(category)) {
      return false;
    }

    const tags = post.tags.map((tag) => tag.toLowerCase());
    if (tag != "e" && !tags.includes(tag)) {
      return false;
    }
    return true;
  });

  // set the content and html of the posts to empty
  for (const post of posts) {
    if (emptyContent == "t") {
      post.content = "";
    }
    post.html = "";
  }

  return Response.json(posts);
}
