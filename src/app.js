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
const { errorHandler } = require('./helpers/routeHelpers');

// **** Declarations **** //

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// **** Middlewares **** //

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);
// TODO: Add handlers with not found and error handler
app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

// **** Export **** //

module.exports = app;
