const mongoose = require('mongoose')
const ChatSchema = new mongoose.Schema({
    Sender :{
        type:String,
        require :true
    },
    Receiver :{
        type : String,
        require :true
    },
    Messages :{
        type : String,
        require : true
    }
},{timestamps:true});
const ChatApp = mongoose.model('ChatApp',ChatSchema)
module.exports = ChatApp;