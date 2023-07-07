const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  task: {
    type: String,
    require: true,
  },
  taskby:{
    type:String,
    require: true,
  },
  created:{
    type:Date,
    default:Date.now()
  }
});

module.exports = mongoose.model("Task", taskSchema);
