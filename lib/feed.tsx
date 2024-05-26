import { PostContentReal } from "@/components/post";
import Config from "@/interfaces/config";
import Post from "@/interfaces/post";
import { renderToString } from "react-dom/server";
import RSS from "rss";
import concatenateUrls from "./url";

const generateFeed = async (posts: Post[], config: Config) => {
  const feed = new RSS({
    title: config.pageTitle,
    description: "The latest posts from my blog",
    feed_url: concatenateUrls(config.baseUrl, "/rss"),
    site_url: config.baseUrl,
  });

  posts.forEach((post) => {
    const description = renderToString(<PostContentReal post={post} />);

    feed.item({
      title: post.title,
      description: description,
      url: concatenateUrls(
        concatenateUrls(config.baseUrl, "/posts/"),
        encodeURI(post.filename)
      ),
      date: post.date,
      categories: post.categories,
      author: config.author,
    });
  });

  return feed.xml();
};

export default generateFeed;
