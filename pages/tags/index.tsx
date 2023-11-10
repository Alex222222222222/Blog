import { get_all_tags } from "@/lib/markdown_file_meta";
import React from "react";
import Layout from "@/components/layout";

interface TagsHomeProps {
  tags: string[];
}

export async function getStaticProps() {
  // Return categories as props
  return {
    props: {
      tags: get_all_tags(),
    },
  };
}

const CategoriesPage: React.FC<TagsHomeProps> = ({ tags }) => (
  <Layout>
    <h1>Tags:</h1>
    <ul className="columns-2 ml-5">
      {tags.map((tag, index) => (
        <li key={index}>
          <a href={`/tags/${tag}`}>{tag}</a>
        </li>
      ))}
    </ul>
  </Layout>
);

export default CategoriesPage;
