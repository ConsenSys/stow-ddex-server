const stayInSync = require('./stayInSync');
const syncPastEvents = require('./syncPastEvents');
const { getDDexContracts } = require('../services/linnia/ddexContracts');

const initialize = async(linnia) => {
  let blockNumber = await linnia.web3.eth.getBlockNumber();
  const { offers } = await getDDexContracts();
  syncPastEvents(linnia, blockNumber, offers).then(() => stayInSync(linnia));
};

module.exports = {
  initialize
};
