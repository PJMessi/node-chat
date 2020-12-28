const UserService = require('../services/user.service')

class UserController {

    /**
     * UserController constructor.
     */
    constructor() {
        this.userService = new UserService()
    }

    /**
     * Creates new user.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    store = async(request, response, next) => {
        try {
            let { name, email, password } = request.body

            // creating user.
            const user = await this.userService.create({ name, email, password })

            return response.status(201).json({
                message: 'User created successfully.',
                data: user
            })

        } catch (error) {
            next(error)
        }
    }

    /**
     * Fetches the paginated list of all users.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    index = async (request, response, next) => {
        try {
            const { limit, page } = request.query

            // fetching paginated lists.
            const users = await this.userService.getAll({ limit, page })

            return response.json({
                message: 'Users fetched successfully.',
                data: users
            })

        } catch (error) {
            next(error)
        }
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

            // fetching user.
            const user = await this.userService.getOne({ where: { uuid } });
            if (!user) throw new Error('User not found.')
            
            return response.json({
                message: 'User fetched successfully.',
                data: user
            })

        } catch (error) {
            next(error)
        }
    }

    /**
     * Updates the user with given uuid.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    update = async (request, response, next) => {
        try {
            const uuid = request.params.uuid;
            let { name, email, password } = request.body

            // fetching user.
            let user = await this.userService.getOne({ where: { uuid } });
            if (!user) throw new Error('User not found.')

            // updating user.
            user = await this.userService.update(user, { name, email, password })

            return response.json({
                message: 'User updated successfully.',
                data: user
            })

        } catch (error) {
            next(error)
        }
    }

    /**
     * Deletes the user with given uuid.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    destroy = async (request, response, next) => {
        try {
            const uuid = request.params.uuid;

            // fetching user.
            let user = await this.userService.getOne({ where: { uuid } });
            if (!user) throw new Error('User not found.')

            // deleting user.
            await this.userService.destroy(user)

            return response.json({
                message: 'User deleted successfully.'
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController