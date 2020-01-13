const express = require('express')
const cors  = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')

const chatRouter = require('../routes/routes')

const chatAPIServer = express()
const PORT = 5001

chatAPIServer.use(session({
    secret: 'very secret key',
    resave: false,
    saveUninitialized: false,
    user: [],
    cookie: {
        //secure: true,
        maxAge: 300000
    }
}))
chatAPIServer.use(bodyParser.json())
chatAPIServer.use(cors())
chatAPIServer.use('/api', chatRouter )

const start = () => {
    chatAPIServer.listen(PORT, () => {
        console.log(`Server running from port ${PORT}`)
    })
}

module.exports = start()