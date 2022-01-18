const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: './config/.env' });
const db = require('../models/index');


// Create a user
exports.signUp = async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (username == null || email == null || password == null ||
    username === '' || email === '' || password === '') {
    return res.status(400).json({
      error: 'You must provide all the required information asked.'
    })
  }

  if (username.length <= 2) {
    return res.status(400).json({ error: 'Your username must contain at least 3 characters.' })
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Your email is not valid.' })
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Your password must contain at least 6 characters.' })
  }

  try {
    const user = await db.User.findOne({
      where: { email: req.body.email },
    });

    if (user !== null) {
      if (user.username === req.body.username || user.email === req.body.email) {
        return res.status(400).json({ error: 'Username/Email already taken' })
      }
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = await db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        isAdmin: false,
      });

      res.status(201).send({
        message: 'User created successfully',
        user: newUser
      });
    }
  } catch (error) {
    res.status(500).send({
      error: 'Error creating user'
    });
  }
}


// Login a user
exports.login = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { email: req.body.email }
    });

    if (user === null) {
      return res.status(403).send({ error: 'Connection failed.' }) // If the user doens't exist, return a connection error
    } else {
      const hash = await bcrypt.compare(req.body.password, user.password);

      if (!hash) {
        return res.status(401).send({ error: 'Username/Password incorrect.' }) // If the body.password !== user.password, return a wrong username/password error
      } else {
        res.status(200).send({
          user: user,
          token: jwt.sign({ id: user.id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '1h' }),
          message: 'Successful connection.'
        });
      }
    }
  } catch (error) {
    return res.status(500).send({ error: 'Error login.' })
  }
}
