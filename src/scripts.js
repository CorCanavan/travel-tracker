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
dayjs.extend(isBetween);

// Query Selectors
let userName = document.getElementById('currentUserName');
let pastScrollContent = document.getElementById('pastScrollContent');
let upcomingScrollContent = document.getElementById('upcomingScrollContent');
let pendingScrollContent = document.getElementById('pendingScrollContent');
let presentScrollContent = document.getElementById('presentScrollContent');
let totalYearlyCost = document.getElementById('totalYearlyCost');
let tripForm = document.getElementById('tripForm');
let tripDateInput = document.getElementById('tripDateInput');
let tripDurationInput = document.getElementById('tripDurationInput');
let tripNumTravelersInput = document.getElementById('numTravInput');
let tripDestinationSelection = document.getElementById('destinationSelection');
let submitTripButton = document.getElementById('submitTrip');
let estimatedCost = document.getElementById('estCost');
let dashboard = document.getElementById('dashboard');
let tripFormWrapper = document.getElementById('formWrapper');
let loginPage = document.getElementById('loginPage');
let loginForm = document.getElementById('loginForm');
let usernameInput = document.getElementById('usernameInput');
let passwordInput = document.getElementById('passwordInput');
let loginButton = document.getElementById('loginButton');
let loginError = document.getElementById('loginError');

// Global Variables
let currentTraveler;
let travelersRepository;
let tripsRepository;
let destinationsRepository;
let currentDate = dayjs().format('YYYY/MM/DD');
let displayedTravelersId;

// Event Listeners
tripDateInput.addEventListener('input', checkFormInputs);
tripDurationInput.addEventListener('input', checkFormInputs);
tripNumTravelersInput.addEventListener('input', checkFormInputs);
tripDestinationSelection.addEventListener('input', checkFormInputs);
submitTripButton.addEventListener('click', submitTripForm);
usernameInput.addEventListener('input', checkLoginInputs);
passwordInput.addEventListener('input', checkLoginInputs);
loginButton.addEventListener('click', submitLoginForm);

// Promise.all
Promise.all([allTravelersData, allTripsData, allDestinationsData])
  .then((data) => {
    const travelersData = data[0].travelers.map((traveler) => new Traveler(traveler));
    instantiateTravelersRepo(travelersData);
    instantiateTripsRepo(data[1].trips);
    instantiateDestinationsRepo(data[2].destinations);
  })
  .catch((error) => {
    console.error('error', error.message);
    return alert('Oops! Something went wrong. Please try again later.');
  });

function instantiateTravelersRepo(travelersData) {
  travelersRepository = new TravelersRepository(travelersData);
}

function instantiateTripsRepo(data) {
  tripsRepository = new TripsRepository(data);
}

function instantiateDestinationsRepo(data) {
  destinationsRepository = new DestinationsRepository(data);
}

// DOM
function populateDashboard(currentTraveler) {
  userName.innerText = `${currentTraveler.getTravelerFirstName()}`;

  const allUserPastTrips = tripsRepository.getAllPastTripsForTraveler(displayedTravelersId, currentDate);
  const allUserPresentTrips = tripsRepository.getAllPresentTripsForTraveler(displayedTravelersId, currentDate);
  const allUserFutureTrips = tripsRepository.getAllFutureTripsForTraveler(displayedTravelersId, currentDate);
  const allUserPendingTrips = tripsRepository.getAllPendingTripsForTraveler(displayedTravelersId, currentDate);
  const allTripsFromLastYear = tripsRepository.getTravelerTripsFromPastYear(displayedTravelersId, currentDate);

  pastScrollContent.innerHTML = parseCardFromData(allUserPastTrips);

  presentScrollContent.innerHTML = parseCardFromData(allUserPresentTrips);

  upcomingScrollContent.innerHTML = parseCardFromData(allUserFutureTrips);

  pendingScrollContent.innerHTML = parseCardFromData(allUserPendingTrips);

  totalYearlyCost.innerText = `$${getTotalTripCost(allTripsFromLastYear)}`;
}

