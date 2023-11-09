// pages/index.tsx
import fs from "fs";
import Layout from "@/components/layout";
import Post from "@/interfaces/post";
import {
  get_all_posts,
  get_empty_posts,
} from "@/lib/markdown_file_meta";
import PostList from "@/components/postList";
import HomeAbout from "@/components/homeAbout";
import SeparateLine from "@/components/hr";
import generateFeed from "@/lib/feed";
import generateSitemap from "@/lib/sitemap";
import getConfig from "@/lib/config";

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
  const posts = get_all_posts();

  const config = getConfig();

  const rss_feed = await generateFeed(posts, config);
  fs.writeFileSync("public/rss.xml", rss_feed);
  fs.writeFileSync("public/index.xml", rss_feed);

  const sitemap = await generateSitemap(posts, config);
  fs.writeFileSync("public/sitemap.xml", sitemap);

  // TODO add comments

  return {
    props: {
      posts: get_empty_posts(),
    },
  };
};
