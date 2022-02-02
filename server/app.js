const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

// Requests into JSON Object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes déclaration
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

const { checkUser, requireAuth } = require('./middlewares/auth.middleware');

// Routes API
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.use('*', checkUser);
app.use('/jwtid', requireAuth, (req, res) => {
  res.status(200).send({
    jwt: req.cookies.jwt,
    user: res.locals.user.dataValues
  });
});

module.exports = app;
