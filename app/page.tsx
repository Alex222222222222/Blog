// pages/index.tsx

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
    <div>Home</div>
  );
};
