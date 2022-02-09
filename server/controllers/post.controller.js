const db = require('../models/index');
const token = require('../middlewares/token.middleware');
const fs = require('fs');

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
      console.log('file post ' + req.file);

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
        message: 'Your post has been created.'
      });
    } else {
      res.status(400).send({ error: 'Error user not found.' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

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

exports.updatePost = async (req, res) => {
  try {
    let newImageUrl;
    const userId = token.getUserIdFromToken(req);
    const isAdmin = await db.User.findOne({ where: { id: userId } });
    let post = await db.Post.findOne({ where: { id: req.params.id } });
    if (userId === post.UserId || isAdmin.isAdmin === true) {
      if (req.file) {
        newImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename
          }`;
        if (post.imageUrl) {
          const filename = post.imageUrl.split('/uploads/')[1];
          fs.unlink(`uploads/${filename}`, error => {
            if (error) console.log(error);
            else console.log(`${filename} deleted.`);
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
        message: 'Post updated.'
      });
    } else {
      res
        .status(400)
        .json({ message: 'You are not allowed to update this post.' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const userId = token.getUserIdFromToken(req);
    const isAdmin = await db.User.findOne({ where: { id: userId } });
    const post = await db.Post.findOne({ where: { id: req.params.id } });

    if (userId === post.UserId || isAdmin.isAdmin === true) {
      if (post.imageUrl) {
        const filename = post.imageUrl.split('/uploads/')[1];
        fs.unlink(`uploads/${filename}`, () => {
          db.Post.destroy({ where: { id: post.id } });
          res
            .status(200)
            .json({ message: `Post deleted with his image: ${filename}` });
        });
      } else {
        db.Post.destroy({ where: { id: post.id } }, { truncate: true });
        res.status(200).json({ message: 'Post deleted.' });
      }
    } else {
      res
        .status(400)
        .json({ message: 'You are not allowed to delete this post.' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.likeDislikePost = async (req, res) => {
  try {
    const userId = token.getUserIdFromToken(req);
    const postId = req.params.id;

    const user = await db.Like.findOne({
      where: { UserId: userId, PostId: postId }
    });
    if (user) {
      await user.destroy(
        {
          where: { UserId: userId, PostId: postId }
        },
        {
          truncate: true,
          restartIdentity: true
        }
      );
      res.status(200).send({ message: 'Post disliked.' });
    } else {
      await db.Like.create({
        UserId: userId,
        PostId: postId
      });
      res.status(201).send({ message: 'Post liked.' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
