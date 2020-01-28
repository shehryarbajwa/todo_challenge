const Todo = require("../models/todo.js");
const User = require("../models/user.js")

const initialTodos = [
  {
    title: "Task -- 1",
    description: "Print Hello World",
    completed: false,
    subTasks: []
  },
  {
    title: "Task -- 2",
    description: "Use Jest for testing",
    completed: true,
    subTasks: []
  },
  {
    title: "Task -- 3",
    description: "Mocha.js",
    completed: false,
    subTasks: []
  },
  {
    title: "Task -- 4",
    description: "React.js",
    completed: false,
    subTasks: []
  },
  {
    title: "Task -- 5",
    description: "Node.js",
    completed: false,
    subTasks: []
  },
  {
    title: "Task -- 6",
    description: "Print Hello World",
    completed: false,
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
