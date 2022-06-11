const travelersApi = "http://localhost:3001/api/v1/travelers"
const tripsApi = "http://localhost:3001/api/v1/trips"
const destinationsApi = "http://localhost:3001/api/v1/destinations"

const fetchData = (url) => {
    return fetch(url).then(response => response.json())
}

const allTravelersData = fetchData(travelersApi);
const allTripsData = fetchData(tripsApi);
const allDestinationsData = fetchData(destinationsApi);


export {allTravelersData, allTripsData, allDestinationsData, fetchData}
