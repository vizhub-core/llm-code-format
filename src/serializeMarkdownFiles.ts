const language = (name: string) => {
  if (name.endsWith(".html")) return "html";
  if (name.endsWith(".js")) return "javascript";
  if (name.endsWith(".css")) return "css";
  return "";
};

import { FileCollection } from "@vizhub/viz-types";

export const serializeMarkdownFiles = (files: FileCollection) =>
  Object.entries(files)
    .map(([name, text]) =>
      [`**${name}**\n`, "```" + language(name), text, "```\n"].join("\n"),
    )
    .join("\n")
    .trim();
