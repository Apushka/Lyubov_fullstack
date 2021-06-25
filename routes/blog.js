const express = require('express');
const router = express.Router();
const controller = require('./../controllers/blog');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth.middleware');


router.get('/', controller.getBlog);
router.get('/post/:postId?', controller.getPost);
router.put('/post/:postId?', upload.fields([
    { name: 'image'},   //maxCount: 3
    { name: 'video'},   //maxCount: 2
    { name: 'headerMedia', maxCount: 1}
]), auth, controller.createPost);

// router.post('/', upload.array('image', 3), auth, controller.createPost);
router.delete('/:postId?', auth, controller.deletePost);

router.patch('/post/:postId?', upload.fields([
    { name: 'image'},   //maxCount: 3
    { name: 'video'},   //maxCount: 2
    { name: 'headerMedia', maxCount: 1}
]), auth, controller.updatePost);
module.exports = router;