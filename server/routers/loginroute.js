const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginControlers')
require('dotenv').config()


router.post('/signup',loginController.register)
router.post('/signin',loginController.login)
router.post('/loginfb',loginController.fblogin,loginController.fbaccespass)
router.get('/user',loginController.getUser)

module.exports = router
