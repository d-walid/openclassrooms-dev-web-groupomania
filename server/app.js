const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type', 'Authorization'],
  exposedHeaders: ['sessionId'],
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false
};

app.use(cors(corsOptions));

// Requests into JSON Object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes déclaration
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const authMiddleware = require('./middlewares/auth.middleware');

// Routes API
app.use('./uploads', express.static(path.join(__dirname, './uploads')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/jwtid', authMiddleware, (req, res) => {
  res.status(200).send(req.cookies.jwt);
});

module.exports = app;
