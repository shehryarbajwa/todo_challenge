const User = require("../../models/user.js")


const getAllUsers = async (request, response, next) => {
  
    const allUsers = await User.find({}).populate({
    path: "todos",
    select: { title: 1, description: 1 },
    populate: { path: "subTasks", select: { title: 1, description: 1 } }
  });

  if (allUsers) {
    try {
      response.json(allUsers);
    } catch (exception) {
      next(exception);
    }
  } else {
    response.json(401).send({ error: "not authorized" });
  }
};

const getUsersById = async (request, response, next) => {
  const userbyId = await User.findById(request.user._id).populate({
    path: "todos",
    select: { title: 1, description: 1 },
    populate: { path: "subTasks", select: { title: 1, description: 1 } }
  });
  return response.json(userbyId);
};

module.exports = { getAllUsers, getUsersById };
