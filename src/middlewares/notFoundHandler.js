/**
 * Not found middleware response handler.
 */
const notFoundHandler = (_, res) => {
  res.status(404).json({ message: 'Not found' });
};

module.exports = { notFoundHandler };
