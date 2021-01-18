const path = require("path");
const glob = require("glob");
const fastify = require("fastify")({ logger: true });
const { minify } = require("html-minifier");

fastify.register(require("fastify-static"), {
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
  fastify.get(route, async (req, res) => {
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

(async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
