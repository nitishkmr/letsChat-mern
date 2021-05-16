const Chatroom = require('../models/Chatroom');

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
