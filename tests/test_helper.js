const Todo = require("../models/todo.js");
const User = require("../models/user.js")
const Subtodos = require("../models/subtodos.js")


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

const subtodosinDb = async () => {
  const subtodos = await Subtodos.find({})
  return subtodos.map(subtodo => subtodo.toJSON())
}

const emptyDatabase = async() => {
  await User.remove({});
  await Todo.remove({});
  await Subtodos.remove({});
}

module.exports = {
  todosinDB,
  usersInDb,
  userIdinDb,
  subtodosinDb,
  emptyDatabase
};
