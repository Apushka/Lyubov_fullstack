const express = require('express');
const router = express.Router();
const controller = require('../controllers/portfolio');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth.middleware');

router.get('/', controller.getPortfolio);
router.put('/', upload.single('image'), auth, controller.addPhoto);
router.patch('/', upload.single('image'), auth, controller.updatePhoto);
router.delete('/:id?', auth, controller.deletePhoto);


module.exports = router;