const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');

const userService = new UserService();

module.exports = async (request, response, next) => {
    try {
        let token = request.headers.authorization;
        if (!token) throw new Error('Unauthenticated.');
    
        // removing 'Bearer ' from the token.
        token = token.substring(7);
    
        // verifying token.
        const secret = process.env.JWT_SECRET
        let decodedData = jwt.verify(token, secret);
    
        // checking if user exists.
        const uuid = decodedData.uuid;
        const user = await userService.getOne({ where: { uuid } });
        if (!user) throw new Error('Unauthenticated.');
    
        // attaching user in the request.
        request.auth = { user };
    
        next();

    } catch (error) {
        next(error);
    }
};
