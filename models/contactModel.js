const mongoose = require("mongoose");

const contactModel = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    email: {
        type: String,
        required: [true, "Please enter email id"]
    },
    phone: {
        type: String,
        required: [true, "Please enter  phone number"]
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Contact", contactModel)