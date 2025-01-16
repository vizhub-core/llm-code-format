// parseMarkdownFiles.test.js
import { expect, test } from "vitest";
import { serializeMarkdownFiles } from "./serializeMarkdownFiles";

// Tests for parseMarkdownFiles function with different formats

test("serializeMarkdownFiles outputs bold format", () => {
  const files = [
    { name: "index.html", text: "<!-- HTML content -->" },
    { name: "script.js", text: "// JavaScript content" },
    { name: "styles.css", text: "/* CSS content */" },
  ];
  const markdownString = serializeMarkdownFiles(files);

  expect(markdownString).toBe(`**index.html**

\`\`\`html
<!-- HTML content -->
\`\`\`

**script.js**

\`\`\`javascript
// JavaScript content
\`\`\`

**styles.css**

\`\`\`css
/* CSS content */
\`\`\``);
});
