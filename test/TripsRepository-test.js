import chai from 'chai';
const expect = chai.expect;
import TripsRepository from '../src/TripsRepository.js';
import tripsData from '../data/trips-sample-data.js';

describe('Trips Repository', () => {

let tripsRepository;
let sampleTrip;

  beforeEach(() => {

    tripsRepository = new TripsRepository(tripsData);

    sampleTrip = {
      "id": 1,
      "userID": 44,
      "destinationID": 49,
      "travelers": 1,
      "date": "2022/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
      }

  });

  it('should be a function', () => {
    expect(TripsRepository).to.be.a('function');
  });

  it('should be an instance of Trips Repository', () => {
    expect(tripsRepository).to.be.an.instanceOf(TripsRepository);
  });

  it('should have a property to hold all trips data', () => {
    expect(tripsRepository.trips).to.deep.equal(tripsData);
  });

  it ('should return all trips for a particular traveler/user when given their userID', () => {
    expect(tripsRepository.getAllTripsByUserID().to.deep.equal())
  })
});