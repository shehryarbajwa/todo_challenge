const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const Todo = require("../models/todo");
const Subtasks = require("../models/subtodos");
const { todosinDB, usersInDb, subtodosinDb, emptyDatabase } = require("./test_helper");
const api = supertest(app);


let subtodotoken = ''

describe("Tests for todoapp", () => {
  let token = "";
  let adminToken = "";
  beforeAll(async () => {
    await emptyDatabase();

    await api
      .post("/api/users/signup")
      .send({
        username: "test123",
        name: "test",
        email: "test",
        password: "test123"
      });

    await api
      .post("/api/users/signup")
      .send({
        username: "test234",
        name: "Admin",
        email: "test@commercebear.com",
        password: "test123"
      });

    const res1 = await api
      .post("/api/login")
      .send({ username: "test234", password: "test123" });

    const res = await api
      .post("/api/login")
      .send({ username: "test123", password: "test123" });

    token = "bearer " + res.body.token;
    subtodotoken = token
    adminToken = "bearer " + res1.body.token;
  });
  it("get a 400 response when the title or description is missing from the request", async () => {
    const todoWithoutTitle = {
      description: "Task --4"
    };

    await api
      .post("/api/todos")
      .set("Authorization", token)
      .send(todoWithoutTitle)
      .expect(400);
  });

  it("admin should access admin credentials", async () => {
    const res = await api
      .get("/api/users/admin")
      .set("Authorization", adminToken)
      .send();

    const allUsers = await usersInDb();
    expect(res.body.length).toBe(allUsers.length);
  });

  it("user should not access admin credentials", async () => {
    const res = await api
      .get("/api/users/admin")
      .set("Authorization", token)
      .send();

    expect(res.statusCode).toBe(401);
  });
  it("fails with statuscode 400 if malformatted string/todo doesnt exist", async () => {
    const nonExistingId = "123aabbcc";

    await api.get(`/api/todos/${nonExistingId}`).set("Authorization", token);
    expect(400);
  });

  it("should add a todo", async () => {
    const res = await api
      .post("/api/todos")
      .set("Authorization", token)
      .send({
        title: "Test2",
        description: "Description",
        completed: false
      });

    expect(res.body.title).toBe("Test2");
    expect(res.body.description).toBe("Description");
    expect(res.body.completed).toBe(false);
  });

  it("should add a second todo", async () => {
    const res = await api
      .post("/api/todos")
      .set("Authorization", token)
      .send({
        title: "Test3",
        description: "Description",
        completed: false
      });

    expect(res.body.title).toBe("Test3");
    expect(res.body.description).toBe("Description");
    expect(res.body.completed).toBe(false);
  });

  it("should update a todo", async () => {
    const completedUpdate = {
      title: "Task --1 Update",
      description: "Print wont work in JS",
      completed: false
    };

    const todos = await todosinDB();
    const todoId = todos.map(todo => todo.id);

    const updatedTodo = await api
      .put(`/api/todos/${todoId[0]}`)
      .set("Authorization", token)
      .send(completedUpdate);

    const todoAtEnd = await todosinDB();
    const title = todoAtEnd.map(todo => todo.title);

    expect(title).toContain(completedUpdate.title);
  });

  it("returns a specific todo", async () => {
    const todos = await todosinDB();
    const todoId = todos.map(todo => todo.id);

    const response = await api
      .get(`/api/todos/${todoId[0]}`)
      .set("Authorization", token)
      .send();
    
    expect(response.body.title).toBe(todos[0].title)
    expect(response.statusCode).toBe(200)
  });

  it("should mark a todo as completed", async () => {
    const todos = await todosinDB();
    const todoId = todos.map(todo => todo.id);

    const response = await api
      .put(`/api/todos/${todoId[0]}/completed`)
      .set("Authorization", token)
      .send({ completed: true });

    const todoAtEnd = await todosinDB();
    const todoAtEndCompleted = todoAtEnd.map(todo => todo)

    expect(todoAtEndCompleted[0].completed).toBe(true)
  });

  it("should mark complete as false for a todo", async () => {
    const todos = await todosinDB();
    const todoId = todos.map(todo => todo.id);

    const completedUpdate = { completed: false };
    const updatedTodo = await api
      .put(`/api/todos/${todoId[0]}/completed`)
      .set("Authorization", token)
      .send(completedUpdate)
      .expect(200);
    
    const todoAtEnd = await todosinDB();
    const todoAtEndCompleted = todoAtEnd.map(todo => todo)
  
    expect(todoAtEndCompleted[0].completed).toBe(false)
  });

  it("deleting a todo works accurately", async () => {
    const todos = await todosinDB();
    const todoToDelete = todos.map(todo => todo.id);
    const deletedTodo = await api
      .delete(`/api/todos/${todoToDelete[0]}`)
      .set("Authorization", token)
      .expect(204);

    const newTodos = await todosinDB();
    const contents = newTodos.map(todo => todo.title);

    expect(contents).not.toContain(todoToDelete[0].title);
  });
});

