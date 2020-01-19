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
    const response = await client.query(query);
    await client.release();
    return response.rows;
  } catch (error) {
    await client.release();
    return error;
  }
};

const addLastLogin = async (date, id) => {
  const client = await dbPool.connect();
  try {
    await client.query('BEGIN');
    const query = {
      name: 'update-last-login',
      text: 'UPDATE account SET last_login=$1 WHERE user_id=$2',
      values: [date, id]
    };
    await client.query(query);
    await client.query('COMMIT');
    await client.release();
  } catch (error) {
    await client.release();
  }
};

module.exports = { insertNewUser, userAuthenticate, addLastLogin };
