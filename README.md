# llm-code-format

**From source code to Markdown to LLMs and back again**

A TypeScript library for parsing and serializing multiple code files in Markdown format, specifically designed for Large Language Model (LLM) interactions. The idea of this comes from the fact that when you ask an LLM to write code for you with multiple files, different models have different "preferences" when it comes to representing code. This library aims to provide a consistent way to parse and serialize code files in Markdown format, regardless of the format used by the LLM. It may also be useful for other applications that need to work with multiple code files in Markdown format, such as being able to extract code files from a Markdown document or generate a Markdown document from code files.

## Features

- Parse code blocks from various Markdown formats including:

  - Bold Format (`**filename.js**`)
  - Backtick-Heading Format (`### `filename.js``)
  - Standard Heading Format (`### filename.js`)
  - Colon Format (`filename.js:`)
  - Hash Format (`# filename.js`)
  - File Bold Format (`### File: **filename.js**`)
  - Heading Bold Format (`### **filename.js**`)
  - Numbered Bold Format (`1. **filename.js**`)
  - Numbered Backtick Format (`### 1. `filename.js``)

- Streaming parser for real-time code editing views
- Serialize code files back to Markdown in a consistent format
- TypeScript support with full type definitions
- Zero dependencies
- Comprehensive test coverage

## Installation

```bash
npm install llm-code-format
```

## Usage Examples

### Basic Example Usage

```typescript
import { parseMarkdownFiles, serializeMarkdownFiles } from "llm-code-format";

// Parse Markdown content containing code blocks
const markdownString = `
**index.html**

\`\`\`html
<h1>Hello World</h1>
\`\`\`

**styles.css**

\`\`\`css
body { color: blue; }
\`\`\`
`;

const { files, format } = parseMarkdownFiles(markdownString);
console.log(format); // "Bold Format"
console.log(files); // Array of { name, text } objects

// Serialize files back to Markdown
const files = [
  { name: "index.html", text: "<h1>Hello World</h1>" },
  { name: "styles.css", text: "body { color: blue; }" },
];

const markdown = serializeMarkdownFiles(files);
```

### Recipe: Extract Files from Blog Posts

This "recipe" shows how to extract example code from blog posts such that they can be run (works with Astro):

```js
import { parseMarkdownFiles } from "llm-code-format";
import fs from "fs";
import path from "path";

const blogDir = "src/pages/blog";
const publicDir = "public/examples";

// Read all markdown files from blog directory
fs.readdirSync(blogDir)
  .filter((fileName) => fileName.endsWith(".md"))
  .forEach((fileName) => {
    const postName = fileName.replace(".md", "");
    const filePath = path.join(blogDir, fileName);
    const markdownString = fs.readFileSync(filePath, "utf8");

    // Use llm-code-format to extract code blocks from markdown!
    const { files } = parseMarkdownFiles(markdownString);

    if (!files.length) return;
    const outputDirectory = path.join(publicDir, postName);
    if (fs.existsSync(outputDirectory)) {
      fs.rmSync(outputDirectory, { recursive: true });
    }
    fs.mkdirSync(outputDirectory);
    files.forEach(({ name, text }) => {
      fs.writeFileSync(path.join(outputDirectory, name), text);
    });
  });
```

## API

### parseMarkdownFiles(markdownString: string, format?: string)

Parses a Markdown string containing code blocks and returns an object with:

- `files`: Array of `{ name: string, text: string }` objects
- `format`: String indicating the detected format

Optional `format` parameter to specify a particular format to parse:

- 'backtick-heading'
- 'file-bold'
- 'numbered-backtick'
- 'heading-bold'
- 'standard-heading'
- 'colon'
- 'bold'
- 'hash'
- 'numbered-bold'

### serializeMarkdownFiles(files: Array<{ name: string, text: string }>)

Converts an array of file objects into a Markdown string using the Bold Format.

### StreamingMarkdownParser

A streaming parser that processes Markdown content chunk by chunk, emitting callbacks when file names or code blocks are detected. This is particularly useful for real-time code editing views where users can see LLMs edit specific files as they generate content.

```typescript
import { StreamingMarkdownParser, StreamingParserCallbacks } from "llm-code-format";

// Define callbacks for file name changes and code lines
const callbacks: StreamingParserCallbacks = {
  onFileNameChange: (fileName, format) => {
    console.log(`File changed to: ${fileName} (${format})`);
    // Update UI to show the current file being edited
  },
  onCodeLine: (line) => {
    console.log(`Code line: ${line}`);
    // Append the line to the current file's content in the UI
  }
};

// Create a new parser instance with the callbacks
const parser = new StreamingMarkdownParser(callbacks);

// Process chunks as they arrive (e.g., from an LLM streaming response)
parser.processChunk("**index.html**\n");
parser.processChunk("```html\n");
parser.processChunk("<h1>Hello World</h1>\n");
parser.processChunk("</html>\n");
parser.processChunk("```\n");

// Flush any remaining content when the stream ends
parser.flushRemaining();
```

#### Methods

- **constructor(callbacks: StreamingParserCallbacks)**: Creates a new parser instance with the specified callbacks.
- **processChunk(chunk: string)**: Processes a chunk of text from the stream.
- **flushRemaining()**: Processes any remaining content in the buffer after the stream has ended.

#### Callback Interface

```typescript
type StreamingParserCallbacks = {
  onFileNameChange: (fileName: string, format: string) => void;
  onCodeLine: (line: string) => void;
};
```

Currently, the streaming parser only supports the "Bold Format" (`**filename.js**`), but is designed to be extensible for supporting additional formats in the future.

## License

MIT © Curran Kelleher

## Contributing

Contributions welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) guidelines before submitting a PR. All changes should start with creating an issue first.
