"use strict";
/*eslint no-unused-vars: 0*/
/*eslint no-undef: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const nodemailer = require("nodemailer");

function authorizedUser(req, res, next) {
  let userID = req.session.user.id;
  if (userID) {
    next();
  } else {
    res.send("You are not authorized");
  }
}

router.get("/", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function(user) {
    knex("projects").then(function(projects) {
      res.render("projects/home", {
        user: user,
        projects: projects,
      });
    });
  });
});

router.get("/new", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function(user) {
    res.render("projects/new", {
      user: user
    });
  });
});

router.get("/:id", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  let projectID = req.params.id;
  knex("users").where("id", userID).first().then(function(user) {
    knex("projects").where("id", projectID).first().then(function(project) {
      knex("employees").where("project_id", projectID).then(function(employees) {
        res.render("projects/single", {
          user: user,
          project: project,
          employees: employees,
        });
      });
    });
  });
});

router.delete("/:id", function(req, res, next) {
  let projectID = req.params.id;
  knex("projects").where("id", projectID).del().then(function(deleted) {
    res.redirect("/admin");
  });
});

router.get("/:id/edit", authorizedUser, function(req, res, next) {
  let projectID = req.params.id;
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function(user) {
  knex("projects").where("id", projectID).first().then(function(project) {
    res.render("projects/edit", {
      project: project,
      user: user,
      });
    });
  });
});

router.post("/new", function(req, res, next) {
  let userID = req.session.user;
  let smtpTrans, mailOpts;
  knex("projects").where({
    name: req.body.name
  }).first().then(function(project) {
    if (!project) {
      return knex("projects").insert({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        user_id: userID.id,
      }).then(function() {
        res.redirect("/projects");
      });
    } else {
      res.send("Something went wrong");
    }
  });
});

router.put("/:id", authorizedUser, function(req, res, next) {
  let projectID = req.params.id;
  knex("projects").where("id", projectID).update({
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    avatar: req.body.avatar,
  }).then(function() {
    res.redirect("/projects");
  });
});

module.exports = router;
