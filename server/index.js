require("svelte/register");

const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("static"));

const render = (req, res, path) => {
  const Page = require("./routes/" + path + ".svelte").default;

  const result = Page.render();
  console.log("result :>> ", result);
  const { html, css, head } = result;

  res.send(`
    <html>
      <head>
        ${head}
        <style>${css.code}</style>
      </head>
      <body>${html}</body>
    </html>
  `);
};

app.get("/", (req, res) => {
  render(req, res, "index");
});

app.get("/counter", (req, res) => {
  render(req, res, "counter");
});

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
