module.exports = (error, request, response, next) => {
    const status = error.status || 500

    return response.status(status).json({
        message: error.message
    })
}