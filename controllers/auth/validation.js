const RequestValidator = require('../validator');

class AuthValidation extends RequestValidator {

    /**
     * Validates the data for login and throws error if any.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    loginValidation = async (request, response, next) => {
        try {
            const { email, password } = request.body;
        
            const rules = {
                email: 'required|email',
                password: 'required'
            };

            await this.validate({ email, password }, rules);

            next();

        } catch (error) { next(error); }
    }

}

module.exports = new AuthValidation()