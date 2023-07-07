const express = require('express')
const _ = express.Router()
const authRoutes = require("./auth.js")



_.use("/auth",authRoutes)


module.exports = _ ;