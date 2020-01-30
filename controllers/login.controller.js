const loginRouter = require('express').Router()
const authenticate = require("../controllers/controller_helpers/login.service.js")

//Authenticate the user once they have signed up.
loginRouter.post("/", authenticate)


module.exports = loginRouter;