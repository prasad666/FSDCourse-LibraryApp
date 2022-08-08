const express = require("express");
const authorsRouter = express.Router(); //books router
const Authordata = require("../model/AuthorModel");

function router(nav) {
  authorsRouter.get("/", function (req, res) {
    Authordata.find().then(function (authors) {
      res.render("authors", {
        nav,
        title: "Authors",
        authors,
      });
    });
  });

  authorsRouter.get("/admin", function (req, res) {
    console.log(genres);
    res.render("addbook", {
      nav,
      title: "Add Book",
      genres,
    });
  });

  authorsRouter.post("/add", function (req, res) {
    var item = {
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
    };
    const book = new Bookdata(item);
    book.save();
    res.redirect("/books");
  });

  authorsRouter.get("/:id", function (req, res) {
    const ID = req.params.id;
    Bookdata.findOne({ _id: ID }).then(function (book) {
      res.render("book", {
        nav,
        title: "Books",
        book,
      });
    });
  });

  return authorsRouter;
}
module.exports = router;
