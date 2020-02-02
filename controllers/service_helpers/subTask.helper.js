
const User = require("../../models/user.js");
const Todo = require("../../models/todo.js");
const Subtodos = require("../../models/subtodos");

let todoId = ''
let todoUser = ''

const subTaskById = async (id) => {
    const _subtasks = await Subtodos.findById(id);
    todoId = _subtasks.parentTodo[0].toString();
    return _subtasks
}

console.log('todoid here is', todoId);

const todoById = async (todoId) => {
    const todo = await Todo.findById(todoId);
    todoUser = todo.user[0].toString()
    return todo
}   

const updateSubTodo = async (id, task) => {
    const updateTodo = await SubTodo.findByIdAndUpdate(id, task);
    return updateTodo
}

const checkForAdminPrivileges = async (providedRole, AdminRole, User, next) => {
    if (providedRole.role !== AdminRole) {
        if(providedRole.id !== User){
          return response.status(401).json({ message: "Invalid user" });
        }
        next()
    }
}
// if (request.decrypted.role !== Admin) {
//     if(request.decrypted.id !== todoUser){
//       return response.status(401).json({ message: "Invalid user" });
//     }
//   }


module.exports = {subTaskById, todoById, todoId, todoUser, checkForAdminPrivileges }