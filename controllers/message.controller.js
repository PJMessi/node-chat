const MessageService = require('../services/message.service')

class MessageController {

    /**
     * MessageController constructor.
     */
    constructor() {
        this.messageService = new MessageService()
    }

    /**
     * Fetches the paginted list of the messages.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    fetchMessages = async (request, response, next) => {
        try {
            const { limit, page } = request.query

            // fetching paginated messages.
            const messages = await this.messageService.getAllWithPagination({ limit, page, include: ['user'] })
            
            return response.json({
                message: 'Messages fetched successfully.',
                data: messages
            })

        } catch (error) {
            next(error);
        }
    }
}

module.exports = MessageController;