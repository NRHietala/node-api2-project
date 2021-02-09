const express = require("express");
const server = express();
server.use(express.json());

// make router

// maker router

server.use("*", (req, res) => {
  res.status(404).json({ message: "Resource not found" });
});
module.exports = server;
