const path = require("path");
const glob = require("glob");
const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");

const go = () => {
  const files = glob
    .sync(path.join(__dirname, "server/routes/**/*.svelte"))
    .map((file) => path.relative(__dirname, file));

  esbuild
    .build({
      entryPoints: files,
      bundle: true,
      platform: "node",
      outdir: "server/.routes",
      minify: true,
      plugins: [
        sveltePlugin({
          preprocessor: require("svelte-preprocess")({
            postcss: true,
            defaults: { style: "postcss" },
          }),
          compileOptions: {
            css: false,
            generate: "ssr",
          },
        }),
      ],
      logLevel: "info",
    })
    .catch(() => process.exit(1));
};

go();
