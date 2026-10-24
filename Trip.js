const trips = [
  { id: 1, destination: 'Cairo', country: 'Egypt', cost: 300 },
  { id: 2, destination: 'Dubai', country: 'United Arab Emirates', cost: 650 },
  { id: 3, destination: 'Athens', country: 'Greece', cost: 500 }
];

function nextTripId() {
  let highestId = 0;
  for (let i = 0; i < trips.length; i++) {
    if (trips[i].id > highestId) highestId = trips[i].id;
  }
  return highestId + 1;
}

module.exports = { trips, nextTripId };
