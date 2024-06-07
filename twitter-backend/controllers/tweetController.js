const Tweet = require('../models/Tweet');
exports.createTweet = async (req, res) => {
  const { text } = req.body;
  try {
    const tweet = new Tweet({
      userId: req.user.id,
      text
    });
    await tweet.save();
    res.status(201).send('Tweet posted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};


exports.getUserTimeline = async (req, res) => {
    const { userId } = req.params;
    const { cursor } = req.query;
    const limit = 10;
  
    try {
      const query = { userId };
      if (cursor) {
        query._id = { $lt: cursor };
      }
      const tweets = await Tweet.find(query).sort({ _id: -1 }).limit(limit);
      const nextCursor = tweets.length > 0 ? tweets[tweets.length - 1]._id : null;
  
      res.json({ tweets, nextCursor });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  