const listRouter = require("express").Router();
const todoTasks = require("../models/todo.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const getTokenFrom = request => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

listRouter.get("/", async (request, response) => {
  const todos = await todoTasks
    .find({})
    .populate("user", { username: 1, name: 1 })
    .populate("subTasks", { title: 1, description: 1 });
  response.json(todos.map(todo => todo.toJSON()));
});

listRouter.get("/:id", async (request, response, next) => {
  try {
    const todo = await todoTasks.findById(request.params.id);
    if (todo) {
      response.json(todo.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

listRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (!body.title || !body.description) {
    response.status(400).json({
      error: "missing title or description"
    });
  }
  
  const token = getTokenFrom(request)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(body.userId);

    const todo = new todoTasks({
      title: body.title,
      description: body.description,
      completed: body.completed || false,
      user: user._id
    });
    const savedTodo = await todo.save();
    user.todos = user.todos.concat(savedTodo._id);

    await user.save();
    const result = await todoTasks.findById(savedTodo._id).populate("user", {
      username: 1,
      name: 1
    });
    response.json(result.toJSON());
  } catch (exception) {
    next(exception);
  }
});

listRouter.delete("/:id", async (request, response, next) => {
  try {
    if(!request.token || !request.token.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findOne({ username: request.token.username })
    

    const deletedTask = await todoTasks.findOneAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

listRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const new_todo = {
    title: body.title,
    description: body.description,
    completed: body.completed || false
  };

  try {
    const todo = await todoTasks.findByIdAndUpdate(request.params.id, new_todo);
    response.json(todo.toJSON());
  } catch (exception) {
    next(exception);
  }
});

listRouter.put("/:id/completed", async (request, response, next) => {
  const body = request.body;
  const completed_status = body.completed;
  const todoTask = await todoTasks.findById(request.params.id);
  todoTask.completed = completed_status;

  try {
    const updateTodo = await todoTasks.findByIdAndUpdate(
      request.params.id,
      todoTask
    );
    response.json(updateTodo.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = listRouter;
