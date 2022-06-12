// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import {allTravelersData, allTripsData, allDestinationsData, fetchData} from './apiCalls.js';
import TravelersRepository from './TravelersRepository.js';
// import Traveler from './Traveler.js';
import DestinationsRepository from './DestinationsRepository.js';
import TripsRepository from './TripsRepository.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween)

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png';

console.log('This is the JavaScript entry file - your code begins here.');

// Global Variables:
let travelersRepository;
let tripsRepository;
let destinationsRepository;

//Promise.all
Promise.all([allTravelersData, allTripsData, allDestinationsData])
  .then(data => {
    instantiateTravelersRepo(data[0].travelers);
    instantiateTripsRepo(data[1].trips);
    instantiateDestinationsRepo(data[2].destinations);
  })
  .catch((error) => alert("Oops something went wrong. Try again later."));


function instantiateTravelersRepo(data) {
  travelersRepository = new TravelersRepository(data);
}

function instantiateTripsRepo(data) {
  tripsRepository = new TripsRepository(data);
  // console.log("past", tripsRepository.getAllPastTripsForTraveler(44, "2022/06/11"))
  // console.log("present", tripsRepository.getAllPresentTripsForTraveler(38, "2022/06/11"))
  // console.log("future", tripsRepository.getAllFutureTripsForTraveler(38, "2022/06/11"))
  // console.log("pending", tripsRepository.getAllPendingTripsForTraveler(38, "2022/06/11"))
  // console.log("cost", tripsRepository.getTravelerTripsFromPastYear(44, "2022/06/11"))
  // setTimeout(() => {
    // getTotalCostFromPastYear();
  // }, 1000)
}

function instantiateDestinationsRepo(data) {
  destinationsRepository = new DestinationsRepository(data);
  getTotalCostFromPastYear();
}

function getTotalCostFromPastYear() {
  console.log("tripsRepo", tripsRepository)
  const travelerTripsFromPastYear = tripsRepository.getTravelerTripsFromPastYear(44, "2022/06/11")
  const totalCostOfTrips = travelerTripsFromPastYear.reduce((totalCost, trip) => {
    const tripDestination = destinationsRepository.getDestinationById(trip.destinationID);
      totalCost += (tripDestination.estimatedLodgingCostPerDay * trip.duration) + (tripDestination.estimatedFlightCostPerPerson * trip.travelers)
      console.log("totalCost1", totalCost)
      const fee = Number((totalCost * .10).toFixed(2));
      console.log("fee", fee)
      totalCost += fee;
      console.log("totalCost2", totalCost)
    return totalCost;
  }, 0)
  console.log("totalCostOfTrips", totalCostOfTrips);
  return totalCostOfTrips;
}
