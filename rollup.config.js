import sveltePreprocess from "svelte-preprocess";
import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-css-chunks";

export default {
  input: "src/main.js",
  output: {
    dir: "public",
    format: "esm",
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        defaults: {
          style: "postcss",
        },
        postcss: true,
      }),
      emitCss: false,
      compilerOptions: {
        // By default, the client-side compiler is used. You
        // can also use the server-side rendering compiler
        generate: "ssr",

        // ensure that extra attributes are added to head
        // elements for hydration (used with generate: 'ssr')
        hydratable: true,
      },
    }),
    resolve({ browser: true }),
    css({
      sourcemap: true,
    }),
  ],
};
