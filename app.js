const express = require('express');
const { sequelize } = require('./models');
const router = require('./routes');
const corsMiddleware = require('./middlewares/cors.middleware');
const errorHandler = require('./middlewares/error.middleware');
require('dotenv').config();
const socketio = require('socket.io');
const socketAuthMiddleware = require('./middlewares/socketAuth.middleware');
const http = require('http')

const app = express();
const server = http.Server(app)
app.use(express.json());

// configuring cors middleware.
app.use(corsMiddleware);

// configuring routes.
app.use(router);

// configuring error handler.
app.use(errorHandler);

// configuring servers.
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started at ${process.env.NODE_URL}:${PORT}`);
  sequelize.authenticate().then(() => {
    console.log('Connected to the database.');
  });
});

// configuring socket io
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
});

io.use(socketAuthMiddleware).on('connection', (socket) => {
  console.log(`Client connected on socket: ${socket.id}`);
  require('./sockets/message.socket')(socket);
});
