const express = require('express');
const createError = require('http-errors');

const { port } = require('./app/config');

// import router
// const cardInfoRouter = require('./app/cardInfo/router');
const templatesRouter = require('./app/templates/router');
const audiosRouter = require('./app/audios/router');

const app = express();

// serve static files
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// add routes below
app.use('/api/templates', templatesRouter);
app.use('/api/audios', audiosRouter);
// app.use('/api/card-info', cardInfoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(port, () => {
  console.log('server running on port: ' + port);
});

module.exports = app;
