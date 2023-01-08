const { Client } = require('pg');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  host: process.env.SERVER_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
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

module.exports = { dbConnection, client };
