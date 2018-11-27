const { getDDexContracts } = require('../services/stow/ddexContracts');
const { Offer } = require('./../models');
const { serializeOffer } = require('./serialization');

module.exports = (stow, blockNumber) => {

  const {
    StowOfferMade,
    StowOfferFulfilled
  } = stow.events;

  return syncPastOffers(StowOfferMade, stow, blockNumber)
    .then(() => syncPastApprovals(StowOfferFulfilled, stow, blockNumber))
    .catch(panic);
};

const getPastEvents = (event, blockNumber) => {
  let results = [];
  let step = 50000;
  let fromBlock = 0;
  let toBlock = 3800000;

  while (fromBlock < blockNumber + step) {
    results.push(
      new Promise((resolve, reject) => {
        return event({}, {
          fromBlock,
          toBlock,
        }).get((err, events) => {
          err ? reject(err) : resolve(events);
        });
      })
    );
    fromBlock = toBlock;
    toBlock += step;
  }
  return Promise.all(results);
};

const syncPastOffers = (offersEvent, stow, blockNumber) => {
  return getPastEvents(offersEvent, blockNumber).then(eventsArrays => {
    let events = [].concat.apply([], eventsArrays);
    return Promise.all(events.map((event) => {
      return stow.getRecord(event.args.dataHash)
      .then(async record => {
        let offer = serializeOffer(event, record);
        const { offers } = await getDDexContracts();
        return offers.offers.call(offer.dataHash, offer.buyer).then(offerArray => {
          const isOffered = offerArray[0];
          if(isOffered){
            Offer.findOrCreate({
              where: offer
            });
          }
        });
      });
    }));
  });
};

const syncPastApprovals = (approvalEvent, stow, blockNumber) => {
  return getPastEvents(approvalEvent, blockNumber).then(eventsArrays => {
    let events = [].concat.apply([], eventsArrays);
    return Promise.all(events.map((event) => {
          return Offer.findOne({
            where: {
              dataHash: event.args.dataHash
          }
        })
        .then(offer => {
          offer.update({
            open: false
          });
        });
    }));
  });
};


const panic = (err) => {
  console.error('Sync failed!');
  console.error(err);
  process.exit(1);
};