const dbPool = require('../../db')

const insterNewUser = async (id, username, password, created) => {
    const client = await dbPool.connect()
    try {
        await client.query('BEGIN')
        const query = 'INSERT INTO account(user_id, username, password, created_on) VALUES($1, $2, $3, $4)'
        const res = await client.query(query, [id, username, password, created])
        await client.query('COMMIT')
        await client.release()
        return res
    } catch (error) {
        await client.release()
        return error
    }
}

const authenticateUser = async (username, password) => {
    const client = await dbPool.connect()
    try {
        await client.query('BEGIN')
        const query = 'SELECT username, password FROM account WHERE username=$1 AND password=$2'
        const response = await client.query(query, [username, password])
        return response.rows
    } catch (error) {
        client.release()
        return error
    }
}

module.exports = {insterNewUser, authenticateUser}