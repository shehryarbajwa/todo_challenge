const User = require("../../models/user.js");
const Todo = require("../../models/todo.js");

const Subtodos = require("../../models/subtodos");

const getSpecificSubTask = async (request, response, next) => {
  try {
    const subtasks = await Subtodos.findById(
      request.params.id
    ).populate("parentTodo", { title: 1});

    if (subtasks) {
      return response.json(subtasks.toJSON());
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
      response.status(404).json({ error: "todoId does not exist" });
    }

    const subtask = new Subtodos({
      title: body.title,
      description: body.description,
      completed: body.completed || false,
      parentTodo: todo.id
    });

    const savedSubTodo = await subtask.save();

    user.subtodos = user.subtodos.concat(savedSubTodo.id)
    todo.subtodos = todo.subtodos.concat(savedSubTodo.id)

    await user.save()
    await todo.save()

    const resultSubtodos = await Subtodos.findById(savedSubTodo.id)
    .populate("parentTodo", { title: 1});

    return response.json(resultSubtodos);
  } catch (exception) {
    next(exception);
  }
};

const deleteSubTask = async (request, response, next) => {
  try {
    const deletedSubTask = await Subtodos.findByIdAndDelete(request.params.id);
    if (deletedSubTask) {
      return response
        .status(204)
        .send({ message: "SubTask deleted successfully" });
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
    const toUpdateSubTask = await Subtodos.findById(body.id);
    const todo = await Todo.findById(body.todoId);

    if (!todo) {
      return response.status(404).json({ error: "todoId doesnt exist" });
    }

    const new_subTodo = {
      title: body.title,
      description: body.description,
      completed: body.completed || false,
      todoId: body.todoId
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
    const subtodoTask = await Subtodos.findById(request.params.id);
    const completed_status = body.completed;
    subtodoTask.completed = completed_status;

    const updatedSubTodo = await Subtodos.findByIdAndUpdate(
      request.params.id,
      subtodoTask
    );
    const renderSubTasks = await Subtodos.findById(request.params.id)
    .populate("parentTodo", { title: 1})

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
