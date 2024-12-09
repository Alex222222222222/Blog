// pages/index.tsx
import Layout from "@/components/layout";
import Post from "@/interfaces/post";
import { get_empty_posts } from "@/lib/markdown_file_meta";
import PostList from "@/components/postList";
import HomeAbout from "@/components/homeAbout";
import SeparateLine from "@/components/hr";
import preBuild from "@/lib/scripts/preBuild";

interface HomeProps {
  posts: Post[];
}

const Home: React.FC<HomeProps> = ({ posts }) => {
  return (
    <Layout>
      <div>
        <HomeAbout />
      </div>
      <SeparateLine />
      <div>
        {<PostList posts={posts} search="" categories={[]} tags={[]} />}
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  await preBuild();

  // TODO add search whole site

  return {
    props: {
      posts: await get_empty_posts(),
    },
  };
};
