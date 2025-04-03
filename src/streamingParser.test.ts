import { describe, it, expect, beforeEach } from "vitest";
import {
  StreamingMarkdownParser,
  StreamingParserCallbacks,
} from "./streamingParser";

describe("StreamingMarkdownParser", () => {
  let fileNameChanges: Array<{
    name: string;
    format: string;
  }>;
  let codeLines: string[];
  let parser: StreamingMarkdownParser;

  const callbacks: StreamingParserCallbacks = {
    onFileNameChange: (fileName, format) => {
      fileNameChanges.push({ name: fileName, format });
    },
    onCodeLine: (line) => {
      codeLines.push(line);
    },
  };

  beforeEach(() => {
    fileNameChanges = [];
    codeLines = [];
    parser = new StreamingMarkdownParser(callbacks);
  });

  it("should process a complete markdown block in one chunk", () => {
    const input = "**index.html**\n```\n<html>\n</html>\n```\n";
    parser.processChunk(input);
    parser.flushRemaining();

    expect(fileNameChanges).toEqual([
      { name: "index.html", format: "Bold Format" },
    ]);
    expect(codeLines).toEqual(["<html>", "</html>"]);
  });

  it("should handle multiple chunks with split lines", () => {
    // Simulate splitting a header and code block across chunks
    parser.processChunk("**inde");
    parser.processChunk("x.html**\n```\n<ht");
    parser.processChunk("ml>\n</html>\n```");
    parser.flushRemaining();

    expect(fileNameChanges).toEqual([
      { name: "index.html", format: "Bold Format" },
    ]);
    expect(codeLines).toEqual(["<html>", "</html>"]);
  });

  it("should process multiple files and code blocks", () => {
    const input =
      "**index.html**\n```\n<html>\n</html>\n```\n" +
      "**styles.css**\n```\nbody { color: blue; }\n```\n";
    parser.processChunk(input);
    parser.flushRemaining();

    expect(fileNameChanges).toEqual([
      { name: "index.html", format: "Bold Format" },
      { name: "styles.css", format: "Bold Format" },
    ]);
    expect(codeLines).toEqual([
      "<html>",
      "</html>",
      "body { color: blue; }",
    ]);
  });

  it("should handle code fence markers with language specifiers", () => {
    const input =
      "**script.js**\n```js\nconsole.log('Hello');\n```\n";
    parser.processChunk(input);
    parser.flushRemaining();

    expect(fileNameChanges).toEqual([
      { name: "script.js", format: "Bold Format" },
    ]);
    expect(codeLines).toEqual(["console.log('Hello');"]);
  });

  it("should flush remaining partial lines on flushRemaining", () => {
    // Provide a header line without a trailing newline
    parser.processChunk("**partial.html**");
    parser.flushRemaining();

    expect(fileNameChanges).toEqual([
      { name: "partial.html", format: "Bold Format" },
    ]);
  });

  it("should not trigger callbacks for irrelevant lines outside code fences", () => {
    // Provide a line that doesn't match any header or code fence
    parser.processChunk("This is an irrelevant line\n");
    parser.flushRemaining();

    expect(fileNameChanges).toEqual([]);
    expect(codeLines).toEqual([]);
  });

  it("should handle nested chunks with header and code block boundaries", () => {
    // Simulate a stream with multiple boundaries and chunk splits
    const chunks = [
      "**index.html**\n", // Header detected
      "```\n<ht", // Start code fence and partial code
      "ml>\n</ht", // Continuation of code
      "ml>\n```\n", // End code fence
      "Some irrelevant line\n", // Irrelevant line outside code fence
      "**styles.css**\n", // New header
      "```\nbody { color:", // Start second code fence with split code line
      " blue; }\n```\n", // End code fence
    ];

    chunks.forEach((chunk) => parser.processChunk(chunk));
    parser.flushRemaining();

    expect(fileNameChanges).toEqual([
      { name: "index.html", format: "Bold Format" },
      { name: "styles.css", format: "Bold Format" },
    ]);

    expect(codeLines).toEqual([
      "<html>",
      "</html>",
      "body { color: blue; }",
    ]);
  });

  it("should handle bold format with extra text", () => {
    const input =
      "**index.html** (some commentary)\n```\n<html>\n</html>\n```\n";
    parser.processChunk(input);
    parser.flushRemaining();

    expect(fileNameChanges).toEqual([
      { name: "index.html", format: "Bold Format" },
    ]);
    expect(codeLines).toEqual(["<html>", "</html>"]);
  });
});
