const stripeEvents = {
    PAYMENT_INTENT_CREATED: 'payment_intent.created',
    PAYMENT_INTENT_SUCCEEDED: 'payment_intent.created'
};

const stripeWebhook = (request, response, next) => {
    try {
        const eventType = request.body.type;
        switch(eventType) {
            case stripeEvents.PAYMENT_INTENT_CREATED:
                console.log(request.body);
            default:
                console.log(eventType);
        }

    } catch (error) {
        next(error);
    }
}

module.exports = stripeWebhook;