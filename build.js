const path = require("path");

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
