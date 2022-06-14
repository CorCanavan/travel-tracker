const travelersApi = "http://localhost:3001/api/v1/travelers"
const tripsApi = "http://localhost:3001/api/v1/trips"
const destinationsApi = "http://localhost:3001/api/v1/destinations"

const fetchData = (url) => {
  return fetch(url).then(response => response.json())
}

const allTravelersData = fetchData(travelersApi);
const allTripsData = fetchData(tripsApi);
const allDestinationsData = fetchData(destinationsApi);

const addTripData = (postTripObject) => {
  return fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(postTripObject)
  })
  .then(response => response.json());
}

export {allTravelersData, allTripsData, allDestinationsData, fetchData, addTripData}
