"use strict";
/*eslint no-unused-vars: 0*/
/*eslint no-undef: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const createAvatar = require("../public/javascripts/octodex_avatar");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");


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
    knex("employees").then(function(employees) {
      res.render("employees/home", {
        user: user,
        employees: employees,
      });
    });
  });
});

router.get("/new", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function(user) {
    knex("projects").then(function(projects) {
      res.render("employees/new", {
        user: user,
        projects: projects,
      });
    });
  });
});

router.get("/:id", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  let employeeID = req.params.id;
  knex("employees").where("id", employeeID).first().then(function(employee) {
    knex("users").where("id", userID).first().then(function(user) {
      res.render("employees/single", {
        user: user,
        employee: employee,
      });
    });
  });
});

router.delete("/:id", authorizedUser, function(req, res, next) {
  let employeeID = req.params.id;
  knex("employees").where("id", employeeID).del().then(function(deleted) {
    res.redirect("/admin");
  });
});

router.get("/:id/edit", authorizedUser, function(req, res, next) {
  let employeeID = req.params.id;
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function(user) {
  knex("employees").where("id", employeeID).first().then(function(employee) {
    knex.from("projects").innerJoin("employees", "projects.id", "employees.project_id").where("employees.id", employeeID).first().then(function(employees_project) {
      knex("projects").then(function(projects) {
        res.render("employees/edit", {
          employee: employee,
          user: user,
          projects: projects,
          employees_project: employees_project,
          });
        });
      });
    });
  });
});

router.post("/new", function(req, res, next) {
  let userID = req.session.user;
  let smtpTrans, mailOpts;
  knex("employees").where({
    email: req.body.email
  }).first().then(function(employee) {
    if (!employee) {
      createAvatar.generateAvatar(function(created_avatar) {
        return knex("employees").insert({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          username: req.body.username,
          avatar: created_avatar,
          user_id: userID.id,
          project_id: req.body.project,
          //password1
          hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",

        }).then(function() {
          res.redirect("/employees");
        });
      });
    } else {
      res.send("Something went wrong");
    }
  });
});

router.put("/:id", authorizedUser, function(req, res, next) {
  let employeeID = req.params.id;
  let hash = bcrypt.hashSync(req.body.password, 12);
  knex("employees").where("id", employeeID).update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    avatar: req.body.avatar,
    project_id: req.body.project,
    hashed_password: hash,

  }).then(function() {
    res.redirect("/employees");
  });
});

module.exports = router;
