const express = require('express');
const app = express();
const cors = require('cors');
const { dbConnection } = require('./db/config');
const dotenv = require('dotenv');
dotenv.config();

const todoRoutes = require('./routes/list');
const itemRoutes = require('./routes/item');
app.use(cors());
app.use(express.json());
app.use('/list', todoRoutes);
app.use('/item', itemRoutes);

dbConnection();

let serverPort = process.env.SERVER_PORT;

app.listen(serverPort, () => {
  console.log(`server is started, listening on port ${serverPort}`);
});
