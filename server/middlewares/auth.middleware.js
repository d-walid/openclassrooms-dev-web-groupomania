const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN,
      async (err, decodedToken) => {
        if (err) {
          console.log(err);
        } else {
          next();
        }
      }
    );
  } else {
    console.log('No token found.');
  }
};
