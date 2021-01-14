const userService = require('../../services/user.service');
const createError = require('http-errors');
const { sequelize } = require('../../models');
const WelcomeEmail = require('../../emails/welcome.email');
const { createStripeCustomer } = require('../../stripe');

class UserController {

    /**
     * Fetches the list of all users.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    index = async (request, response, next) => {
        try {
            const users = await userService.getAll();

            return response.json({ message: 'Users fetched successfully.', data: users });

        } catch (error) { next(error); }
    }

    /**
     * Fetches the user with given uuid.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    show =async (request, response, next) => {
        try {
            const uuid = request.params.uuid;

            const user = await userService.getOne({ where: { uuid } });
            if (!user) throw createError.NotFound('User not found');
            
            return response.json({ message: 'User fetched successfully.', data: user });

        } catch (error) { next(error); }
    }

    /**
     * Creates new user in database.
     * Registers user in Stripe.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    store = async(request, response, next) => {
        const transaction = await sequelize.transaction();

        try {
            let { name, email, password } = request.body;

            const status = userService.STATUS.INACTIVE; // setting user's status as INACTIVE.
            let user = await userService.create({ name, email, password, status }, { transaction });

            const { id: stripeId } = await createStripeCustomer(user); // registers user in Stripe.
            user = await userService.update(user, { stripeId }, { transaction });

            const welcomeEmail = new WelcomeEmail(user);
            welcomeEmail.sendMail();

            await transaction.commit();

            return response.status(201).json({ message: 'User created successfully.', data: user });

        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    /**
     * Updates the user with given uuid.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    update = async (request, response, next) => {
        const transaction = await sequelize.transaction();

        try {
            const uuid = request.params.uuid;
            let { name, email, password, status } = request.body

            let user = await userService.getOne({ where: { uuid } });
            if (!user) throw createError.NotFound('User not found');

            user = await userService.update(user, { name, email, password, status }, { transaction });
            
            await transaction.commit();
            
            return response.json({ message: 'User updated successfully.', data: user });

        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    /**
     * Deletes the user with given uuid.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    destroy = async (request, response, next) => {
        const transaction = await sequelize.transaction();

        try {
            const uuid = request.params.uuid;

            let user = await userService.getOne({ where: { uuid } });
            if (!user) throw createError.NotFound('User not found');

            await userService.destroy(user, { transaction });

            await transaction.commit();

            return response.json({ message: 'User deleted successfully.' });

        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }
}

module.exports = new UserController();