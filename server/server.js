require('dotenv').config({ path: './config/.env' });
const { sequelize } = require('./models');

const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 5000);

const server = http.createServer(app);

server.listen(process.env.PORT || 5000, async () => {
  console.log(`Serveur lancé sur le port ${process.env.PORT}`);
  await sequelize.sync({});
  console.log('La connexion a été effectuée.');
});
