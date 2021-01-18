const path = require("path");
const glob = require("glob");
const { minify } = require("html-minifier");

function build() {
  const app = require("fastify")({ logger: true });

  app.register(require("fastify-static"), {
    root: path.join(__dirname, "../static"),
  });

  const routes = glob
    .sync(path.join(__dirname, "routes/**/*.svelte"))
    .map((file) => {
      const routeFile = path
        .relative(path.join(__dirname, "routes"), file)
        .replace(/\.svelte$/, "");

      const route = `/${routeFile
        .replace(/\/index$/, "")
        .replace(/^index$/, "")}`;
      const component = path.join(__dirname, ".routes/" + routeFile + ".js");
      return { route, component };
    });

  routes.forEach(({ route, component }) => {
    app.get(route, async (req, res) => {
      const result = require(component).default.render();
      const { html, css, head } = result;

      res.type("text/html").send(
        minify(
          `<html>
          <head>
            ${head}
            <style>${css.code}</style>
          </head>
          <body>${html}</body>
        </html>`,
          { collapseWhitespace: true }
        )
      );
    });
  });

  return app;
}

module.exports = build;
