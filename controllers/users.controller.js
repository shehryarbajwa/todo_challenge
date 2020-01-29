const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

//New user signup
usersRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    if (!body.username || !body.password) {
        response.status(400).json({
          error: "missing username or password"
        })};

    if (body.username.length < 5){
        response.status(400).json({ error: "username length must be greater than 5 characters"})
    }

    if (body.password.length < 5){
        response.status(400).json({ error: "username length must be greater than 5 characters"})
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});
//For the currentUser who is loggedIn after jwt authorization
usersRouter.get("/:id", async (request, response, next) => {
    try{
        const user = await User.findById(request.params.id).populate('todos', { title: 1, description: 1 });
        response.json(user.toJSON());
    } catch (exception) {
        next(exception);
    }
})

module.exports = usersRouter;