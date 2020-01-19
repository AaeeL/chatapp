const express = require('express');
const uniqid = require('uniqid');
const router = express.Router();
const net = require('net');
const crypt = require('bcrypt');

const options = {
  host: process.env.SOCKET_HOST,
  port: process.env.SOCKET_PORT
};

const { insertNewUser, userAuthenticate } = require('../services/dbServices');

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
      res.sendStatus(200);
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
