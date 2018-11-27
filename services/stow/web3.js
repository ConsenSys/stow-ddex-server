const Web3 = require('web3');
const config = require('./config');

let websocketProvider = new Web3.providers.WebsocketProvider(config.websocketProvider);
let web3 = new Web3(websocketProvider);

module.exports = { web3 };
