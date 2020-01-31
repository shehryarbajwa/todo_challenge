const subTasks = require("../../models/subtasks.js");
const User = require("../../models/user.js");
const Todo = require("../../models/todo.js");
const jwt = require("jsonwebtoken");

const getTokenFrom = request => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const getAllSubTasks = async (request, response, next) => {
  try {
    const subtasks = await subTasks
      .find({})
      .populate("user", { username: 1, name: 1 })
      .populate("todos", { title: 1, description: 1 });

    return response.json(todos.map(subtasks => subtasks.toJSON()));
  } catch (exception) {
    next(exception);
  }
};

const getSpecificSubTask = async (request, response, next) => {
  const token = getTokenFrom(request);
  try {
    const subtasks = await subTasks.findById(request.params.id)
      .populate("user", { username: 1, name: 1 })
      .populate("todos", { title: 1, description: 1 });
    
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const subTaskUserId = subTask.user.id

    if (!token || subTaskUserId !== decodedToken.todoAuth) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    if (subTask) {
      return response.json(subTask.toJSON());
    } else {
      return response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
};

const postSubTask = async (request, response, next) => {
  const body = request.body;

  if (!body.title || !body.description) {
    response.status(400).json({
      error: "missing title or description"
    });
  }

  const token = getTokenFrom(request);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.todoAuth);
    console.log(user);
    const todoId = user.todos.id
    console.log(user.todos)
    const userId = user.id.toString()
    const authId = userId

    if (!token || authId !== decodedToken.todoAuth) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const subtask = new subTasks({
      title: body.title,
      description: body.description,
      completed: body.completed || false,
      todoId: todoId,
      userId: userId
    });

    const savedSubTodo = await subtask.save();
    subTasks.user = subTasks.user.concat(savedSubTodo.user.id)
    user.subTasks = user.subTasks.concat(savedSubTodo.id);

    await user.save();
    const result = await subTasks
      .findById(savedSubTodo.id)
      .populate("todos", { title: 1})
      .populate("user", { username: 1});

    return response.json(result.toJSON());
  } catch (exception) {
    next(exception);
  }
};

const deleteSubTask = async (request, response, next) => {
  try {
    const toDeleteSubTask = await subTasks.findById(request.params.id);
    const deleteTodoUser = toDeleteSubTask.user.toJSON();

    if (!token || deleteTodoUser !== decodedToken.todoAuth) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const deletedSubTask = await Todo.findOneAndRemove(request.params.id);

    if (deletedSubTask) {
      return response
        .status(204)
        .send({ message: "SubTask deleted successfully" });
    } else {
      return response.status(400).json({
        error: `No SubTask with the following id: ${id}`
      });
    }
  } catch (exception) {
    next(exception);
  }
};

const updatedSubTask = async (request, response, next) => {
  const token = getTokenFrom(request);
  
  try {
    const body = request.body;
    const toUpdateSubTask = await SubTask.findById(request.params.id);
    const updatedSubTaskId = toUpdateSubTask.user.toJSON();
    const decodedToken = jwt.verify(token, process.env.SECRET);

    const new_subTodo = {
      title: body.title,
      description: body.description,
      completed: body.completed || false
    };
    const subtodo = await subTasks.findByIdAndUpdate(
      request.params.id,
      new_subTodo
    );
    const refreshSubTodo = await subTasks.findById(request.params.id);
    return response.json(refreshSubTodo.toJSON());
  } catch (exception) {
    next(exception);
  }
};

const markAsComplete = async (request, response, next) => {
  const body = request.body;
  const completed_status = body.completed;

  try {
    const subtodoTask = await subTasks.findById(request.params.id);
    subtodoTask.completed = completed_status;
    const updatedSubTodo = await subTasks.findByIdAndUpdate(
      request.params.id,
      todoTask
    );
    const renderSubTasks = await subTasks.findById(request.params.id);
    return response.json(renderSubTasks.toJSON());
  } catch (exception) {
    next(exception);
  }
};

module.exports = {
  getAllSubTasks,
  getSpecificSubTask,
  postSubTask,
  deleteSubTask,
  updatedSubTask,
  markAsComplete
};
