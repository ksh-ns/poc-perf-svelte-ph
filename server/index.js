(async () => {
  try {
    const app = require("./app")();
    await app.listen(3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
