const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name : String,
    age : Number,
    email : String,
    phone_no : Number,
    password : String

});

// const studentSchema = new mongoose.Schema({},{strict:false});
 module.exports= mongoose.model("Student",studentSchema)