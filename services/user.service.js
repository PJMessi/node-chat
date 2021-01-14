const { User } = require('../models');
const Service = require('./index');
const bcrypt = require('bcrypt');

class UserService extends Service {
    
    // Status value for user's static column.
    STATUS = {
        ACTIVE: 'ACTIVE',
        INACTIVE: 'INACTIVE'
    };

    /**
     * Fetches the list of users with applied filters and without pagination.
     * @param {*} filter [filters to be applied.]
     */
    getAll = async (filter={}) => {
        let { where, include, order } = this.refineFilters(filter);

        const users = await User.findAll({ where, include, order });

        return users;
    }

    /**
     * Fetches the paginated users with applied filter.
     * @param {*} filters [filters to be applied.]
     */
    getAllWithPagination = async (filter={}) => {
        let { limit, page, offset, where, include, order } = this.refineFilters(filter);

        const users = await User.findAndCountAll({ limit, offset, where, include, order });

        return this.appendPaginationData(users, limit, page);
    }

    /**
     * Fetches the user with applied filter.
     * @param {*} filter [filters to be applied.]
     */
    getOne = async (filter={}) => {
        let { where, include } = this.refineFilters(filter);

        const user = await User.findOne({ where, include });

        return user;
    }

    /**
     * Returns the user with given id.
     * @param {*} id [id of the user to be fetched.]
     */
    getOneById = async (id) => {
        const user = await User.findByPk(id);

        return user;
    }

    /**
     * Creates new user with given attributes.
     * @param {*} attributes [attributes of the user to be created.]
     * @param {*} filters [filters to be applied.]
     */
    create = async (attributes, filter={}) => {
        let { name, email, password, status } = attributes;
        let { transaction } = filter;

        password = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password, status }, { transaction });
        return user;
    }

    /**
     * Updates the given user with given attributes.
     * @param {*} user [Sequelize user object.]
     * @param {*} attributes [attributes and values which are to be updated.]
     * @param {*} filters [filters to be applied.]
     */
    update = async (user, attributes, filters={}) => {
        let { name, email, password, status, stripeId } = attributes;
        let { transaction } = filters;

        if (password) password = await bcrypt.hash(password, 10);
  
        user = await user.update({ name, email, password, status, stripeId }, { transaction });
        return user;
    }

    /**
     * Deletes the given user.
     * @param {*} user [Sequelize user object.]
     * @param {*} filters [filters to be applied.]
     */
    destroy = async (user, filters={}) => {
        let { transaction } = filters;

        return await user.destroy({ transaction });
    }

}

module.exports = new UserService();