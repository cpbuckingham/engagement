"use strict";
/*eslint no-undef: 0*/

const expect = require("chai").expect;
const app = require("../server");
const request = require("supertest")(app);

//tests to tests
describe("Test the test", function() {
  it("should pass the test", function() {
    expect(true).to.equal(true);
  });
});

//test for landing page
describe("Landing Page", function() {
  it("should display the landing page", function(done) {
    request.get("/")
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        expect(res.text).to.contain("login");
        done();
      });
  });
});
