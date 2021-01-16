const stripe = require('stripe')(process.env.STRIPE_SECRET);

/**
 * Creates a stripe customer for the given customer.
 * @param {*} user [Sequelize object of the user]
 */
module.exports.createStripeCustomer = async (user) => {
  try {
    const { name, email } = user;
    const stripeCustomer = await stripe.customers.create({
      name,
      email,
      metadata: { ...user.toJSON() },
    });

    return stripeCustomer;
  } catch (error) {
    throw error;
  }
};

/**
 * Creates a payment for given user with given amount and currency.
 * @param {*} user 
 * @param {*} amount 
 * @param {*} currency 
 */
module.exports.createPaymentIntent = async (user, amount, currency='usd') => {
    try {
        if (user.stripeId == null) throw new Error('User not registered in stripe.');

        const paymentIntent = await stripe.paymentIntents.create({
          amount, currency, customer: user.stripe_id, metadata: {
            'user_uuid': user.uuid
          }
        });

        return paymentIntent;

    } catch(error) {
        throw error;
    }
};
