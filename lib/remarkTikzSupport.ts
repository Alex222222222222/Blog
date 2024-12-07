import { Root, RootContent } from "mdast";
import { IFs } from "memfs";
import crypto from "crypto";

export const TIKZ_SCRIPTS: Map<
  string,
  {
    script: string;
    output?: string;
  }
> = new Map();

interface Options {
  bytecode_n?: Uint8Array;
  coredump_n?: Uint8Array;
  memfs_n?: IFs;
}

const defaultOptions: Options = {};

/**
 * Add `auto-numbering` to headings in Markdown.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export function remarkTikzSupport(options: Options = defaultOptions) {
  return (tree: Root): undefined => {
    const newChildren: RootContent[] = [];

    // Visit each code block node in the Markdown AST
    for (var node of tree.children) {
      if (node.type === "code" && node.lang === "tikz") {
        // replace the node with an svg node
        const key = crypto.createHash("sha1").update(node.value).digest("hex");
        const svg = TIKZ_SCRIPTS.get(key)?.output;

        newChildren.push({
          type: "image",
          url: svg!,
          alt: "tikz-image",
        });
      } else {
        newChildren.push(node);
      }

      tree.children = newChildren;
    }
  };
}

export function remarkFindTikzScripts() {
  return (tree: Root): undefined => {
    // Visit each code block node in the Markdown AST
    for (var node of tree.children) {
      if (node.type === "code" && node.lang === "tikz") {
        const source = `
          \\begin{document}
          ${node.value}
          \\end{document}
        `;

        // Add the tikz script to the map
        const key = crypto.createHash("sha1").update(node.value).digest("hex");
        if (!TIKZ_SCRIPTS.has(key)) {
          TIKZ_SCRIPTS.set(key, {
            script: source,
          });
        }
      }
    }
  };
}
