// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import {allTravelersData, allTripsData, allDestinationsData, fetchData} from './apiCalls.js';
import TravelersRepository from './TravelersRepository.js';
import Traveler from './Traveler.js';
import DestinationsRepository from './DestinationsRepository.js';
import TripsRepository from './TripsRepository.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween)

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png';

//Query Selectors:


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
  const travelerTripsFromPastYear = tripsRepository.getTravelerTripsFromPastYear(14, "2022/06/11");
  const totalCostOfTrips = travelerTripsFromPastYear.reduce((totalCost, trip) => {
    const tripDestination = destinationsRepository.getDestinationById(trip.destinationID);
    totalCost += (tripDestination.estimatedLodgingCostPerDay * trip.duration) + (tripDestination.estimatedFlightCostPerPerson * trip.travelers);
    return totalCost;
  }, 0)
  const fee = totalCostOfTrips * .10;
  return (totalCostOfTrips + fee).toFixed(2);
}
