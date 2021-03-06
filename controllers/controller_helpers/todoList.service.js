const Todo = require("../../models/todo");
const User = require("../../models/user.js");
const {checkforAdminRights} = require("../../controllers/service_helpers/todolist.helper.js")

const getSpecificTodo = async (request, response, next) => {
  try {
    await checkforAdminRights(request)

    const todoById = await Todo.findById(request.params.id)
      .populate("user", { username: 1, name: 1 })
      .populate("subtodos", { title: 1, description: 1 });

    if (todoById) {
      return response.json(todoById);
    } else {
      return response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
};

const postTodo = async (request, response, next) => {
  const body = request.body;

  if (!body.title || !body.description) {
    return response.status(400).json({
      error: "missing title or description"
    });
  }

  try {
    const user = await User.findById(request.decrypted.id);

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
      .populate("subtodos", { title: 1, description: 1 });

    return response.json(result.toJSON());
  } catch (exception) {
    next(exception);
  }
};

const deleteTodo = async (request, response, next) => {
  try {
    await checkforAdminRights(request)

    const deletedTask = await Todo.findByIdAndDelete(request.params.id);

    if (deletedTask) {
      return response
        .status(204)
        .send({ message: "todo deleted successfully" });
    } else {
      return response.status(404).json({
        error: `No Todo with the following id: ${id}`
      });
    }
  } catch (exception) {
    next(exception);
  }
};

const updateTodo = async (request, response, next) => {
  const body = request.body;

  try {
    await checkforAdminRights(request)

    const new_todo = {
      title: body.title,
      description: body.description,
      completed: body.completed || false,
      todoId: request.params.id
    };

    const updateTodoComplete = await Todo.findByIdAndUpdate(
      request.params.id,
      new_todo
    );

    const resultAfterUpdate = await Todo.findById(updateTodoComplete.id)
      .populate("user", { username: 1, name: 1 })
      .populate("subtodos", { title: 1, description: 1 });
    return response.json(resultAfterUpdate.toJSON());
  } catch (exception) {
    next(exception);
  }
};

const markAsComplete = async (request, response, next) => {
  const body = request.body;

  try {
    await checkforAdminRights(request)

    const todo = await Todo.findById(request.params.id)
    const completed_status = body.completed;
    todo.completed = completed_status;

    const updateTodo = await Todo.findByIdAndUpdate(
      request.params.id,
      todo
    );

    const resultAfterUpdate = await Todo.findById(request.params.id)
      .populate("user", { username: 1, name: 1 })
      .populate("subtodos", { title: 1, description: 1 });
    
    return response.json(resultAfterUpdate.toJSON());
  } catch (exception) {
    next(exception);
  }
};

module.exports = {
  getSpecificTodo,
  postTodo,
  deleteTodo,
  updateTodo,
  markAsComplete
};
