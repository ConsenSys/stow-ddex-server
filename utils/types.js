
const bigNumberToNumber = (bigNumber) => {
  if (bigNumber.toNumber) {
    return bigNumber.toNumber();
  } 
  else if(Number(bigNumber)){
    return Number(bigNumber);
  }
  else {
    throw Error("Argument is not a big number.");
  }
}

module.exports = {
  bigNumberToNumber
};
