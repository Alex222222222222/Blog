
import fs from "fs";
import path from "path";
import Post from "@/interfaces/post";
import { get_markdown_data } from "@/lib/markdown_file_meta";
import React from "react";
import Config from "@/interfaces/config";
import Layout from "@/components/layout";
import styled from "styled-components";

const TagList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  list-style: none;
  margin-left: 20px;
  color: #000;
  text-decoration: underline;
`;

interface TagsHomeProps {
  tags: string[];
  config: Config;
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
  const tagsWithNull = filteredTags.map((tag) => (tag!).toLowerCase());

  // Remove duplicates
  let uniqueTags: String[] = [];
  for (let i = 0; i < tagsWithNull.length; i++) {
    if (!uniqueTags.includes(tagsWithNull[i])) {
      uniqueTags.push(tagsWithNull[i]);
    }
  }

  const config = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "config.json"), "utf8")
  );

  // Return categories as props
  return {
    props: {
      tags: uniqueTags,
      config,
    },
  };
}

const CategoriesPage: React.FC<TagsHomeProps> = ({ tags, config }) => (
  <Layout config={config}>
    <h1>Tags:</h1>
    <TagList>
      {tags.map((tag, index) => (
        <li key={index}>
          <a href={`/tags/${tag}`}>{tag}</a>
        </li>
      ))}
    </TagList>
  </Layout>
);

export default CategoriesPage;
