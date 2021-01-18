// const cssnano = require("cssnano");

const mode = process.env.NODE_ENV;
const dev = mode === "development";

module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-nesting"),
    require("tailwindcss"),
    !dev &&
      require("cssnano")({
        preset: ["default", { discardComments: { removeAll: true } }],
      }),
  ].filter(Boolean),
};
