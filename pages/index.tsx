// pages/index.tsx
import fs from "fs";
import path from "path";
import Layout from "@/components/layout";
import Post from "@/interfaces/post";
import { get_markdown_data } from "@/lib/markdown_file_meta";
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
  const files = fs.readdirSync(path.join("posts"));
  const posts: (Post | null)[] = files.map((filename) => {
    return get_markdown_data(filename);
  });
  // set the content of posts to "",
  // as this is not needed for the home page
  posts.forEach((post) => {
    if (post) {
      post.content = "";
    }
  });
  const valid_posts = posts.filter((post) => post !== null) as Post[];

  const config = getConfig();

  const rss_feed = await generateFeed(valid_posts, config);
  fs.writeFileSync("public/rss.xml", rss_feed);
  fs.writeFileSync("public/index.xml", rss_feed);

  const sitemap = await generateSitemap(valid_posts, config);
  fs.writeFileSync("public/sitemap.xml", sitemap);

  // TODO add comments

  return {
    props: {
      posts: valid_posts,
    },
  };
};
