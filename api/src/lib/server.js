require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const chatRouter = require('../routes/routes');

const chatAPIServer = express();
const PORT = 5001;
chatAPIServer.use(
  session({
    name: 'chatsession',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 1000 * 60
    }
  })
);
//chatAPIServer.use(env)
chatAPIServer.use(bodyParser.json());
chatAPIServer.use(cors());
chatAPIServer.use('/api', chatRouter);

const start = () => {
  chatAPIServer.listen(PORT, () => {
    console.log(`Server running from port ${PORT}`);
  });
};

module.exports = start();
