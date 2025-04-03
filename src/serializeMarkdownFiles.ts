const language = (name: string) => {
  if (name.endsWith(".html")) return "html";
  if (name.endsWith(".js")) return "javascript";
  if (name.endsWith(".css")) return "css";
  return "";
};

export const serializeMarkdownFiles = (
  files: Array<{ name: string; text: string }>,
) =>
  files
    .map(({ name, text }) =>
      [
        `**${name}**\n`,
        "```" + language(name),
        text,
        "```\n",
      ].join("\n"),
    )
    .join("\n")
    .trim();
