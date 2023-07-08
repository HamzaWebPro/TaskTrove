const express = require('express');
const addTask = require("../../controllers/addTask");
const getTasksByUser = require('../../controllers/getTask');
const editTask = require('../../controllers/editTask');
const deleteTask = require('../../controllers/deleteTask');
const completeTask = require('../../controllers/completeTask');
const unCompleteTask = require('../../controllers/unCompleteTask');
const getCompletedTasks = require('../../controllers/getCompletedTask');
const updateEditIndex = require('../../controllers/updateEditIndex');
const { getLastIndex } = require('../../controllers/getLastIndex');

const _ = express.Router()


_.post("/addtask",addTask)
_.post("/editTasks",editTask)
_.post("/deleteTask",deleteTask)
_.post("/getTasks",getTasksByUser)
_.post("/getlastindex",getLastIndex)
_.post("/completeTask",completeTask)
_.post("/unCompleteTask",unCompleteTask)
_.post("/updateTaskIndex",updateEditIndex)
_.get("/getCompletedTask",getCompletedTasks)




module.exports = _ ;