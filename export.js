const path = require("path");
const fs = require("fs");
const glob = require("glob");
const { minify } = require("html-minifier");

const routes = glob
  .sync(path.join(__dirname, "server/routes/**/*.svelte"))
  .map((file) => {
    const routeFile = path
      .relative(path.join(__dirname, "server/routes"), file)
      .replace(/\.svelte$/, "");

    const route = `${routeFile}.html`;
    const component = path.join(
      __dirname,
      "server/.routes/" + routeFile + ".js"
    );
    return { route, component };
  });

(() => {
  routes.forEach(({ route, component }) => {
    const render = require(component).default.render();
    const { html, css, head } = render;

    const result = minify(
      `<html>
          <head>
            ${head}
            <style>${css.code}</style>
          </head>
          <body>${html}</body>
        </html>`,
      { collapseWhitespace: true }
    );
    fs.writeFileSync(path.join(__dirname, "public", route), result, "utf-8");
  });
  console.log("done!");
})();
