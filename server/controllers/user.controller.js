require('dotenv').config({ path: './config/.env' });
const db = require('../models/index');
const fs = require('fs');
const { getUserIdFromToken } = require('../middlewares/token.middleware');

// Récupère les informations d'un utilisateur.
exports.getUser = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id }
    });

    const likes = await db.Like.findAll({
      where: { userId: req.params.id },
      attributes: ['id', 'userId', 'postId'],
      include: [
        {
          model: db.Post,
          attributes: ['id', 'imageUrl', 'message', 'link']
        }
      ]
    });

    res.status(200).send({ user, likes });
  } catch (error) {
    res.status(500).send({ error: 'Une erreur est survenue.' });
  }
};


// Récupère les informations de tous les utilisateurs.
exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: ['id', 'username', 'email', 'avatar', 'biography', 'isAdmin']
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: 'Une erreur est survenue.' });
  }
};

// Mets à jour les informations d'un utilisateur (photo de profil, biographie)
exports.updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const userId = getUserIdFromToken(req);
    let newAvatar;
    let user = await db.User.findOne({ where: { id: id } });

    // Si l'utilisateur change son image, on supprime l'ancienne image.
    // Cette fonction permet également de mettre une nouvelle image si l'utilisateur n'en n'a pas.
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
        message: 'Utilisateur mis à jour avec succès.',
        user: newUser
      });
    } else {
      res.status(400).json({ error: "Vous n'êtes pas autorisé à effectuer cette action." });
    }
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
};

// Suppression d'un utilisateur.
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = getUserIdFromToken(req);
    const user = await db.User.findOne({ where: { id: id } });

    // Si l'utilisateur a un avatar, on le supprime également du serveur quand l'utilisateur est supprimé.
    if (user.avatar !== null) {
      const filename = user.avatar.split('/uploads')[1];
      fs.unlink(`uploads/${filename}`, () => {
        db.User.destroy({ where: { id: id } });
        res.status(200).json({
          message: 'Utilisateur supprimée avec succès (ainsi que sa photo de profil).'
        });
      });
    } else {

      // Si l'utilisateur n'a pas d'avatar, on supprime juste son compte (l'administrateur peut également supprimer son compte).
      if (userId === user.id || user.isAdmin === true) {
        db.User.destroy({ where: { id: id } });
        res.status(200).json({
          message: 'Utilisateur supprimée avec succès.'
        });
      } else {
        res.status(400).json({ error: "Vous n'êtes pas autorisé à effectuer cette action." });
      }
    }
  } catch (error) {
    res.status(500).send({ error: 'Une erreur est survenue.' });
  }
};
