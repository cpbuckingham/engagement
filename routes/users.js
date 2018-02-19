"use strict";
/*eslint no-unused-vars: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const bcrypt = require("bcrypt");

function authorizedUser(req, res, next) {
  let userID = req.session.user.id;
  if (userID) {
    next();
  } else {
    res.send("You are not authorized");
  }
}

router.get("/summary", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function(user) {
    res.render("users/summary", {
      user: user
    });
  });
});

router.get("/project_forecasting", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function(user) {
    res.render("users/project_forecasting", {
      user: user
    });
  });
});

router.get("/project_revenue", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function(user) {
    res.render("users/project_revenue", {
      user: user
    });
  });
});

router.get("/product_backlog", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function(user) {
    res.render("users/product_backlog", {
      user: user
    });
  });
});

router.get("/staffing", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function(user) {
    res.render("users/staffing", {
      user: user
    });
  });
});

router.get("/:id", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  let pickeduserID = req.params.id;
  knex("users").where("id", userID).first().then(function(user) {
    knex("users").where("id", pickeduserID).first().then(function(pickedUser) {
    res.render("users/single", {
      user: user,
      pickedUser: pickedUser
      });
    });
  });
});

router.get("/:id/edit", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  let pickeduserID = req.params.id;
  knex("users").where("id", userID).first().then(function(user) {
    knex("users").where("id", pickeduserID).first().then(function(pickedUser) {
    res.render("users/edit", {
      user: user,
      pickedUser: pickedUser
    });
  });
  });
});


router.put("/:id", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  let editedUser = req.params.id;
  let hash = bcrypt.hashSync(req.body.password, 12);
  knex("users").where("id", editedUser).update({
    email: req.body.email,
    hashed_password: hash,
    avatar: req.body.avatar,
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  }).then(function() {
    res.redirect("/users/" + editedUser);
  });
});

module.exports = router;
