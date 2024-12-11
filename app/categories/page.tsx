import React from "react";
import fs from "fs";
import Post from "@/interfaces/post";

export const dynamic = "force-static";

export default async function Page() {
  const postsJson = fs.readFileSync(".build_cache/res/allPosts.json", "utf-8");
  const posts: Post[] = JSON.parse(postsJson.toString());
  const categories = new Set<string>();
  posts.forEach((post) => {
    post.categories.forEach((category) => {
      categories.add(category);
    });
  });
  const categoriesArray = Array.from(categories);

  return (
    <>
      <h1>Categories:</h1>
      <ul className="grid grid-cols-2 ml-5 underline">
        {categoriesArray.map((category, index) => (
          <li key={index}>
            <a href={`/categories/${encodeURIComponent(category)}`}>
              {category}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
