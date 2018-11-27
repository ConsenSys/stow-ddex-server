const Stow = require('@stowprotocol/stow-js');
const config = require('./config');
const stayInSync = require('../../sync/stayInSync');
const IPFS = require('ipfs-api');
const { web3 } = require('./web3');
const { getDDexContracts } = require('./ddexContracts');

const eventsToTrack = [{
  name: 'StowOfferMade',
  contract: 'offers'
},
{
  name: 'StowOfferRevoked',
  contract: 'offers'
},
{
  name: 'StowOfferFulfilled',
  contract: 'offers'
}];

const initialize = async () => {
  const contracts = await getDDexContracts();
  const { hub } = contracts;
  const hubAddress = await hub.hubContract();
  const stow = new Stow(web3, { hubAddress });

  // Keep connection alive
  web3._provider.on('end', () => initialize().then(_stow => stayInSync(_stow)));

  const events = getEvents(contracts);
  return Object.assign(stow, { events });
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

module.exports = { initialize };
