const { User } = require('../models')
const Service = require('./index')
const bcrypt = require('bcrypt')

class UserService extends Service {
    
    // Status value for user's static column.
    static STATUS = {
        ACTIVE: 'ACTIVE',
        INACTIVE: 'INACTIVE'
    }

    /**
     * Fetches the list of users with applied filters without pagination.
     * @param {*} filter 
     */
    getAll = async (filter={}) => {
        let { where, include, order } = this.refineFilters(filter);

        // filtering users.
        const users = await User.findAll({ 
            where, 
            include,
            order 
        });

        return users;
    }

    /**
     * Fetches the paginated users with applied filter.
     * @param {*} filters 
     */
    getAllWithPagination = async (filter={}) => {
        let { limit, page, offset, where, include, order } = this.refineFilters(filter);

        // filtering users.
        const users = await User.findAndCountAll({ 
            limit, 
            offset, 
            where, 
            include,
            order 
        });

        return this.appendPaginationData(users, limit, page);
    }

    /**
     * Fetches the user with applied filter.
     * @param {*} filter 
     */
    getOne = async (filter={}) => {
        let { where, include } = this.refineFilters(filter);

        // filtering user.
        const user = await User.findOne({
            where,
            include
        });

        return user;
    }

    /**
     * Returns the user with given id.
     * @param {*} id 
     */
    getOneById = async (id) => {
        const user = await User.findByPk(id);
        return user;
    }

    /**
     * Creates new user with given attributes.
     * @param {*} attributes
     * @param {*} filters
     */
    create = async (attributes, filter={}) => {
        let { name, email, password, status } = attributes;
        let { transaction } = filter

        // hashing password.
        password = await bcrypt.hash(password, 10);

        // creating user.
        const user = await User.create({ name, email, password, status }, { transaction });

        return user;
    }

    /**
     * Updates the given user with given attributes.
     * @param {*} user 
     * @param {*} attributes 
     * @param {*} filters
     */
    update = async (user, attributes, filters={}) => {
        let { name, email, password, status } = attributes;
        let { transaction } = filters

        // hashing password.
        if (password) {
            password = await bcrypt.hash(password, 10);
        }

        // updating user.
        user = await user.update({ name, email, password, status }, { transaction });

        return user;
    }

    /**
     * Deletes the given user.
     * @param {*} user 
     * @param {*} filters 
     */
    destroy = async (user, filters={}) => {
        let { transaction } = filters

        // deleting user.
        return await user.destroy({ transaction });
    }

}

module.exports = UserService