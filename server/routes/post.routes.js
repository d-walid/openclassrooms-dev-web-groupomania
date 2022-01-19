const express = require('express');
const router = express.Router();



// Controllers
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const postController = require('../controllers/post.controller');


// Middlewares
const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer.middleware');

// Routes CRUD
router.post('/', auth, multer, postController.createPost);
router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getPostById);
router.put('/:id', auth, multer, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;