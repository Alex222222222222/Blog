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
      categories.some((category) => post.categories.includes(category))
    );
  }
  if (tags.length != 0) {
    filteredPosts = filteredPosts.filter((post) =>
      tags.some((tag) => post.tags.includes(tag))
    );
  }

  filteredPosts = filteredPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      {filteredPosts.map((post) => (
        <div
          key={"post" + post.title}
          style={{
            display: "flex",
            // justifyContent: "space-between",
            // alignItems: "center",
          }}
        >
          <a style={{ marginRight: "20px" }}>{post.date}</a>
          <Link href={`/posts/${post.filename}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
