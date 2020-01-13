const express = require('express')
//const db = require('../../db')

const router = express.Router()

router.get('/', (req, res) => {
    console.log(req.session)
    res.send('Hello :)')
}) 

module.exports = router