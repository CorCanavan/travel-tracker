import dayjs from 'dayjs'

class TripsRepository {
  constructor(tripsData) {
    this.trips = tripsData;
  }

  getAllTripsByUserID(travelerId) {
    const tripsByTraveler = this.trips.filter(trip => trip.userID === travelerId);
    return tripsByTraveler;
  }

  getAllPastTripsForTraveler(travelerId, currentDate) {
    const allTripsForTraveler = this.getAllTripsByUserID(travelerId);
    const pastTripsForTraveler = allTripsForTraveler.filter(trip => dayjs(trip.date).isBefore(dayjs(currentDate)));
    return pastTripsForTraveler;
  }

  getAllPresentTripsForTraveler(travelerId, currentDate) {
    const allTripsForTraveler = this.getAllTripsByUserID(travelerId);
    const presentTripsForTraveler = allTripsForTraveler.filter(trip => dayjs(trip.date).isSame(dayjs(currentDate)));
    return presentTripsForTraveler;
  }

  getAllFutureTripsForTraveler(travelerId, currentDate) {
    const allTripsForTraveler = this.getAllTripsByUserID(travelerId);
    const futureTripsForTraveler = allTripsForTraveler.filter(trip => dayjs(trip.date).isAfter(dayjs(currentDate)));
    return futureTripsForTraveler;
  }

  getAllPendingTripsForTraveler(travelerId, tripStatus) {
    const allTripsForTraveler = this.getAllTripsByUserID(travelerId);
    const pendingTripsForTraveler = allTripsForTraveler.filter(trip => trip.status === 'pending');
    return pendingTripsForTraveler;
  }


}


export default TripsRepository;
