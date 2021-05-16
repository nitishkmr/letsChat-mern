const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const jwt = require('jwt-then');
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

//Whenever someone connects this gets executed
io.on('connection', (socket) => {
  console.log('Connected: ' + socket.userId);

  //Whenever someone disconnects this gets executed
  socket.on('disconnect', () => {
    console.log('Disconnected: ' + socket.userId);
  });
});
