# cc-uniq

A TypeScript implementation of the Unix `uniq` command-line tool.

Built as part of the [Coding Challenges](https://codingchallenges.fyi/) series.

## What it does

`uniq` filters **adjacent duplicate lines** from input. It does not sort — only consecutive identical lines are collapsed.

```bash
echo -e "apple\napple\nbanana\napple" | node dist/index.js -
# apple
# banana
# apple   ← kept, not adjacent to the first "apple"
```

## Usage

```
uniq [options] [input_file [output_file]]
```

If no file is provided, reads from **stdin**.

### Options

| Flag | Description |
|------|-------------|
| `-c` | Prefix each output line with its consecutive occurrence count |
| `-d` | Only print lines that are repeated (have adjacent duplicates) |
| `-u` | Only print lines that appear exactly once (no adjacent duplicates) |

### Examples

```bash
# Basic deduplication
node dist/index.js input.txt

# Count occurrences
node dist/index.js -c input.txt

# Only show duplicates
node dist/index.js -d input.txt

# Only show unique lines
node dist/index.js -u input.txt

# Write output to a file
node dist/index.js input.txt output.txt

# Read from stdin
cat input.txt | node dist/index.js -
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Install dependencies

```bash
npm install
```

### Build

```bash
npm run build
```

### Run tests

```bash
npm test
```

## Project Structure

```
src/
  index.ts       # CLI entry point — argument parsing, stream wiring
  uniq.ts        # Core logic — stream processing and flag handling

test/
  uniq.test.ts   # Unit tests (generateOutputContent) + integration tests (processData)
```

## Design

- **Stream injection**: `processData` accepts `NodeJS.ReadableStream` and `NodeJS.WritableStream` — it doesn't create or own streams. This keeps the core logic decoupled from I/O and makes it straightforward to test without touching the filesystem.
- **Two test layers**: unit tests cover the pure flag logic; integration tests use in-memory streams to verify the full processing pipeline.
