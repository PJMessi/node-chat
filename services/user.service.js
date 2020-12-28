const { User } = require('../models')
const Service = require('./index')
const bcrypt = require('bcrypt')

class UserService extends Service {
    /**
     * Fetches the paginated users with applied filter.
     * @param {*} filters 
     */
    getAll = async (filter) => {
        let { limit, page, offset, where, include } = this.refineFilters(filter);

        // filtering users.
        const users = await User.findAndCountAll({ 
            limit, 
            offset, 
            where, 
            include 
        });

        return this.appendPaginationData(users, limit, page);
    }

    /**
     * Fetches the user with applied filter.
     * @param {*} filter 
     */
    getOne = async (filter) => {
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
     * @param  {*} attributes
     */
    create = async (attributes) => {
        let { name, email, password } = attributes;

        // hashing password.
        password = await bcrypt.hash(password, 10);

        // creating user.
        const user = await User.create({ name, email, password });

        return user;
    }

    /**
     * Updates the given user with given attributes.
     * @param {*} user 
     * @param {*} attributes 
     */
    update = async (user, attributes) => {
        let { name, email, password } = attributes;

        // hashing password.
        if (password) {
            password = await bcrypt.hash(password, 10);
        }

        // updating user.
        user = await user.update({ name, email, password });

        return user;
    }

    /**
     * Deletes the given user.
     * @param {*} user 
     */
    destroy = async (user) => {
        // deleting user.
        return await user.destroy();
    }
}

module.exports = UserService