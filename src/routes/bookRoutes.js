const express = require("express");
const booksRouter = express.Router(); //books router
const Bookdata = require("../model/BookModel");
const genres = require("../data/genres");
//const multer = require("multer");
//const upload = multer({ dest: "../public/uploads/" });
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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

  booksRouter.post("/add", upload.single("image"), function (req, res) {
    var item = {
      title: req.body.title,
      author: req.body.author,
      image: `/uploads/${req.file.originalname}`,
    };
    console.log(req);
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
