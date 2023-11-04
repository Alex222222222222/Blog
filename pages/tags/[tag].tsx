import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { get_markdown_data } from "@/lib/markdown_file_meta";
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
  // get all posts
  const files = fs.readdirSync(path.join("posts"));
  const posts: (Post | null)[] = files.map((filename) => {
    return get_markdown_data(filename);
  });
  // filter out null posts
  const filteredPosts = posts.filter((post) => post !== null);
  const tags = filteredPosts.map((post) => post?.tags).flat();
  // filter out null categories
  const filteredTags = tags.filter((tag) => tag !== null);
  const tagsWithNull = filteredTags.map((tag) => tag!.toLowerCase());

  // Remove duplicates
  let uniqueTags: String[] = [];
  for (let i = 0; i < tagsWithNull.length; i++) {
    if (!uniqueTags.includes(tagsWithNull[i])) {
      uniqueTags.push(tagsWithNull[i]);
    }
  }

  return {
    paths: uniqueTags.map((tag) => ({
      params: { tag: tag as string },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const { tag } = context.params as { tag: string };

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

  return {
    props: {
      posts: posts.filter((post) => post !== null),
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
