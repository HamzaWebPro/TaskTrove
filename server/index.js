require("dotenv").config();
const express = require('express')

const routes = require("./routes")
var cors = require('cors');
const dbConnection = require("./config/dbConnection");
const app = express()


app.use(express.json())
app.use(cors())

    dbConnection()

app.use(routes)


app.listen(3000)