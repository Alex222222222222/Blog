import { runAsWorker } from "synckit";
import tex2svg from "node-tikzjax";

runAsWorker(async (source: string) =>{
  console.log("Compiling TikZ code");
  // const svg = await tex2svg(source, {
  //   showConsole: true,
  // });
  console.log("Compiled TikZ code");
  return source;
  // return svg;
});
