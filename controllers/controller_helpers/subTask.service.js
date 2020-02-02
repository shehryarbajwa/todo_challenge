const User = require("../../models/user.js");
const Todo = require("../../models/todo.js");
const Subtodos = require("../../models/subtodos");
const { Admin } = require("../../accessControl/tokenHelper/role.js");

const getSpecificSubTask = async (request, response, next) => {
  try {
    const _subtodos = await Subtodos.findById(request.params.id);

    if (!_subtodos) {
      return response.status(404).json({ error: "subtodo does not exist" });
    }

    const todoId = _subtodos.parentTodo[0].toString();
    const todo = await Todo.findById(todoId);
    const todoUser = todo.user[0].toString();

    if (request.decrypted.role !== Admin) {
      if (request.decrypted.id !== todoUser) {
        return response.status(403).json({ message: "The user doesnt have permission to access this request." });
      }
    }

    const resultSubtodos = await Subtodos.findById(request.params.id)
    .populate("parentTodo", { title: 1 });

    if (resultSubtodos) {
      return response.json(resultSubtodos.toJSON());
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

  try {
    const user = await User.findById(request.decrypted.id);
    const todo = await Todo.findById(request.body.todoId);

    if (!todo) {
      return response.status(401).json({ message: "The todo doesn't exist" });
    }

    const subtask = new Subtodos({
      title: body.title,
      description: body.description,
      completed: body.completed || false,
      parentTodo: todo.id
    });

    const savedSubTodo = await subtask.save();

    user.subtodos = user.subtodos.concat(savedSubTodo.id);
    todo.subtodos = todo.subtodos.concat(savedSubTodo.id);

    await user.save();
    await todo.save();

    const resultSubtodos = await Subtodos.findById(
      savedSubTodo.id
    ).populate("parentTodo", { title: 1 });

    return response.json(resultSubtodos);
  } catch (exception) {
    next(exception);
  }
};

const deleteSubTask = async (request, response, next) => {
  try {
    const _subtasks = await Subtodos.findById(request.params.id);
    const todoId = _subtasks.parentTodo[0].toString();
    const todo = await Todo.findById(todoId);
    const todoUser = todo.user[0].toString();

    if (request.decrypted.role !== Admin) {
      if (request.decrypted.id !== todoUser) {
        return response.status(403).json({ message: "The user doesnt have permission to access this request." });
      }
    }

    const deletedSubTask = await Subtodos.findByIdAndDelete(request.params.id);
    if (deletedSubTask) {
      return response.status(204).send();
    } else {
      return response.status(404).json({
        error: `No SubTask with the following id: ${request.params.id}`
      });
    }
  } catch (exception) {
    next(exception);
  }
};

const updatedSubTask = async (request, response, next) => {
  try {
    const body = request.body;
    const _subtasks = await Subtodos.findById(request.params.id);
    const todoId = _subtasks.parentTodo[0].toString();
    const todo = await Todo.findById(todoId);
    const todoUser = todo.user[0].toString();

    if (request.decrypted.role !== Admin) {
      if (request.decrypted.id !== todoUser) {
        return response.status(403).json({ message: "The user doesnt have permission to access this request." });
      }
    }

    if (!todo) {
      return response.status(404).json({ error: "todoId doesnt exist" });
    }

    const new_subTodo = {
      title: body.title,
      description: body.description,
      completed: body.completed || false,
      parentTodo: todoId
    };

    const subtodo = await Subtodos.findByIdAndUpdate(
      request.params.id,
      new_subTodo
    );

    const refreshSubTodo = await Subtodos.findById(
      request.params.id
    ).populate("parentTodo", { title: 1, description: 1 });

    return response.json(refreshSubTodo);
  } catch (exception) {
    next(exception);
  }
};

const markAsComplete = async (request, response, next) => {
  const body = request.body;

  try {
    const _subtasks = await Subtodos.findById(request.params.id);
    const todoId = _subtasks.parentTodo[0].toString();
    const todo = await Todo.findById(todoId);
    const todoUser = todo.user[0].toString();

    if (request.decrypted.role !== Admin) {
      if (request.decrypted.id !== todoUser) {
        return response.status(403).json({ message: "The user doesnt have permission to access this request." });
      }
    }

    _subtasks.completed = body.completed;

    const updateSubTodo = await Subtodos.findByIdAndUpdate(
      request.params.id,
      _subtasks
    );

    const renderSubTasks = await Subtodos.findById(
      request.params.id
    ).populate("parentTodo", { title: 1 });

    return response.json(renderSubTasks.toJSON());
  } catch (exception) {
    next(exception);
  }
};

module.exports = {
  getSpecificSubTask,
  postSubTask,
  deleteSubTask,
  updatedSubTask,
  markAsComplete
};
