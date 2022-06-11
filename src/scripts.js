// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import {allTravelersData, allTripsData, allDestinationsData, fetchData} from './apiCalls.js';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png';

console.log('This is the JavaScript entry file - your code begins here.');



//Promise.all
Promise.all([allTravelersData, allTripsData, allDestinationsData])
  .then(data => {
    console.log("travTest", data[0].travelers);
    console.log("tripTest", data[1].trips);
    console.log("destinationTest", data[2].destinations);
  })
  .catch((error) => alert("Oops something went wrong. Try again later."));
