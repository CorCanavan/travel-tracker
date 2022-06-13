// Project Files
import './css/styles.css';
import {allTravelersData, allTripsData, allDestinationsData, fetchData} from './apiCalls.js';
import TravelersRepository from './TravelersRepository.js';
import Traveler from './Traveler.js';
import DestinationsRepository from './DestinationsRepository.js';
import TripsRepository from './TripsRepository.js';

// Third-Party File
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween)

//Query Selectors:
let userName = document.getElementById('currentUserName');
let pastScrollContent = document.getElementById('pastScrollContent');
let upcomingScrollContent = document.getElementById('upcomingScrollContent');
let pendingScrollContent = document.getElementById('pendingScrollContent');
let presentScrollContent = document.getElementById('presentScrollContent');
let totalYearlyCost = document.getElementById('totalYearlyCost');


// Global Variables:
let currentTraveler;
let travelersRepository;
let tripsRepository;
let destinationsRepository;

let displayedTravelersId = Math.floor(Math.random() * 50);

//Promise.all
Promise.all([allTravelersData, allTripsData, allDestinationsData])
  .then(data => {
    const travelersData = data[0].travelers.map(traveler => new Traveler(traveler))
    instantiateTravelersRepo(travelersData);
    instantiateTripsRepo(data[1].trips);
    instantiateDestinationsRepo(data[2].destinations);
  })
  .catch((error) => {
    console.error("error", error);
    alert("Oops something went wrong. Try again later.")
  })
  .finally(() => {
    currentTraveler = travelersRepository.getTravelerById(displayedTravelersId);
    populateDashboard(currentTraveler)
  })


function instantiateTravelersRepo(travelersData) {
  travelersRepository = new TravelersRepository(travelersData);
}

function instantiateTripsRepo(data) {
  tripsRepository = new TripsRepository(data);
}

function instantiateDestinationsRepo(data) {
  destinationsRepository = new DestinationsRepository(data);
}

function populateDashboard(currentTraveler) {
  userName.innerText = `${currentTraveler.getTravelerFirstName()}`;

  const allUserPastTrips = tripsRepository.getAllPastTripsForTraveler(displayedTravelersId, "2022/06/12");
  const allUserPresentTrips = tripsRepository.getAllPresentTripsForTraveler(displayedTravelersId, "2022/06/12");
  const allUserFutureTrips = tripsRepository.getAllFutureTripsForTraveler(displayedTravelersId, "2022/06/12");
  const allUserPendingTrips = tripsRepository.getAllPendingTripsForTraveler(displayedTravelersId, "2022/06/12");

  pastScrollContent.innerHTML += parseCardFromData(allUserPastTrips)

  presentScrollContent.innerHTML += parseCardFromData(allUserPresentTrips);

  upcomingScrollContent.innerHTML += parseCardFromData(allUserFutureTrips);

  pendingScrollContent.innerHTML += parseCardFromData(allUserPendingTrips);

  totalYearlyCost.innerText += `$${getTotalCostFromPastYear()}`
}

function parseCardFromData(data) {
  if (!data.length) {
    return `<p>No trips to display!</p>`
  }

  return data.reduce((acc, trip) => {
    const destination = destinationsRepository.getDestinationById(trip.destinationID);
    acc += `
      <article class="card">
          <img
            src=${destination.image}
            alt=${destination.alt}
            class="card-image"
          />
        <div class="bottom-card">
          <header class="card-header">
            <h4>${destination.destination}</h4>
          </header>
          <p class="date">Trip Date: ${trip.date}</p>
          <p class="duration">Trip Duration: ${trip.duration}</p>
          <p class="num-travelers">Number of Travelers: ${trip.travelers}</p>
        </div>
      </article>
    `
    return acc
  }, ``)
}


function getTotalCostFromPastYear() {
  const travelerTripsFromPastYear = tripsRepository.getTravelerTripsFromPastYear(displayedTravelersId, "2022/06/11");
  const totalCostOfTrips = travelerTripsFromPastYear.reduce((totalCost, trip) => {
    const tripDestination = destinationsRepository.getDestinationById(trip.destinationID);
    totalCost += (tripDestination.estimatedLodgingCostPerDay * trip.duration) + (tripDestination.estimatedFlightCostPerPerson * trip.travelers);
    return totalCost;
  }, 0)
  const fee = totalCostOfTrips * .10;
  return (totalCostOfTrips + fee).toFixed(2);
}
