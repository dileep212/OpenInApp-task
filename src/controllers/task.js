const Task = require("../models/Task");
const authMiddleware = require("../middleware/middleware");

exports.createTask = [
  authMiddleware,
  (req, res) => {
    // Check if req.user is defined and contains user information
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, description, due_date } = req.body;
    const userId = req.user.id;

    // Create new task instance
    const newTask = new Task({
      title,
      description,
      due_date,
      user_id: userId,
      status: "TODO",
    });

    // Save the task to the database
    newTask
      .save()
      .then((task) => {
        res.status(201).json(task);
      })
      .catch((err) => {
        console.error("Error creating task:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  },
];
r̥;
exports.getAllUserTasks = [
  authMiddleware,
  (req, res) => {
    const userId = req.user.id; // Assuming req.user contains user information from JWT token
    const { priority, due_date, page, limit } = req.query;
    // Add logic to filter tasks based on priority, due_date, pagination, etc.

    // Example query
    Task.find({ user_id: userId })
      .sort({ due_date: "asc" }) // Sort tasks by due date ascending
      .skip((page - 1) * limit) // Skip tasks based on pagination
      .limit(limit) // Limit number of tasks per page
      .then((tasks) => {
        res.json(tasks);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  },
];

exports.updateTask = [
  authMiddleware,
  (req, res) => {
    const taskId = req.params.id;
    const { due_date, status } = req.body;

    Task.findByIdAndUpdate(taskId, { due_date, status }, { new: true })
      .then((updatedTask) => {
        if (!updatedTask) {
          return res.status(404).json({ error: "Task not found" });
        }
        res.json(updatedTask);
      })
      .catch((err) => {
        console.error("Error updating task:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  },
];

exports.deleteTask = [
  authMiddleware,
  (req, res) => {
    const taskId = req.params.id;

    Task.findByIdAndUpdate(taskId, { deleted_at: Date.now() }, { new: true })
      .then((deletedTask) => {
        if (!deletedTask) {
          return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  },
];
