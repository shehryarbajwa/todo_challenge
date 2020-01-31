const todoRouter = require('express').Router()
const {authorizeTodos} = require('../accessControl/tokenHelper/authorize')
const { AdminRole, UserRole } = require("../accessControl/tokenHelper/role.js")
const { getAllTodos, getSpecificTodo, postTodo, deleteTodo, updateTodo, markAsComplete } = require("./controller_helpers/todoList.service.js")


//Admin Route
todoRouter.get("/", authorizeTodos(AdminRole), getAllTodos);
//Get specific Todo task

todoRouter.get("/:id", authorizeTodos(AdminRole, UserRole), getSpecificTodo);

//Creating a new todo by currentUser --Requires Token
todoRouter.post("/", authorizeTodos(AdminRole, UserRole), postTodo);

//Delete a currentTodo by the loggedIn User --Requires Token
todoRouter.delete("/:id", authorizeTodos(AdminRole, UserRole), deleteTodo);

//Update a todo by the loggedIn User --Requires Token
todoRouter.put("/:id", authorizeTodos(AdminRole, UserRole), updateTodo);

//Mark a todo as complete by a loggedIn user --Requires Token
todoRouter.put("/:id/completed", authorizeTodos(AdminRole, UserRole), markAsComplete);

module.exports = todoRouter;
