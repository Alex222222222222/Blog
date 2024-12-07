import { TeXOptions, load, tex } from "./bootstrap";
import { SvgOptions, dvi2svg } from "./dvi2svg";
import { IFs } from "memfs";

export * from "./bootstrap";
export * from "./dvi2svg";

/**
 * Compiles TeX source code to SVG image.
 */
async function tex2svg(
  input: string,
  bytecode_n: Uint8Array,
  coredump_n: Uint8Array,
  memfs_n: IFs,
  options?: TeXOptions & SvgOptions
) {
  await load(bytecode_n, coredump_n, memfs_n);

  console.log("Compiling TikZ code to dvi");
  const dvi = await tex(input, options);
  console.log("Compiled dvi to svg");
  const svg = await dvi2svg(dvi, options);
  return svg;
}

export default tex2svg;
