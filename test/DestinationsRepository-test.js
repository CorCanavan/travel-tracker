import chai from 'chai';
const expect = chai.expect;
import DestinationsRepository from '../src/DestinationsRepository.js';
import destinationData from '../data/destinations-sample-data.js';

describe('Destinations Repository', () => {

let destinationsRepository;
let sampleDestination;

  beforeEach(() => {

    destinationsRepository = new DestinationsRepository(destinationData);

    sampleDestination = {
        "id": 2,
        "name": "Rachael Vaughten",
        "travelerType": "thrill-seeker"
      }

  });

  it('should be a function', () => {
    expect(DestinationsRepository).to.be.a('function');
  });
});
