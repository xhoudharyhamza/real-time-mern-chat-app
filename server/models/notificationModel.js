let mongoose = require("mongoose")
let notificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    message: {
        type: "String",
        required: true,
    }
}, {
    timestamp: true
})
let Notification = mongoose.model("Notification", notificationSchema)
module.exports = Notification