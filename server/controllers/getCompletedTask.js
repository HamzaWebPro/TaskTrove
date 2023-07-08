const Task = require("../models/taskSchema");

const getCompletedTasks = async (req, res) => {
  try {
    const { taskby } = req.body; // Assuming the user ID is sent in the request body

    // Find all tasks where userId matches and isComplete is true
    const completedTasks = await Task.find({ taskby, isComplete: true });

    res.status(200).json(completedTasks);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving completed tasks." });
  }
};

module.exports = getCompletedTasks;