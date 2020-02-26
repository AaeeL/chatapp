//for router
const express = require('express');
const router = express.Router();

//for creating unique id
const uniqid = require('uniqid');

//socket configurations
const net = require('net');
const options = require('../../sock.conf');

//for crypting user passwords
const crypt = require('bcrypt');

//database services
const {
  insertNewUser,
  userAuthenticate,
  addLastLogin
} = require('../services/dbServices');

router.post('/register', async (req, res) => {
  const username = req.body.username;

  const salt = await crypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  const hash = await crypt.hash(req.body.password, salt);

  const response = await insertNewUser(
    uniqid.process(),
    username,
    hash,
    new Date()
  );

  if (response.name) res.sendStatus(400);
  else res.sendStatus(200);
});

router.post('/login', async (req, res) => {
  const socket = net.Socket();
  socket.connect(options, () => {
    console.log('Connected!');
    socket.write('Hello there server!');
  });

  socket.on('data', data => {
    console.log('Received ' + data);
  });

  res.send('under construction');
});

router.post('/server_response', (req, res) => {
  console.log(req.body);
});

module.exports = router;
