const express = require('express');
const chatroomController = require('../controllers/chatroomController');
const router = express.Router();

router.post('/', auth, chatroomController.createChatroom);

module.exports = router;
