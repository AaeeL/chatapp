const express = require('express')
const cors  = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')

/*const pool = new Pool(cn)
const query = `INSERT INTO account(user_id, username, password, created_on) VALUES(1, 'homo', 'homo', '2004-10-19 10:23:54+02')`
pool.query(query, (err, res) => {
    console.log(err, res)
    pool.end()
  })*/

// const client = new Client(cn)
// client.connect()
// const sql = `SELECT 1 AS "\\'/*", 2 AS "\\'*/\n + console.log(process.env)] = null;\n//"`
/*client.query(sql, (err, res) => {
  console.log(err ? err.stack : res) // Hello World! 
  client.end()
})*/

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