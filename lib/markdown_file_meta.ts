// pages/index.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Post from "@/interfaces/post";

export function getLastModifiedDate(filePath: string): Date {
  const stats = fs.statSync(filePath);
  return stats.mtime;
}

export function get_date_from_filename(filename: string): Date {
  const date_split = filename.split("-");
  const year = date_split[0];
  const month = date_split[1];
  const day = date_split[2];

  return new Date(`${year}-${month}-${day}`);
}

export function get_markdown_file(filename: string): [string | null, string] {
  const isDir = fs.lstatSync(path.join("posts", filename)).isDirectory();
  if (isDir) {
    const dir = fs.readdirSync(path.join("posts", filename));
    const mdFile = dir.find(
      (file) => file === "index.md" || file === `${filename}.md`
    );
    if (mdFile) {
      // get the last modified date
      const last_modified = getLastModifiedDate(
        path.join("posts", filename, mdFile)
      );

      return [
        fs.readFileSync(path.join("posts", filename, mdFile), "utf-8"),
        last_modified.toISOString(),
      ];
    }
    return [null, ""];
  }

  const isMdFile = filename.endsWith(".md");
  if (!isMdFile) {
    return [null, ""];
  }

  // get the last modified date
  const last_modified = getLastModifiedDate(path.join("posts", filename));

  return [
    fs.readFileSync(path.join("posts", filename), "utf-8"),
    last_modified.toISOString(),
  ];
}

function add_0_to_date(date: number): string {
  return date < 10 ? "0" + date : "" + date;
}

/// test filename to see if it's a dir
/// if it is, read the dir and get the index.md file or filename.md file
/// if it's not a dir, test if it's an md file
/// if it is, read the file
/// if it's not, return null
/// filter out nulls
/// map the remaining files to the Post interface
export function get_markdown_data(filename: string): Post | null {
  const [markdownWithMeta, last_modified] = get_markdown_file(filename);
  if (!markdownWithMeta) {
    return null;
  }

  const { data: frontmatter, content: content } = matter(markdownWithMeta);
  const title = frontmatter.title ? frontmatter.title : filename;
  const description = frontmatter.description ? frontmatter.description : "";
  const categories = frontmatter.categories ? frontmatter.categories : [];
  const tags = frontmatter.tags ? frontmatter.tags : [];
  const toc = frontmatter.toc ? frontmatter.toc : false;

  const date = frontmatter.date
    ? new Date(frontmatter.date)
    : get_date_from_filename(filename);
  const date_string =
    date.getFullYear() +
    "/" +
    add_0_to_date(date.getMonth()) +
    "/" +
    add_0_to_date(date.getDate());

  return {
    filename: filename,
    title: title,
    date: date_string,
    last_modified: last_modified,
    categories: categories,
    tags: tags,
    description: description,
    content,
    toc,
  };
}
