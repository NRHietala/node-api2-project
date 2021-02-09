const Posts = require("./posts-model");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
    .then(post => res.status(200).json(post))
    .catch(res =>
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" })
    );
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json({ post });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(error =>
      res
        .status(500)
        .json({ message: "The post information could not be retrieved" })
    );
});

router.post("/", (req, res) => {
  const newQuote = req.body;

  if (!newQuote.title || !newQuote.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Posts.insert(newQuote)
      .then(post => res.status(201).json(post))
      .catch(error =>
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        })
      );
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  if (!changes.title || !changes.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Posts.update(id, changes)
      .then(changes => res.status(200).json(changes))
      .catch(error =>
        res.status(400).json({ message: `Server Error: ${error.message}` })
      );
  }
});

router.delete("/:id", (req, res) => {
  Post.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The adopter has been nuked" });
      } else {
        res.status(404).json({ message: "The adopter could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the adopter",
      });
    });
});

module.exports = router;
