// pages/posts/[id].tsx
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { get_posts_paths } from "@/lib/markdown_file_meta";
import { permanentRedirect } from "next/navigation";
import { useEffect } from "react";

interface PostProps {
  id: string;
}

const PostPage: React.FC<PostProps> = ({ id }) => {
  useEffect(() => {
    permanentRedirect(`/posts/${id}`);
  });

  return <div>Redirecting...</div>;
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = get_posts_paths().map((filename) => ({
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

  return {
    props: {
      id,
    },
  };
};

// TODO tools page
