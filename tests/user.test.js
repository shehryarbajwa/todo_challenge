const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { initalUsers, usersInDb } = require("./test_helper")
const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});

    let todoObject = new User(initalUsers[0]);
    await todoObject.save();
  
    todoObject = new User(initalUsers[1]);
    await todoObject.save();
});

describe("retriving users", () => {
  test("returns 200 response", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns the correct number of users", async () => {
    const users = await api.get("/api/users");

    expect(users.body.length).toBe(initalUsers.length);
  });
});

describe("creating users", () => {
  test("creating users works correctly", async () => {
    const userToCreate = {
      name: "John Dior",
      username: "userName",
      password: "password",
      _id: 3
    };

    const createdUser = await api.post("/api/users").send(userToCreate);
    

    expect(createdUser.body.username).toBe(userToCreate.username);
  });

  test("username length less than 5 gets a 400 error", async () => {
    const userWithShortUserName = {
      username: "12",
      password: "12345"
    };

    const apiResponse = await api
      .post("/api/users")
      .send(userWithShortUserName);

    expect(apiResponse.status).toBe(400);
  });

  test("password length less than 5 characters gets a 400 error", async () => {
    const userWithShortUserName = {
        username: "Johndoer",
        password: "abcd"
      };
  
      const apiResponse = await api
        .post("/api/users")
        .send(userWithShortUserName);
  
      expect(apiResponse.status).toBe(400);
  })

});

afterAll(() => {
  mongoose.connection.close();
});