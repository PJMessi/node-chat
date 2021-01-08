const { messageEvents } = require('./message.socket');
const userService = require('../services/user.service');

module.exports = async (socket) => {

  // when user enters.
  const user = socket.auth.user;
  console.log(`${user.name} has entered.`);
  await userService.update(user, { status: userService.ACTIVE });
  socket.broadcast.emit('user-status-change', user);

  // regstering events related to message.
  messageEvents(socket);

  // when user leaves.
  socket.on('disconnect', async function () {
    console.log(`${user.name} has left.`);
    await userService.update(user, { status: userService.INACTIVE });
    socket.broadcast.emit('user-status-change', user);
  });
};
