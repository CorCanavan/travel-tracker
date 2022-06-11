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
});
