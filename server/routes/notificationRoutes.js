let express= require("express")
let router= express.Router()
let {getUserNotifications,deleteNotifications}= require('../controllers/notificationControllers')
router.get("/notifications/:_id", getUserNotifications)
router.delete("/notifications/:sender/:receiver", deleteNotifications)
module.exports=router