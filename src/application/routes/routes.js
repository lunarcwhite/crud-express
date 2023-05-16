const express = require('express');
const multer = require('multer');

const ProdukController = require('../controller/ProdukController');

const app = express.Router();
app.get('/', function (req, res) {
  res.send({ message: 'Rest API sederhana' });
});

app.get('/produk', ProdukController.fetch);
app.get('/produk/show', ProdukController.show);
app.post('/produk/create', ProdukController.create);
app.put('/produk/update', ProdukController.update);
app.delete('/produk/delete', ProdukController.destroy);

module.exports = app;


