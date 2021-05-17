const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const jwt = require('jwt-then');
const User = require('./models/User.js');
const Message = require('./models/Message.js');
const app = express();
dotenv.config();
connectDB();

app.use(express.json({ extended: false })); // Now bodyParser is included in express
app.use(require('cors')()); // Cross Origin

// Routes
app.use('/user', require('./routes/userRoutes'));
app.use('/chatroom', require('./routes/chatroomRoutes'));

// Handlers
app.use(notFound); // wrong url handler
app.use(errorHandler); //for  other errors

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {
    console.log(err);
  }
});

// Sockets .emits from the components and .on is received here

//Whenever someone connects this gets executed
io.on('connect', (socket) => {
  console.log('Connected: ' + socket.userId);

  //Whenever someone disconnects this gets executed
  socket.on('disconnect', () => {
    console.log('Disconnected: ' + socket.userId);
  });

  socket.on('joinRoom', ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log('A user joined chatroom: ' + chatroomId);
  });
  socket.on('leaveRoom', ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log('A user left chatroom: ' + chatroomId);
  });
  socket.on('chatroomMessage', async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
        username: user.name,
      });
      io.to(chatroomId).emit('newMessage', {
        message,
        name: user.name,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });
});
