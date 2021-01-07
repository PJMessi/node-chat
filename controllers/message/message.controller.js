const messageService = require('../../services/message.service');

class MessageController {

    /**
     * Fetches the paginted list of the messages.
     * @param {*} request 
     * @param {*} response 
     * @param {*} next 
     */
    fetchMessages = async (request, response, next) => {
        try {
            const { limit, page } = request.query;

            const messages = await messageService.getAllWithPagination({ limit, page, include: ['user'] });
            
            return response.json({ message: 'Messages fetched successfully.', data: messages });

        } catch (error) { next(error); }
    }
}

module.exports = new MessageController();