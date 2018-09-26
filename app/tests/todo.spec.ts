import serverConfig from "../serverConfig";
// import Todo from "../Models/Todo.model";
const url = serverConfig.apiUrl;
const app = require("../server");
const request = require("supertest");

// a demo static id to create a new todo and then delete it in the testing.
const testTodoId = 1234;
let testTodo = {
  id: testTodoId,
  title: "Testing Todo",
  description: "Testing Todo Description",
  done: false
};
describe("Todo Rest API Tests", () => {
  // Create a new Todo
  describe("Create a new Todo", () => {
    it("should create a new todo and return it", async () => {
      const resp = await request(app)
        .post(`${url}/tasks`)
        .send(testTodo);
      expect(resp.status).toBe(200);
      // should return the same todo which we have just passed it to be created
      expect(resp.body).toEqual(
        expect.objectContaining({
          id: testTodo.id,
          title: testTodo.title,
          description: testTodo.description
        })
      );
    });
  });

  // get all todos
  describe("Get Todos", () => {
    it("Retrieve list of tasks", async () => {
      const res = await request(app).get(`${url}/tasks`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.arrayContaining([expect.objectContaining({})])
      );
    });
  });

  // get todo by id
  describe("Get TodoById", () => {

      it("checks if a specific task is being fetched properly", async () => {
        const resp = await request(app).get(`${url}/tasks/${testTodoId}`);
        expect(resp.status).toBe(200);
        expect(resp.body).toEqual(expect.objectContaining({}));
      });

      it("returns error if id is not found or invalid", async () => {
        let invalidId = "123123123";
        const resp = await request(app).get(`${url}/tasks/${invalidId}`);
        expect(resp.status).toBe(200);
        expect(resp.body).toEqual(
          expect.objectContaining({status: "error", message: "invalid id"})
        );
      });
  });

  // Update Todo
  describe("Update Todo", () => {
    it("should update the existing Todo", async () => {
      let todoToUpdate = {
        title: "update",
        description: "updated description",
        done: true
      };
      const resp = await request(app)
        .put(`${url}/tasks/${testTodoId}`)
        .send(todoToUpdate);
      let updatedTodo = resp.body.newTask;
      delete updatedTodo.id;
      expect(resp.status).toBe(200);
      expect(resp.body).toEqual(
        expect.objectContaining({ status: "ok", newTask: updatedTodo })
      );
    });
  });

  // Delete a Todo
  describe("Delete a Todo", () => {
    it("should delete the demo todo", async () => {
      const resp = await request(app).delete(`${url}/tasks/${testTodoId}`);
      expect(resp.body).toEqual(expect.objectContaining({ status: "ok" }));
    });
  });
});
