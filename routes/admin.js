"use strict";
/*eslint no-unused-vars: 0*/
/*eslint no-undef: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const createAvatar = require("../public/javascripts/octodex_avatar");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

function authorizedAdmin(req, res, next) {
  let userID = req.session.user.admin === true;
  if (userID) {
    next();
  } else {
    res.send("You are not authorized");
  }
}

router.get("/", authorizedAdmin, function(req, res, next) {
  let adminID = req.session.user.id;
  knex("users").where("id", adminID).first().then(function(user) {
    knex("projects").then(function(projects) {
      knex("employees").then(function(employees) {
        knex("users").then(function(users) {
          res.render("admin/home", {
            user: user,
            employees: employees,
            projects: projects,
            users: users,
          });
        });
      });
    });
  });
});

router.get("/user/new", authorizedAdmin, function(req, res, next) {
  let adminID = req.session.user.id;
  knex("users").where("id", adminID).first().then(function(admin) {
    res.render("admin/new", {
      admin: admin,
    });
  });
});

router.get("/user/:id", authorizedAdmin, function(req, res, next) {
  let adminID = req.session.user.id;
  let userID = req.params.id;
  knex("users").where("id", userID).first().then(function(user) {
    knex("users").where("id", adminID).first().then(function(admin) {
      res.render("admin/single", {
        user: user,
        admin: admin,
        adminID: adminID,
      });
    });
  });
});

router.delete("/user/:id", function(req, res, next) {
  let userID = req.params.id;
  knex("users").where("id", userID).del().then(function(deleted) {
    res.redirect("/admin");
  });
});

router.get("/user/:id/edit", authorizedAdmin, function(req, res, next) {
  let adminID = req.session.user.id;
  let userID = req.params.id;
  knex("users").where("id", userID).first().then(function(user) {
    knex("users").where("id", adminID).first().then(function(admin) {
      res.render("admin/edit", {
        admin: admin,
        user: user,
      });
    });
  });
});

router.post("/user/new", function(req, res, next) {
  let adminID = req.session.user;
  let smtpTrans, mailOpts;
  knex("users").where({
    email: req.body.email
  }).first().then(function(user) {
    if (!user) {
      createAvatar.generateAvatar(function(created_avatar) {
        return knex("users").insert({
          first_name: req.body.first_name,
          admin: false,
          username: req.body.username,
          last_name: req.body.last_name,
          email: req.body.email,
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",
          avatar: created_avatar,
        }).then(function() {
          res.redirect("/admin");
        });
      });
    } else {
      res.send("user already in our system");
    }
  });
});

router.put("/user/:id", authorizedAdmin, function(req, res, next) {
  let userID = req.params.id;
  let hash = bcrypt.hashSync(req.body.password, 12);
  knex("users").where("id", userID).update({
    first_name: req.body.first_name,
    username: req.body.username,
    last_name: req.body.last_name,
    email: req.body.email,
    avatar: req.body.avatar,
    hashed_password: hash,
  }).then(function() {
    res.redirect("/admin");
  });
});

module.exports = router;
