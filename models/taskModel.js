const mongoose = require("mongoose");

const tasksubSchema = new mongoose.Schema({
  name: String,
  id: String,
  isCompleted: Boolean,
});

const taskSchema = mongoose.Schema({
  active: [tasksubSchema],
  completed: [tasksubSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
