const Task = require("../models/taskSchema");

const unCompleteTask = async (req, res) => {
  const { taskId } = req.body;

  try {
    // Find the task by ID and update the isComplete field
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { isComplete: false },
      { new: true }
    );

    // Check if the task exists
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json({ message: "Task marked as uncompleted.", task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: "Error completing task." });
  }
};

module.exports = unCompleteTask;