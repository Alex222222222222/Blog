import Post from "@/interfaces/post";
import Fuse from "fuse.js";
import Link from "next/link";

interface PostListProps {
  categories: string[];
  tags: string[];
  search: string;
  posts: Post[];
}

// return a list of posts
// that match the fuzzy search criteria with content and title
// that the post categories match the categories
// that the post tags match the tags
// order by date descending
const PostList: React.FC<PostListProps> = ({
  posts,
  search,
  categories,
  tags,
}) => {
  const options = {
    keys: ["title", "content"],
    includeScore: true,
  };

  let filteredPosts = posts;

  if (search !== "") {
    const fuse = new Fuse(posts, options);
    const searchResults = fuse.search(search);

    filteredPosts = searchResults.map((result) => result.item);
  }
  if (categories.length != 0) {
    filteredPosts = filteredPosts.filter((post) =>
      categories.some((category) => {
        for (let i = 0; i < post.categories.length; i++) {
          if (post.categories[i].toLowerCase() == category.toLowerCase()) {
            return true;
          }
        }
      })
    );
  }
  if (tags.length != 0) {
    filteredPosts = filteredPosts.filter((post) =>
      tags.some((tag) => {
        for (let i = 0; i < post.tags.length; i++) {
          if (post.tags[i].toLowerCase() == tag.toLowerCase()) {
            return true;
          }
        }
      })
    );
  }

  return (
    <div>
      {filteredPosts.map((post) => (
        <div key={"post" + post.title} className="flex">
          <a className="mr-5">{post.date}</a>
          <Link href={`/posts/${post.filename}`} className="underline">
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );

  // TODO pagination
};

export default PostList;
