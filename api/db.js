const { Pool } = require('pg')
const conf = require('./db.conf')

const dbPool = new Pool(conf)
module.exports = dbPool