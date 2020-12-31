const MessageService = require('../services/message.service')
const messageService = new MessageService()

module.exports = function (socket) {
  socket.on('chat-message', async function (message) {
    await messageService.create({
        userId: socket.auth.user.id,
        content: message
    })

    socket.broadcast.emit("chat-message", message)
  });
};
