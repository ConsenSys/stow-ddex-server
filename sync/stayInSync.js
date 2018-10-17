const { Offer } = require('../models');

const {
  serializeOffer
} = require('./serialization');

module.exports = (linnia) => {

  const {
    LinniaOfferMade,
    LinniaOfferRevoked,
    LinniaOfferFulfilled
  } = linnia.events;

  syncNewOffer(LinniaOfferMade, linnia);
  syncRevokeOffer(LinniaOfferRevoked, linnia);
  syncNewApproval(LinniaOfferFulfilled, linnia);
};

const watchEvent = (event, callback) => {
  event.watch(callback);
};

const syncNewOffer = (offerEvent, linnia) => {
  watchEvent(offerEvent, (event) => {
    args = event.returnValues;
    linnia.getRecord(args.dataHash)
      .then(record => {
        return Offer.findOrCreate({
            where: serializeOffer({args}, record)
          })
      });
  });
};

const syncRevokeOffer = (offerEvent, linnia) => {
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

const syncNewApproval = (approvalEvent, linnia) => {
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


