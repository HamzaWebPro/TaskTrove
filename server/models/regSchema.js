const mongoose = require('mongoose');
const {Schema} = mongoose


const regSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    profession:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    avatar:{
        type:String,
    },
    created:{
        type:Date,
        require:true,
        default:Date.now
    },
    
   
})


module.exports = mongoose.model("User",regSchema)