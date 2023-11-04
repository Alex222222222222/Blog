import fs from "fs";
import path from "path";
import Post from "@/interfaces/post";
import { get_markdown_data } from "@/lib/markdown_file_meta";
import React from "react";
import Layout from "@/components/layout";
import styled from "styled-components";

const CategoryList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  list-style: none;
  margin-left: 20px;
  color: #000;
  text-decoration: underline;
`;

interface CategoriesHomeProps {
  categories: string[];
}

export async function getStaticProps() {
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

  // Return categories as props
  return {
    props: {
      categories: uniqueCategories,
    },
  };
}

const CategoriesPage: React.FC<CategoriesHomeProps> = ({ categories }) => (
  <Layout>
    <h1>Categories:</h1>
    <CategoryList>
      {categories.map((category, index) => (
        <li key={index}>
          <a href={`/categories/${category}`}>{category}</a>
        </li>
      ))}
    </CategoryList>
  </Layout>
);

export default CategoriesPage;
