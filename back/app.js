const express = require("express");
const db = require("./db");
const session = require("express-session");
const PgStore = require("connect-pg-simple")(session);
const routes = require('./routes');

const app = express();

app.use(express.json());
app.set("trust proxy", 1);
app.use(
  session({
    store: new PgStore({
      pool: db.pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "dev_secret_change_me",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 30 * 60 * 1000,
    },
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, Accept"
  );
  next();
});

app.get("/about", function (request, response) {
  console.log("about-get");
  response.send("nisho?");
});

// Mount routes
app.use('/', routes);

app.listen(4000);
