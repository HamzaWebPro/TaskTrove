const Task = require("../models/taskSchema");

const addTask = async (req, res) => {
  const { title, task, taskby } = req.body;

  // Check if taskTitle is empty
  if (!title) {
    return res.status(400).json({ error: "Task title is required." });
  }

  // Check if taskDescription is empty
  if (!task) {
    return res.status(400).json({ error: "Task description is required." });
  }

  // Check if taskTitle has more than 20 characters
  if (title.length > 30) {
    return res
      .status(400)
      .json({ error: "Task title should be less than or equal to 20 characters." });
  }

  try {
    // Create new task
    const newTask = new Task({
      taskby,
      title,
      task,
    });

    // Save the task
    await newTask.save();

    res.status(200).json({ message: "Task added successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error adding task." });
  }
};

module.exports = addTask;
