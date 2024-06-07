const express = require('express');
const router = express.Router();
const { createTweet, getUserTimeline } = require('../controllers/tweetController');
const { authenticate } = require('../middlewares/auth');
router.post('/', authenticate, createTweet);
router.get('/:userId/timeline', authenticate, getUserTimeline);
module.exports = router;