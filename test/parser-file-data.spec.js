const chai = require('chai');
const expect = chai.expect;
const ParserFileData = require('../lib/ParserFileData');

describe('ParserFileData', () => {
  it('should return an empty array', (done) => {
    let data = new ParserFileData();
    expect(data.parse('')).to.be.empty;
    done();
  });
});
