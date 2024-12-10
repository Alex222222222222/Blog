"use client";

import Post from "@/interfaces/post";
import Fuse from "fuse.js";
import Link from "next/link";
import { useEffect, useState } from "react";
import path from "path";

interface PostListProps {
  category?: string;
  tag?: string;
  search?: string;
  emptyContent?: boolean;
}

// return a list of posts
// that match the fuzzy search criteria with content and title
// that the post categories match the categories
// that the post tags match the tags
// order by date descending
const PostList: React.FC<PostListProps> = ({
  search,
  category,
  tag,
  emptyContent,
}) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  // if all posts changed, update the filtered posts
  useEffect(() => {
    const options = {
      keys: ["title", "description", "content"],
      includeScore: true,
      isCaseSensitive: false,
    };

    if (search && search.length > 0) {
      const fuse = new Fuse(allPosts, options);
      const searchResults = fuse.search(search);

      setFilteredPosts(searchResults.map((result) => result.item));
    } else {
      setFilteredPosts(allPosts);
    }
  }, [allPosts]);

  // if the category or tag changes, update the filtered posts
  useEffect(() => {
    // get all posts from api
    const categoryN = category || "e";
    const tagN = tag || "e";
    const e = emptyContent === undefined ? "t" : emptyContent ? "t" : "f";
    fetch(path.join("/postList", categoryN, tagN, e))
      .then((response) => response.json())
      .then((data) => {
        setAllPosts(data);
      });
  }, [category, tag, emptyContent]);

  return (
    <div>
      {filteredPosts.map((post) => (
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
