import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";
import { Html, Root, RootContent } from "mdast";
import crypto from "crypto";
import fs from "fs";
import { optimize } from "svgo";

const mathFontSize = 15;

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
    const newChildren: RootContent[] = await Promise.all(
      tree.children.map((node) => renderNode(node)),
    );

    tree.children = newChildren;
  };
}

async function renderNode(node: RootContent): Promise<any> {
  if (node.type === "code" && node.lang === "typst") {
    // render typst code block
    // compile the typst to svg
    try {
      // check if dir ./public/typst_svg/ exists
      if (!fs.existsSync("./public/typst_svg/")) {
        fs.mkdirSync("./public/typst_svg/", { recursive: true });
      }
      const key = crypto.createHash("sha1").update(node.value).digest("hex");
      const svg_path = `/typst_svg/${key}.svg`;
      // check if `./public/typst_svg/${key}.svg` already exists
      if (fs.existsSync(`./public/typst_svg/${key}.svg`)) {
        return {
          type: "html",
          value: `
          <object type="image/svg+xml" data="${svg_path}">
            <img src="${svg_path}" alt="${node.value}"/>
          </object>`,
        };
      }

      const svg = NodeCompiler.create().svg({
        mainFileContent: `
            #set page(width: auto, height: auto, margin: 10pt)
            #import "@preview/commute:0.3.0": *
            #set text( size: ${mathFontSize}pt )

            ${node.value}
          `,
      });

      fs.writeFileSync(`./public/typst_svg/${key}.svg`, svg);

      return {
        type: "html",
        value: `
          <object type="image/svg+xml" data="${svg_path}">
            <img src="${svg_path}" alt="${node.value}"/>
          </object>`,
      };
    } catch (e) {
      console.log(
        "Error rendering math, error:\n",
        e,
        `\nmath:\n${node.value}`,
      );

      return node;
    }
  } else if (node.type === "math") {
    // render math block
    // compile the typst to svg
    return renderMath(node);
  } else if (node.type === "inlineMath") {
    // render inline math block
    // compile the typst to svg
    return renderMath(node);
  } else if (node.type === "paragraph") {
    node.children = await Promise.all(
      node.children.map(async (node) => renderNode(node)),
    );
    return node;
  } else if (node.type === "blockquote") {
    node.children = await Promise.all(
      node.children.map((node) => renderNode(node)),
    );
    return node;
  } else if (node.type === "emphasis") {
    node.children = await Promise.all(
      node.children.map((node) => renderNode(node)),
    );
    return node;
  } else if (node.type === "footnoteDefinition") {
    node.children = await Promise.all(
      node.children.map((node) => renderNode(node)),
    );
    return node;
  } else if (node.type === "heading") {
    node.children = await Promise.all(
      node.children.map((node) => renderNode(node)),
    );
    return node;
  } else if (node.type === "list") {
    node.children = await Promise.all(
      node.children.map(async (node) => {
        node.children = await Promise.all(
          node.children.map((node) => renderNode(node)),
        );
        return node;
      }),
    );
    return node;
  } else if (node.type === "listItem") {
    node.children = await Promise.all(
      node.children.map((node) => renderNode(node)),
    );
    return node;
  } else if (node.type === "strong") {
    node.children = await Promise.all(
      node.children.map((node) => renderNode(node)),
    );
    return node;
  } else if (node.type === "table") {
    node.children = await Promise.all(
      node.children.map(async (node) => {
        node.children = await Promise.all(
          node.children.map(async (node) => {
            node.children = await Promise.all(
              node.children.map((node) => renderNode(node)),
            );
            return node;
          }),
        );
        return node;
      }),
    );
    return node;
  } else if (node.type === "tableCell") {
    node.children = await Promise.all(
      node.children.map((node) => renderNode(node)),
    );
    return node;
  } else if (node.type === "tableRow") {
    node.children = await Promise.all(
      node.children.map(async (node) => {
        node.children = await Promise.all(
          node.children.map((node) => renderNode(node)),
        );
        return node;
      }),
    );
    return node;
  } else {
    return node;
  }
}

async function renderMath(node: any): Promise<any> {
  if (node.type == "math") {
    let res = await renderMathInner(node.value, false);
    if (res) {
      return res;
    } else {
      return node;
    }
  } else if (node.type == "inlineMath") {
    let res = await renderMathInner(node.value, true);
    if (res) {
      return res;
    } else {
      return node;
    }
  } else {
    return node;
  }
}

async function renderMathInner(
  value: string,
  inline: boolean,
): Promise<Html | null> {
  // render math block
  // compile the typst to svg
  try {
    const margin = inline ? 1 : 10;

    // check if dir ./public/typst_svg/ exists
    if (!fs.existsSync("./public/typst_svg/")) {
      fs.mkdirSync("./public/typst_svg/", { recursive: true });
    }
    const key = crypto.createHash("sha1").update(value).digest("hex");
    // check if `./public/typst_svg/${key}.svg` already exists
    if (fs.existsSync(`./public/typst_svg/${key}.svg`)) {
      return htmlFromSVG(key, inline, value);
    }

    const svg = NodeCompiler.create().plainSvg({
      mainFileContent: `
            #set page(width: auto, height: auto, margin: ${margin}pt, fill: rgb("FEFCE8"))
            #import "@preview/commute:0.3.0": *
            #import "@preview/mitex:0.2.5": *
            #set text( size: ${mathFontSize}pt )

            #mitex(\` ${value} \`)
          `,
    });
    const result = optimize(svg, {
      path: `./public/typst_svg/${key}.svg`, // recommended
      multipass: true, // all other config fields are available here
    });

    fs.writeFileSync(`./public/typst_svg/${key}.svg`, result.data);

    return htmlFromSVG(key, inline, value);
  } catch (e) {
    console.log("Error rendering math, error:\n", e, `\nmath:\n${value}`);

    return null;
  }
}

function htmlFromSVG(key: string, inline: boolean, alt: string): Html {
  var svg = "";
  // if svg.length < 100, inline, otherwise, use file
  if (
    fs.existsSync(`./public/typst_svg/${key}.svg`) &&
    fs.statSync(`./public/typst_svg/${key}.svg`).size < 5000
  ) {
    svg =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        fs.readFileSync(`./public/typst_svg/${key}.svg`, "utf8"),
      );
  } else {
    svg = `/typst_svg/${key}.svg`;
  }

  return {
    type: "html",
    value: inline
      ? `<img src="${svg}" class="inline_math_svg" alt="${alt}"/>`
      : `<img src="${svg}" alt="${alt}"/>`,
  };
}
