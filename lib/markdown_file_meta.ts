// pages/index.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Post from "@/interfaces/post";
import readTime from "./read_time";
import tex2svg from "./tikzjax";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeHeadingLink from "@/lib/rehypeHeadingLink";
import rehypeHighlight from "rehype-highlight";
import remarkAutoNumberHeadings from "@/lib/remarkAutoNumberHeadings";
import { remarkMathEnv } from "remark-math-environment";
import {
  remarkTikzSupport,
  remarkFindTikzScripts,
  TIKZ_SCRIPTS,
} from "@/lib/remarkTikzSupport";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { VFile } from "vfile";
import AsyncLock from "async-lock";
import crypto from "crypto";
import { minify } from "html-minifier";
import rehypeStringify from "rehype-stringify";

export function getLastModifiedDate(filePath: string): Date {
  const stats = fs.statSync(filePath);
  return stats.mtime;
}

export function get_date_from_filename(filename: string): Date {
  const date_split = filename.split("-");
  const year = date_split[0];
  const month = date_split[1];
  const day = date_split[2];

  const year_int = parseInt(year);
  const month_int = parseInt(month);
  const day_int = parseInt(day);

  if (
    isNaN(year_int) ||
    isNaN(month_int) ||
    isNaN(day_int) ||
    year_int <= 0 ||
    month_int <= 0 ||
    day_int <= 0
  ) {
    return new Date();
  }

  return new Date(`${year_int}-${month_int}-${day_int}`);
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
export async function get_markdown_data(
  filename: string
): Promise<Post | null> {
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
    add_0_to_date(date.getMonth() + 1) +
    "/" +
    add_0_to_date(date.getDate());
  const read_time = readTime(content);

  // const binary = fs.readFileSync("./lib/tikzjax/tex.wasm");
  // const code = new WebAssembly.Module(binary);
  const html = await parseMarkdown2Html(content, toc);

  return {
    filename: filename,
    title: title,
    date: date_string,
    last_modified: last_modified,
    categories: categories,
    tags: tags,
    description: description,
    html,
    toc,
    read_time,
  };
}

/// get all posts
export async function get_all_posts(): Promise<Post[]> {
  const files = fs.readdirSync(path.join("posts"));
  const posts: (Post | null)[] = await Promise.all(
    files.map(async (filename) => {
      return await get_markdown_data(filename);
    })
  );
  const valid_posts = posts.filter((post) => post !== null) as Post[];
  // sort by date descending
  valid_posts.sort((a, b) => {
    let date_a = new Date(a.date);
    let date_b = new Date(b.date);
    if (date_b.getTime() - date_a.getTime() !== 0) {
      return date_b.getTime() - date_a.getTime();
    }
    date_a = new Date(a.last_modified);
    date_b = new Date(b.last_modified);
    if (date_b.getTime() - date_a.getTime() !== 0) {
      return date_b.getTime() - date_a.getTime();
    }
    return a.filename.localeCompare(b.filename);
  });

  return valid_posts;
}

/// turn all posts into empty posts
export async function get_empty_posts(): Promise<Post[]> {
  const posts = await get_all_posts();
  for (let i = 0; i < posts.length; i++) {
    posts[i].html = "";
  }
  return posts;
}

/// get posts paths
export async function get_posts_paths(): Promise<string[]> {
  const posts = await get_all_posts();
  const paths = posts.map((post) => {
    return post.filename;
  });

  return paths;
}

/// get all posts paths with alias
export async function get_posts_paths_with_alias(): Promise<string[]> {
  const paths = await get_posts_paths();
  let paths_with_alias: string[] = [];
  paths.forEach((path) => {
    const i = path.toLowerCase();
    const j = i.endsWith(".md") ? i.slice(0, -3) : i + ".md";
    paths_with_alias.push(i);
    paths_with_alias.push(j);
    if (path !== i && path !== j) {
      paths_with_alias.push(path);
    }
  });
  return paths_with_alias;
}

/// export find matching paths with alias
export async function find_matching_paths_with_alias(
  path: string
): Promise<string | undefined> {
  path = path.toLowerCase();
  const paths = await get_posts_paths();
  for (let i = 0; i < paths.length; i++) {
    let path_new = paths[i].toLowerCase();
    if (path_new.endsWith(".md")) {
      path_new = path_new.slice(0, -3);
    }
    let path_new_2 = path.toLowerCase();
    if (path_new_2.endsWith(".md")) {
      path_new_2 = path_new_2.slice(0, -3);
    }
    if (path_new === path_new_2) {
      return paths[i];
    }
  }
  return undefined;
}

/// export get previous and next posts
export async function get_previous_and_next_posts(
  path: string
): Promise<[string | null, string | null]> {
  const paths = await get_posts_paths();
  const index = paths.indexOf(path);
  const previous = index > 0 ? paths[index - 1] : null;
  const next = index < paths.length - 1 ? paths[index + 1] : null;
  return [previous, next];
}

export async function get_all_tags(): Promise<string[]> {
  const posts = await get_all_posts();
  let tags: string[] = [];
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tag = tag.toLowerCase();
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  tags.sort();
  return tags;
}

export async function get_all_categories(): Promise<string[]> {
  const posts = await get_all_posts();
  let categories: string[] = [];
  posts.forEach((post) => {
    post.categories.forEach((category) => {
      category = category.toLowerCase();
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });
  });
  categories.sort();
  return categories;
}

const BUILD_TIKZ_LOCK = new AsyncLock();

const MARKDOWN_HTML_CACHE = new Map<string, string>();

async function parseMarkdown2Html(
  markdown: string,
  toc: Boolean
): Promise<string> {
  const hash = crypto.createHash("sha256").update(markdown).digest("hex");
  if (MARKDOWN_HTML_CACHE.has(hash)) {
    return MARKDOWN_HTML_CACHE.get(hash) as string;
  }

  const findTikzProcessor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFindTikzScripts);

  const find_file = new VFile();
  find_file.value = markdown;
  const find_mdastTree = findTikzProcessor.parse(find_file);
  findTikzProcessor.runSync(find_mdastTree, find_file);

  // build tikz images to ./public/tikz/
  await BUILD_TIKZ_LOCK.acquire("tikz", async () => {
    // check if dir ./public/tikz/ exists
    if (!fs.existsSync("./public/tikz/")) {
      fs.mkdirSync("./public/tikz/");
    }
  });

  for (const [key, value] of TIKZ_SCRIPTS.entries()) {
    await BUILD_TIKZ_LOCK.acquire("tikz", async () => {
      if (value.output) {
        return;
      }
      let res = await tex2svg(value.script, {
        showConsole: true,
        fontCssUrl: "/static/tikz/styles/tikz.css",
        texPackages: {
          "tikz-cd": "",
          amsmath: "",
          amstext: "",
          amsfonts: "",
          amssymb: "",
          pgfplots: "",
          chemfig: "",
          array: "",
          "tikz-3dplot": "",
        },
      });
      fs.writeFileSync(`./public/tikz/${key}.svg`, res);
      value.output = `/tikz/${key}.svg`;
    });
  }

  const content = toc ? `## Contents\n\n${markdown}` : markdown;
  const remarkRehypeOptions = { allowDangerousHtml: true };

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkAutoNumberHeadings)
    .use(remarkMath)
    .use(remarkToc, { heading: "0.1 Contents" })
    .use(remarkMathEnv)
    .use(remarkTikzSupport)
    .use(remarkRehype, remarkRehypeOptions)
    .use(rehypeKatex)
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeHeadingLink)
    .use(rehypeHighlight)
    .use(rehypeStringify);

  const file = new VFile();
  file.value = content;

  const file_new = await processor.process(file);

  fs.writeFileSync(path.join("./html", `${hash}.html`), file_new.toString());

  const html = minify(file_new.toString(), {
    /**
    caseSensitive: true,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    decodeEntities: true,
    html5: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    preserveLineBreaks: false,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeEmptyElements: true,
    removeRedundantAttributes: true,
    sortAttributes: true,
    sortClassName: true,
    trimCustomFragments: true,
    */
  });

  MARKDOWN_HTML_CACHE.set(hash, html);

  return html;
}
