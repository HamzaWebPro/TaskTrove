const Task = require("../models/taskSchema");

const getCompletedTasks = async (req, res) => {
  try {
    // Find all tasks where isComplete is true
    const completedTasks = await Task.find({ isComplete: true });

    res.status(200).json(completedTasks);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving completed tasks." });
  }
};

module.exports = getCompletedTasks;
