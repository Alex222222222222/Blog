import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { get_all_categories, get_empty_posts } from "@/lib/markdown_file_meta";
import Post from "@/interfaces/post";
import React from "react";
import PostList from "@/components/postList";
import Layout from "@/components/layout";
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
    params.push({ category });
  });

  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return (
    <>
      <h1>Posts in category: {category}</h1>
      <PostList category={category} />
    </>
  );
}
