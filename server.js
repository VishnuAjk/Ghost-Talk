import express from 'express';
import { chatModel } from './chat.schema.js';
import { userModel } from './user.schema.js';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

export const app = express();
app.use(cors());
export const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods:['GET', 'POST']
    }
});
 
const connectedUsers = [];  

io.on('connection', (socket) => {
    console.log("Connection made.");

    socket.on('join', async(username)=>{  
    // Read the contents of the 'images' folder
    const imageFiles = fs.readdirSync(path.resolve('images'));
    // Select a random image from the folder
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    let imageUrl = `images/${randomImage}`;

    const checkUser = await userModel.findOne({username: username});
    if(!checkUser){
        const newUser = new userModel({
            username:username,
            imageURL:imageUrl,
            timestamp: new Date().getTime()
        });
        newUser.save();
    }
    
    socket.username = username;
    connectedUsers.push(username);
    socket.emit('welcome_user', username);

    // Emit the updated user list to all clients
    io.emit('userlist', { users: connectedUsers, count: connectedUsers.length });
    
    io.emit('typing', { username, typing: false })
    
    // get previous chats from DB to the client
    await chatModel.find().sort({timestamp:1}).limit(50)
    .then(messages=>{
    socket.emit('load_messages', messages);
    }).catch(err=>{
    console.log(err);
    })
    
    });
    
    socket.on('typing', (data) => {
        io.emit('userTyping', { username: socket.username, typing: data });
    });


    socket.on('sendMessage', async ({username, message})=>{
        try {
            // Validate input
            if (!username || !message) {
                throw new Error('Username and message are required.');
            } 
            
            const checkUser = await userModel.findOne({username : username});
            let imageUrl='';
            if(checkUser){
                imageUrl = checkUser.imageURL;
            }

            const dateObject = new Date();

            // Get hours, minutes, and seconds
            const hours = dateObject.getHours();
            const minutes = dateObject.getMinutes();
    

            // Format the time as HH:mm:ss
            const formattedTime = `${hours}:${minutes}`;

            const userMessage = new chatModel({
                username: username,
                text: message,
                timestamp: formattedTime,
                imageURL: imageUrl,
            });

            await userMessage.validate(); // Validate the schema

            await userMessage.save();
            io.emit('broadcast-message', userMessage);
        } catch (error) {
            console.error('Error sending message:', error.message);
            // You can emit an error event or handle it in a way that suits your application
            // For now, let's broadcast an error message to all clients
            socket.emit('broadcast-error', error.message);
        }
    });


    socket.on("disconnect", async () => {

        if (socket.username) {
            // Remove the disconnected user from the list
            const index = connectedUsers.indexOf(socket.username);
            if (index !== -1) {
                connectedUsers.splice(index, 1);
                // Emit the updated user list to all clients
                io.emit('userlist', { users: connectedUsers, count: connectedUsers.length });
            }
        }

        await userModel.deleteOne({username: socket.username});
        console.log("Connection disconnected.");
    });

})