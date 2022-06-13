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
let cardContent = document.getElementById('cardContent');
let scrollContent = document.getElementById('scrolly-thingy');


// let upcomingCardDisplay = document.getElementById('upcomingDisplayBlock')

// Global Variables:
let currentTraveler;
let travelersRepository;
let tripsRepository;
let destinationsRepository;

let mockPastTrip = {
"id": 177,
"userID": 2,
"destinationID": 20,
"travelers": 6,
"date": "2020/01/29",
"duration": 8,
"status": "approved",
"suggestedActivities": []
}

let mockDestination = {
"id": 20,
"destination": "Miami, Florida",
"estimatedLodgingCostPerDay": 158,
"estimatedFlightCostPerPerson": 275,
"image": "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80",
"alt": "sand with palm trees and tall buildings in the background"
}


let displayedTravelersId = Math.floor(Math.random() * 50);

const tripCard = `
  <article class="card">
      <img
        src=${mockDestination.image}
        alt= ${mockDestination.alt}
        class="card-image"
        id=
      />
    <div class="bottom-card">
      <header class="card-header">
        <h4>${mockDestination.destination}</h4>
      </header>
      <p class="date">Trip Date: ${mockPastTrip.date}</p>
      <p class="duration">Trip Duration: ${mockPastTrip.duration}</p>
      <p class="num-travelers">Number of Travelers: ${mockPastTrip.travelers}</p>
    </div>
  </article>
`

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
  // const destinationsData = data.map(destination => new Traveler(traveler))
  destinationsRepository = new DestinationsRepository(data);
  getTotalCostFromPastYear();
}

function populateDashboard(currentTraveler) {
  console.log("poptrav", currentTraveler)
  // on page load I want the Welcome message to update to the User's first name.
  userName.innerText = `${currentTraveler.getTravelerFirstName()}`;
  const allUserPastTrips = tripsRepository.getAllPastTripsForTraveler(displayedTravelersId, "2022/06/12");

  // display trips in their respective sections: Present, Upcoming, Past
allUserPastTrips.forEach((trip, index) => {
  scrollContent.innerHTML +=
  `
  <article class="card">
      <img
        src=${mockDestination.image}
        alt= ${mockDestination.alt}
        class="card-image"
        id=
      />
    <div class="bottom-card">
      <header class="card-header">
        <h4>${mockDestination.destination}</h4>
      </header>
      <p class="date">Trip Date: ${trip.date}</p>
      <p class="duration">Trip Duration: ${trip.duration}</p>
      <p class="num-travelers">Number of Travelers: ${trip.travelers}</p>
    </div>
  </article>
`
  })
  // cardContent.innerHTML = tripCard;
  // card1.innerHTML = tripCard
  // card2.innerHTML = tripCard
  // card3.innerHTML = tripCard
  // const allUserPastTrips = tripsRepository.getAllPastTripsForTraveler(displayedTravelersId, "2022/06/12");
  console.log("user", allUserPastTrips);
  //find a way to populate glider w objects.
  // upcomingCardDisplay.innerHTML = tripCard;
  // display total Amount Spent This Year for partcular user.
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
