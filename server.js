const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const setConnection = require("./config/connection");

const app = express();

const PORT = 5000;

setConnection()

app.use(express.json())// for body parse and get body from client

app.use("/api/contact", require('./routes/contactRoutes'));

app.use("/api/user",require("./routes/userRoutes"))

app.use(errorHandler); // handle error whenever throw new error then It will call

app.listen(PORT,()=>{
    console.log(`app is listening ${PORT}`)
})