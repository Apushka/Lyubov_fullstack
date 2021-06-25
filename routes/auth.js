const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')
const auth = require('../middleware/auth.middleware');

router.post('/login', controller.login)
router.delete('/login:email?', controller.logout)
router.post('/register', controller.register)

module.exports = router