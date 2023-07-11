const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "User",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  message: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
