// pages/posts/[id].tsx
import styles from "@/components/post.module.css";
import Post from "@/interfaces/post";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import Head from "next/head";
import Link from "next/link";
import React from "react";

interface PostProps {
  post: Post;
  previous_post: string | null | undefined;
  next_post: string | null | undefined;
}

interface PostContentProps {
  post: Post;
}

const PostPageContent: React.FC<PostProps> = ({
  post,
  previous_post,
  next_post,
}) => {
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
        <br />
        <PostContentReal post={post} />
      </div>
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

export const PostContentReal: React.FC<PostContentProps> = ({ post }) => {
  function createMarkup() {
    return { __html: post.html };
  }

  return <div dangerouslySetInnerHTML={createMarkup()}></div>;
};

export default PostPageContent;
