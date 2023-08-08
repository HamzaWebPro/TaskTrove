const User = require("../models/regSchema");

const getUser = async (req, res) => {
 

  try {
    // Find tasks by taskby object ID
    const user = await User.find({ });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving tasks." });
  }
};

module.exports = getUser;