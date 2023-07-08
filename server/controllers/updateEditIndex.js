const Task = require("../models/taskSchema");
const LastEditedIndex = require("../models/lastEditIndexSchema");

const updateEditIndex = async (req, res) => {
  const { userId, lastIndex } = req.body;
  if(!userId){
    return res.send("noId")
  }
  if(!lastIndex){
    return res.send("noIndex")
  }

  try {
    let editedIndex = await LastEditedIndex.findOne({ userId });

    if (!editedIndex) {
      editedIndex = new LastEditedIndex({ userId, lastIndex });
      
    } else {
      editedIndex.lastIndex = lastIndex;
    }

    await editedIndex.save();

    res.status(200).json({ message: "Last index updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error updating last index." });
  }
};

module.exports = updateEditIndex;
