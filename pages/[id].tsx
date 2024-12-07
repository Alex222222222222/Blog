// pages/posts/[id].tsx
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import Post from "@/interfaces/post";
import {
  find_matching_paths_with_alias,
  get_markdown_data,
  get_posts_paths_with_alias,
  get_previous_and_next_posts,
} from "@/lib/markdown_file_meta";
import Layout from "@/components/layout";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import PostPageContent from "@/components/post";

interface PostProps {
  post: Post;
  previous_post: string | null;
  next_post: string | null;
}

const PostPage: React.FC<PostProps> = ({ post, previous_post, next_post }) => {
  return (
    <Layout>
      <PostPageContent
        post={post}
        previous_post={previous_post}
        next_post={next_post}
      />
    </Layout>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await get_posts_paths_with_alias();
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
  const path = await find_matching_paths_with_alias(id);
  if (!path) {
    return {
      notFound: true,
    };
  }
  const post = await get_markdown_data(path);
  if (post) {
    post.content = "";
  }

  const [previous_post, next_post] = await get_previous_and_next_posts(path);

  return {
    props: {
      post,
      previous_post,
      next_post,
    },
  };
};
