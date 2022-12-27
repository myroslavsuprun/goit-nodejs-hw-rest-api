/**
 *
 * @param {*} controller
 * @returns new function which invokes the controller and catches internal errors.
 * Errors are sent next to the middleware.
 */
const asyncWrapper = controller => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

module.exports = {
  asyncWrapper,
};
