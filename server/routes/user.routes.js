const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

// Middlewares
const multer = require('../middlewares/multer.middleware');

// Routes Auth
router.post('/register', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Routes User
router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
router.put('/upload/:id', multer, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
