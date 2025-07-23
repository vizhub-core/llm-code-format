// parseMarkdownFiles.ts
import { FileCollection } from "@vizhub/viz-types";

export function parseMarkdownFiles(
  markdownString: string,
  format?: string,
): { files: FileCollection; format: string } {
  const files: FileCollection = {};

  const backtickHeadingRegex =
    /^\s*###\s*`([^`]+)`\s*\n```(?:\w+)?\n([\s\S]*?)```/gm;
  const fileBoldFormatRegex =
    /^\s*###\s*File:\s*\*\*(.+?)\*\*\s*\n```(?:\w+)?\n([\s\S]*?)```/gm;
  const numberedBacktickFormatRegex =
    /^\s*###\s*\d+\.\s*`([^`]+)`(?:[^\n]*\n)*?\s*```(?:\w+)?\n([\s\S]*?)```/gm;
  const standardHeadingRegex =
    /^\s*###\s*(?!`|File:|\d+\.)\s*([^\n`]+?)\s*\n```(?:\w+)?\n([\s\S]*?)```/gm;
  const colonFormatRegex =
    /^\s*(?!###|\*\*|`)([^\n#*`]+?):\s*\n```(?:\w+)?\n([\s\S]*?)```/gm;
  const hashFormatRegex = /^\s*# ([^\n`]+?)\s*\n```(?:\w+)?\n([\s\S]*?)```/gm;
  const boldFormatRegex =
    /^\s*(?!###)\*\*([^\n*`]+?)\*\*(?:[^\n]*)\s*\n```(?:\w+)?\n([\s\S]*?)```/gm;
  const headingBoldFormatRegex =
    /^### \*\*([^\n`]+?)\*\*\s*\n```(?:\w+)?\n([\s\S]*?)```/gm;
  const numberedBoldFormatRegex =
    /^\s*\d+\.\s*\*\*([^\n`]+?)\*\*[\s\S]*?\n```(?:\w+)?\n([\s\S]*?)```/gm;

  // Associate each regex with a unique, lowercase key
  const regexes = [
    {
      regex: backtickHeadingRegex,
      format: "Backtick-Heading Format",
      key: "backtick-heading",
    },
    {
      regex: fileBoldFormatRegex,
      format: "File Bold Format",
      key: "file-bold",
    },
    {
      regex: numberedBacktickFormatRegex,
      format: "Numbered Backtick Format",
      key: "numbered-backtick",
    },
    {
      regex: headingBoldFormatRegex,
      format: "Heading Bold Format",
      key: "heading-bold",
    },
    {
      regex: standardHeadingRegex,
      format: "Standard Heading Format",
      key: "standard-heading",
    },
    {
      regex: colonFormatRegex,
      format: "Colon Format",
      key: "colon",
    },
    {
      regex: boldFormatRegex,
      format: "Bold Format",
      key: "bold",
    },
    {
      regex: hashFormatRegex,
      format: "Hash Format",
      key: "hash",
    },
    {
      regex: numberedBoldFormatRegex,
      format: "Numbered Bold Format",
      key: "numbered-bold",
    },
  ];

  let selectedRegexes = regexes;

  if (format) {
    // Find the regex that matches the specified format
    const formatRegexEntry = regexes.find((r) => r.key === format);
    if (!formatRegexEntry) {
      throw new Error(`Unsupported format: ${format}`);
    }
    selectedRegexes = [formatRegexEntry];
  }

  let detectedFormat = "Unknown Format";

  // Process each format and stop after the first matching format
  for (const { regex, format: fmt } of selectedRegexes) {
    regex.lastIndex = 0; // Reset regex index
    const matches: Record<string, string> = {};
    let match;

    while ((match = regex.exec(markdownString)) !== null) {
      let name = match[1].trim();
      // For Bold Format, strip out parentheses and any content after them
      if (fmt === "Bold Format") {
        // Remove anything in parentheses and trim
        name = name.replace(/\s*\([^)]*\).*$/, "").trim();
      }
      const code = match[2].trim();
      matches[name] = code;
    }

    if (Object.keys(matches).length > 0) {
      Object.assign(files, matches);
      detectedFormat = fmt;
      break; // Stop after the first matching format
    }
  }

  return { files, format: detectedFormat };
}
