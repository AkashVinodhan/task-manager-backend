const Task = require("../models/taskModel");

const getTasks = async (req, res) => {
  try {
    const currentUserId = req.user.id; //user set in auth
    const tasks = await Task.findOne({ user: currentUserId });
    res.send(tasks);
  } catch (error) {
    console.log(error);
  }
};

const updateTasks = async (req, res) => {
  try {
    const { active, completed } = req.body;
    // console.log(active, completed);
    const filter = { user: req.user.id };
    const update = { active, completed };
    const tasks = await Task.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.send(tasks);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getTasks, updateTasks };
