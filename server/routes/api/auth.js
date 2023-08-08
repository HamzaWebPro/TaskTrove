const express = require('express');
const registration = require('../../controllers/reg');
const login = require('../../controllers/login');
const getUser = require('../../controllers/getUsers');
const _ = express.Router()


_.post("/registration",registration)
_.post("/login",login)
_.get("/getUsers",getUser)


module.exports = _ ;