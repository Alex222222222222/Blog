import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";
import { Root, RootContent } from "mdast";
import crypto from "crypto";
import fs from "fs";

/**
 * Add `auto-numbering` to headings in Markdown.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export function remarkTypstSupport() {
  return async (tree: Root): Promise<undefined> => {
    const newChildren: RootContent[] = [];

    // Visit each code block node in the Markdown AST
    for (var node of tree.children) {
      if (node.type === "code" && node.lang === "typst") {
        // compile the typst to svg
        const svg = NodeCompiler.create().svg({
          mainFileContent: `
            #set page(width: auto, height: auto, margin: 10pt)
            #import "@preview/commute:0.3.0": *

            ${node.value}
          `,
        });
        const key = crypto.createHash("sha1").update(node.value).digest("hex");

        // check if dir ./public/typst_svg/ exists
        if (!fs.existsSync("./public/typst_svg/")) {
          fs.mkdirSync("./public/typst_svg/", { recursive: true });
        }
        fs.writeFileSync(`./public/typst_svg/${key}.svg`, svg);
        const svg_path = `/typst_svg/${key}.svg`;

        newChildren.push({
          type: "html",
          value: `
          <object type="image/svg+xml" data="${svg_path}">
            <img src="${svg_path}" alt="typst-image"/>
          </object>`,
        });
      } else {
        newChildren.push(node);
      }

      tree.children = newChildren;
    }
  };
}
