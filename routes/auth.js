"use strict";
/*eslint no-unused-vars: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const bcrypt = require("bcrypt");

router.get("/employee_login", function(req, res, next) {
  res.render("auth/employee_login", {});
});
router.get("/user_login", function(req, res, next) {
  res.render("auth/user_login", {});
});

router.post("/employee_login", function(req, res, next) {
  knex("employees").where({
    username: req.body.username
  }).first().then(function(user) {
    if (!user) {
      res.send("No employee exists");
    } else {
      bcrypt.compare(req.body.password, user.hashed_password, function(err, result) {
        if (result) {
          req.session.user = user;
          res.clearCookie("registered");
          res.cookie("loggedin", true);
          res.redirect("/employee");
        } else {
          res.send("Something went wrong");
        }
      });
    }
  });
});

router.post("/user_login", function(req, res, next) {
  knex("users").where({
    username: req.body.username
  }).first().then(function(user) {
    if (!user) {
      res.send("No user exists");
    } else {
      bcrypt.compare(req.body.password, user.hashed_password, function(err, result) {
        if (result) {
          req.session.user = user;
          if (user.admin === true) {
            res.clearCookie("registered");
            res.cookie("loggedin", true);
            return res.redirect("/admin");
          }
          res.clearCookie("registered");
          res.cookie("loggedin", true);
          res.redirect("/users/summary");
        } else {
          res.send("Something went wrong");
        }
      });
    }
  });
});

router.get("/logout", function(req, res) {
  req.session = null;
  res.clearCookie("loggedin");
  res.redirect("/");
});

module.exports = router;
