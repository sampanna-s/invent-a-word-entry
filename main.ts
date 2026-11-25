import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Typeloom — the uneasy wait while the three typing dots hover, promising a reply that never arrives.";

// The gate needs 1–140 UTF-8 characters, not only white space.
if (ENTRY.length < 1 || [...ENTRY].length > 140 || !/\S/.test(ENTRY)) {
  throw new Error("entry text fails the 1–140 character gate");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
// Write to a temp name and rename, so a reader never sees a half-written file.
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, ENTRY, "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
