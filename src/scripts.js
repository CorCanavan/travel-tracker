// Project Files
import '../node_modules/@glidejs/glide/dist/css/glide.core.min.css'
import '../node_modules/@glidejs/glide/dist/css/glide.theme.min.css'
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

import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm'
new Glide('.glide').mount({ Controls, Breakpoints })

//Query Selectors:
let userName = document.getElementById('currentUserName');
let cardContent = document.getElementById('cardContent');
let card1 = document.getElementById('card-1');
let card2 = document.getElementById('card-2');
let card3 = document.getElementById('card-3');


// let upcomingCardDisplay = document.getElementById('upcomingDisplayBlock')

// Global Variables:
let travelersRepository;
let tripsRepository;
let destinationsRepository;
let mockCurrentTraveler =   {
    "id": 2,
    "name": "Rachael Vaughten",
    "travelerType": "thrill-seeker"
  };

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

//Event Listeners:
// ON page load, want to get all the data for a particular user based on ID.
window.addEventListener('load', populateDashboard);

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

function populateDashboard() {
  // on page load I want the Welcome message to update to the User's first name.
  userName.innerText = mockCurrentTraveler.name;
  // display trips in their respective sections: Present, Upcoming, Past
  cardContent.innerHTML = tripCard;
  card1.innerHTML = tripCard
  card2.innerHTML = tripCard
  card3.innerHTML = tripCard

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
