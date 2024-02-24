import dotenv from 'dotenv';
dotenv.config();
import {server} from './server.js';
import {connectToDatabase} from './config/db.config.js' 
server.listen(process.env.PORT || 3000, () => {
    console.log("listening at " + process.env.PORT || 3000);
    connectToDatabase();
});