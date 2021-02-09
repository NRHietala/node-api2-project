const express = require("express");
const server = express();
server.use(express.json());

const postRouter = require("./posts/posts-router");

server.use("/api/posts", postRouter);

server.use("*", (req, res) => {
  res.status(404).json({ message: "Resource not found (catch all)" });
});

module.exports = server;
