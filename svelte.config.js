module.exports = {
  preprocess: require("svelte-preprocess")({
    defaults: {
      style: "postcss",
    },
    postcss: true,
  }),
  emitCss: false,
  compilerOptions: {
    generate: "ssr",
    hydratable: true,
  },
};
