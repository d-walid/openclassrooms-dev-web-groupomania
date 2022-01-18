const express = require('express');
const router = express.Router();



// Controllers
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');


// Middlewares
const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer.middleware');

// Routes CRUD
router.post('/register', authController.signUp);
router.post('/login', authController.login);
router.get('/:id', auth, userController.getUser);
router.get('/', auth, userController.getAllUsers);
router.put('/:id', auth, multer, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);


module.exports = router;