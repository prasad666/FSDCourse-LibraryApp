const express = require("express");
const booksRouter = express.Router(); //books router
const Bookdata = require("../model/BookModel");
const genres = require("../data/genres");

function router(nav) {
  booksRouter.get("/", function (req, res) {
    Bookdata.find().then(function (books) {
      res.render("books", {
        nav,
        title: "Books",
        books,
      });
    });
  });

  booksRouter.get("/admin", function (req, res) {
    sess = req.session;
    if (!sess.loggedIn) {
      res.redirect("/users/login");
      return;
    }

    res.render("addbook", {
      nav,
      title: "Add Book",
      genres,
    });
  });

  booksRouter.post("/add", function (req, res) {
    console.log(req);
    var item = {
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
    };
    const book = new Bookdata(item);
    book.save();
    res.redirect("/books");
  });

  booksRouter.get("/:id", function (req, res) {
    const ID = req.params.id;
    Bookdata.findOne({ _id: ID }).then(function (book) {
      res.render("book", {
        nav,
        title: "Books",
        book,
      });
    });
  });

  return booksRouter;
}
module.exports = router;
