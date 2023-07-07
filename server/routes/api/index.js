const express = require('express')
const _ = express.Router()
const authRoutes = require("./auth.js")
const taskRoutes = require("./task.js")



_.use("/auth",authRoutes)
_.use("/task",taskRoutes)


module.exports = _ ;