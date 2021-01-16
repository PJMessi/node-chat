const paymentIntentService = require('../../../services/paymentintent.service');
const userService = require('../../../services/user.service');

const stripeEvents = {
    PAYMENT_INTENT_CREATED: 'payment_intent.created',
    PAYMENT_INTENT_SUCCEEDED: 'payment_intent.succeeded'
};

/**
 * Handles the stripe webhook events.
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
const stripeWebhook = async(request, response, next) => {
    try {
        const stripeResponse = request.body;
        const eventType = stripeResponse.type;

        switch(eventType) {
            case stripeEvents.PAYMENT_INTENT_SUCCEEDED:
                handlePaymentIntentSucceeded(stripeResponse);
                break;
                
            default:
                console.log(eventType);
        }

        return response.json({message: 'Webhook handled successfully.'});

    } catch (error) {
        next(error);
    }
}

/**
 * Handles the response for PAYMENT_INTENT_SUCCEEDED event.
 * @param {*} stripeResponse 
 */
const handlePaymentIntentSucceeded = async (stripeResponse) => {
    const { 
        id: paymentIntentId, 
        amount, currency, 
        payment_method: paymentMethod, 
        metadata 
    } = stripeResponse.data.object;

    const user = await userService.getOne({ where: { uuid: metadata.user_uuid } });

    await paymentIntentService.create({ userId: user.id, paymentIntentId, amount, currency, paymentMethod });
}

module.exports = stripeWebhook;