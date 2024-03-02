// models/PriorityForTask.js
const mongoose = require("mongoose");

const priorityForTaskSchema = new mongoose.Schema({
  priority: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const PriorityForTask = mongoose.model(
  "PriorityForTask",
  priorityForTaskSchema
);

module.exports = PriorityForTask;
