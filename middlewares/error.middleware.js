module.exports = (error, request, response, next) => {
    const status = error.status || 500;

    if (status == 422) {
        var errorResponse = {
            message: 'The given data was invalid.',
            errors: error.message
        };

    } else var errorResponse = { message: error.message };
    
    return response.status(status).json(errorResponse);
}