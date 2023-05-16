const express = require('express');
const bodyParser = require('body-parser');

const router = require('./src/application/routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log(`time: ${Date.now()}`);
  next();
});

app.use('/', router);

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send({ message: 'terjadi kesalahan! :{' });
});

const PORT = 3000;
app.listen(PORT);
console.log('application running on port', PORT);

