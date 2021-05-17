const express = require('express');
const chatroomController = require('../controllers/chatroomController');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, chatroomController.getAllChatrooms);
router.post('/', chatroomController.createChatroom);
router.post('/chatroomInfo', chatroomController.getchatroomInfo);

module.exports = router;
