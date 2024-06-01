const express = require("express"); //initalize express.
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


// 6  dotenv config
dotenv.config();

// mongodb connection
connectDB();


//1 create here rest object
const app = express();

//2 middlewares
app.use(express.json()); // so when you sent any obj in body you not get any error
app.use(morgan("dev"));

// routes
// Add here main routes of users
app.use('/api/v1/user', require('./routes/userRoutes'))


//5 listen port number , so go inside Doctor_App root and create file .env
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server Running at ${process.env.NODE_MODE} mode on port ${process.env.port}`
  );
});
