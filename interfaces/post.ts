interface Post {
  title: string;
  filename: string;
  date: string;
  last_modified: string;
  categories: string[];
  tags: string[];
  description: string;
  toc: boolean;
  // read_time in minutes
  read_time: number;
  html: string;
  content: string;
}

export default Post;
