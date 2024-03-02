// index.js
const express = require("express");
const router = express.Router();
const taskController = require("./controllers/task");
const subTaskController = require("./controllers/subTask");

router.post("/task", taskController.createTask);
router.post("/subtask", subTaskController.createSubTask);
router.get("/tasks", taskController.getAllUserTasks);
router.get("/subtasks", subTaskController.getAllUserSubTasks);
router.put("/task/:id", taskController.updateTask);
router.put("/subtask/:id", subTaskController.updateSubTask);
router.delete("/task/:id", taskController.deleteTask);
router.delete("/subtask/:id", subTaskController.deleteSubTask);

module.exports = router;
