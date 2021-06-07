const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./keys').mongoURI;
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connection to Mongo DB established'))
  .catch((err) => console.log('error', err));

app.listen(port, () => {
  console.log('Server is running on ' + port + 'port');
});

app.use('/users', require('./routes/users'));
