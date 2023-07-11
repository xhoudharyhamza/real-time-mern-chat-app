let express=require("express")
let User= require("../models/userModel")
let bcrypt= require("bcrypt")
let registerUser= async(req,res)=>{
    let{name,username,password,profilePictureUrl}=req.body
    try {
        let existingUser= await User.findOne({username})
        if(existingUser){
            res.status(404).json({error:"User Already Exists"})
        }
        else{
            let hashPassword= await bcrypt.hash(password, 10)
            let newUser=await new User({name,username,password:hashPassword,profilePicture:profilePictureUrl})
            await newUser.save()
            res.status(200).json({user:newUser})
        }
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
let loginUsers= async(req,res)=>{
    try {
        let {username, password}=req.body
        let user= await User.findOne({username})
        if(user){
            let validPassword= await bcrypt.compare(password, user.password)
            if(validPassword){
                res.status(200).json({user})
            }
            else{
                res.status(404).json({error:"Invalid Password!"})
            }
        }
        else{
            res.status(404).json({error:"Invalid Username!"})
        }
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
let fetchAllUsers= async(req,res)=>{
    try {
        let users= await User.find()
        res.status(200).json({users})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
module.exports={registerUser,loginUsers,fetchAllUsers}