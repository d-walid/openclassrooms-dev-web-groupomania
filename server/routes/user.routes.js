const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth.controller');

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware');

// Routes
router.post('/register', authController.signUp);
router.post('/login', authController.login);


module.exports = router;