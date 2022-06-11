class DestinationsRepository {
  constructor(destinationsData) {
    this.destinations = destinationsData;
  }

  getDestinationById(id) {
    const foundDestination = this.destinations.find(destination => destination.id === id);
    return foundDestination;
  }
}


export default DestinationsRepository;
