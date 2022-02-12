const express = require('express');
const router = express.Router();

// Controllers
const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');

// Middlewares
const multer = require('../middlewares/multer.middleware');

// Routes CRUD
router.post('/', multer, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', multer, postController.updatePost);
router.delete('/:id', postController.deletePost);
router.post('/:id/like', postController.likePost);
router.post('/:id/unlike', postController.unlikePost);
router.get('/:id/likes', postController.getAllLikesFromUser)



// Routes Comments
router.post('/:id/comment', commentController.createComment);
router.delete('/:id/comment', commentController.deleteComment);

module.exports = router;
