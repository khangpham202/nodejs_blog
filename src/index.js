const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const route = require("./routes");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(express.json());

// HTTP logger
// app.use(morgan("combined"));

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

// Routes init
route(app);

app.listen(port, () =>
  console.log(`Your server running at http://localhost:${port}`)
);
