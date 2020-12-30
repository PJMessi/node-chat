const UserService = require('../services/user.service');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

class AuthController {

    /**
     * UserController constructor.
     */
    constructor() {
        this.userService = new UserService();
    }

    /**
     * Generates auth token for the user with given credentials.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    login = async (request, response, next) => {
        try {
            const { email, password } = request.body;

            // fetching user.
            const user = await this.userService.getOne({ where: { email } });
            if (!user) throw createError.Unauthorized('Invalid credentials.');

            // verifying token.
            const passwordVerified = await bcrypt.compare(password, user.password);
            if (!passwordVerified) throw createError.Unauthorized('Invalid credentials.');

            // generating token.
            const token = await user.generateToken();

            return response.json({ message: 'Auth token generated.', data: { token, user } });

        } catch (error) {
            next(error);
        }
    }

    /**
     * Fetches the profile of logged in user.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    profile = async (request, response, next) => {
        try {
            const user = request.auth.user;

            return response.json({ message: 'Profile fetched successfully.', data: user });
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController