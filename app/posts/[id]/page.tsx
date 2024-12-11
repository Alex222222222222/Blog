import Post from "@/interfaces/post";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import PostPageContent from "@/components/post";
import fs from "fs";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const params: {
    id: string;
  }[] = [];

  const postsJson = fs.readFileSync(".build_cache/res/allPosts.json", "utf-8");
  const posts: Post[] = JSON.parse(postsJson.toString());

  posts.forEach((post) => {
    params.push({ id: post.filename });
  });

  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idN = decodeURIComponent(id);

  const postsJson = fs.readFileSync(".build_cache/res/allPosts.json", "utf-8");
  const posts: Post[] = JSON.parse(postsJson.toString());

  let post;
  let previous_post;
  let next_post;
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].filename === idN) {
      post = posts[i];
      previous_post = i > 0 ? posts[i - 1].filename : null;
      next_post = i < posts.length - 1 ? posts[i + 1].filename : null;
      break;
    }
  }
  if (!post) {
    throw new Error("Post with id " + idN + " not found");
  }

  return (
    <PostPageContent
      post={post}
      previous_post={previous_post}
      next_post={next_post}
    />
  );
}
