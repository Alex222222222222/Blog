import fs from "fs";
import Post from "@/interfaces/post";

export const dynamic = "force-static";

export default async function Page() {
  const postsJson = fs.readFileSync(".build_cache/res/allPosts.json", "utf-8");
  const posts: Post[] = JSON.parse(postsJson.toString());
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags.add(tag);
    });
  });
  const tagsArray = Array.from(tags);

  return (
    <>
      <h1>Tags:</h1>
      <ul className="grid grid-cols-2 ml-5 underline">
        {tagsArray.map((tag, index) => (
          <li key={index}>
            <a href={`/tags/${encodeURIComponent(tag)}`}>{tag}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
