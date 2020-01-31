const Todo = require("../models/todo.js");
const User = require("../models/user.js")


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
  todosinDB,
  usersInDb,
  userIdinDb
};
