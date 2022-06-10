import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler.js';
import travelersData from '../data/travelers-sample-data.js';

describe('Traveler', () => {

let traveler;

  beforeEach(() => {

    traveler = new Traveler(travelersData[1]);

  });

  it('should be a function', function () {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });
});
