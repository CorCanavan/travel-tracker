import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler.js';
import travelersData from '../data/travelers-sample-data.js';

describe('Traveler', () => {

let travelerInfo;
let sampleTraveler;

  beforeEach(() => {

    travelerInfo = new Traveler(travelersData[1]);

    sampleTraveler = {
        "id": 2,
        "name": "Rachael Vaughten",
        "travelerType": "thrill-seeker"
      }

  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(travelerInfo).to.be.an.instanceOf(Traveler);
  });

  it('should be an object', () => {
    expect(travelerInfo).to.be.an('object');
    expect(travelerInfo).to.deep.equal(sampleTraveler);
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

  it('should return traveler\'s first name', () => {
    expect(travelerInfo.getTravelerFirstName()).to.equal("Rachael");
  });
});
