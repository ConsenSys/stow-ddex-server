const Hub = require('@stowprotocol/stow-ddex-smart-contracts/build/contracts/StowDDEXHub');
const Staking = require('@stowprotocol/stow-ddex-smart-contracts/build/contracts/StowStaking');
const Offers = require('@stowprotocol/stow-ddex-smart-contracts/build/contracts/StowOffers');
const STOWToken = require('@stowprotocol/stow-token-contracts/build/contracts/STOWToken');
const { getContract } = require('./contract');

const getDDexContracts = async () => {
  const hub = getContract(Hub, process.env.STOW_DDEX_HUB_ADDRESS);
  const stakingAddress = await hub.stakingContract();
  const offersAddress = await hub.offersContract();
  const tokenAddress = await hub.tokenContract();
  const staking = getContract(Staking, stakingAddress);
  const offers = getContract(Offers, offersAddress);
  const token = getContract(STOWToken, tokenAddress);
  return {
    staking,
    offers,
    token,
    hub,
  };
};

module.exports ={ getDDexContracts };
