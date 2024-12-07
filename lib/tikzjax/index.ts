import { TeXOptions, load, tex } from "./bootstrap";
import { SvgOptions, dvi2svg } from "./dvi2svg";
import { getHashKey, readCache, putCache } from "../buildCache";

export * from "./bootstrap";
export * from "./dvi2svg";

/**
 * Compiles TeX source code to SVG image.
 */
async function tex2svg(input: string, options?: TeXOptions & SvgOptions) {
  const key = getHashKey(input);
  const cached = readCache("tex2svg", key);
  if (cached) {
    return cached;
  }

  await load();

  const dvi = await tex(input, options);
  const svg = await dvi2svg(dvi, options);

  // Cache the result
  putCache("tex2svg", key, svg);

  return svg;
}

export default tex2svg;
