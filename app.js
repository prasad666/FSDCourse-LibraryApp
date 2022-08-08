const express = require("express");
const session = require("express-session");
const chalk = require("chalk");
const path = require("path");

const cors = require("cors");
const dotenv = require("dotenv");

const nav = [
  { link: "/books", title: "Books" },
  { link: "/authors", title: "Authors" },
  { link: "/books/admin", title: "Add Book" },
];

dotenv.config();

const booksRouter = require("./src/routes/bookRoutes")(nav);
const authorsRouter = require("./src/routes/authorRoutes")(nav);
const usersRouter = require("./src/routes/userRoutes")(nav);
const Bookdata = require("./src/model/BookModel");

const genres = require("./src/data/genres");

const app = new express(); //init a representative of express

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
  })
);

app.use(function (req, res, next) {
  // Make `user` and `authenticated` available in templates
  sess = req.session;
  res.locals.loggedIn = sess.loggedIn || false;
  console.log(sess);
  next();
});

//Setting the path for static files
app.use(express.static(path.join(__dirname, "/public")));
//Requesting for /books, use booksRouter
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);
app.use("/users", usersRouter);
//Setting up ejs engine and ejs file path
app.set("views", "./src/views");
app.set("view engine", "ejs");

//Routing
app.get("/", function (req, res) {
  Bookdata.find().then(function (books) {
    res.render("books", {
      nav,
      title: "Welcome to the Library!",
      books,
    });
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Listening to port " + chalk.green(process.env.PORT));
}); //creating a port
