const MessageService = require('../services/message.service')
const messageService = new MessageService()

module.exports = function (socket) {
  socket.on('chat-message', async function (userMessage) {
    let message = await messageService.create({
        userId: socket.auth.user.id,
        content: userMessage
    })

    message = message.toJSON()
    message.user = socket.auth.user

    socket.emit("chat-message", message)
    socket.broadcast.emit("chat-message", message)
  });
};
