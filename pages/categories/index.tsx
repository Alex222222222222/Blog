import fs from "fs";
import path from "path";
import Post from "@/interfaces/post";
import {
  get_all_categories,
  get_markdown_data,
} from "@/lib/markdown_file_meta";
import React from "react";
import Layout from "@/components/layout";

interface CategoriesHomeProps {
  categories: string[];
}

export async function getStaticProps() {
  // Return categories as props
  return {
    props: {
      categories: get_all_categories(),
    },
  };
}

const CategoriesPage: React.FC<CategoriesHomeProps> = ({ categories }) => (
  <Layout>
    <h1>Categories:</h1>
    <ul className="grid grid-cols-2 ml-5 underline">
      {categories.map((category, index) => (
        <li key={index}>
          <a href={`/categories/${category}`}>{category}</a>
        </li>
      ))}
    </ul>
  </Layout>
);

export default CategoriesPage;
