const { Message } = require('../models')
const Service = require('./index')

class MessageService extends Service {

    /**
     * Fetches the paginated messages with applied filter.
     * @param {*} filters 
     */
    getAll = async (filter={}) => {
        let { limit, page, offset, where, include, order } = this.refineFilters(filter);

        // filtering messages.
        const messages = await Message.findAndCountAll({ 
            limit, 
            offset, 
            where, 
            include,
            order
        });

        return this.appendPaginationData(messages, limit, page);
    }

    /**
     * Fetches the message with applied filter.
     * @param {*} filter 
     */
    getOne = async (filter={}) => {
        let { where, include } = this.refineFilters(filter);

        // filtering message.
        const message = await Message.findOne({
            where,
            include
        });

        return message;
    }

    /**
     * Returns the message with given id.
     * @param {*} id 
     */
    getOneById = async (id) => {
        const message = await Message.findByPk(id);
        return message;
    }

    /**
     * Creates new message with given attributes.
     * @param {*} attributes
     * @param {*} filters
     */
    create = async (attributes, filter={}) => {
        let { userId, content } = attributes;
        let { transaction } = this.refineFilters(filter);

        // creating message.
        const message = await Message.create({ userId, content }, { transaction });

        return message;
    }

    /**
     * Updates the given message with given attributes.
     * @param {*} message 
     * @param {*} attributes 
     * @param {*} filters
     */
    update = async (message, attributes, filters={}) => {
        let { userId, content } = attributes;
        let { transaction } = filters

        // updating message.
        message = await message.update({ userId, content }, { transaction });

        return message;
    }

    /**
     * Deletes the given message.
     * @param {*} message 
     * @param {*} filters 
     */
    destroy = async (message, filters={}) => {
        let { transaction } = filters

        // deleting message.
        return await message.destroy({ transaction });
    }

}

module.exports = MessageService