const express = require('express');
const app = express();
const cors = require('cors');
const dbConnection = require('./db/config');

app.use(cors());
app.use(express.json());

dbConnection();

app.listen(5001, () => {
  console.log('server is started, listening on port 5001');
});
