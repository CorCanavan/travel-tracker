import chai from 'chai';
const expect = chai.expect;
import TravelersRepository from '../src/TravelersRepository.js';
import travelersData from '../data/travelers-sample-data.js';

describe('Travelers Repository', () => {

let travelersRepository;

  beforeEach(() => {

    travelersRepository = new TravelersRepository(travelersData);

  });

  it('should be a function', function () {
    expect(TravelersRepository).to.be.a('function');
  });

  it('should be an instance of Travelers Repository', () => {
    expect(travelersRepository).to.be.an.instanceOf(TravelersRepository);
  });

  it('should have a property to hold all travelers data', () => {
    expect(travelersRepository.travelers).to.deep.equal(travelersData);
  });

  it("should take in correct amount of travelers data", () => {
    expect(travelersRepository.travelers.length).to.equal(5);
  });

  // it('should return a user\'s data when given an id', () => {
  //   expect(userRepository.getUserById(1)).to.deep.equal(userRepository.users[0]);
  // });
  });
