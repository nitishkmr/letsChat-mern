const express = require('express');
const chatroomController = require('../controllers/chatroomController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, chatroomController.createChatroom);

module.exports = router;
