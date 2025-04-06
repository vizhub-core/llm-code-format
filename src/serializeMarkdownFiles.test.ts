// parseMarkdownFiles.test.js
import { expect, test } from "vitest";
import { serializeMarkdownFiles } from "./serializeMarkdownFiles";

// Tests for parseMarkdownFiles function with different formats

test("serializeMarkdownFiles outputs bold format", () => {
  const files = {
    "index.html": "<!-- HTML content -->",
    "script.js": "// JavaScript content",
    "styles.css": "/* CSS content */",
  };
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
