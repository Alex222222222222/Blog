import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  get_all_categories,
  get_empty_posts,
  get_markdown_data,
} from "@/lib/markdown_file_meta";
import Post from "@/interfaces/post";
import React from "react";
import PostList from "@/components/postList";
import Layout from "@/components/layout";

interface CategoryProps {
  posts: Post[];
  category: string;
}

// Fetch data at build time
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: get_all_categories().map((category) => ({
      params: { category: category as string },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const { category } = context.params as { category: string };

  return {
    props: {
      posts: get_empty_posts(),
      category,
    },
  };
};

const CategoryPage: React.FC<CategoryProps> = ({ posts, category }) => {
  return (
    <Layout>
      <h1>Posts in category: {category}</h1>
      <div>
        {
          <PostList
            posts={posts}
            search=""
            categories={[category as string]}
            tags={[]}
          />
        }
      </div>
    </Layout>
  );
};

export default CategoryPage;
