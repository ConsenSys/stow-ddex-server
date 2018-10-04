const { Offer } = require('./../models');

module.exports = (req, res, next) => {
  const { dataHash, buyer, publicKey } = req.params;
  Offer.findOne({
      where: {
        dataHash,
        buyer
      }
    })
    .then((offer) => {
      offer.update({
        buyerPublicKey: publicKey
      })
    })
    .then((offer) => {
     return res.json(offer);
    })
    .catch(next);
};
