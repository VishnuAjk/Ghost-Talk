import mongoose from 'mongoose';

const userSchema= mongoose.Schema({

    username: String,
    imageURL: String,
    timestamp: Date,
});

export const userModel = mongoose.model('users', userSchema);
