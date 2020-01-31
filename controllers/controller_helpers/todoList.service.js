const Todo = require("../../models/todo");
const User = require("../../models/user.js");
const jwt = require("jsonwebtoken");

const getTokenFrom = request => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const getAllTodos = async (request, response, next) => {
  const token = getTokenFrom(request);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const todos = await Todo.find({})
      .populate("user", { username: 1, name: 1 })
      .populate("subTasks", { title: 1, description: 1 });

    return response.json(todos.map(todo => todo.toJSON()));
  } catch (exception) {
    next(exception);
  }
};

const getSpecificTodo = async (request, response, next) => {
  const token = getTokenFrom(request);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const todo = await Todo.findById(request.params.id)

    todoId = todo.user.toString()

    if (!token || todoId !== decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const finalResult = await Todo.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("subTasks", { title: 1, description: 1 })

    if (finalResult) {
      return response.json(finalResult);
    } else {
      return response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
};

const postTodo = async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);

  if (!body.title || !body.description) {
    return response.status(400).json({
      error: "missing title or description"
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);

    const todo = new Todo({
      title: body.title,
      description: body.description,
      completed: body.completed || false,
      user: user.id
    });

    const savedTodo = await todo.save();
    user.todos = user.todos.concat(savedTodo.id);
    await user.save();

    const result = await Todo.findById(savedTodo.id)
      .populate("user", { username: 1, name: 1 })
      .populate("subTasks", { title: 1, description: 1 });

    return response.json(result.toJSON());
  } catch (exception) {
    next(exception);
  }
};

const deleteTodo = async (request, response, next) => {
  const token = getTokenFrom(request);
  try {
    const toDeleteTask = await Todo.findById(request.params.id);
    const deleteTodoUser = toDeleteTask.user.toString();
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || decodedToken.id !== deleteTodoUser) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const deletedTask = await Todo.findOneAndRemove(request.params.id);

    if (deletedTask) {
      return response
        .status(204)
        .send({ message: "todo deleted successfully" });
    } else {
      return response.status(400).json({
        error: `No Todo with the following id: ${id}`
      });
    }
  } catch (exception) {
    next(exception);
  }
};

const updateTodo = async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);

  try {
    const updatedTodo = await Todo.findById(request.params.id);

    const updatedTodoId = updatedTodo.user.toString();
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (updatedTodo.user.id === decodedToken.id) {
      print("Successful");
    }

    if (!token || updatedTodoId !== decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const new_todo = {
      title: body.title,
      description: body.description,
      completed: body.completed || false
    };
    const updateTodoComplete = await Todo.findByIdAndUpdate(
      request.params.id,
      new_todo
    );

    const resultAfterUpdate = await Todo.findById(updateTodoComplete.id)
      .populate("user", { username: 1, name: 1 })
      .populate("subTasks", { title: 1, description: 1 });
    return response.json(resultAfterUpdate.toJSON());
  } catch (exception) {
    next(exception);
  }
};

const markAsComplete = async (request, response, next) => {
  const token = getTokenFrom(request);
  const body = request.body;
  const completed_status = body.completed;

  try {
    const todoTask = await Todo.findById(request.params.id);
    const todoTaskId = todoTask.user.toString()
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || todoTaskId != decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    todoTask.completed = completed_status;
    const updateTodo = await Todo.findByIdAndUpdate(
      request.params.id,
      todoTask
    );

    const resultAfterUpdate = await Todo.findById(request.params.id)
      .populate("user", { username: 1, name: 1 })
      .populate("subTasks", { title: 1, description: 1 });
    return response.json(resultAfterUpdate.toJSON());
  } catch (exception) {
    next(exception);
  }
};

module.exports = {
  getAllTodos,
  getSpecificTodo,
  postTodo,
  deleteTodo,
  updateTodo,
  markAsComplete
};
