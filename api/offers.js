const { Offer } = require('./../models');

module.exports = (req, res, next) => {
  const seller = req.params.seller;
  Offer.findAll({
      where: {
        seller
      }
    })
    .then((offers) => {
      return res.json(offers);
    })
    .catch(next);
};
