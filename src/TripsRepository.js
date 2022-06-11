class TripsRepository {
  constructor(tripsData) {
    this.trips = tripsData;
  }

  getAllTripsByUserID(travelerId) {
    const tripsByTraveler = this.trips.filter(trip => trip.userID === travelerId);
    return tripsByTraveler;
  }
}


export default TripsRepository;
