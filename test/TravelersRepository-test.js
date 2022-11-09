import chai from 'chai';
const expect = chai.expect;
import TravelersRepository from '../src/TravelersRepository.js';
import travelersData from '../data/travelers-sample-data.js';

describe('Travelers Repository', () => {

let travelersRepository;
let sampleTraveler;

  beforeEach(() => {

    travelersRepository = new TravelersRepository(travelersData);

    sampleTraveler = {
        "id": 2,
        "name": "Rachael Vaughten",
        "travelerType": "thrill-seeker"
      }

  });

  it('should be a function', () => {
    expect(TravelersRepository).to.be.a('function');
  });

  it('should be an instance of Travelers Repository', () => {
    expect(travelersRepository).to.be.an.instanceOf(TravelersRepository);
  });

  it('should have a property to hold all travelers data', () => {
    expect(travelersRepository.travelers).to.deep.equal(travelersData);
  });

  it('should take in correct amount of travelers data', () => {
    expect(travelersRepository.travelers.length).to.equal(5);
  });

  it('should return a traveler\'s specific data when given an id', () => {
    expect(travelersRepository.getTravelerById(2)).to.deep.equal(travelersRepository.travelers[1]);
    expect(travelersRepository.getTravelerById(2)).to.deep.equal(sampleTraveler);
  });

  it('should return undefined if unable to find traveler by id', () => {
    expect(travelersRepository.getTravelerById(6)).to.equal(undefined);
  });
});
