const User = require("../../models/user.js");

const getAllUsers = async (request, response, next) => {
  try {
    const allUsers = await User.find({})
    .populate("todos", {title: 1, description: 1})
    .populate("subTasks", {title: 1, description: 1})

    return response.json(allUsers);
  } catch (exception) {
    next(exception);
  }

  //   const allUsers = await User.find({}).populate({
  //   path: "todos",
  //   select: { title: 1, description: 1 },
  //   populate: { path: "subTasks", select: { title: 1, description: 1 } }
  // });

  // if (allUsers) {
  //   try {
  //     response.json(allUsers);
  //   } catch (exception) {
  //     next(exception);
  //   }
  // } else {
  //   response.json(401).send({ error: "not authorized" });
  // }
};

const getUsersById = async (request, response, next) => {
  try {
    const userbyId = await User.findById(request.user._id)
    .populate("todos", {title: 1, description: 1})
    .populate("subTasks", {title: 1, description: 1})
    return response.json(userbyId);
  } catch (exception) {
    next(exception);
  }
};

module.exports = { getAllUsers, getUsersById };
