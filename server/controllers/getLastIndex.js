const LastEditedIndex = require("../models/lastEditIndexSchema");

const getLastIndex = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the last edited index for the given user ID
    const lastEditedIndex = await LastEditedIndex.findOne({ userId });

    if (!lastEditedIndex) {
      res.status(404).json({ message: "Last index not found." });
    } else {
      res.status(200).json({ lastIndex: lastEditedIndex.lastIndex });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching last index." });
  }
};

module.exports = {
  getLastIndex,
};
