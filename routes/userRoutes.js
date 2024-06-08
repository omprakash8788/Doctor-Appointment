const express = require('express')
const { model } = require('mongoose')
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController } = require('../controllers/userControllers')
const authMiddleware = require('../middlewares/authMiddleware')

// here we create router objects
const router = express.Router()

// routes
//login and method should be post
router.post('/login', loginController)

// register and method should be post
router.post('/register', registerController)


// Home Auth  and method is post
router.post('/getUserData', authMiddleware, authController)

//Apply doctor and method is post
router.post('/apply-doctor', authMiddleware, applyDoctorController)


//Notification doctor and method is post
router.post('/get-all-notification', authMiddleware, getAllNotificationController)

module.exports=router