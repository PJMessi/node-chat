const stripeClient = require('../../stripe');
const userService = require('../../services/user.service');

/**
 * Registers the auth user in stripe.
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
module.exports.registerInStripe = async (request, response, next) => {
    try {
        const user = request.auth.user;
        if (user.stripeId != null) throw new Error('User already registered in Stripe.');

        const stripeCustomer = await stripeClient.createStripeCustomer(user);

        await userService.update(user, { stripeId: stripeCustomer.id });

        return response.json({ message: 'User registered in stripe.' , data: user});

    } catch (error) {
        next(error);
    }
}

/**
 * Creates payment intent and returns client secret for that payment intent.
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
module.exports.createPaymentIntent = async(request, response, next) => {
    try {
        const user = request.auth.user;

        const paymentIntentFromStripe = await stripeClient.createPaymentIntent(user, 1000, 'usd');

        return response.json({
            message: 'Client secret of the payment intent.',
            data: { clientSecret: paymentIntentFromStripe.client_secret }
        });
        
    } catch (error) {
        next(error);
    }
}