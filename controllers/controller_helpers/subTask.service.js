const subTasks = require("../../models/subtasks.js");
const User = require("../../models/user.js");
const Todo = require("../../models/todo.js");

const getAllSubTasks = async (request, response, next) => {
  try {
    const subtasks = await subTasks
      .find({})
      .populate("user", { username: 1, name: 1 })
      .populate("todos", { title: 1, description: 1 });

    response.json(todos.map(subtasks => subtasks.toJSON()));
  } catch (exception) {
    next(exception);
  }
};

const getSpecificSubTask = async (request, response, next) => {
  try {
    const subTask = await subTasks.findById(request.params.id);
    if (subTask) {
      response.json(subTask.toJSON());
    } else {
      response.status(404).end();
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
    const user = await User.findById(body.userId);
    const todo = await Todo.findById(body.todoId);

    const subtask = new subTasks({
      title: body.title,
      description: body.description,
      completed: body.completed || false,
      todoId: todo._id,
      user: user._id
    });
    const savedSubTodo = await subtask.save();
    user.todos = user.todos.concat(savedSubTodo._id);

    await user.save();
    const result = await subTasks.findById(savedSubTodo._id).populate("user", {
      username: 1,
      name: 1
    });
    response.json(result.toJSON());
  } catch (exception) {
    next(exception);
  }
};

const deleteSubTask = async (request, response, next) => {
  try {
    const deletedSubTask = await subTasks.findOneAndRemove(request.params.id);
    response.status(204).send({ message: "todo deleted successfully" });
  } catch (exception) {
    next(exception);
  }
};

const updatedSubTask = async (request, response, next) => {
  try {
    const body = request.body;

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
    response.json(refreshSubTodo.toJSON());
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
    response.json(renderSubTasks.toJSON());
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
