const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Todo = require("../models/todo");
const {
  initialTodos,
  todosinDB,
  usersInDb
} = require("./test_helper");
const api = supertest(app);

beforeEach(async () => {
  await Todo.deleteMany({});

  const todoObjects = initialTodos.map(todo => new Todo(todo))
  const promiseArray = todoObjects.map(todo => todo.save())
  await Promise.all(promiseArray)
});

describe("when there are some initial todo items saved", () => {
  test("todos are returned as json", async () => {
    await api
      .get("api/todos")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all todos are returned", async () => {
    const response = await api.get("/api/todos");
    expect(response.body.length).toBe(initialTodos.length);
  });

  test("a specific todo is within the returned todos", async () => {
    const response = await api.get("/api/todos");
    const description = response.body.map(r => r.description);
    expect(description).toContain("Print Hello World");
  });
});

describe("viewing a specific todo", () => {
  test("succeeds with a valid id", async () => {
    const todosAtStart = await todosinDB();

    const todoToView = todosAtStart[0];

    const resultTodo = await api
      .get(`/api/todos/${todoToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultTodo.body).toEqual(todoToView);
  });
  test("fails with statuscode 400 if malformatted string/todo doesnt exist", async () => {
    const nonExistingId = "123aabbcc";

    await api.get(`/api/todos/${nonExistingId}`).expect(400);
  });
});

describe("saving a todo", () => {
  test("todo is saved correctly in the database", async () => {
    const users = await usersInDb()
    const userId = users.map(user => user.id)


    const newTodo = {
      title: "Todo Task -- 3",
      description: "Console.log() can be used for logging",
      completed: false,
      userId: userId[0]
    };

    await api
      .post("/api/todos")
      .send(newTodo)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const todoAtEnd = await todosinDB()
    expect(todoAtEnd.length).toBe(initialTodos.length + 1)

    const contents = todoAtEnd.map(todo => todo.title)
    expect(contents).toContain(newTodo.title)
  });

  test("get a 400 response when the title or url is missing from the request", async () => {
    const todoWithoutTitle = {
      description: "Task --4"
    };

    await api
      .post("/api/todos")
      .send(todoWithoutTitle)
      .expect(400);
  });
});

  describe("mark as complete a todo", () => {
    test("todo is marked as completed", async () => {
      const todos = await todosinDB()
      const todoId = todos.map(todo => todo.id)

      const completedInDb = todoId.completed
      const completedUpdate = { completed: !completedInDb };
      const updatedTodo = await api
        .put(`/api/todos/${todoId[0]}/completed`)
        .send(completedUpdate)
        .expect(200);
    });
  });

  describe("deleting a todo", () => {
    test("deleting a todo works accurately", async () => {
      const todos = await todosinDB()
      const todoToDelete = todos.map(todo => todo.id)
      const deletedTodo = await api.delete(`/api/todos/${todoToDelete[0]}`).expect(204)
      
      const newTodos = await todosinDB()
      const contents = newTodos.map(todo => todo.title)
      
      expect(contents).not.toContain(deletedTodo.title)
    });
  });

  describe("updating a todo", () => {
    test("updating a todo works accurately", async () => {
      const users = await usersInDb()
      const userId = users.map(user => user.id)

      const todos = await todosinDB()
      const todoId = todos.map(todo => todo.id)
      
      
      const completedUpdate = {
        title: "Task --1 Update",
        description: "Print wont work in JS",
        completed: false,
        userId: userId[0]
      };
      
      const updatedTodo = await api
        .put(`/api/todos/${todoId[0]}`)
        .send(completedUpdate);

      const todoAtEnd = await todosinDB()
      const title = todoAtEnd.map(todo => todo.title)

      expect(title).toContain(completedUpdate.title)

    });
  });

afterAll(() => {
  mongoose.connection.close();
});
