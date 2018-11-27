const { Offer } = require('../models');

const {
  serializeOffer
} = require('./serialization');

module.exports = stow => {

  const {
    StowOfferMade,
    StowOfferRevoked,
    StowOfferFulfilled
  } = stow.events;

  syncNewOffer(StowOfferMade, stow);
  syncRevokeOffer(StowOfferRevoked, stow);
  syncNewApproval(StowOfferFulfilled, stow);
};

const watchEvent = (event, callback) => {
  event.watch(callback);
};

const syncNewOffer = (offerEvent, stow) => {
  watchEvent(offerEvent, (event) => {
    args = event.returnValues;
    stow.getRecord(args.dataHash)
      .then(record => {
        return Offer.findOrCreate({
            where: serializeOffer({args}, record)
          })
      });
  });
};

const syncRevokeOffer = (offerEvent, stow) => {
  watchEvent(offerEvent, (event) => {
    args = event.returnValues;
    // Remove offer in the DB
    return Offer.destroy({
      where: {
        dataHash: args.dataHash,
        buyer: args.buyer.toLowerCase()
      }})
  });
};

const syncNewApproval = (approvalEvent, stow) => {
  watchEvent(approvalEvent, (event) => {
    args = event.returnValues;
    return Offer.findOne({
            where: {
              dataHash: args.dataHash
          }
        })
        .then(offer => {
          // update offer in DB
          offer.update({
            open: false
          });
        });
  });
};


