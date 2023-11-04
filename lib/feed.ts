import Config from "@/interfaces/config";
import Post from "@/interfaces/post";
import RSS from "rss";

const generateFeed = async (posts: Post[], config: Config) => {
  const feed = new RSS({
    title: config.pageTitle,
    description: "The latest posts from my blog",
    feed_url: `${config.baseUrl}/rss`,
    site_url: config.baseUrl,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${config.baseUrl}/posts/${post.filename}`,
      date: post.date,
    });
  });

  return feed.xml();
};

export default generateFeed;
