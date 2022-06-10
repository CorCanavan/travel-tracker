import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler.js';
import travelersData from '../data/travelers-sample-data.js';

describe('Traveler', () => {

let travelerInfo;

  beforeEach(() => {

    travelerInfo = new Traveler(travelersData[1]);

  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(travelerInfo).to.be.an.instanceOf(Traveler);
  });

  it('should have an id property', () => {
    expect(travelerInfo.id).to.equal(2);
  });

  it('should have a name property', () => {
    expect(travelerInfo.name).to.equal("Rachael Vaughten");
  });

  it('should have a travelerType property', () => {
    expect(travelerInfo.travelerType).to.equal("thrill-seeker");
  });
});
