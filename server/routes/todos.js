const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../config/Database");
const Todo = require("../models/Todo");
const Sequelize = require("sequelize");
const cors = require("cors");
const Op = Sequelize.Op;

router.use(cors());
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Get todo list
router.get("/", (req, res) =>
  Todo.findAll({ raw: true })
    .then((todos) => {
      res.send(todos);
    })
    .catch((err) => console.log(err))
);

router.get("/:id", (req, res) => {
  const index = req.params.id;
  console.log(index);
  Todo.findAll({ where: { id: index } })
    .then((todos) => {
      res.send({
        todos,
      });
    })
    .catch((err) => console.log(err));
});

//Add an item
router.post("/add", (req, res) => {
  const content = req.body.content;
  Todo.create({
    content,
  })
    .then((todo) => res.redirect("/todos"))
    .catch((err) => console.log(err));
});

//delete an item
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Todo.destroy({
    where: { id: id },
  })
    .then((todo) => res.redirect("http://localhost:3000"))
    .catch((err) => console.log(err));
});

//update an item
router.put("/update", (req, res) => {
  const content = req.body.content;
  const id = req.body.id;
  console.log(content);
  Todo.update(
    { content: content },
    {
      where: { id: id },
    }
  )
    .then((todo) => res.redirect("http://localhost:3000"))
    .catch((err) => console.log(err));
});

module.exports = router;
