const db = require('../models/index');
const token = require('../middlewares/token.middleware');
const fs = require('fs');

// Création d'une publication.
exports.createPost = async (req, res) => {
  const userId = token.getUserIdFromToken(req);
  let imageUrl;

  try {
    const user = await db.User.findOne({
      attributes: ['id', 'username', 'avatar'],
      where: { id: userId }
    });

    if (user !== null) {
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename
          }`;
      } else {
        imageUrl = null;
      }

      // Création d'une publication en incluant l'id, le pseudo et l'avatar de l'auteur.
      const post = await db.Post.create({
        include: [
          {
            model: db.User,
            attributes: ['id', 'username', 'avatar']
          }
        ],
        UserId: user.id,
        imageUrl: imageUrl,
        message: req.body.message,
        link: req.body.link
      });

      res.status(201).json({
        user: user,
        post: post,
        message: 'Votre publication a été créée.'
      });

    } else {
      res.status(400).send({ error: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


// Récupération d'une publication avec l'id passé en paramètre.
// Cette fonction permet également d'inclure les informations de l'utilisateur, les commentaires et les likes liés à la publication.
exports.getPostById = async (req, res) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.User,
          attributes: ['id', 'username', 'avatar']
        },

        {
          model: db.Like,
          attributes: ['UserId', 'PostId']
        },

        {
          model: db.Comment,
          attributes: ['UserId', 'username', 'message'],
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: db.User,
              attributes: ['username', 'avatar']
            }
          ]
        }
      ]
    });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


// Récupération de toutes les publications.
// Cette fonction permet également d'inclure les informations des utilisateurs, les commentaires et les likes liés aux publications.
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      attributes: ['id', 'message', 'imageUrl', 'link', 'createdAt'],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.User,
          attributes: ['id', 'username', 'avatar']
        },

        {
          model: db.Like,
          attributes: ['UserId']
        },

        {
          model: db.Comment,
          attributes: ['UserId', 'id', 'username', 'message'],
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: db.User,
              attributes: ['username', 'avatar']
            }
          ]
        }
      ]
    });
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


// Mise à jour d'une publication.
exports.updatePost = async (req, res) => {
  try {
    let newImageUrl;
    const userId = token.getUserIdFromToken(req);
    const isAdmin = await db.User.findOne({ where: { id: userId } });
    let post = await db.Post.findOne({ where: { id: req.params.id } });

    // Si l'utilisateur est l'auteur (ou un admin), on peut modifier la publication.
    // Cette fonction permet aussi de modifier et supprimer l'ancienne image du serveur si il y en a une.
    if (userId === post.UserId || isAdmin.isAdmin === true) {
      if (req.file) {
        newImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename
          }`;
        if (post.imageUrl) {
          const filename = post.imageUrl.split('/uploads/')[1];
          fs.unlink(`uploads/${filename}`, error => {
            if (error) console.log(error);
            else console.log(`${filename} supprimé.`);
          });
        }
      }

      if (req.body.message) {
        post.message = req.body.message;
      }

      post.link = req.body.link;
      post.imageUrl = newImageUrl;

      const newPost = await post.save({
        fields: ['message', 'link', 'imageUrl']
      });
      res.status(200).json({
        newPost: newPost,
        message: 'Publication mise à jour.'
      });
    } else {
      res
        .status(400)
        .json({ message: "Vous n'êtes pas autorisé à mettre à jour cette publication." });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


// Suppression d'une publication.
exports.deletePost = async (req, res) => {
  try {
    const userId = token.getUserIdFromToken(req);
    const isAdmin = await db.User.findOne({ where: { id: userId } });
    const post = await db.Post.findOne({ where: { id: req.params.id } });

    // Si l'utilisateur est l'auteur (ou un admin), on peut supprimer la publication.
    // Cette fonction permet aussi de supprimer l'image du serveur si il y en a une.
    if (userId === post.UserId || isAdmin.isAdmin === true) {
      if (post.imageUrl) {
        const filename = post.imageUrl.split('/uploads/')[1];
        fs.unlink(`uploads/${filename}`, () => {
          db.Post.destroy({ where: { id: post.id } });
          res
            .status(200)
            .json({ message: `Publication supprimée avec son image: ${filename}` });
        });
      } else {
        db.Post.destroy({ where: { id: post.id } }, { truncate: true });
        res.status(200).json({ message: 'Publication supprimée.' });
      }
    } else {
      res
        .status(400)
        .json({ message: "Vous n'êtes pas autorisé à supprimer cette publication." });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


// Permet à l'utilisateur de like ou d'enlever son like d'une publication.
exports.likeUnlikePost = async (req, res) => {
  try {
    const userId = token.getUserIdFromToken(req);
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    const user = await db.User.findOne({ where: { id: userId } });

    const like = await db.Like.findOne({
      where: { UserId: userId, PostId: post.id },
      include: [{
        model: db.Post,
        attributes: ['id', 'message'],
        include: [
          {
            model: db.User,
            attributes: ['id', 'username']
          },
        ]
      }]
    });

    if (!like) {
      await db.Like.create({
        UserId: userId,
        PostId: post.id,
        Post: {
          id: post.id,
          message: post.message,
          User: {
            id: post.UserId,
            username: user.username
          },
          Like: {
            UserId: userId,
            PostId: post.id
          }
        }
      });

      res.status(200).json({
        message: 'Vous avez aimé la publication.',
        Post: {
          id: post.id,
          message: post.message,
          User: {
            id: post.UserId,
            username: user.username,
          },
          Like: {
            UserId: userId,
            PostId: post.id
          }
        }
      });

    } else {
      await db.Like.destroy({ where: { UserId: userId, PostId: post.id } });
      res.status(200).json({
        message: "Vous n'aimiez plus la publication.",
        Post: {
          id: post.id,
          message: post.message,
          User: {
            id: post.UserId,
            username: user.username,
          },
          Like: {
            UserId: userId,
            PostId: post.id
          }
        }
      });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}


// Permet de récupérer tous les likes d'un utilisateur.
exports.getAllLikesFromUser = async (req, res) => {
  try {
    const userId = token.getUserIdFromToken(req);

    const likes = await db.Like.findAll({
      where: { UserId: userId },
      include: [
        {
          model: db.Post,
          attributes: ['id', 'message', 'imageUrl', 'link', 'createdAt'],
          include: [
            {
              model: db.User,
              attributes: ['id', 'username']
            },
          ]
        }
      ]
    });

    res.status(200).json({
      message: 'Likes récupérés.',
      likes: likes,

    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

