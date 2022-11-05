const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const moment = require("moment");
const { engine } = require("express-handlebars");
const path = require("path");

const route = require("./routes");
const db = require("./config/db");

// Connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride("_method"));

// HTTP logger
// app.use(morgan("combined"));

// Templte engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      formatDate: (createdAt, formatDate) => {
        return moment(createdAt).format(formatDate);
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
// console.log(path.join(__dirname,"scss"));

// Routes init
route(app);

app.listen(port, () =>
  console.log(`Your server running at http://localhost:${port}`)
);

// prettier --single-quote --trailing-comma all --tab-width 4 --write "src/**/*.{js,json,scss}
