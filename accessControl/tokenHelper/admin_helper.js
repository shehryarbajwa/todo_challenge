
const User = require('../../models/user')

const fetchUserbyId = async (request, response) => {
const userbyId = await User.findById(request.params.id)
  .populate("todos", { title: 1, description: 1 })
  .populate("subTasks", { title: 1, description: 1 });
return response.json(userbyId)
};

const fetchAllTodos = async (request, response, next) => {
    const todos = await Todo.find({})
      .populate("user", { username: 1, name: 1 })
      .populate("subTasks", { title: 1, description: 1 });

    return response.json(todos.map(todo => todo.toJSON()));
}

const fetchSpecificTodo = async (request, response, next) => {
    const finalResult = await Todo.findById(request.params.id)
    .populate("user", { username: 1, name: 1 })
    .populate("subTasks", { title: 1, description: 1 })
    
    return response.json(finalResult.map(todo => todo.toJSON()));
}


module.exports = {fetchUserbyId, fetchAllTodos,fetchSpecificTodo}


