const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const sass = require("sass");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname,"public")))

// HTTP logger
app.use(morgan("combined"));

// Templte engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));
// console.log(path.join(__dirname,"scss"));
app.get("/", (req, res) => res.render("home"));
app.listen(port, () =>
  console.log(`Your server running at http://localhost:${port}`)
);
