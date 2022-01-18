const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();


// Middleware CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})



// Requests into JSON Object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Routes déclaration
const userRoutes = require('./routes/user.routes');


// Routes API
app.use('./uploads', express.static(path.join(__dirname, './uploads')));
app.use('/api/user', userRoutes);


module.exports = app;