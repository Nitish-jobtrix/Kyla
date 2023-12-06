const express = require('express');
const router = express.Router();
const { chatResponse} = require('../controllers/chatController');


//chat routes

// /api/chat/completions-----this route is for the fetching the response of the message from the open ai 
router.post('/chat/completions', chatResponse)
  
module.exports = router;