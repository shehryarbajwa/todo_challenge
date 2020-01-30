const taskRouter = require("express").Router();
const authorize = require("../accessControl/tokenHelper/authorize")
const {AdminRole, UserRole} = require("../accessControl/tokenHelper/role.js")
const {getAllSubTasks, getSpecificSubTask, postSubTask, deleteSubTask, updatedSubTask, markAsComplete} = require("../controllers/controller_helpers/subTask.service.js")



//Admin Route
//Get All Subtasks --Requires Admin permission
taskRouter.get("/", authorize(AdminRole), getAllSubTasks)

//Get currentUser's active SubTodo tasks
taskRouter.get("/:id", authorize(AdminRole, UserRole), getSpecificSubTask)

//Creating a new subTask by currentUser -- Requires Access Token
taskRouter.post("/", authorize(AdminRole, UserRole), postSubTask)

//Delete a specific subTask --Requires Access Token
taskRouter.delete("/:id", authorize(AdminRole, UserRole), deleteSubTask)

//Update a specific subTask --Requires Access Token
taskRouter.put("/:id", authorize(AdminRole, UserRole), updatedSubTask)

//Mark as complete as specific SubTask --Requires Access Token
taskRouter.put("/:id/completed", authorize(AdminRole, UserRole), markAsComplete)

module.exports = taskRouter;
