const { Client } = require('pg');
const path = require('path');
const fs = require('fs');

const client = new Client({
  user: 'user',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
});

const initDatabase = async () => {
  const users = fs
    .readFileSync(path.join(__dirname, './init-db.sql'))
    .toString();
  const query = await client.query(users, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('successfully executed init query');
    }
  });
};

const dbConnection = () => {
  client.connect((err) => {
    if (err) throw err;
    console.log('successfully connected to database');
    initDatabase();
  });
};

module.exports = dbConnection;
