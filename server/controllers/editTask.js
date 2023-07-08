const Task = require("../models/taskSchema");

const editTask = async (req, res) => {
  const { taskId, title, task } = req.body;

  try {
    // Find the task by ID
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, task },
      { new: true }
    );

    // Check if the task exists
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json({ message: "Task updated successfully.", task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: "Error updating task." });
  }
};

module.exports = editTask;