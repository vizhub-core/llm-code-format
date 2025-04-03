export type StreamingParserCallbacks = {
  /**
   * Called when a file header is detected outside a code fence.
   * @param fileName - The detected file name.
   * @param format - The header format that was matched.
   */
  onFileNameChange: (
    fileName: string,
    format: string,
  ) => void;

  /**
   * Called for each line emitted from inside a code fence.
   * @param line - A line of code from the code block.
   */
  onCodeLine: (line: string) => void;
};

export class StreamingMarkdownParser {
  private buffer: string = "";
  private insideCodeFence: boolean = false;
  private currentFileName: string | null = null;
  private detectedFormat: string = "Unknown Format";
  private callbacks: StreamingParserCallbacks;

  /**
   * An array of regex patterns for detecting file headers.
   * Currently only supports Bold Format, but can be extended in the future.
   */
  private headerPatterns: {
    regex: RegExp;
    format: string;
  }[] = [
    // Matches: **filename.js**
    {
      regex: /^\s*\*\*([^\n*`]+?)\*\*(?:[^\n]*)\s*$/,
      format: "Bold Format",
    },
  ];

  constructor(callbacks: StreamingParserCallbacks) {
    this.callbacks = callbacks;
  }

  /**
   * Processes an incoming chunk from the stream.
   * Chunks are buffered until full lines (ending with '\n') are available.
   * @param chunk - A string chunk from the stream.
   */
  processChunk(chunk: string) {
    this.buffer += chunk;
    let newlineIndex: number;

    while (
      (newlineIndex = this.buffer.indexOf("\n")) !== -1
    ) {
      const line = this.buffer.slice(0, newlineIndex);
      this.buffer = this.buffer.slice(newlineIndex + 1);
      this.processLine(line);
    }
  }

  /**
   * Flushes any remaining content in the buffer.
   * Should be called once after the stream has ended.
   */
  flushRemaining() {
    if (this.buffer.length > 0) {
      this.processLine(this.buffer);
      this.buffer = "";
    }
  }

  /**
   * Processes a single line.
   * If the line is a code fence marker (starting with "```"), it toggles the code block state.
   * When inside a code block, every line is emitted via onCodeLine.
   * Outside of a code block, the line is checked against header patterns,
   * and if a match is found, onFileNameChange is invoked.
   * @param line - A single line of text.
   */
  private processLine(line: string) {
    // Check if the line is a code fence marker (could be "```" or "```lang")
    if (line.trim().startsWith("```")) {
      this.insideCodeFence = !this.insideCodeFence;
      return; // The fence marker itself is not emitted as code content.
    }

    if (this.insideCodeFence) {
      // Emit every line inside the code fence as a code line.
      this.callbacks.onCodeLine(line);
    } else {
      // Outside a code fence, check for file header patterns.
      for (const { regex, format } of this.headerPatterns) {
        const match = regex.exec(line);
        if (match) {
          const fileName = match[1].trim();
          this.currentFileName = fileName;
          this.detectedFormat = format;
          this.callbacks.onFileNameChange(fileName, format);
          break; // Stop after the first matching header is found.
        }
      }
      // Non-header lines outside code fences are ignored
    }
  }
}
