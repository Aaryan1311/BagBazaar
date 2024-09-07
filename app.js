const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

const db = require("./config/mongoose-connection");
const ownersRouter = require('./routers/ownersRouter');
const productsRouter = require('./routers/productsRouter');
const usersRouter = require('./routers/usersRouter');

db.on('connected', () => {
    console.log("Database connection established successfully.");
  });
  
  db.on('error', (err) => {
    console.error("Database connection error:", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);
