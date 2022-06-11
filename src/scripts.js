// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import {allTravelersData, allTripsData, allDestinationsData, fetchData} from './apiCalls.js';
import TravelersRepository from './TravelersRepository.js';
// import Traveler from './Traveler.js';
import DestinationsRepository from './DestinationsRepository.js';
import TripsRepository from './TripsRepository.js';

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
}

function instantiateDestinationsRepo(data) {
  destinationsRepository = new DestinationsRepository(data);
}
