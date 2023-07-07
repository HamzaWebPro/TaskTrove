const Task = require("../models/taskSchema");

const getTasksByUser = async (req, res) => {
  const { taskby } = req.body;

  try {
    // Find tasks by taskby object ID
    const tasks = await Task.find({ taskby });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving tasks." });
  }
};

module.exports = getTasksByUser;