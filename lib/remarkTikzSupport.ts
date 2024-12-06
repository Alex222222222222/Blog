import { Root } from "mdast";
import {tex} from "node-tikzjax";
import tex2svg from "node-tikzjax";
import deasync from "deasync";

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
    for (var node of tree.children) {
      if (node.type === "code" && node.lang === "tikz") {
        // compile the tikz code, and replace the node with an svg node
        /**
        const source = `
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
          \\begin{document}
          ${node.value}
          \\end{document}
        `;
        */
        const source = `
        \\begin{tikzpicture}
        \\draw (0,0) circle (1in);
        \\end{tikzpicture}
        `;

        // compile the tikz code
        /**
        const svg = await tex2svg(source, {
          fontCssUrl: 'https://cdn.jsdelivr.net/npm/node-tikzjax@latest/css/fonts.css',
          embedFontCss: false,
          disableOptimize: true,
          showConsole: true,
        });
        */

        const syncTex = deasync(tex2svg);
        const dvi = syncTex(source, {
          showConsole: true,
        });

        // replace the node with an svg node
        /* newChildren.push({
          type: "html",
          value: svg,
        }); */
      } else {
        newChildren.push(node);
      }
    }
  };
}
