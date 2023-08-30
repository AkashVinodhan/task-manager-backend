const { getTasks, updateTasks } = require("../controllers/taskController");
const verifyToken = require("../middlewares/auth");

const taskrouter = require("express").Router();

//get all tasks for a user
taskrouter.get("/all", verifyToken, getTasks);

//update tasks
taskrouter.put("/updateTasks", verifyToken, updateTasks);

module.exports = taskrouter;
