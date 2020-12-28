module.exports = (error, request, response, next) => {
    return response.status(500).json({
        message: error.message
    })
}