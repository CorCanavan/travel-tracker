import chai from 'chai';
const expect = chai.expect;
import DestinationsRepository from '../src/DestinationsRepository.js';
import destinationsData from '../data/destinations-sample-data.js';

describe('Destinations Repository', () => {

let destinationsRepository;
let sampleDestination;

  beforeEach(() => {

    destinationsRepository = new DestinationsRepository(destinationsData);

    sampleDestination =   {
        "id": 3,
        "destination": "Sydney, Austrailia",
        "estimatedLodgingCostPerDay": 130,
        "estimatedFlightCostPerPerson": 950,
        "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "opera house and city buildings on the water with boats"
      }

  });

  it('should be a function', () => {
    expect(DestinationsRepository).to.be.a('function');
  });

  it('should be an instance of Destinations Repository', () => {
    expect(destinationsRepository).to.be.an.instanceOf(DestinationsRepository);
  });

  it('should have a property to hold all destinations data', () => {
    expect(destinationsRepository.destinations).to.deep.equal(destinationsData);
  });

  it('should return a destination object when given an id', () => {
    expect(destinationsRepository.getDestinationById(3)).to.deep.equal(destinationsRepository.destinations[2]);
    expect(destinationsRepository.getDestinationById(3)).to.deep.equal(sampleDestination);
  });

  it('should return undefined if unable to find destination by id', () => {
    expect(destinationsRepository.getDestinationById(6)).to.equal(undefined);
  })
});
