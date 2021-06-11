const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const ParserFileData = require('../lib/ParserFileData');
const BASE_FILE = (__dirname + '/../log/games.log');

describe('ParserFileData', () => {
  it('should return an empty array', (done) => {
    let data = new ParserFileData();
    expect(data.parse('')).to.be.empty;
    done();
  });

  it('should return a game log if the file is passed in', (done) => {
    fs.readFile(BASE_FILE, (error , file) => {
      if ( error  ) throw error ;
      let log = file.toString();
      let data = new ParserFileData();
      expect( data.parse ( log ) ).to.be.a('array');
      done();
    });
  });

  it('should return number of total_kills', (done) => {
    fs.readFile(BASE_FILE, (error , file) => {
      if ( error  ) throw error ;
      let data = new ParserFileData();
      let result = data.parse(file.toString());

      console.log(result[5]);
      expect( ( result[5].total_kills ) ).to.be.a('number');
      done();
    });
  });

  it('should return game players', (done) => {

    fs.readFile(BASE_FILE, (error , file) => {
      if ( error  ) throw error ;
      let data = new ParserFileData();
      let result   = data.parse(file.toString());
      expect( ( result[5].players ) ).to.be.a('array');
      done();
    });
  });

  it('should return number of kills per player', (done) => {
    fs.readFile(BASE_FILE, (error , file) => {
      if ( error  ) throw error ;
      let data = new ParserFileData();
      let result   = data.parse(file.toString());
      expect( ( result[5].kills['Zeh'] ) ).to.be.a('number');
      done();
    });
  });
});
