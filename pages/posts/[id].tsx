// pages/posts/[id].tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

interface Post {
  title: string;
  // Add other properties as needed
}

interface PostProps {
  post: Post;
}

const PostPage: React.FC<PostProps> = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      {/* Render other post properties as needed */}
    </div>
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

  // test filename to see if it's a dir
  // if it is, read the dir and get the index.md file or filename.md file
  // if it's not a dir, test if it's an md file
  // if it is, read the file
  // if it's not, redirect to 404

  const isDir = fs.lstatSync(path.join("posts", `${id}`)).isDirectory();
  if (isDir) {
    const dir = fs.readdirSync(path.join("posts", `${id}`));
    const mdFile = dir.find(
      (file) => file === "index.md" || file === `${id}.md`
    );
    if (mdFile) {
      const markdownWithMeta = fs.readFileSync(
        path.join("posts", `${id}`, mdFile),
        "utf-8"
      );
      const { data: frontmatter } = matter(markdownWithMeta);
      const post: Post = {
        title: frontmatter.title,
        // Add other properties as needed
      };
      return {
        props: {
          post,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
  }

  const isMdFile = id.endsWith(".md");
  if (!isMdFile) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const markdownWithMeta = fs.readFileSync(path.join("posts", id), "utf-8");

  const { data: frontmatter } = matter(markdownWithMeta);

  const post: Post = {
    title: frontmatter.title,
    // Add other properties as needed
  };

  return {
    props: {
      post,
    },
  };
};
