const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model('Task',taskSchema);