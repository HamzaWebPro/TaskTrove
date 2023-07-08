const mongoose = require("mongoose");

const lastEditedIndexSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  lastIndex: {
    type: String,
    required: true,
    default:0
  },
});

module.exports = mongoose.model("LastEditedIndex", lastEditedIndexSchema);
