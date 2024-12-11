"use client";

import Layout from "@/components/layout";
import PostList from "@/components/postList";
import Post from "@/interfaces/post";
import { get_all_posts } from "@/lib/markdown_file_meta";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // get all posts from /postList
  useEffect(() => {
    fetch("/postList")
      .then((res) => res.json())
      .then((data: Post[]) => {
        setAllPosts(data);
      });
  }, []);

  // filter posts by search term by fuse.js
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPosts(allPosts);
      return;
    } else {
      const options = {
        keys: ["title", "content", "categories", "tags", "description"],
      };
      const fuse = new Fuse(allPosts, options);
      const result = fuse.search(searchTerm);
      const res = result.map((r) => r.item);
      setFilteredPosts(res);
    }
  }, [searchTerm, allPosts]);

  return (
    <>
      <textarea
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter text to search"
        className="w-full border-2 border-gray-300"
      />
      {filteredPosts.map((post: Post) => (
        <div key={"post" + post.title} className="flex">
          <a className="mr-5">{post.date}</a>
          <Link href={`/posts/${post.filename}`} className="underline">
            {post.title}
          </Link>
        </div>
      ))}
    </>
  );
}
