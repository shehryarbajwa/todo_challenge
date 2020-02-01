const taskRouter = require("express").Router();
const {authorizeTodos} = require("../accessControl/tokenHelper/authorize")
const {Admin, UserRole} = require("../accessControl/tokenHelper/role.js")
const {getSpecificSubTask, postSubTask, deleteSubTask, updatedSubTask, markAsComplete} = require("../controllers/controller_helpers/subTask.service.js")


//Get currentUser's active SubTodo tasks
taskRouter.get("/:id", authorizeTodos([Admin, UserRole]), getSpecificSubTask)

//Creating a new subTask by currentUser -- Requires Access Token
taskRouter.post("/", authorizeTodos([Admin, UserRole]), postSubTask)

//Delete a specific subTask --Requires Access Token
taskRouter.delete("/:id", authorizeTodos([Admin, UserRole]), deleteSubTask)

//Update a specific subTask --Requires Access Token
taskRouter.put("/:id", authorizeTodos([Admin, UserRole]), updatedSubTask)

//Mark as complete as specific SubTask --Requires Access Token
taskRouter.put("/:id/completed", authorizeTodos([Admin, UserRole]), markAsComplete)

module.exports = taskRouter;
