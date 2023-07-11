let mongoose = require("mongoose")
let userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { required: true, unique: true, type: String },
    password: { required: true, type: String },
    profilePicture:{required:true,type:String},
    timeStamp: { type: Date, required: true, default: Date.now }
})
let User = mongoose.model("User", userSchema)
module.exports = User