const express = require('express');
const db = require('./keys').mongoURI;
const mongoose = require('mongoose');
const cors = require('cors');
const natureSpotRoute = require('./routes/natureSpots');
const userRoute = require('./routes/users');
const imageRoute = require('./routes/images');
const passport = require('passport');
const { jwtStrategy } = require('./passport');

// initialize express app
const app = express();
const port = process.env.PORT || 5000;

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

app.use('/api/users', userRoute);
app.use('/api/naturespots', natureSpotRoute);
app.use('/api/images', imageRoute);

app.listen(port, () => {
  console.log('Server is running on ' + port + 'port');
});
