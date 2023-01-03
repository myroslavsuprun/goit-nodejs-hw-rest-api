const express = require('express');
require('express-async-errors');
const logger = require('morgan');
const cors = require('cors');

const { errorHandler } = require('./helpers/routeHelpers');
const contactsRouter = require('./routes/contactsRoute');
const { usersPaths, usersRouter } = require('./routes/usersRoute');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// TODO: Extract API router
app.use(`/api${usersPaths.base}`, usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

module.exports = app;
