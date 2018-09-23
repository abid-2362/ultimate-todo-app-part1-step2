import "mocha";

import * as assert from "assert";

const app = require("../app/server");
const request = require("supertest");
const should = require("should");

// describe("Test command", () => {
//   it("this is test", () => {
//     assert(2 + 4 === 6);
//   });
// });
let id = Math.ceil(Math.random() * 1000000);
// Get Todo
describe("Get Todos", () => {
  it("Retrieve list of tasks", async () => {
    const response = await request(app).get("/todo/api/v1.0/tasks");
    assert(response.status === 200);
  });
});

// Get a specific Todo
describe("GET a single Todo", function() {
  it("Retrieve a specific task", function(done) {
    request(app)
      .get("/todo/api/v1.0/tasks/"+id)
      .expect(200)
      .end(function(err, res) {
        done();
      });
  });
});

// Post
describe("Post Todo", () => {
  it("Create a new task", function(done) {
    request(app)
      .post("/todo/api/v1.0/tasks")
      .send({
        id: id,
        title: "test_title",
        description: "test_description"
      })
      .then(res => {
        res.statusCode.should.eql(200);
        done();
      })
      .catch(done);
  });
});

// PUT
describe("Update Todo", function() {
  it("Update an existing task", function(done) {
    request(app)
      .put("/todo/api/v1.0/tasks/"+id)
      .send({title: 'test update', description: 'updating testing', done: "true"})
      .expect(200)
      .end(function(err, res) {
        done();
      });
  });
});

// Delete
describe("DELTE Todo", function() {
  it("Delete an existing task", function(done) {
    request(app)
      .delete("/todo/api/v1.0/tasks/"+id)
      .expect(200)
      .end(function(err, res) {
        done();
      });
  });
});
