const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const {Admin, UserRole} = require("../accessControl/tokenHelper/role.js")
const {authorizeTodos} = require("../accessControl/tokenHelper/authorize")
const {getAllUsers, getUsersById} = require("../controllers/controller_helpers/users.service.js")

//New user signup, Public Route
usersRouter.post("/signup", async (request, response, next) => {
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

    const emailValidate = body.email.split("@")[1]

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      email: body.email
    });

    if (emailValidate == 'commercebear.com'){
      user.role = Admin
    } else{
      user.role = UserRole
    }


    const savedUser = await user.save();

    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});


//Admin Route
usersRouter.get("/admin", authorizeTodos([Admin]), getAllUsers)

//For the currentUser who is loggedIn after jwt authorization
usersRouter.get("/:id", authorizeTodos([Admin, UserRole]), getUsersById)


module.exports = usersRouter;