import chai from 'chai';
const expect = chai.expect;
import TripsRepository from '../src/TripsRepository.js';
import tripsData from '../data/trips-sample-data.js';

describe('Trips Repository', () => {

let tripsRepository;
let sampleTrip;

  beforeEach(() => {

    tripsRepository = new TripsRepository(tripsData);

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

  it('should return all trips for a specific traveler/user when given their userID', () => {
    const tripsDataUser43 = tripsData.filter(el => el.userID === 43);
    expect(tripsRepository.getAllTripsByUserID(43)).to.deep.equal(tripsDataUser43);
    expect(tripsRepository.getAllTripsByUserID(43).length).to.equal(5);
  });

  it('should return all Past trips for a specific traveler when given id and date', () => {
    expect(tripsRepository.getAllPastTripsForTraveler(43, "2022/06/11").length).to.equal(4);
  });

  it('should return all Present trips for a specific traveler when given id and date', () => {
    expect(tripsRepository.getAllPresentTripsForTraveler(3, "2022/06/11")).to.deep.equal([{
            "id": 3,
            "userID": 3,
            "destinationID": 22,
            "travelers": 4,
            "date": "2022/06/11",
            "duration": 17,
            "status": "approved",
            "suggestedActivities": []
          }]);
    expect(tripsRepository.getAllPresentTripsForTraveler(3, "2022/06/11").length).to.equal(1);
  });

  it('should return all Future trips for a specific traveler when given id and date', () => {
    expect(tripsRepository.getAllFutureTripsForTraveler(44, "2022/06/11")).to.deep.equal([{
          "id": 1,
          "userID": 44,
          "destinationID": 49,
          "travelers": 1,
          "date": "2022/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
      }]);
    expect(tripsRepository.getAllFutureTripsForTraveler(44, "2022/06/11").length).to.equal(1);
  });

  it('should return all Pending trips for a specific traveler when given id and date', () => {
    expect(tripsRepository.getAllPendingTripsForTraveler(43, "2022/06/11")).to.deep.equal([{
          "id": 27,
          "userID": 43,
          "destinationID": 7,
          "travelers": 6,
          "date": "2019/07/16",
          "duration": 5,
          "status": "pending",
          "suggestedActivities": []
      }]);
    expect(tripsRepository.getAllPendingTripsForTraveler(43, "2022/06/11").length).to.equal(1);
  });
});
