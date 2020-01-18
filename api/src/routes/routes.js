const express = require('express');
const uniqid = require('uniqid');
const router = express.Router();
const net = require('net');
const crypt = require('bcrypt');

const options = {
  host: '127.0.0.1',
  port: 65432
};

const { insertNewUser, authenticateUser } = require('../services/dbServices');

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

router.post('/login', (req, res) => {
  const username = req.body.username;
  console.log(req.session);
  const password = req.body.password;
  const response = authenticateUser(username, password);
  Promise.resolve(response).then(result => {
    if (result.length === 0) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
