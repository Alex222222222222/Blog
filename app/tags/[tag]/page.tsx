import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { get_all_tags, get_empty_posts } from "@/lib/markdown_file_meta";
import Post from "@/interfaces/post";
import React from "react";
import PostList from "@/components/postList";
import Layout from "@/components/layout";
import fs from "fs";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const params: {
    tag: string;
  }[] = [];

  const postsJson = fs.readFileSync(".build_cache/res/allPosts.json", "utf-8");
  const posts: Post[] = JSON.parse(postsJson.toString());
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags.add(tag);
    });
  });

  tags.forEach((tag) => {
    params.push({ tag: tag });
  });

  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const tagN = decodeURIComponent(tag);

  return (
    <>
      <h1>Posts in tag: {tagN}</h1>
      <PostList tag={tagN} />
    </>
  );
}
