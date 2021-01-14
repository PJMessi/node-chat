const stripe = require('stripe')(process.env.STRIPE_SECRET);

/**
 * Creates a stripe customer for the given customer.
 * @param {*} user [Sequelize object of the user]
 */
module.exports.createStripeCustomer = async(user) => {
    try {
        const { name, email } = user;
        const stripeCustomer = await stripe.customers.create({
            name, email, metadata: { ...user.toJSON() }
        });

        console.log(stripeCustomer);
        return stripeCustomer;

    } catch (error) {
        throw error;
    }
}