// Rollup Imports
import { defineConfig } from "rollup";
import node from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import alias from "@rollup/plugin-alias";
// import terser from "@rollup/plugin-terser";

// NodeJs Imports
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const extensions = [".js", ".ts", ".cjs", ".mjs"];

export default defineConfig({
  input: [resolve(__dirname, "../src/main.ts")],
  external: [/node_modules/],
  plugins: [
    node({ extensions }),
    babel({
      extensions,
      presets: ["@babel/preset-env", "@babel/preset-typescript"],
      plugins: [["@babel/plugin-proposal-decorators", { version: "2023-05" }]],
      targets: { node: "current" },
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    alias({
      entries: {
        "@": resolve(__dirname, "../src"),
      },
    }),
    // terser(),
  ],
});
