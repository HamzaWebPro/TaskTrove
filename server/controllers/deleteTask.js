const Task = require("../models/taskSchema");

const deleteTask = async (req, res) => {
  const { taskId } = req.body;

  try {
    // Find the task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(taskId);

    // Check if the task exists
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task." });
  }
};

module.exports = deleteTask;