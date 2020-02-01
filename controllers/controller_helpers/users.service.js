const User = require("../../models/user.js");


const getAllUsers = async (request, response, next) => {

  try {
    const allUsers = await User.find({})
      .populate("todos", { title: 1, description: 1 })
      .populate("subTasks", { title: 1, description: 1 });

    return response.json(allUsers);
  } catch (exception) {
    next(exception);
  }
};

const getUsersById = async (request, response, next) => {
  try {
    const userbyId = await User.findById(request.params.id)
      .populate("todos", { title: 1, description: 1 })
      .populate("subTasks", { title: 1, description: 1 });
    return response.json(userbyId);
  } catch (exception) {
    next(exception);
  }
};

module.exports = { getAllUsers, getUsersById };
