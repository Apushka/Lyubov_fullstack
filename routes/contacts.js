const express = require('express');
const router = express.Router();
const controller = require('../controllers/contacts');

router.post('/send', controller.sendEmail);

module.exports = router;