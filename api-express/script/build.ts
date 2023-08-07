// Rollup Imports
import { rollup } from "rollup";
import rollupOps from "./rollup.config";
import terser from "@rollup/plugin-terser";

// NodeJs Imports
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { rm } from "node:fs/promises";

// ** Path
const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = resolve(__dirname, "../dist");

// ** Bootstrap
try {
  await rm(distPath, { recursive: true });
} catch {
} finally {
  const rollupOut = await build();
  console.log("build complate", rollupOut);
}

async function build() {
  const isCjs = toIsArgv("--cjs");
  const isMin = toIsArgv("--min");

  const rollupBuild = await rollup(rollupOps);

  // CommonJs & Min
  if (isCjs && isMin) {
    return await rollupBuild.write({
      file: resolve(__dirname, "../dist/index.min.cjs"),
      format: "cjs",
      plugins: [terser()],
    });
  }

  // CommonJs & Not Min
  if (isCjs && !isMin) {
    return await rollupBuild.write({
      file: resolve(__dirname, "../dist/index.cjs"),
      format: "cjs",
    });
  }

  // ESM & Min
  if (!isCjs && isMin) {
    return await rollupBuild.write({
      file: resolve(__dirname, "../dist/main.min.js"),
      format: "esm",
      plugins: [terser()],
    });
  }

  // ESM & Not Min
  if (!isCjs && !isMin) {
    return await rollupBuild.write({
      dir: resolve(__dirname, "../dist"),
      format: "esm",
    });
  }
}

function toIsArgv(argv: string) {
  return process.argv.some((item) => item.includes(argv));
}
