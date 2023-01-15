/**
 * Express application file
 */

// Express
const express = require('express');
require('express-async-errors');

// Third-party middlewares
const logger = require('morgan');
const cors = require('cors');

// Routers
const apiRouter = require('./routes/apiRoute');
const publicRouter = require('./routes/publicRoute');

// Handlers
const {
  errorHandler,
  customErrorHandler,
} = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

// **** Declarations **** //

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// **** Middlewares **** //

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// **** Routes **** //

app.use('/api', apiRouter);
app.use('/public', publicRouter);

// **** Middlewares **** //

app.use(notFoundHandler);
app.use(customErrorHandler);
app.use(errorHandler);

// **** Export **** //

module.exports = app;
