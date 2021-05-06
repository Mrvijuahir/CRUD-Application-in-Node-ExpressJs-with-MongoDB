const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    mobile :{
        type:Number,
        required:true
    },
    status:String
})

const Userdb = mongoose.model('Userdb',schema);

module.exports = Userdb;