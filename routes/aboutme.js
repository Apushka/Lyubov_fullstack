const express = require('express');
const router = express.Router();
const controller = require('../controllers/aboutme')
const auth = require('../middleware/auth.middleware');

router.get('/', controller.getAboutMe);
router.patch('/', auth, controller.updateAboutMe);

module.exports = router;