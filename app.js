require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const router = require('./routes');
const corsMiddleware = require('./middlewares/cors.middleware');
const errorHandler = require('./middlewares/error.middleware');
const socketAuthMiddleware = require('./middlewares/socketAuth.middleware');
const http = require('http')
const socketio = require('socket.io');
const socketConfig = require('./sockets')

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
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.use(socketAuthMiddleware).on('connection', socketConfig);
