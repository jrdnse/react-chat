const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const logger = require('morgan');
const MessageModel = require('./MessageSchema');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use('/public', express.static(__dirname + '/public'));
} else {
  app.use(express.static(path.join(__dirname, '/../../build')));
}

app.use(logger('dev'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/../../public', 'index.html'));
});

const server = http.createServer(app);
const io = socketIo(server);

const connectDb = () => {
  return mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
};

connectDb().then(async () => {
  io.on('connection', socket => {
    console.log(`Client ID: ${socket.id} connected`);
    receiveMessages().then(data => {
      socket.emit('RECEIVE_MESSAGES', data);
    });

    socket.on('USER_JOINED', user => {
      socket.username = user;
      console.log(`${socket.username} joined the server.`);
      const messageToSend = {
        author: 'Server',
        message: `${user} joined the chat.`
      };

      socket.broadcast.emit('SEND_MESSAGE_TO_CLIENT', messageToSend);
      socket.emit('SEND_MESSAGE_TO_CLIENT', messageToSend);
    });

    socket.on('SEND_MESSAGE', data => {
      saveMessage(data.author, data.message);
      socket.broadcast.emit('SEND_MESSAGE_TO_CLIENT', data);
    });

    socket.on('disconnect', () => {
      console.log(`Client ID: ${socket.id} disconnected.`);
      console.log(`${socket.username} left the server.`);
      socket.broadcast.emit('SEND_MESSAGE_TO_CLIENT', {
        author: 'Server',
        message: `${socket.username} left the chat.`
      });
    });
  });

  server.listen(process.env.PORT || 4000, () =>
    console.log(`MongoDB connected and app is listening on port ${process.env.PORT || 4000}!`)
  );
});

const saveMessage = async (author, message) => {
  const messageToSend = new MessageModel({
    author: author,
    message: message
  });
  return await messageToSend.save();
};

const receiveMessages = async () => {
  const messages = await MessageModel.find({});
  // console.log(messages);
  return messages;
};
