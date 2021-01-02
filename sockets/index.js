const { messageEvents } = require('./message.socket');
const UserService = require('../services/user.service');

const userService = new UserService();

module.exports = async (socket) => {
  const user = socket.auth.user;

  // Updating status of the user to Active.
  console.log(`${user.name} has entered.`)
  await userService.update(user, { status: UserService.STATUS.ACTIVE });
  socket.broadcast.emit('user-status-change', user)

  messageEvents(socket);

  socket.on('disconnect', async function () {
    // Updating status of the user to Inactive.
    console.log(`${user.name} has left.`) 
    await userService.update(user, { status: UserService.STATUS.INACTIVE });
    socket.broadcast.emit('user-status-change', user)
  });
};
