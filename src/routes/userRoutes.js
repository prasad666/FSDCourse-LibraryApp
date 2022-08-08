const express = require("express");
const usersRouter = express.Router(); //books router
const Userdata = require("../model/UserModel");

function router(nav) {
  usersRouter.get("/login", function (req, res) {
    Userdata.find().then(function (books) {
      res.render("login", {
        nav,
        title: "Login",
        error: "",
      });
    });
  });

  usersRouter.get("/register", function (req, res) {
    res.render("register", {
      nav,
      title: "Sign Up",
    });
  });

  usersRouter.post("/register", function (req, res) {
    console.log(req);
    username = req.body.username;
    password = req.body.password;
    email = req.body.email;

    var item = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };

    const user = new Userdata(item);
    user.save();
    res.redirect("/users/login");
  });

  usersRouter.post("/login", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    sess = req.session;

    const user = Userdata.findOne({
      username: username,
      password: password,
    }).then(function (user) {
      console.log(user);
      if (user) {
        sess.loggedIn = true;
        res.redirect("/books/admin");
        return;
      }
      res.render("login", {
        nav,
        title: "Login",
        error: "Invalid username or password!",
      });
    });
  });

  return usersRouter;
}
module.exports = router;
