class TravelersRepository {
  constructor(travelersData) {
    this.travelers = travelersData;
  }

  getTravelerById(id) {
    const foundTraveler = this.travelers.find(traveler => traveler.id === id);
      return foundTraveler;
  }
}


export default TravelersRepository;
