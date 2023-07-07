const express = require('express')
const _ = express.Router()
const apiRoutes = require("./api")



_.use(apiRoutes)

_.use((req,res)=>res.json("No api found on this route"))


module.exports = _ ;