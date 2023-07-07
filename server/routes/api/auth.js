const express = require('express');
const registration = require('../../controllers/reg');
const login = require('../../controllers/login');
const _ = express.Router()


_.post("/registration",registration)
_.post("/login",login)


module.exports = _ ;