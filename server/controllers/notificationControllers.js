let mongoose= require("mongoose")
let Notification= require('../models/notificationModel')
let getUserNotifications= async(req,res)=>{
    let {_id}=req.params
    try{
        let notifications= await Notification.find({receiver:_id})
        res.status(200).json({notifications})
    }catch(error){
        res.status(404).json({error:error.message})
    }
}
let deleteNotifications=async(req,res)=>{
    let {sender,receiver}=req.params
    try {
        let deleteNotifications= await Notification.deleteMany({sender,receiver})
        let notifications= await Notification.find()
        res.status(200).json({notifications})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
module.exports={getUserNotifications,deleteNotifications}