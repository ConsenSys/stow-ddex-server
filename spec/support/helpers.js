const truncate = {
  truncate: true,
  cascade: true
};

const cleanDatabase = async (done) => {
  const { Offer } = require('./../../models');

  await Offer.destroy(truncate);

  done();
};

module.exports = {
  cleanDatabase
};
