// Project Files
import './css/styles.css';
import {allTravelersData, allTripsData, allDestinationsData, fetchData, addTripData} from './apiCalls.js';
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
let tripForm = document.getElementById('trip-form');
let tripDateInput = document.getElementById('trip-date-input');
let tripDurationInput = document.getElementById('trip-duration-input');
let tripNumTravelersInput = document.getElementById('num-trav-input');
let tripDestinationSelection = document.getElementById('destination-selection');
let submitTripButton = document.getElementById('submitTrip');
let estimatedCost = document.getElementById('estCost');

// Global Variables:
let currentTraveler;
let travelersRepository;
let tripsRepository;
let destinationsRepository;
let currentDate = dayjs().format('YYYY/MM/DD');

let displayedTravelersId = Math.floor(Math.random() * 49) + 1;
console.log("id", displayedTravelersId);

//Event Listeners:
tripDateInput.addEventListener('input', checkFormInputs);
tripDurationInput.addEventListener('input', checkFormInputs);
tripNumTravelersInput.addEventListener('input', checkFormInputs);
tripDestinationSelection.addEventListener('input', checkFormInputs);
submitTripButton.addEventListener('click', submitTripForm);

function checkFormInputs(e) {
  const formattedDate = dayjs(tripDateInput.value).format('YYYY/MM/DD')
  const isValidDate = dayjs(formattedDate).isBefore(currentDate);

  if (!isValidDate &&
    tripDurationInput.value &&
    tripNumTravelersInput.value &&
    tripDestinationSelection.value) {
    submitTripButton.disabled = false;
    const getDestinationByLocation = destinationsRepository.destinations.find(destination => destination.destination === tripDestinationSelection.value)
    console.log("test", getDestinationByLocation);
    const pendingTrip = {
      userID: displayedTravelersId,
      destinationID: getDestinationByLocation.id,
      travelers: Number(tripNumTravelersInput.value),
      duration: Number(tripDurationInput.value)
    }
    console.log(pendingTrip, "pendingTrip");
    estimatedCost.innerText = `${getTotalTripCost([pendingTrip])}`
  }
}

function submitTripForm(e) {
  console.log("e", e);
  e.preventDefault();
  let postTripObject = {
    id: tripsRepository.trips.length + 1,
    userID: displayedTravelersId,
    destinationID: (destinationsRepository.destinations.find(destination => destination.destination === tripDestinationSelection.value)).id,
    travelers: Number(tripNumTravelersInput.value),
    date: dayjs(tripDateInput.value).format('YYYY/MM/DD'),
    duration: Number(tripDurationInput.value),
    status: 'pending',
    suggestedActivities: []
  }

  addTripData(postTripObject)
    .then(object => {
      fetchData("http://localhost:3001/api/v1/trips").then(data => {
        instantiateTripsRepo(data.trips);
        populateDashboard(currentTraveler);
      })
    })
    tripForm.reset();
    estimatedCost.innerText = '';
    submitTripButton.disabled = true;
  }

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

  const allUserPastTrips = tripsRepository.getAllPastTripsForTraveler(displayedTravelersId, currentDate);
  const allUserPresentTrips = tripsRepository.getAllPresentTripsForTraveler(displayedTravelersId, currentDate);
  const allUserFutureTrips = tripsRepository.getAllFutureTripsForTraveler(displayedTravelersId, currentDate);
  const allUserPendingTrips = tripsRepository.getAllPendingTripsForTraveler(displayedTravelersId, currentDate);
  const allTripsFromLastYear = tripsRepository.getTravelerTripsFromPastYear(displayedTravelersId, currentDate);

  pastScrollContent.innerHTML = parseCardFromData(allUserPastTrips)

  presentScrollContent.innerHTML = parseCardFromData(allUserPresentTrips);

  upcomingScrollContent.innerHTML = parseCardFromData(allUserFutureTrips);

  pendingScrollContent.innerHTML = parseCardFromData(allUserPendingTrips);

  totalYearlyCost.innerText = `$${getTotalTripCost(allTripsFromLastYear)}`
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
            <h1>${destination.destination}</h1>
          </header>
          <p class="date">Date: ${trip.date}</p>
          <p class="duration">Duration: ${trip.duration}</p>
          <p class="num-travelers">Traveler(s): ${trip.travelers}</p>
          <p class="status">Status: ${trip.status}</p>
        </div>
      </article>
    `
    return acc
  }, ``)
}

// const travelerTripsFromPastYear = tripsRepository.getTravelerTripsFromPastYear(displayedTravelersId, currentDate);
//

function getTotalTripCost(tripData) {
  const totalTripCost = tripData.reduce((totalCost, trip) => {
    const tripDestination = destinationsRepository.getDestinationById(trip.destinationID);
    totalCost += (tripDestination.estimatedLodgingCostPerDay * trip.duration) + (tripDestination.estimatedFlightCostPerPerson * trip.travelers);
    return totalCost;
  }, 0)
  const fee = totalTripCost * .10;
  return (totalTripCost + fee).toFixed(2);
}
