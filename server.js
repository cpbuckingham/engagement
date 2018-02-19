"use strict";
/*eslint no-undef: 0*/
/*eslint no-console: 0*/

require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

const auth = require("./routes/auth");
const users = require("./routes/users");
const employees = require("./routes/employees");
const projects = require("./routes/projects");
const admin = require("./routes/admin");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieSession({
  secret: "SirTestALot",
}));
app.use(cookieParser());

app.use("/users", users);
app.use("/auth", auth);
app.use("/admin", admin);
app.use("/projects", projects);
app.use("/employees", employees);

app.listen(port, function() {
  console.log("Welcome to engagement_desk at port", port);
});

module.exports = app;
