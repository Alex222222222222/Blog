import { Root, RootContent } from "mdast";
import tex2svg from "./tikzjax";
import * as library from "./remarkTikzLibrary";
import { createSyncFn } from "synckit";
import path from "path";
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
    /**
    const code = options.code;
    if (!code) {
      throw new Error("No WebAssembly code provided");
    }
    const pages = 2500;
    const memory = new WebAssembly.Memory({ initial: pages, maximum: pages });
    // const buffer = new Uint8Array(memory.buffer);
    // const f = fs.openSync("core.dump", "r");
    // if (fs.readSync(f, buffer, 0, pages * 65536, null) != pages * 65536)
    //   throw "Could not load memory dump";
    // library.setMemory(memory.buffer);
    */

    const newChildren: RootContent[] = [];

    // Visit each code block node in the Markdown AST
    for (var node of tree.children) {
      if (node.type === "code" && node.lang === "tikz") {
        /**
        // compile the tikz code, and replace the node with an svg node
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
        const source = `
        \\begin{tikzpicture}
        \\draw (0,0) circle (1in);
        \\end{tikzpicture}
        `;

        // compile the tikz code
        const svg = await tex2svg(source, {
          fontCssUrl: 'https://cdn.jsdelivr.net/npm/node-tikzjax@latest/css/fonts.css',
          embedFontCss: false,
          disableOptimize: true,
          showConsole: true,
        });

        const tikzWorker = path.join(__dirname, "remarkTikzWorker.ts");
        console.log("tikzWorker: ", tikzWorker);
        let svg = "";
        let done = false;
        const tikzAsyncFunction = async () => {
          console.log("Compiling TikZ code");
          const newSvg = await tex2svg(
            source,
            options.bytecode_n!,
            options.coredump_n!,
            options.memfs_n!,
            {
              showConsole: true,
            }
          );
          console.log("Compiled TikZ code");
          svg = newSvg;
          done = true;
        };
        // const syncTex = createSyncFn(tikzWorker, {
        //   tsRunner: 'tsx', // optional, can be `'ts-node' | 'esbuild-register' | 'esbuild-runner' | 'tsx'`
        // })
        // const svg: string = syncTex(source);
        tikzAsyncFunction();
        while (!done) {
          setTimeout(() => {}, 1000);
          continue;
        }

        library.setInput(data, function () {
          process.exit();
        });
        library.setInput(data);

        const wasm = new WebAssembly.Instance(code, {
          library: library,
          env: { memory: memory },
        });

        if (typeof wasm.exports.main === 'function') {
          console.log(wasm.exports.main());
        } else {
          throw new Error("wasm.exports.main is not a function");
        }
         */

        // replace the node with an svg node
        var shasum = crypto.createHash("sha1");
        shasum.update(node.value);
        const key = shasum.digest("hex");
        const svg = TIKZ_SCRIPTS.get(key)?.output;
        console.log("key", key);
        console.log("TIKZ_SCRIPTS: ", TIKZ_SCRIPTS);
        console.log("svg: ", svg);

        newChildren.push({
          type: "html",
          value: svg!,
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
        const source_1 = `
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
        const source_2 = `
        \\usepackage{tikz-cd}
        \\usepackage{pgfplots}
        \\usepackage{amsmath}
        \\usepackage{amstext}
        \\usepackage{amsfonts}
        \\usepackage{amssymb}
        \\begin{document}
        ${node.value}
        \\end{document}
      `;
        const source = `
        \\begin{document}
        \\begin{tikzpicture}
        \\draw (0,0) circle (1in);
        \\end{tikzpicture}
        \\end{document}
        `;

        // Add the tikz script to the map
        var shasum = crypto.createHash("sha1");
        shasum.update(node.value);
        const key = shasum.digest("hex");
        if (!TIKZ_SCRIPTS.has(key)) {
          TIKZ_SCRIPTS.set(key, {
            script: source,
          });
        }
      }
    }
  };
}
