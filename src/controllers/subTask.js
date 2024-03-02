const SubTask = require("../models/subTask");

exports.createSubTask = (req, res) => {
  const { task_id } = req.body;
  // Assuming req.user contains user information from JWT token
  const userId = req.user.id;

  // Create new subtask instance
  const newSubTask = new SubTask({
    task_id,
    user_id: userId, // assuming user_id is a foreign key in SubTask model
    status: 0, // Initial status when creating a subtask
  });

  // Save the subtask to the database
  newSubTask
    .save()
    .then((subtask) => {
      res.status(201).json(subtask);
    })
    .catch((err) => {
      console.error("Error creating subtask:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.getAllUserSubTasks = (req, res) => {
  const userId = req.user.id; // Assuming req.user contains user information from JWT token
  const { task_id } = req.query;
  // Add logic to filter subtasks based on task_id if provided

  // Example query
  SubTask.find({ user_id: userId })
    .then((subtasks) => {
      res.json(subtasks);
    })
    .catch((err) => {
      console.error("Error fetching subtasks:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.updateSubTask = (req, res) => {
  const subTaskId = req.params.id;
  const { status } = req.body;

  SubTask.findByIdAndUpdate(subTaskId, { status }, { new: true })
    .then((updatedSubTask) => {
      if (!updatedSubTask) {
        return res.status(404).json({ error: "Subtask not found" });
      }
      res.json(updatedSubTask);
    })
    .catch((err) => {
      console.error("Error updating subtask:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.deleteSubTask = (req, res) => {
  const subTaskId = req.params.id;

  SubTask.findByIdAndUpdate(
    subTaskId,
    { deleted_at: Date.now() },
    { new: true }
  )
    .then((deletedSubTask) => {
      if (!deletedSubTask) {
        return res.status(404).json({ error: "Subtask not found" });
      }
      res.json({ message: "Subtask deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting subtask:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
