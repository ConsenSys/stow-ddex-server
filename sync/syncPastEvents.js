const {
  Offer
} = require('./../models');

const {
  serializeOffer
} = require('./serialization');

module.exports = (linnia, blockNumber) => {

  const {
    LinniaOfferMade
  } = linnia.events;

  return Promise.all([
      syncPastOffers(LinniaOfferMade, linnia, blockNumber)
    ])
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

const syncPastOffers = (offersEvent, linnia, blockNumber) => {
  return getPastEvents(offersEvent, blockNumber).then(eventsArrays => {
    let events = [].concat.apply([], eventsArrays);
    return Promise.all(events.map((event) => {
      return linnia.getRecord(event.args.dataHash)
        .then(record => {
          // Add record to DB
          Offer.findOrCreate({
            where: serializeOffer(event, record)
          })
        });
    }));
  });
};


const panic = (err) => {
  console.error('Sync failed!');
  console.error(err);
  process.exit(1);
};
