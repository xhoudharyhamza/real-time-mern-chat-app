let express = require("express")
let Message = require("../models/messageModel")
let createMessage = async (req, res) => {
    let { message, sender, receiver } = req.body
    try {
        let newMessage = await new Message({
            message,
            sender,
            members: [sender, receiver]
        })
        if (await newMessage.save()) {
            res.status(200).json({ msg: newMessage })
        }
        else {
            res.status(404).jsn({ error: "Something went wrong!" })
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
let readAllMessages = async (req, res) => {
    let { firstId, secondId } = req.params
    try {
        let messages = await Message.find({ members: { $all: [firstId, secondId] } })
        res.status(200).json({ messages })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
module.exports = { createMessage, readAllMessages }