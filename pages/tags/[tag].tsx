import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { get_all_tags, get_empty_posts } from "@/lib/markdown_file_meta";
import Post from "@/interfaces/post";
import React from "react";
import PostList from "@/components/postList";
import Layout from "@/components/layout";

interface CategoryProps {
  posts: Post[];
  tag: string;
}

// Fetch data at build time
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: get_all_tags().map((tag) => ({
      params: { tag: tag as string },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const { tag } = context.params as { tag: string };

  return {
    props: {
      posts: get_empty_posts(),
      tag,
    },
  };
};

const CategoryPage: React.FC<CategoryProps> = ({ posts, tag }) => {
  return (
    <Layout>
      <h1>Posts in tag: {tag}</h1>
      <div>
        {
          <PostList
            posts={posts}
            search=""
            categories={[]}
            tags={[tag as string]}
          />
        }
      </div>
    </Layout>
  );
};

export default CategoryPage;
