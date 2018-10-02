const Hub = require('@linniaprotocol/linnia-ddex-smart-contracts/build/contracts/LinniaDDEXHub');
const Staking = require('@linniaprotocol/linnia-ddex-smart-contracts/build/contracts/LinniaStaking');
const Offers = require('@linniaprotocol/linnia-ddex-smart-contracts/build/contracts/LinniaOffers');
const LINToken = require('@linniaprotocol/linnia-token-contracts/build/contracts/LINToken');
const { getContract } = require('./contract');


const getDDexContracts = async () => {
  const hub = getContract(Hub, process.env.LINNIA_DDEX_HUB_ADDRESS);
  const stakingAddress = await hub.stakingContract();
  const offersAddress = await hub.offersContract();
  const tokenAddress = await hub.tokenContract();
  const staking = getContract(Staking, stakingAddress);
  const offers = getContract(Offers, offersAddress);
  const token = getContract(LINToken, tokenAddress);
  return {
    staking,
    offers,
    token,
    hub,
  };
};

module.exports ={ getDDexContracts };
