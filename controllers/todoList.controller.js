const todoRouter = require('express').Router()
const authorize = require("../accessControl/tokenHelper/authorize")
const { AdminRole, UserRole } = require("../accessControl/tokenHelper/role.js")
const { getAllTodos, getSpecificTodo, postTodo, deleteTodo, updateTodo, markAsComplete } = require("./controller_helpers/todoList.service.js")


//Admin Route
todoRouter.get("/", authorize(AdminRole), getAllTodos);
//Get specific Todo task

todoRouter.get("/:id", authorize(AdminRole, UserRole), getSpecificTodo);

//Creating a new todo by currentUser --Requires Token
todoRouter.post("/", authorize(AdminRole, UserRole), postTodo);

//Delete a currentTodo by the loggedIn User --Requires Token
todoRouter.delete("/:id", authorize(AdminRole, UserRole), deleteTodo);

//Update a todo by the loggedIn User --Requires Token
todoRouter.put("/:id", authorize(AdminRole, UserRole), updateTodo);

//Mark a todo as complete by a loggedIn user --Requires Token
todoRouter.put("/:id/completed", authorize(AdminRole, UserRole), markAsComplete);

module.exports = todoRouter;
