import { Root } from "mdast";
import tex2svg from "node-tikzjax";

/**
 * Add `auto-numbering` to headings in Markdown.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function remarkTikzSupport() {
  return (tree: Root): undefined => {
    const newChildren = [];

    // Visit each code block node in the Markdown AST
    tree.children.forEach(async (node) => {
      if (node.type === "code" && node.lang === "tikz") {
        // compile the tikz code, and replace the node with an svg node
        const source = `
          \\begin{document}
          \\usepackage{chemfig}
          \\usepackage{tikz-cd}
          \\usepackage{circuitikz}
          \\usepackage{pgfplots}
          \\usepackage{array}
          \\usepackage{amsmath}
          \\usepackage{amstext}
          \\usepackage{amsfonts}
          \\usepackage{amssymb}
          \\usepackage{tikz-3dplot}
          ${node.value}
          \\end{document}
        `;

        // compile the tikz code
        const svg = await tex2svg(source, {
          fontCssUrl: 'https://cdn.jsdelivr.net/npm/node-tikzjax@latest/css/fonts.css',
          embedFontCss: false,
          disableOptimize: true,
        });

        // replace the node with an svg node
        newChildren.push({
          type: "html",
          value: svg,
        });
      } else {
        newChildren.push(node);
      }
    });
  };
}
