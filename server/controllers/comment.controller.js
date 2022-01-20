const db = require('../models/index');
const token = require('../middlewares/token.middleware');


exports.createComment = async (req, res) => {
  try {
    const username = req.body.username;
    const message = req.body.message;

    const newComment = await db.Comment.create({
      UserId: token.getUserIdFromToken(req),
      PostId: req.params.id,
      username: username,
      message: message,
    });

    res.status(201).json({
      newComment: newComment,
      message: 'Your comment has been published.',
    })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}


exports.deleteComment = async (req, res) => {
  try {
    const userId = token.getUserIdFromToken(req);
    const isAdmin = await db.User.findOne({ where: { id: userId } });
    const message = await db.Comment.findOne({ where: { id: req.params.id } });

    if (userId === message.UserId || isAdmin.isAdmin === true) {
      db.Comment.destroy({ where: { id: req.params.id } }, { truncate: true });
      res.status(200).json({ message: 'The comment has been deleted.' });
    } else {
      res.status(403).send({ error: 'You are not allowed to delete this comment.' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}