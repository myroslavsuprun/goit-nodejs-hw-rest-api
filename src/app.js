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

// Handlers
const errorHandler = require('./middlewares/errorHandler');
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

// **** Middlewares **** //

app.use(notFoundHandler);
app.use(errorHandler);

// **** Export **** //

module.exports = app;
