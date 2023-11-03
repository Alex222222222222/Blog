interface Post {
  title: string;
  filename: string;
  date: string;
  last_modified: string;
  categories: string[];
  tags: string[];
  description: string;
  content: string;
  toc: boolean;
}

export default Post;
