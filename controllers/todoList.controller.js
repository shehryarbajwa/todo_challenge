const todoRouter = require('express').Router()
const {authorizeTodos} = require('../accessControl/tokenHelper/authorize')
const {Admin, UserRole} = require("../accessControl/tokenHelper/role.js")
const { getSpecificTodo, postTodo, deleteTodo, updateTodo, markAsComplete } = require("./controller_helpers/todoList.service.js")


//Get specific Todo task

todoRouter.get("/:id", authorizeTodos([Admin, UserRole]), getSpecificTodo);

//Creating a new todo by currentUser --Requires Token
todoRouter.post("/", authorizeTodos([Admin, UserRole]), postTodo);

//Delete a currentTodo by the loggedIn User --Requires Token
todoRouter.delete("/:id", authorizeTodos([Admin, UserRole]), deleteTodo);

//Update a todo by the loggedIn User --Requires Token
todoRouter.put("/:id", authorizeTodos([Admin, UserRole]), updateTodo);

//Mark a todo as complete by a loggedIn user --Requires Token
todoRouter.put("/:id/completed", authorizeTodos([Admin, UserRole]), markAsComplete);

module.exports = todoRouter;
