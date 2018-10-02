class Mocks {


  static get attestationOne() {
    return {
     attestator: '0x48105d85bc552cab48a76919d0a5de80c30b7418',
     dataHash: '0xc3498851be5308409a6fa95923bfcc8aff724247e0a3db57960a116c3e25a243'
    };
  };

  static get attestationTwo() {
    return {
     attestator: '0x5f12c53f54b668afae818dad56e109ef7815b015',
     dataHash: '0xc3498851be5308409a6fa95923bfcc8aff724247e0a3db57960a116c3e25a243'
    };
  };

  static get attestationThree() {
    return {
     attestator: '0x9fe12ec48823b7c9170164d4f6619fce2706c5a0',
     dataHash: '0xb2922ca861f838ec8c94c1163baed891e0b9b8eeade739d2dde4c0bfc9503107'
    };
  };

  static get attestationFour() {
    return {
     attestator: '0x31aaa50403416d6e56e3399868930947c40f42dc',
     dataHash: '0x87e5dc3e0b87b1f7f4fc49ce4ef28918b486419eb4c0ab345d4137ce3e92d975'
    };
  };

  static get attestationFive() {
    return {
     attestator: '0xe27f1805ad9a3921146021eb3d39114280bc8315',
     dataHash: '0x87e5dc3e0b87b1f7f4fc49ce4ef28918b486419eb4c0ab345d4137ce3e92d975'
    };
  };

  static get attestations() {
    return [
      this.attestationOne,
      this.attestationTwo,
      this.attestationThree,
      this.attestationFour,
      this.attestationFive
    ];
  }
}

module.exports = Mocks;
