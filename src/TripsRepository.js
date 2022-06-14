import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween)

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
    const pastTripsForTraveler = allTripsForTraveler
      .filter(trip => dayjs(trip.date).isBefore(dayjs(currentDate)))
      .filter(trip => trip.status === 'approved');
    return pastTripsForTraveler;
  }

  getAllPresentTripsForTraveler(travelerId, currentDate) {
    const allTripsForTraveler = this.getAllTripsByUserID(travelerId);
    const presentTripsForTraveler = allTripsForTraveler.filter(trip => dayjs(trip.date).isSame(dayjs(currentDate)));
    return presentTripsForTraveler;
  }

  getAllFutureTripsForTraveler(travelerId, currentDate) {
    const allTripsForTraveler = this.getAllTripsByUserID(travelerId);
    const futureTripsForTraveler = allTripsForTraveler
      .filter(trip => dayjs(trip.date).isAfter(dayjs(currentDate)))
      .filter(trip => trip.status === 'approved');
    return futureTripsForTraveler;
  }

  getAllPendingTripsForTraveler(travelerId, tripStatus) {
    const allTripsForTraveler = this.getAllTripsByUserID(travelerId);
    const pendingTripsForTraveler = allTripsForTraveler.filter(trip => trip.status === 'pending');
    return pendingTripsForTraveler;
  }

  getTravelerTripsFromPastYear(travelerId, currentDate) {
    const allTripsForTraveler = this.getAllTripsByUserID(travelerId);
    const tripsFromPastYear = allTripsForTraveler
      .filter(trip => dayjs(trip.date).isBetween(currentDate, dayjs(currentDate).subtract(1, 'year')))
      .filter(trip => trip.status === 'approved');
    return tripsFromPastYear;
  }

}


export default TripsRepository;
