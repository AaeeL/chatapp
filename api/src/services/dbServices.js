const dbPool = require('../../db');

const insertNewUser = async (id, username, password, created) => {
  const client = await dbPool.connect();
  try {
    await client.query('BEGIN');
    const query =
      'INSERT INTO account(user_id, username, password, created_on) VALUES($1, $2, $3, $4)';
    const res = await client.query(query, [id, username, password, created]);
    await client.query('COMMIT');
    await client.release();
    return res;
  } catch (error) {
    await client.release();
    return error;
  }
};

const userAuthenticate = async username => {
  const client = await dbPool.connect();

  try {
    await client.query('BEGIN');
    const query = {
      name: 'fetch-user',
      text: 'SELECT user_id, password FROM account WHERE username = $1',
      values: [username]
    };
    const sql = `SELECT 1 AS "\\'/*", 2 AS "\\'*/\n + console.log(process.env)] = null;\n//"`;
    const response = await client.query(query);
    //console.log(response);
    return response.rows;
  } catch (error) {
    return error;
  }
};

const addLastLogin = async (date, id) => {};

module.exports = { insertNewUser, userAuthenticate, addLastLogin };
