// pages/posts/[id].tsx
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { get_posts_paths } from "@/lib/markdown_file_meta";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PostProps {
  id: string;
}

const PostPage: React.FC<PostProps> = ({ id }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/posts/${id}`);
  });

  return <div>Redirecting...</div>;
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO add these to sitemaps
  let paths: { params: { id: string } }[] = [];

  get_posts_paths().forEach((filename) => {
    // remove the .md extension if it exists
    const id = filename.replace(/\.md$/, "");
    paths.push({
      params: { id: id.toLowerCase() },
    });
    paths.push({
      params: { id: filename.toLowerCase() },
    });
  });

  const path_set = new Set(paths);

  const paths_new = Array.from(path_set).map((path) => {
    return {
      params: path.params,
    };
  });

  return {
    paths: paths_new,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  const { id } = context.params as { id: string };
  const id_lowercase = id.toLowerCase();
  let paths = get_posts_paths();
  for (let i = 0; i < paths.length; i++) {
    const filename = paths[i];
    const f = filename.replace(/\.md$/, "");
    const f_lowercase = f.toLowerCase();
    if (id_lowercase === f_lowercase) {
      return {
        props: {
          filename,
        },
      };
    } else if (filename.toLowerCase() === id_lowercase) {
      return {
        props: {
          id: filename,
        },
      };
    }
  }

  return {
    props: {
      id,
    },
  };
};

// TODO tools page
