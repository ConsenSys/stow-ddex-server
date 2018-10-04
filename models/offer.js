module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('offer', {
    dataHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    buyer: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('buyer', val.toLowerCase());
      }
    },
    seller: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('seller', val.toLowerCase());
      }
    },
    buyerPublicKey: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('buyerPublicKey', val.toLowerCase());
      }
    },
    amount: DataTypes.INTEGER,
    open: DataTypes.BOOLEAN
  });

  return Offer;
};
