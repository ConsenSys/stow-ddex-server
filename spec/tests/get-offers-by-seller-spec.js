require('dotenv').config();
const request = require('request');
const mocks = require('./../support/mocks');
const { cleanDatabase } = require('./../support/helpers');
const port = process.env.LINNIA_PORT;

  describe("Get Offers", () => {
  beforeEach(cleanDatabase);
  beforeEach(async (done) => {

    const { Offer} = require('../../models');

    for (let i = 0; i < 5; i++) {
      await Offer.create({
      dataHash: mocks.offers[i].dataHash,
      buyer: mocks.offers[i].buyer,
      seller: mocks.offers[i].seller,
      amount: mocks.offers[i].amount

    });
    };

    done();
  });

  afterEach(cleanDatabase);


  it('should return the offers with the seller address (one and two)', (done) => {
    request.get({url:`http://localhost:${port}/offers/${mocks.offerOne.seller}`}, (err, httpResponse, body) => {
      const offers = JSON.parse(body);
      expect(offers.length).toEqual(2);
      expect(offers[0].seller).toEqual(mocks.offerOne.seller);
      expect(offers[1].seller).toEqual(mocks.offerTwo.seller);
      expect(offers[0].buyer).toEqual(mocks.offerOne.buyer);
      expect(offers[1].buyer).toEqual(mocks.offerTwo.buyer);
      expect(offers[0].dataHash).toEqual(mocks.offerOne.dataHash);
      expect(offers[1].dataHash).toEqual(mocks.offerTwo.dataHash);
      expect(offers[0].amount).toEqual(mocks.offerOne.amount);
      expect(offers[1].amount).toEqual(mocks.offerTwo.amount);
      done();
    });
  });

  it('should return the offers with the seller address (three)', (done) => {
    request.get({url:`http://localhost:${port}/offers/${mocks.offerThree.seller}`}, (err, httpResponse, body) => {
      const offers = JSON.parse(body);
      expect(offers.length).toEqual(1);
      expect(offers[0].dataHash).toEqual(mocks.offerThree.dataHash);
      expect(offers[0].seller).toEqual(mocks.offerThree.seller);
      expect(offers[0].buyer).toEqual(mocks.offerThree.buyer);
      expect(offers[0].amount).toEqual(mocks.offerThree.amount);
      done();
    });
  });


  it('should return the offers with the seller address (four and five)', (done) => {
    request.get({url:`http://localhost:${port}/offers/${mocks.offerFour.seller}`}, (err, httpResponse, body) => {
      const offers = JSON.parse(body);
      expect(offers.length).toEqual(2);
      expect(offers[0].seller).toEqual(mocks.offerFour.seller);
      expect(offers[1].seller).toEqual(mocks.offerFive.seller);
      expect(offers[0].buyer).toEqual(mocks.offerFour.buyer);
      expect(offers[1].buyer).toEqual(mocks.offerFive.buyer);
      expect(offers[0].dataHash).toEqual(mocks.offerFour.dataHash);
      expect(offers[1].dataHash).toEqual(mocks.offerFive.dataHash);
      expect(offers[0].amount).toEqual(mocks.offerFour.amount);
      expect(offers[1].amount).toEqual(mocks.offerFive.amount);
      done();
    });
  });

  it('should return an empty array if no offer', (done) => {
    request.get({url:`http://localhost:${port}/offers/hbvsdahjvasd`}, (err, httpResponse, body) => {
      expect(JSON.parse(body)).toEqual([]);
      done();
    });
  });
})
