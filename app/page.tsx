// app/page.tsx

import HomeAbout from "@/components/homeAbout";
import HomeCredits from "@/components/homeCredits";
import SeparateLine from "@/components/hr";
import PostList from "@/components/postList";

/**
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
*/

export default async function Page() {
  return (
    <>
      <HomeAbout />
      <SeparateLine />
      <PostList />
      <SeparateLine />
      <HomeCredits />
    </>
  );
}
