const express = require('express');
const app = express();
const cors = require('cors');
const { dbConnection } = require('./db/config');

const todoRoutes = require('./routes/list');
const itemRoutes = require('./routes/item');

app.use(cors());
app.use(express.json());
app.use('/list', todoRoutes);
app.use('/item', itemRoutes);

dbConnection();

app.listen(5001, () => {
  console.log('server is started, listening on port 5001');
});
