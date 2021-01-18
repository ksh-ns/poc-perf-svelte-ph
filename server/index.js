require("svelte/register");

const path = require("path");
const glob = require("glob");
const fastify = require("fastify")({ logger: true });

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "../static"),
});

const routes = glob
  .sync(path.join(__dirname, "routes**/*.svelte"))
  .map((file) => {
    const route = `/${path
      .relative(path.join(__dirname, "routes"), file)
      .replace(/\.svelte$/, "")
      .replace(/\/index$/, "")
      .replace(/^index$/, "")}`;
    const component = require(file).default;
    return { route, component };
  });

routes.forEach(({ route, component }) => {
  console.log(route);
  fastify.get(route, (req, res) => {
    const result = component.render();
    console.log("result :>> ", result);
    const { html, css, head } = result;

    res.type("text/html").send(`
      <html>
        <head>
          ${head}
          <style>${css.code}</style>
        </head>
        <body>${html}</body>
      </html>
    `);
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
