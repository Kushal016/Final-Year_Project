const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')

//* routing for GET requests
router.get('/', userController.home)
router.get('/result', userController.result)

//* routing for POST requests
router.post('/registration-page', userController.registration_page)
router.post('/register', userController.register)
router.post('/admin', userController.admin)
router.post('/voting', userController.voting)
router.post('/logout', userController.logout)



module.exports = router