describe("Tests for subtasks", () => {
  it("should add a sub-todo", async () => {
    const todos = await todosinDB();
    const _todoId = todos.map(todo => todo.id);

    const res = await api
      .post("/api/subtasks")
      .set("Authorization", subtodotoken)
      .send({
        title: "Test2",
        description: "Description",
        completed: false,
        todoId: _todoId[0]
      });

    expect(res.body.title).toBe("Test2");
    expect(res.body.description).toBe("Description");
    expect(res.body.completed).toBe(false);
    expect(res.body.parentTodo[0].id).toBe(_todoId[0]);
  });

  it("should add a sub-todo", async () => {
    const todos = await todosinDB();
    const _todoId = todos.map(todo => todo.id);

    const res = await api
      .post("/api/subtasks")
      .set("Authorization", subtodotoken)
      .send({
        title: "Test3",
        description: "Description",
        completed: false,
        todoId: _todoId[0]
      });

    expect(res.body.title).toBe("Test3");
    expect(res.body.description).toBe("Description");
    expect(res.body.completed).toBe(false);
    expect(res.body.parentTodo[0].id).toBe(_todoId[0]);
  });

  it("should update a sub-todo", async () => {
    const todos = await todosinDB();
    const _todoId = todos.map(todo => todo.id);

    const subtodos = await subtodosinDb()
    const _subtodosId = subtodos.map(subtodo => subtodo.id);

    const completedSubtodo = {
      title: "Test-1 --Update",
      description: "updating a subtodo",
      completed: false,
      todoId: _todoId[0]
    };

    const updatedSubTodo = await api
      .put(`/api/subtasks/${_subtodosId[0]}`)
      .set("Authorization", subtodotoken)
      .send(completedSubtodo);

      const finalsubtodos = await subtodosinDb()
      expect(finalsubtodos[0].title).toContain(completedSubtodo.title);
  });

  it("returns a specific sub-todo", async () => {
    const subtodos = await subtodosinDb()
    const _subtodosId = subtodos.map(subtodo => subtodo.id);

    const response = await api
      .get(`/api/subtasks/${_subtodosId[0]}`)
      .set("Authorization", subtodotoken)
      .send();
    
    expect(response.body.title).toBe(subtodos[0].title)
    expect(response.statusCode).toBe(200)
  });
  
  it("should mark a subtodo as completed", async () => {
    const subtodos = await subtodosinDb();
    const subtodosId = subtodos.map(subtodo => subtodo.id);

    const response = await api
      .put(`/api/subtasks/${subtodosId[1]}/completed`)
      .set("Authorization", subtodotoken)
      .send({completed: true});

      const subtodosatEnd = await subtodosinDb();
      const subtodosatEndCompleted = subtodosatEnd.map(subtodo => subtodo)
    
      expect(subtodosatEndCompleted[1].completed).toBe(true)
  });

  it("should mark complete as false for a todo", async () => {
    const subtodos = await subtodosinDb();
    const subtodosId = subtodos.map(subtodo => subtodo.id);

    const completedUpdate = { completed: false };
    const updatedsubtodo = await api
      .put(`/api/subtasks/${subtodosId[0]}/completed`)
      .set("Authorization", subtodotoken)
      .send(completedUpdate)
      .expect(200);
    
    const subtodosatEnd = await subtodosinDb();
    const subtodosatEndCompleted = subtodosatEnd.map(subtodo => subtodo)
  
    expect(subtodosatEndCompleted[0].completed).toBe(false)
  });
  it("deleting a subtodo works accurately", async () => {
    const subtodos = await subtodosinDb();
    const subtodostoDelete = subtodos.map(subtodo => subtodo.id);
    
    const deletedSubtodo = await api
      .delete(`/api/subtasks/${subtodostoDelete[0]}`)
      .set("Authorization", subtodotoken)
      .expect(204);

    const newSubtodos = await subtodosinDb();
    const contents = newSubtodos.map(subtodo => subtodo.title);

    expect(contents).not.toContain(subtodostoDelete[0].title);
  });

});

afterAll(() => {
  mongoose.connection.close();
});
