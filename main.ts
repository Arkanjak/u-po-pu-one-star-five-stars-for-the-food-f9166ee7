import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "One star for Earth: they charge me to sleep and make me digest in private like a criminal, yet their dumplings made my third stomach weep with joy.";

const trimmedEntry = entry.trim();

if (trimmedEntry.length < 1 || trimmedEntry.length > 200) {
  throw new Error(`entry must be 1 to 200 characters, got ${trimmedEntry.length}`);
}

const outputDirs = ["/output", join(import.meta.dirname, "output")];

let written = false;
for (const dir of outputDirs) {
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "entry.txt"), entry, "utf8");
    written = true;
    break;
  } catch {
    // Try the next output location.
  }
}

if (!written) {
  throw new Error("could not write entry.txt to any output location");
}
