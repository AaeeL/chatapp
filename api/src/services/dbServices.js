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
    
    /*let responseObject = {
        success: null,
        failure: null,
        error: null
    }
    
    try {
        await client.query('BEGIN')
        const query = 'INSERT INTO account(user_id, username, password, created_on) VALUES($1, $2, $3, $4) '
        await client.query(query, [5, username, password, created])
        await client.query('COMMIT')
        responseObject.success = true
    } catch (error) {
        responseObject.failure = false
        responseObject.error = error
    } finally {
        await client.release()
        return responseObject
    }*/
}

module.exports = insterNewUser