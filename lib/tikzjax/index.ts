import { TeXOptions, load, tex } from "./bootstrap";
import { SvgOptions, dvi2svg } from "./dvi2svg";

export * from "./bootstrap";
export * from "./dvi2svg";

/**
 * Compiles TeX source code to SVG image.
 */
async function tex2svg(input: string, options?: TeXOptions & SvgOptions) {
  await load();

  console.log("Compiling TikZ code to dvi");
  const dvi = await tex(input, options);
  console.log("Compiled dvi to svg");
  const svg = await dvi2svg(dvi, options);
  return svg;
}

export default tex2svg;
