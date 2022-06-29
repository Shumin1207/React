const Sequelize = require("sequelize");
const db = require("../config/database");

const Todo = db.define("todo", {
  content: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Todo;
