require('dotenv').config();
const express = require('express');
const db = require('./keys').mongoURI;
const mongoose = require('mongoose');
const cors = require('cors');
// const userRoute = require('./routes/users');
// const natureSpotRoute = require('./routes/naturespots');
// const imageRoute = require('./routes/images');
// const commentRoute = require('./routes/comments');
const passport = require('passport');
// const awsRoute = require('./routes/aws');
const { jwtStrategy } = require('./passport');

// initialize express app
const app = express();
const port = process.env.PORT || 5000;
// https://nature-go-app.herokuapp.com/

// connect to DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connection to Mongo DB established'))
  .catch((err) => console.log('error', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// app.use('/api/users', userRoute);
// app.use('/api/naturespots', natureSpotRoute);
// app.use('/api/images', imageRoute);
// app.use('/api/comments', commentRoute);
// app.use('/api/aws', awsRoute);

app.use('/api/users', require('./routes/users'));
app.use('/api/naturespots', require('./routes/naturespots'));
app.use('/api/images', require('./routes/images'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/aws', require('./routes/aws'));

app.listen(port, () => {
  console.log('Server is running on ' + port + 'port');
});
