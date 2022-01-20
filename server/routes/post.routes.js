const express = require('express');
const router = express.Router();


// Controllers
const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');

// Middlewares
const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer.middleware');

// Routes CRUD
router.post('/', auth, multer, postController.createPost);
router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getPostById);
router.put('/:id', auth, multer, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.post('/:id/like', auth, postController.likeDislikePost);

// Routes Comments
router.post('/:id/comment', auth, commentController.createComment);
router.delete('/comment/:id', auth, commentController.deleteComment);


module.exports = router;
