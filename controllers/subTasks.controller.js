const taskRouter = require("express").Router();
const subTasks = require("../models/subTasks.js");
const Todo = require("../models/todo.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const getTokenFrom = request => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

//Admin Route
//Requires admin permission
taskRouter.get("/", async (request, response) => {
  const subTodos = await subTasks
    .find({})
    .populate("user", { username: 1 })
    .populate("todos", { title: 1, description: 1 });

  response.json(subTodos.map(todo => todo.toJSON()));
});


//Get currentUser's active SubTodo tasks
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

//Creating a new sub-todo by currentUser
//Requires active token
taskRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (!body.title || !body.description) {
    response.status(400).json({
      error: "missing title or description"
    });
  }
  const token = getTokenFrom(request);

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
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const savedSubTask = await subTodo.save();
    parentTodo.subTasks = parentTodo.subTasks.concat(savedSubTask._id);
    await parentTodo.save();
    response.json(savedSubTask.toJSON());
  } catch (exception) {
    next(exception);
  }
});


taskRouter.delete("/:id", async (request, response, next) => {
  const token = getTokenFrom(request);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const deletedTask = await subTasks.findByIdAndRemove(request.params.id);
    response.json(deletedTask.toJSON());
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

taskRouter.put("/:id", async (request, response, next) => {
  const token = getTokenFrom(request);
  const body = request.body;

  const new_todo = {
    title: body.title,
    description: body.description,
    completed: body.completed || false
  };

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const todo = await subTasks.findByIdAndUpdate(request.params.id, new_todo);
    const updatedTodo = await subTasks.findById(request.params.id)

    response.json(updatedTodo.toJSON());
  } catch (exception) {
    next(exception);
  }
});

taskRouter.put("/:id/completed", async (request, response, next) => {
  const token = getTokenFrom(request);
  const body = request.body;
  const completed_status = body.completed;
  const subTodoTask = await subTasks.findById(request.params.id);
  subTodoTask.completed = completed_status;

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const updateSubTask = await subTasks.findByIdAndUpdate(
      request.params.id,
      subTodoTask
    );
    const updatedSubtask = await subTasks.findById(request.params.id)

    response.json(updatedSubtask.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = taskRouter;
