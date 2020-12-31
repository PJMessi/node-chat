const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const createError = require('http-errors');

const userService = new UserService();

module.exports = async (socket, next) => {
    try {
        let token = socket.handshake.query.token;
        if (!token) throw createError.Unauthorized();
        
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
    
        // attaching user in the socket.
        socket.auth = { user };
    
        next();

    } catch (error) {
        console.log(error.message)
    }
};
