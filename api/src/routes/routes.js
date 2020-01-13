const express = require('express')
const uniqid = require('uniqid')
const crypto = require('crypto')
const algorithm = 'aes-192-cbc'
const router = express.Router()

const insertNewUser = require('../services/dbServices')

router.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(uniqid())
    const response = insertNewUser(uniqid(), username, password, new Date)
    Promise.resolve(response).then(result => {
        if(result.name) {
            res.sendStatus(400)
        }
        else {
            res.sendStatus(200)
        }
    })
}) 

module.exports = router