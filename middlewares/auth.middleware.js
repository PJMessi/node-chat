const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const createError = require('http-errors');

const userService = new UserService();

module.exports = async (request, response, next) => {
    try {
        let token = request.headers.authorization;
        if (!token) throw createError.Unauthorized();
        
    
        // removing 'Bearer ' from the token.
        token = token.substring(7);
    
        // verifying token.
        const secret = process.env.JWT_SECRET
        let decodedData = jwt.verify(token, secret, (error, user) => {
            if (error) throw createError.Unauthorized();
            return user;
        });
    
        // checking if user exists.
        const uuid = decodedData.uuid;
        const user = await userService.getOne({ where: { uuid } });
        if (!user) throw createError.Unauthorized();
    
        // attaching user in the request.
        request.auth = { user };
    
        next();

    } catch (error) {
        next(error);
    }
};
