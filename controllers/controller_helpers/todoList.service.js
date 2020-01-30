const Todo = require("../../models/todo");
const User = require("../../models/user.js")

const getAllTodos = async (request, response, next) => {
  try {
    const todos = await Todo.find({})
      .populate("user", { username: 1, name: 1 })
      .populate("subTasks", { title: 1, description: 1 });

    response.json(todos.map(todo => todo.toJSON()));
  } catch (exception) {
    next(exception);
  }
};

const getSpecificTodo = async (request, response, next) => {
  try {
    const todo = await Todo.findById(request.params.id);
    if (todo) {
      response.json(todo.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
};

const postTodo = async (request, response, next) => {
  const body = request.body;

  if (!body.title || !body.description) {
    response.status(400).json({
      error: "missing title or description"
    });
  }

  try {
    const user = await User.findById(body.userId);

    const todo = new Todo({
      title: body.title,
      description: body.description,
      completed: body.completed || false,
      user: user._id
    });
    const savedTodo = await todo.save();
    user.todos = user.todos.concat(savedTodo._id);

    await user.save();
    const result = await Todo.findById(savedTodo._id).populate("user", {
      username: 1,
      name: 1
    });
    response.json(result.toJSON());
  } catch (exception) {
    next(exception);
  }
};

const deleteTodo = async (request, response, next) => {
  try {
    const deletedTask = await Todo.findOneAndRemove(request.params.id);
    response.status(204).send({ message: "todo deleted successfully" });
  } catch (exception) {
    next(exception);
  }
};

const updateTodo = async (request, response, next) => {
  try {
    const body = request.body;

    const new_todo = {
      title: body.title,
      description: body.description,
      completed: body.completed || false
    };
    const todo = await Todo.findByIdAndUpdate(request.params.id, new_todo);
    const updatedTodo = await Todo.findById(request.params.id);
    response.json(updatedTodo.toJSON());
  } catch (exception) {
    next(exception);
  }
};

const markAsComplete = async (request, response, next) => {
  const body = request.body;
  const completed_status = body.completed;

  try {
    const todoTask = await Todo.findById(request.params.id);
    todoTask.completed = completed_status;
    const updateTodo = await Todo.findByIdAndUpdate(
      request.params.id,
      todoTask
    );
    const updatedTodo = await Todo.findById(request.params.id);
    response.json(updatedTodo.toJSON());
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
