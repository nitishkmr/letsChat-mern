const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const app = express();
// require('./models/User');
// require('./models/Chatroom');
// require('./models/Message');
dotenv.config();
connectDB();
app.use(express.json({ extended: false })); // Now bodyParser is included in express
app.get('/', (req, res) => res.send('API running'));

app.use('/user', require('./routes/userRoutes'));
app.use('/chatroom', require('./routes/chatroomRoutes'));

app.use(notFound); // wrong url handler
app.use(errorHandler); //for  other errors

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
