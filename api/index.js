const express = require('express');
const app = express();
const port = process.env.STOW_PORT;
const bodyParser = require('body-parser');
const errorHandler = require('./errorHandler');
const cors = require('cors');

const initialize = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());


  app.get('/offers/seller/:seller', require('./offersBySeller'));
  app.get('/offers/buyer/:buyer', require('./offersByBuyer'));
  app.use(errorHandler);

  app.listen(port || 3000, () => {
    console.log('Stow Database ready for action.');
  });
};

module.exports = {
  initialize
};
