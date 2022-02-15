const jwt = require('jsonwebtoken');
const db = require('../models/index');

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN,
      async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await db.User.findOne({
            where: {
              id: decodedToken.sub
            }
          });
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports.requireAuth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(
        token,
        process.env.JWT_SECRET_TOKEN,
        async (err, decodedToken) => {
          if (err) {
            res.status(401).json({ message: 'Non autorisé.' });
          } else {
            let user = await db.User.findOne({
              where: {
                id: decodedToken.sub
              }
            });
            res.locals.user = user;
            next();
          }
        }
      );
    } else {
      res.status(401).json({ message: error.stack });
    }
  } catch (error) {
    res.status(401).json({ message: 'Non autorisé.' });
  }
};
