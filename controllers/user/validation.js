const RequestValidator = require('../validator');
const userService = require('../../services/user.service');
const createError = require('http-errors');

class StoreValidation extends RequestValidator {

    /**
     * Validates the data for login and throws error if any.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    storeValidation = async (request, response, next) => {
        try {
            const { name, email, password, password_confirmation } = request.body;
        
            const rules = {
                name: 'required|min:3|max:255',
                email: `required|email`,
                password: 'required|confirmed'
            };

            await this.validate({ name, email, password, password_confirmation }, rules);

            const existingUser = await userService.getOne({ where: { email } });
            if ( existingUser ) throw createError.UnprocessableEntity({ email: ["The email is already taken."] });

            next();

        } catch (error) { next(error); }
    }

}

module.exports = new StoreValidation();