// here we can do database related configration.

const mongoose = require('mongoose');


const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongo database connected ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log(`Mongodb Server Issue ${error}`);
        
    }

}

module.exports=connectDB;

// and called this inside server.js file
