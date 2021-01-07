const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const createError = require('http-errors');

module.exports = async (request, response, next) => {
    try {

        let token = request.headers.authorization;
        if (!token) throw createError.Unauthorized();
        
        token = token.substring(7); // removing 'Bearer ' from the token.
    
        // verifying token.
        let decodedUserObject = jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) throw createError.Unauthorized();
            return user;
        });
    
        // checking if user exists.
        const user = await userService.getOne({ where: { uuid: decodedUserObject.uuid } });
        if (!user) throw createError.Unauthorized();
   
        request.auth = { user };
    
        next();

    } catch (error) { next(error); }
};
