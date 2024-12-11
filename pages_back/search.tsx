/**
import Layout from "@/components/layout";
import PostList from "@/components/postList";
import Post from "@/interfaces/post";
import { get_all_posts } from "@/lib/markdown_file_meta";
import React, { useState } from "react";

interface HomeProps {
  posts: Post[];
}

const SearchPage: React.FC<HomeProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout>
      <div>
        <textarea
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter text to search"
          className="w-full border-2 border-gray-300"
        />
        <PostList posts={posts} search={searchTerm} categories={[]} tags={[]} />
      </div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const posts = await get_all_posts();
  posts.forEach((post) => {
    post.html = "";
  })

  return {
    props: {
      posts: posts,
    },
  };
};

export default SearchPage;
*/