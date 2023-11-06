import fs from "fs";
import path from "path";
import Post from "@/interfaces/post";
import { get_markdown_data } from "@/lib/markdown_file_meta";
import React from "react";
import Layout from "@/components/layout";

interface TagsHomeProps {
  tags: string[];
}

export async function getStaticProps() {
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

  // Return categories as props
  return {
    props: {
      tags: uniqueTags,
    },
  };
}

const CategoriesPage: React.FC<TagsHomeProps> = ({ tags }) => (
  <Layout>
    <h1>Tags:</h1>
    <ul className="grid grid-cols-2 ml-5 underline">
      {tags.map((tag, index) => (
        <li key={index}>
          <a href={`/tags/${tag}`}>{tag}</a>
        </li>
      ))}
    </ul>
  </Layout>
);

export default CategoriesPage;
