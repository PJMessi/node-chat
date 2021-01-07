const { Message } = require('../models');
const Service = require('./index');

class MessageService extends Service {

    /**
     * Fetches the paginated messages with applied filter.
     * @param {*} filters [filters to be applied.]
     */
    getAllWithPagination = async (filter={}) => {
        let { limit, page, offset, where, include, order } = this.refineFilters(filter);

        const messages = await Message.findAndCountAll({ limit, offset, where, include, order });

        return this.appendPaginationData(messages, limit, page);
    }

    /**
     * Fetches the message with applied filter.
     * @param {*} filter [filters to be applied.]
     */
    getOne = async (filter={}) => {
        let { where, include } = this.refineFilters(filter);

        const message = await Message.findOne({ where, include });

        return message;
    }

    /**
     * Returns the message with given id.
     * @param {*} id [id of the message to be fetched.]
     */
    getOneById = async (id) => {
        const message = await Message.findByPk(id);

        return message;
    }

    /**
     * Creates new message with given attributes.
     * @param {*} attributes [attributes of the message to be created.]
     * @param {*} filters [filters to be applied.]
     */
    create = async (attributes, filter={}) => {
        let { userId, content } = attributes;
        let { transaction } = this.refineFilters(filter);

        const message = await Message.create({ userId, content }, { transaction });

        return message;
    }

    /**
     * Updates the given message with given attributes.
     * @param {*} message [Sequelize message object.]
     * @param {*} attributes [attributes of the message to be updated.]
     * @param {*} filters [filters to be applied.]
     */
    update = async (message, attributes, filters={}) => {
        let { userId, content } = attributes;
        let { transaction } = filters;

        message = await message.update({ userId, content }, { transaction });

        return message;
    }

    /**
     * Deletes the given message.
     * @param {*} message [Sequelize message object.]
     * @param {*} filters [filters to be applied.]
     */
    destroy = async (message, filters={}) => {
        let { transaction } = filters;

        return await message.destroy({ transaction });
    }

}

module.exports = new MessageService();