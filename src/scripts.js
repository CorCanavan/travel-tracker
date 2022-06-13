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
let pastScrollContent = document.getElementById('pastScrollContent');
let upcomingScrollContent = document.getElementById('upcomingScrollContent');
let pendingScrollContent = document.getElementById('pendingScrollContent');
let presentScrollContent = document.getElementById('presentScrollContent');

// let upcomingCardDisplay = document.getElementById('upcomingDisplayBlock')

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
  // const destinationsData = data.map(destination => new Traveler(traveler))
  destinationsRepository = new DestinationsRepository(data);
  getTotalCostFromPastYear();
}

function populateDashboard(currentTraveler) {
  console.log("poptrav", currentTraveler)
  // on page load I want the Welcome message to update to the User's first name.
  userName.innerText = `${currentTraveler.getTravelerFirstName()}`;
  const allUserPastTrips = tripsRepository.getAllPastTripsForTraveler(displayedTravelersId, "2022/06/12");
    allUserPastTrips.forEach((trip, index) => {
      const destination = destinationsRepository.getDestinationById(trip.destinationID);
      pastScrollContent.innerHTML +=
          `
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
  })
  const allUserPresentTrips = tripsRepository.getAllPresentTripsForTraveler(displayedTravelersId, "2022/06/12");
    if (!allUserPresentTrips.length) {
      presentScrollContent.innerHTML += `<p>No present trips to display!</p>`;
    } else {
    allUserPresentTrips.forEach((trip, index) => {
      console.log("what is this", allUserPresentTrips)
      const destination = destinationsRepository.getDestinationById(trip.destinationID);
          presentScrollContent.innerHTML +=
          `
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
    })
  }
  // display total Amount Spent This Year for partcular user.
}

// function parseCardFromData(destination, trip) {
//   return
//   `
//     <article class="card">
//         <img
//           src=${destination.image}
//           alt=${destination.alt}
//           class="card-image"
//         />
//       <div class="bottom-card">
//         <header class="card-header">
//           <h4>${destination.destination}</h4>
//         </header>
//         <p class="date">Trip Date: ${trip.date}</p>
//         <p class="duration">Trip Duration: ${trip.duration}</p>
//         <p class="num-travelers">Number of Travelers: ${trip.travelers}</p>
//       </div>
//     </article>
//   `
// }




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
