const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const Todo = require("./models/Todo");
const cors = require("cors");

//Database
const db = require("./config/Database");

// Test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

const app = express();

// Handlebars
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Cors
app.use(cors());

// Use json from the front end
app.use(express.json());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Index router
app.get("/", (req, res) => {
  res.send("Hi, there!");
});

// // Todo routes
app.use("/todos", require("./routes/todos"));

app.listen(3001, () => {
  console.log("running on port 3001");
});
