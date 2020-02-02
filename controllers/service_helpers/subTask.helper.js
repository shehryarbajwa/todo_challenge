const Subtodos = require("../../models/subtodos");
const { Admin } = require("../../accessControl/tokenHelper/role.js");
const Todo = require("../../models/todo");


const checkforAdminSubtasks = async (request) => {
  const _subtodos = await Subtodos.findById(request.params.id);

  if (!_subtodos) {
    return response.status(404).json({ error: "subtodo does not exist" });
  }

  const todoId = _subtodos.parentTodo[0].toString();
  const todo = await Todo.findById(todoId);
  const todoUser = todo.user[0].toString();

  if (request.decrypted.role !== Admin) {
    if (request.decrypted.id !== todoUser) {
      return response.status(403).json({
        message: "The user doesnt have permission to access this request."
      });
    }
  }

  return todoId
};

module.exports = { checkforAdminSubtasks };
