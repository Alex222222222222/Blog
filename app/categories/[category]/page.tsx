import Post from "@/interfaces/post";
import PostList from "@/components/postList";
import fs from "fs";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const params: {
    category: string;
  }[] = [];

  const postsJson = fs.readFileSync(".build_cache/res/allPosts.json", "utf-8");
  const posts: Post[] = JSON.parse(postsJson.toString());
  const categories = new Set<string>();
  posts.forEach((post) => {
    post.categories.forEach((category) => {
      categories.add(category);
    });
  });

  categories.forEach((category) => {
    params.push({ category: category });
  });

  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryN = decodeURIComponent(category);

  return (
    <>
      <h1>Posts in category: {categoryN}</h1>
      <PostList category={categoryN} />
    </>
  );
}
