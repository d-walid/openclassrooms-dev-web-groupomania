const jwt = require('jsonwebtoken');
const db = require('../models/index');


module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, decodedToken) => {
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
  });
  } else {
    res.locals.user = null;
    next();
  }
}


module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log(err)
      } else {
        next();
      }
    });
  } else {
    console.log(err);
  }
}
