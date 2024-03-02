const express = require("express");
const getTaskRoutes = express.Router();
const { verifyToken } = require("../middleware/middleware");

// Import controller for tasks

const { task } = require("../controllers/task.js");
const { getTask } = require("../controllers/getTask.js");
const { updateTask } = require("../controllers/updateTask.js");

getTaskRoutes.post("/", verifyToken, task);
getTaskRoutes.get("/", verifyToken, getTask);
getTaskRoutes.put("/:id", verifyToken, updateTask);

module.exports = getTaskRoutes;
