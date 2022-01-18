require('dotenv').config({ path: './config/.env' });
const db = require('../models/index');
const jwt = require('jsonwebtoken');
const fs = require('fs');


// Get one user by id
exports.getUser = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id },
    });
    res.status(200).send(user); // If the user exist, return the user
  } catch (error) {
    res.status(500).send({ error: 'Error getting user' })
  }
}


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: ['id', 'username', 'email', 'imageProfile', 'biography'],
    })
    res.status(200).send(users); // Send all users with the fields selected
  } catch (error) {
    res.status(500).send({ error: 'Error getting users' })
  }
}


// Update user
exports.updateUser = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
  const id = req.params.id;

  try {
    const userId = decodedToken.id;
    let newImageProfile;

    let user = await db.User.findOne({ where: { id: id } });
    if (userId === user.id) {
      if (req.file && user.imageProfile) {
        newImageProfile = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        const filename = user.imageProfile.split("/uploads")[1];
        fs.unlink(`uploads/${filename}`, (error) => {
          if (error) console.log(error);
          else {
            console.log(`File deleted : ${filename}`);
          }
        });
      } else if (req.file) {
        newImageProfile = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }

      if (newImageProfile) {
        user.imageProfile = newImageProfile;
      }

      if (req.body.biography) {
        user.biography = req.body.biography;
      }

      const newUser = await user.save({ fields: ['imageProfile', 'biography'] });
      res.status(200).json({
        message: 'User updated successfully',
        user: newUser
      });
    } else {
      res.status(400).json({ error: 'You are not allowed to do that.' })
    }
  } catch (error) {
    res.status(500).send({ error: 'Error updating user' })
  }
}


// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const user = await db.User.findOne({ where: { id: id } });
    if (user.imageProfile !== null) {
      const filename = user.imageProfile.split("/uploads")[1];
      fs.unlink(`uploads/${filename}`, () => {
        db.User.destroy({ where: { id: id } });
        res.status(200).json({ message: 'User deleted successfully with his image profile' });
      })
    } else {
      db.User.destroy({ where: { id: id } });
      res.status(200).json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Error deleting user' })
  }
}