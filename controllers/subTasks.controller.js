const taskRouter = require("express").Router();
const subTasks = require("../models/subTasks.js");
const Todo = require("../models/todo.js");
const User = require("../models/user.js");

taskRouter.get("/", async (request, response) => {
  console.log(request.token);
  const subTodos = await subTasks
    .find({})
    .populate("user", { username: 1 })
    .populate("todos", { title: 1, description: 1 });

  response.json(subTodos.map(todo => todo.toJSON()));
});

taskRouter.get("/:id", async (request, response, next) => {
  try {
    const subTodo = await subTasks.findById(request.params.id);
    if (subTodo) {
      response.json(subTodo.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

taskRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (!body.title || !body.description) {
    response.status(400).json({
      error: "missing title or description"
    });
  }

  const parentTodo = await Todo.findById(body.todoId);
  const user = await User.findById(body.userId);

  const subTodo = new subTasks({
    title: body.title,
    description: body.description,
    completed: body.completed || false,
    todos: parentTodo._id,
    user: user._id
  });

  try {
    const savedSubTask = await subTodo.save();
    parentTodo.subTasks = parentTodo.subTasks.concat(savedSubTask._id);
    await parentTodo.save();
    response.json(savedSubTask.toJSON());
  } catch (exception) {
    next(exception);
  }
});

taskRouter.delete("/:id", async (request, response, next) => {
  try {
    const deletedTask = await subTasks.findByIdAndRemove(request.params.id);
    response.json(deletedTask.toJSON());
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

taskRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const new_todo = {
    title: body.title,
    description: body.description,
    completed: body.completed || false
  };

  try {
    const todo = await subTasks.findByIdAndUpdate(request.params.id, new_todo);
    response.json(todo.toJSON());
  } catch (exception) {
    next(exception);
  }
});

taskRouter.put("/:id/completed", async (request, response, next) => {
  const body = request.body;
  const completed_status = body.completed;
  const subTodoTask = await subTasks.findById(request.params.id);
  subTodoTask.completed = completed_status;

  try {
    const updateSubTask = await subTasks.findByIdAndUpdate(
      request.params.id,
      subTodoTask
    );
    response.json(updateSubTask.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = taskRouter;
