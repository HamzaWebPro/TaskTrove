const express = require('express');
const registration = require('../../controllers/reg');
const _ = express.Router()


_.post("/registration",registration)
// _.post("/login",login)


module.exports = _ ;