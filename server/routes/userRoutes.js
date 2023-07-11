const express = require("express");
const router = express.Router();
const {registerUser, loginUsers, fetchAllUsers}=require('../controllers/userControllers')
router.post("/signup", registerUser);
router.post("/login", loginUsers)
router.get("/users", fetchAllUsers)
module.exports = router;