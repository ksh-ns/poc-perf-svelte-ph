"use strict";

const build = require(".");

const app = build();

module.exports = async function (req, res) {
  await app.ready();
  app.server.emit("request", req, res);
};
