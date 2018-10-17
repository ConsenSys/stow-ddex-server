const Linnia = require('@linniaprotocol/linnia-july-2018');
const config = require('./config');
const stayInSync = require('../../sync/stayInSync');
const IPFS = require('ipfs-api');
const { web3 } = require('./web3');
const { getDDexContracts } = require('./ddexContracts');

const ipfs = new IPFS(config.ipfs);
let linnia = new Linnia(web3, ipfs, config.linnia);

const eventsToTrack = [{
  name: 'LinniaOfferMade',
  contract: 'offers'
},
{
  name: 'LinniaOfferRevoked',
  contract: 'offers'
},
{
  name: 'LinniaOfferFulfilled',
  contract: 'offers'
}];

const _initialize = () => {
  // Keep connection alive
  web3._provider.on('end', (eventObj) => {
    console.log("WS disconnected. Reconnecting...")
    linnia = new Linnia(web3, ipfs, config.linnia);
    _initialize().then(events => Object.assign(linnia, { events })).then((l) => stayInSync(l))
  });

  return getDDexContracts()
    .then(getEvents);
};

const getEvents = (contracts) => {
  const events = {};
  eventsToTrack.forEach((_event) => {
    const contract = contracts[_event.contract];
    let event = contract[_event.name];
    events[_event.name] = fixWatch(event, _event.name, contract);
  });
  return events;
};

// Hacks to make event watching work without totally refactoring library
const fixWatch = (event, name, contract) => {
  const web3Contract = new web3.eth.Contract(contract.abi, contract.address);

  event.watch = (callback) => {
    web3Contract.events[name]().on('data', callback)
  };

  return event;
}

module.exports = {
  initialize: () => _initialize().then(events => Object.assign(linnia, { events }))
};
