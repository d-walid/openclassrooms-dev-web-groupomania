require('dotenv').config({ path: './config/.env' });
const bcrypt = require('bcrypt');
const token = require('../middlewares/token.middleware');
const db = require('../models/index');

// Créer un compte
exports.signUp = async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (
    username == null ||
    email == null ||
    password == null ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    return res.status(400).json({
      error: 'Vous devez remplir tous les champs concernés.'
    });
  }

  if (username.length <= 2) {
    return res.status(400).json({
      error: 'Le champ "Prénom et nom" doit contenir au minimum 3 caractères.'
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Votre email n'est pas valide." });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: 'Votre mot de passe doit contenir au minimum 6 caractères.'
    });
  }

  try {
    const user = await db.User.findOne({
      where: { email: req.body.email }
    });

    if (user !== null) {
      if (
        user.username === req.body.username ||
        user.email === req.body.email
      ) {
        return res
          .status(400)
          .json({ error: 'Cet email ou prénom/nom est déjà pris.' });
      }
    } else {
      // Création du compte en hashant le mot de passe.
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = await db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        isAdmin: req.body.isAdmin || false
      });

      const tokenObject = token.tokenGeneration(newUser);
      res.status(201).send({
        message: 'Utilisateur crée.',
        user: newUser,
        token: tokenObject.token,
        sub: tokenObject.sub,
        expires: tokenObject.expires
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
};

// Se connecter à un compte
exports.login = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { email: req.body.email }
    });

    if (user === null) {
      return res.status(403).send({ error: 'Connexion raté.' }); // Si l'utilisateur n'existe pas, renvoie une erreur.
    } else {

      const hash = await bcrypt.compare(req.body.password, user.password);
      if (!hash) {
        return res
          .status(200)
          .send({ error: 'Email et/ou mot de passe incorrect.' }); // Si le mot de passe est incorrect, renvoie une erreur.
      } else {
        const tokenObject = token.tokenGeneration(user);
        res.cookie('jwt', tokenObject.token, {
          httpOnly: true
        });
        res.status(200).send({
          user: user,
          token: tokenObject.token,
          sub: tokenObject.sub,
          expires: tokenObject.expires,
          message: 'Connexion réussie.'
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
