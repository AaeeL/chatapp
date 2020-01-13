const express = require('express')
const uniqid = require('uniqid')
const crypto = require('crypto')
const router = express.Router()
const net = require('net')
const algorithm = 'aes-192-cbc'

const options = {
    host: '127.0.0.1',
    port: 65432
}

const { insertNewUser, authenticateUser } = require('../services/dbServices')

router.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
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

router.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const response = authenticateUser(username, password)
    Promise.resolve(response).then(result => {
        if(result.length === 0) {
            res.sendStatus(400)
        }
        else {
            res.sendStatus(200)
        }
    })
})

module.exports = router