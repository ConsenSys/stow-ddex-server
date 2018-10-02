const TruffleContract = require('truffle-contract');
const { web3 } = require('./web3');

const getContract = (abi, address) => {
  const Contract = TruffleContract(abi);
  Contract.setProvider(web3.currentProvider);
  const contract = Contract.at(address);
  return contract;
};

module.exports = { getContract };
