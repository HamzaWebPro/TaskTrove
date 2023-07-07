const mongoose = require('mongoose');


const db = process.env.DB_URL

function dbConnection() {
    mongoose.connect(db)
  .then(() => console.log('DB Connected!'));
}


module.exports = dbConnection