module.exports = {
  serverURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000/api'
      : 'https://nature-go-app.herokuapp.com/api',
};
