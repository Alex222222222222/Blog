/**
 * rehypeHeadingLink
 *
 * Add a link to each heading in the post content,
 * so that users can easily link to a specific heading.
 *
 * The link will be an anchor tag with the heading id as the href.
 * This will only work for headings with an id.
 */

import { Node } from "unist";
import { visit } from "unist-util-visit";

/**
 * Test if a node is a heading with an non-empty id.
 * @param node
 * @returns boolean
 */
function testIsHeadingWithId(node: any) {
  return (
    (node.tagName === "h1" ||
      node.tagName === "h2" ||
      node.tagName === "h3" ||
      node.tagName === "h4" ||
      node.tagName === "h5" ||
      node.tagName === "h6") &&
    node.properties.id !== undefined &&
    node.properties.id !== ""
  );
}

export default function rehypeHeadingLink() {
  return (tree: Node) => {
    // visit all heading nodes
    visit(tree, testIsHeadingWithId, (node: any) => {
      // create an anchor tag with the heading id as the href
      const anchor = {
        type: "element",
        tagName: "a",
        properties: {
          href: `#${node.properties.id}`,
        },
        children: node.children,
      };

      // replace the heading node with the anchor tag
      node.children = [anchor];
    });
  };
}
