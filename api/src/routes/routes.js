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
  const response = await userAuthenticate(req.body.username);
  try {
    const result = await crypt.compare(req.body.password, response[0].password);
    if (!result) res.sendStatus(400);
    else {
      let connectionObj = {
        socket: null,
        id: null
      };
      //add last_login date
      addLastLogin(new Date(), response[0].user_id);

      //create socket for user
      const socket = net.Socket();
      //add user to session
      res.sendStatus(200);
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
