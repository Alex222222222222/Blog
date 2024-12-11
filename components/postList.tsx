import Post from "@/interfaces/post";
import Link from "next/link";
import fs from "fs";
import React from "react";

interface PostListProps {
  category?: string;
  tag?: string;
}

// return a list of posts
// that match the fuzzy search criteria with content and title
// that the post categories match the categories
// that the post tags match the tags
// order by date descending
const PostList: React.FC<PostListProps> = ({ category, tag }) => {
  const postsJson = fs.readFileSync(".build_cache/res/allPosts.json", "utf-8");
  const allPosts = JSON.parse(postsJson.toString());

  const categoryLower = category ? category.toLowerCase() : undefined;
  const tagLower = tag ? tag.toLowerCase() : undefined;

  const posts = allPosts.filter((post: Post) => {
    const categories = post.categories.map((category) =>
      category.toLowerCase()
    );
    if (categoryLower && !categories.includes(categoryLower)) {
      return false;
    }

    const tags = post.tags.map((tag) => tag.toLowerCase());
    if (tagLower && !tags.includes(tagLower)) {
      return false;
    }
    return true;
  });

  return (
    <div>
      {posts.map((post: Post) => (
        <div key={"post" + post.title} className="flex">
          <a className="mr-5">{post.date}</a>
          <Link href={`/posts/${post.filename}`} className="underline">
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );

  // TODO pagination
};

export default PostList;
