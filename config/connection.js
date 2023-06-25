const mongoose = require("mongoose");
const setConnection  = async() =>{
    try {
        const connect = await mongoose.connect("mongodb+srv://admin:admin@nitin-my-contact-cluste.qnax7hq.mongodb.net/my-contact-database?retryWrites=true&w=majority");
    } catch (error) {
        console.log("-errrrror", error)
        
    }
}

module.exports = setConnection;