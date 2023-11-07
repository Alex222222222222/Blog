import Config from "@/interfaces/config";
import path from "path";
import fs from "fs";

export default function getConfig(): Config {
  const config = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "config.json"), "utf8")
  );

  return config;
}
