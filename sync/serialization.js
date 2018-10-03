const { bigNumberToNumber } = require('./../utils/types');

const serializeOffer = (offerEvent, record) => {
  return {
    dataHash: offerEvent.args.dataHash,
    buyer: offerEvent.args.buyer.toLowerCase(),
    seller: record.owner.toLowerCase(),
    amount: bigNumberToNumber(offerEvent.args.amount),
    open: true
  };
};


module.exports = {
  serializeOffer
};
