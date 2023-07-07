const express = require('express');
const addTask = require("../../controllers/addTask");
const getTasksByUser = require('../../controllers/getTask');
const _ = express.Router()


_.post("/addtask",addTask)
_.post("/getTasks",getTasksByUser)




module.exports = _ ;