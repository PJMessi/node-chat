const { PaymentIntent } = require('../models');
const Service = require('./index');

class PaymentIntentService extends Service {

    /**
     * Fetches the paginated paymentIntents with applied filter.
     * @param {*} filters [filters to be applied.]
     */
    getAllWithPagination = async (filter={}) => {
        let { limit, page, offset, where, include, order } = this.refineFilters(filter);

        const paymentIntents = await PaymentIntent.findAndCountAll({ limit, offset, where, include, order });

        return this.appendPaginationData(paymentIntents, limit, page);
    }

    /**
     * Fetches the paymentIntent with applied filter.
     * @param {*} filter [filters to be applied.]
     */
    getOne = async (filter={}) => {
        let { where, include } = this.refineFilters(filter);

        const paymentIntent = await PaymentIntent.findOne({ where, include });

        return paymentIntent;
    }

    /**
     * Returns the paymentIntent with given id.
     * @param {*} id [id of the paymentIntent to be fetched.]
     */
    getOneById = async (id) => {
        const paymentIntent = await PaymentIntent.findByPk(id);

        return paymentIntent;
    }

    /**
     * Creates new paymentIntent with given attributes.
     * @param {*} attributes [attributes of the paymentIntent to be created.]
     * @param {*} filters [filters to be applied.]
     */
    create = async (attributes, filter={}) => {
        let { userId, paymentIntentId, amount, currency, paymentMethod, stripeResponse } = attributes;
        let { transaction } = this.refineFilters(filter);

        const paymentIntent = await PaymentIntent.create({ userId, paymentIntentId, amount, currency, 
            paymentMethod, stripeResponse }, { transaction });

        return paymentIntent;
    }

    /**
     * Updates the given paymentIntent with given attributes.
     * @param {*} paymentIntent [Sequelize paymentIntent object.]
     * @param {*} attributes [attributes of the paymentIntent to be updated.]
     * @param {*} filters [filters to be applied.]
     */
    update = async (paymentIntent, attributes, filters={}) => {
        let { userId, content } = attributes;
        let { transaction } = filters;

        paymentIntent = await paymentIntent.update({ userId, content }, { transaction });

        return paymentIntent;
    }

    /**
     * Deletes the given paymentIntent.
     * @param {*} paymentIntent [Sequelize paymentIntent object.]
     * @param {*} filters [filters to be applied.]
     */
    destroy = async (paymentIntent, filters={}) => {
        let { transaction } = filters;

        return await paymentIntent.destroy({ transaction });
    }

}

module.exports = new PaymentIntentService();