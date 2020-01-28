const Todo = require("../models/todo.js");
const User = require("../models/user.js")

const initialTodos = [
  {
    title: "Task -- 1",
    description: "Print Hello World",
    completed: false,
    userId: "5e306af2ac3149cfdf9bf184",
    id: "5e306bf0226306d0e9d8eda8",
    subTasks: []
  },
  {
    title: "Task -- 2",
    description: "Use Jest for testing",
    completed: true,
    userId: "5e306af1ac3149cfdf9bf182",
    id: "5e306bf0226306d0e9d8eda9",
    subTasks: []
  }
];

const initalUsers = [
  {
    name: "John Doe",
    username: "testuser",
    passwordHash: "password"
  },
  {
    name: "John Deer",
    username: "testuser2",
    passwordHash: "password"
  }
];


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const todosinDB = async () => {
  const todos = await Todo.find({});
  return todos.map(todo => todo.toJSON());
};

const userIdinDb = async () => {
  const users = await User.find({})
  return users.map(user => user.id)
}

module.exports = {
  initialTodos,
  todosinDB,
  initalUsers,
  usersInDb,
  userIdinDb
};
