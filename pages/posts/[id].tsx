// pages/posts/[id].tsx
import "@/styles/post.css";
import "@/styles/globals.css";
import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import Post from "@/interfaces/post";
import { get_markdown_data } from "@/lib/markdown_file_meta";
import Layout from "@/components/layout";
import Config from "@/interfaces/config";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles

interface PostProps {
  post: Post;
  config: Config;
}

const PostPage: React.FC<PostProps> = ({ post, config }) => {
  const remarkPlugins = post.toc
    ? [remarkGfm, remarkToc, remarkMath]
    : [remarkGfm, remarkMath];

    const content = post.toc ? `## Contents\n\n${post.content}` : post.content;

  return (
    <Layout config={config}>
      <div className="post-content">
        <h1>{post.title}</h1>
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

  const config = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "config.json"), "utf8")
  );

  return {
    props: {
      post,
      config,
    },
  };
};
