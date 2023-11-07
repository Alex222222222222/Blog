// pages/posts/[id].tsx
import styles from "@/components/post.module.css";
import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import Post from "@/interfaces/post";
import { get_markdown_data } from "@/lib/markdown_file_meta";
import Layout from "@/components/layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import Head from "next/head";

interface PostProps {
  post: Post;
}

const PostPage: React.FC<PostProps> = ({ post }) => {
  const remarkPlugins = post.toc
    ? [remarkGfm, remarkToc, remarkMath]
    : [remarkGfm, remarkMath];

  const content = post.toc ? `## Contents\n\n${post.content}` : post.content;

  return (
    <Layout>
      {
        // if the post has a description, add it to the head
        post.description && (
          <Head>
            <meta name="description" content={post.description} />
          </Head>
        )
      }
      <div className={styles.post_content}>
        <h1>{post.title}</h1>
        Date: {post.date}
        <br />
        Last Updated: {post.last_modified}
        <br />
        Categories:{" "}
        {post.categories.map((category, index) => (
          <span key={index}>
            <a href={`/categories/${category.toLowerCase()}`}>{category}</a>
            {index !== post.categories.length - 1 ? ", " : ""}
          </span>
        ))}
        <br />
        Tags:{" "}
        {post.tags.map((tag, index) => (
          <span key={index}>
            <a href={`/tags/${tag.toLowerCase()}`}>{tag}</a>
            {index !== post.tags.length - 1 ? ", " : ""}
          </span>
        ))}
        <br />
        Read Time: {post.read_time} minutes
        <br />
        <ReactMarkdown
          remarkPlugins={remarkPlugins}
          rehypePlugins={[rehypeKatex]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </Layout>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: { id: filename },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const { id } = context.params as { id: string };
  const post = get_markdown_data(id);

  return {
    props: {
      post,
    },
  };
};

// TODO tools page
