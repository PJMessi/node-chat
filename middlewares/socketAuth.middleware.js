const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const createError = require('http-errors');

module.exports = async (socket, next) => {
    try {
        let token = socket.handshake.query.token;
        if (!token) throw createError.Unauthorized();
        
        // verifying token.
        let decodedUserObject = jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) throw createError.Unauthorized();
            return user;
        });
    
        // checking if user exists.
        const user = await userService.getOne({ where: { uuid: decodedUserObject.uuid } });
        if (!user) throw createError.Unauthorized();
    
        socket.auth = { user };
    
        next();

    } catch (error) { console.log(error.message); }
};
