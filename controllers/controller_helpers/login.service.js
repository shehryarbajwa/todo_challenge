const jwt = require("jsonwebtoken");
const User = require("../../models/user.js");
const bcrypt = require("bcrypt");

const authenticate = async (request, response) => {
  const body = request.body;
  const user = await User.findOne({ username: body.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);
  if (user && passwordCorrect) {
    const token = jwt.sign(
      { sub: user._id, username: user.username, role: user.role },
      process.env.SECRET
    );

    const checkTodoId = request.body.todoId ? request.body.todoId : undefined
    return response.status(200).send({
      token,
      username: user.username,
      name: user.name,
      role: user.role,
      id: user._id,
      todoId: checkTodoId
    });
  } else {
    return response.status(401).json({ error: "invalid username or password" });
  }
};

module.exports = authenticate;