function parseCardFromData(data) {
  if (!data.length) {
    return `<p class="no-trips-msg">No trips to display!</p>`;
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
          <p class="num-travelers">Travelers: ${trip.travelers}</p>
          <p class="status">Status: ${trip.status}</p>
        </div>
      </article>
    `;
    return acc;
  }, ``);
}

function getTotalTripCost(tripData) {
  const totalTripCost = tripData.reduce((totalCost, trip) => {
    const tripDestination = destinationsRepository.getDestinationById(trip.destinationID);
    totalCost += (tripDestination.estimatedLodgingCostPerDay * trip.duration) + (tripDestination.estimatedFlightCostPerPerson * trip.travelers);
    return totalCost;
  }, 0);
  const fee = totalTripCost * 0.1;
  return (totalTripCost + fee).toFixed(2);
}

// Trip Request Form
function checkFormInputs(e) {
  const formattedDate = dayjs(tripDateInput.value).format('YYYY/MM/DD');
  const isValidDate = dayjs(formattedDate).isBefore(currentDate);

  if (!isValidDate &&
    tripDurationInput.value &&
    tripNumTravelersInput.value &&
    tripDestinationSelection.value) {
    submitTripButton.disabled = false;
    const getDestinationByLocation = destinationsRepository.destinations.find((destination) => destination.destination === tripDestinationSelection.value);
    const pendingTrip = {
      userID: displayedTravelersId,
      destinationID: getDestinationByLocation.id,
      travelers: Number(tripNumTravelersInput.value),
      duration: Number(tripDurationInput.value),
    };
    estimatedCost.innerText = `${getTotalTripCost([pendingTrip])}`;
  }
}

function submitTripForm(e) {
  e.preventDefault();
  let postTripObject = {
    id: tripsRepository.trips.length + 1,
    userID: displayedTravelersId,
    destinationID: (destinationsRepository.destinations.find((destination) => destination.destination === tripDestinationSelection.value)).id,
    travelers: Number(tripNumTravelersInput.value),
    date: dayjs(tripDateInput.value).format('YYYY/MM/DD'),
    duration: Number(tripDurationInput.value),
    status: 'pending',
    suggestedActivities: [],
  };

  addTripData(postTripObject)
    .then((object) => {
      fetchData('http://localhost:3001/api/v1/trips').then((data) => {
        instantiateTripsRepo(data.trips);
        populateDashboard(currentTraveler);
      });
    })
    .catch((error) => {
      console.error('error', error.message);
      return alert('Oops! Something went wrong. Please try again later.');
    });
  tripForm.reset();
  estimatedCost.innerText = '';
  submitTripButton.disabled = true;
}

// User login
function checkLoginInputs(e) {
  if (usernameInput.value && passwordInput.value) {
    loginButton.disabled = false;
  }
}

function submitLoginForm(e) {
  e.preventDefault();
  let username = usernameInput.value;
  let password = passwordInput.value;

  if (checkUsername(username) && checkPassword(password)) {
    fetchData(`http://localhost:3001/api/v1/travelers/${displayedTravelersId}`)
      .then((data) => {
        currentTraveler = new Traveler(data);
        populateDashboard(currentTraveler);
        dashboard.classList.remove('hidden');
        tripFormWrapper.classList.remove('hidden');
        loginPage.classList.add('hidden');
      })
      .catch((error) => {
        console.error('error', error.message);
        return alert('Oops! Something went wrong. Please try again later.');
      });
    } else {
      loginError.innerText = "Incorrect information entered. Please try again.";
      loginForm.reset();
      loginButton.disabled = true;
    }
  }

function checkUsername(username) {
  let textCheck = username.substring(0, 7);
  let numCheck = username.substring(8);

  if (!textCheck === 'traveler' || Number(numCheck) > travelersRepository.travelers.length) {
    return false;
  } else {
    displayedTravelersId = Number(numCheck);
    return displayedTravelersId;
  }
}

function checkPassword(password) {
  if (password === 'traveler') {
    return true;
  }
}
