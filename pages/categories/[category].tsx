import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { get_markdown_data } from "@/lib/markdown_file_meta";
import Post from "@/interfaces/post";
import Config from "@/interfaces/config";
import React from "react";
import PostList from "@/components/postList";
import Layout from "@/components/layout";

interface CategoryProps {
  posts: Post[];
  config: Config;
  category: string;
}

// Fetch data at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // get all posts
  const files = fs.readdirSync(path.join("posts"));
  const posts: (Post | null)[] = files.map((filename) => {
    return get_markdown_data(filename);
  });
  // filter out null posts
  const filteredPosts = posts.filter((post) => post !== null);
  const categories = filteredPosts.map((post) => post?.categories).flat();
  // filter out null categories
  const filteredCategories = categories.filter((category) => category !== null);
  const categoriesWithNull = filteredCategories.map((category) =>
    category!.toLowerCase()
  );

  // Remove duplicates
  let uniqueCategories: String[] = [];
  for (let i = 0; i < categoriesWithNull.length; i++) {
    if (!uniqueCategories.includes(categoriesWithNull[i])) {
      uniqueCategories.push(categoriesWithNull[i]);
    }
  }

  return {
    paths: uniqueCategories.map((category) => ({
      params: { category: category as string },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const { category } = context.params as { category: string };

  const files = fs.readdirSync(path.join("posts"));
  const posts: (Post | null)[] = files.map((filename) => {
    return get_markdown_data(filename);
  });
  // set the content of posts to "",
  // as this is not needed for the home page
  posts.forEach((post) => {
    if (post) {
      post.content = "";
    }
  });

  const config = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "config.json"), "utf8")
  );

  return {
    props: {
      posts: posts.filter((post) => post !== null),
      category,
      config,
    },
  };
};

const CategoryPage: React.FC<CategoryProps> = ({ posts, category, config }) => {
  return (
    <Layout config={config}>
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
