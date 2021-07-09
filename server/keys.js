require('dotenv').config();
module.exports = {
  mongoURI: process.env.MONGO_URI,
  options: {
    useNewurlPraser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  secretOrKey: process.env.SECRET_OR_KEY,
  secretOrKey2: process.env.SECRET_OR_KEY2,
};
