const express = require("express");
const getSubTaskRoutes = express.Router();
const { verifyToken } = require("../middleware/middleware.js");

// Require controller modules.
const { subTask } = require("../controllers/subTask.js");
const { getSubTask } = require("../controllers/getSubTask.js");
const { updateSubTask } = require("../controllers/updateSubTask.js");

getSubTaskRoutes.post("/", verifyToken, subTask);
getSubTaskRoutes.get("/", verifyToken, getSubTask);
getSubTaskRoutes.put("/:id", verifyToken, updateSubTask);
// subTaskRouter.   delete("/:id", deleteSubTasks);

module.exports = getSubTaskRoutes;
