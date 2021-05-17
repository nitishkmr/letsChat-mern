const Chatroom = require('../models/Chatroom');
const Message = require('../models/Message');

exports.createChatroom = async (req, res) => {
  console.log('createchatroom');
  try {
    const { name } = req.body;

    const chatroomExists = await Chatroom.findOne({ name });
    if (chatroomExists)
      throw new Error('Chatroom with same name already exists');
    const chatRoom = new Chatroom({
      name,
    });

    await chatRoom.save();
    res.json({
      message: 'Chatroom created',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

exports.getAllChatrooms = async (req, res) => {
  const chatrooms = await Chatroom.find({});
  res.json(chatrooms);
};

exports.getchatroomInfo = async (req, res) => {
  try {
    const { chatroomId } = req.body;

    const chatroom = await Chatroom.findOne({ _id: chatroomId });
    const prevMessages = await Message.find({ chatroom: chatroomId });

    res.json({
      chatroomName: chatroom.name,
      prevMessages,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};
