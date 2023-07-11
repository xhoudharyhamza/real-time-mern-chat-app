let express = require("express")
let router = express.Router()
let { createMessage, readAllMessages } = require("../controllers/messageControllers")
router.post("/messages", createMessage)
router.get('/messages/:firstId/:secondId', readAllMessages)
module.exports = router