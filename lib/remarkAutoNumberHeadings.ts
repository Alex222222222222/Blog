import { visit } from 'unist-util-visit';
import { Heading, Root } from 'mdast';

/**
 * @typedef Options
 *   Configuration.
 * @property {boolean | null | undefined} [someField]
 *   Some option (optional).
 */
interface Options {
  maxLevel: number;
}

const defaultOptions: Options = {
  maxLevel: 6,
};

/**
 * Add `auto-numbering` to headings in Markdown.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function remarkAutoNumberHeadings(options: Options = defaultOptions) {
  return (tree: Root): undefined => {
    let counters: number[] = [0,0,0,0,0,0]

    // Visit each heading node in the Markdown AST
    visit(tree, 'heading', (node: Heading) => {
      const level = node.depth;
      if (level > options.maxLevel) {
        return;
      }

      // Update the counters for the current heading level
      counters[level - 1]++;
      counters.fill(0, level);

      const numbering = counters.slice(0, level).join('.') + ' ';

      // Prepend the numbering to the heading text
      node.children.unshift({ type: 'text', value: numbering });
    });
  };
};
