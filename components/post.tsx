// pages/posts/[id].tsx
import styles from "@/components/post.module.css";
import Post from "@/interfaces/post";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import Head from "next/head";
import Link from "next/link";

interface PostProps {
  post: Post;
  previous_post: string | null;
  next_post: string | null;
}

const PostPageContent: React.FC<PostProps> = ({
  post,
  previous_post,
  next_post,
}) => {
  const remarkPlugins = post.toc
    ? [remarkGfm, remarkToc, remarkMath]
    : [remarkGfm, remarkMath];

  const content = post.toc ? `## Contents\n\n${post.content}` : post.content;

  return (
    <>
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
      {
        // TODO Add link to next and previous posts if they exist
      }
      <div className="flex justify-between">
        {previous_post ? (
          <Link href={`/posts/${previous_post}`} className="underline">
            <span className="text-2xl">&larr;</span>
            Previous Post
          </Link>
        ) : (
          <div></div>
        )}
        {
          // styles underline and a left arrow before the link
          // and align the link to the left
          next_post ? (
            <Link href={`/posts/${next_post}`} className="underline">
              Next Post
              <span className="text-2xl">&rarr;</span>
            </Link>
          ) : (
            <div></div>
          )
        }
      </div>
    </>
  );
};

export default PostPageContent;
