require('dotenv').config({ path: './config/.env' });
const db = require('../models/index');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { getUserIdFromToken } = require('../middlewares/token.middleware');

// Get one user by id
exports.getUser = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id }
    });
    res.status(200).send(user); // If the user exist, return the user
  } catch (error) {
    res.status(500).send({ error: 'Error getting user' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: ['id', 'username', 'email', 'avatar', 'biography', 'isAdmin']
    });
    res.status(200).send(users); // Send all users with the fields selected
  } catch (error) {
    res.status(500).send({ error: 'Error getting users' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userId = getUserIdFromToken(req);
    let newAvatar;

    let user = await db.User.findOne({ where: { id: id } });

    if (userId === user.id) {
      if (req.file && user.avatar) {
        newAvatar = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename
          }`;
        const filename = user.avatar.split('uploads')[1];

        fs.unlink(`uploads/${filename}`, error => {
          if (error) console.log(error);
          else {
            console.log(`File deleted : ${filename}`);
          }
        });
      } else if (req.file) {
        newAvatar = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename
          }`;
      }

      if (newAvatar) {
        user.avatar = newAvatar;
      }

      if (req.body.biography) {
        user.biography = req.body.biography;
      }

      const newUser = await user.save({ fields: ['avatar', 'biography'] });
      res.status(200).json({
        message: 'User updated successfully',
        user: newUser
      });
    } else {
      res.status(400).json({ error: 'You are not allowed to do that.' });
    }
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = getUserIdFromToken(req);
    console.log(id);

    const user = await db.User.findOne({ where: { id: id } });

    if (user.avatar !== null) {
      const filename = user.avatar.split('/uploads')[1];
      fs.unlink(`uploads/${filename}`, () => {
        db.User.destroy({ where: { id: id } });
        res.status(200).json({
          message: 'User deleted successfully with his image profile'
        });
      });
    } else {
      // delete user only if userId = user.id
      if (userId === user.id) {
        db.User.destroy({ where: { id: id } });
        res.status(200).json({
          message: 'User deleted successfully without his image profile'
        });
      } else {
        res.status(400).json({ error: 'You are not allowed to do that.' });
      }
    }
  } catch (error) {
    res.status(500).send({ error: 'Error deleting user' });
  }
};
