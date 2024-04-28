require('dotenv').config();
const express = require('express');
const connectDatabase = require('./database/database');
const dev = require('./routes/dev.route');
const todo = require('./routes/todo.route');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

/**
 * mount middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * connect to database
 */
connectDatabase();

/**
 * mount routes
 */

const baseURL = '/api/v1';
app.use(baseURL + '/dev', dev);
app.use(baseURL + '/todo', todo);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.clear();
  console.log(`Server listening on port ${process.env.PORT}`);
});
