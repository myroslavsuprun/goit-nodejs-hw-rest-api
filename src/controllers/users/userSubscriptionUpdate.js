const authService = require('../../services/authService');

const userSubscriptionUpdateController = async (req, res) => {
  const { subscription } = req.body;

  // Extracting user's id which assigned in auth middleware.
  const { id } = req.user;

  const user = await authService.updateUserSubscription({
    id,
    subscription,
  });

  res.json({ subscription: user.subscription });
};

module.exports = { userSubscriptionUpdateController };
