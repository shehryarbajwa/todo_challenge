const Todo = require("../../models/todo.js");
const { Admin} = require("../../accessControl/tokenHelper/role.js")


const checkforAdminRights = async (request) => {
    const todo = await Todo.findById(request.params.id);
    const todoUser = todo.user[0].toString();

    if (request.decrypted.role !== Admin) {
      if(request.decrypted.id !== todoUser){
        return response.status(403).json({ message: "The user doesnt have permission to access this request." });
      }
    }

    if (!todo) {
      return response.status(404).send({ message: "Todo does not exist" });
    }
}


module.exports = {checkforAdminRights }