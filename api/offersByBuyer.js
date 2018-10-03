const { Offer } = require('./../models');

module.exports = (req, res, next) => {
  const buyer = req.params.buyer;
  Offer.findAll({
      where: {
        buyer
      }
    })
    .then((offers) => {
      return res.json(offers);
    })
    .catch(next);
};
