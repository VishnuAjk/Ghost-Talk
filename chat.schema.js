import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

    username: {
        type:String,
        required: true
    },
    text: {
        type:String,
        required: true
    },
    
    timestamp : String,

    imageURL: String,
});

export const chatModel = mongoose.model('messages', chatSchema);