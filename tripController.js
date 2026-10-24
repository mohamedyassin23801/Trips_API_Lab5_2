const { trips, nextTripId } = require('../models/Trip');

function getAllTrips(req, res) {
  return res.status(200).json(trips);
}

function getTripById(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'ID must be a positive integer' });
  for (let i = 0; i < trips.length; i++) {
    if (trips[i].id === id) return res.status(200).json(trips[i]);
  }
  return res.status(404).json({ message: 'Trip not found' });
}

function createTrip(req, res) {
  const trip = { id: nextTripId(), destination: req.body.destination, country: req.body.country, cost: req.body.cost };
  trips.push(trip);
  return res.status(201).json(trip);
}

function updateTrip(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'ID must be a positive integer' });
  const { destination, country, cost } = req.body || {};
  if (typeof destination !== 'string' || destination.trim() === '' ||
      typeof country !== 'string' || country.trim() === '' ||
      cost === undefined || cost === null || cost === '' ||
      !Number.isFinite(Number(cost)) || Number(cost) <= 0) {
    return res.status(400).json({ message: 'destination and country must be non-empty strings, and cost must be greater than zero' });
  }
  for (let i = 0; i < trips.length; i++) {
    if (trips[i].id === id) {
      trips[i].destination = destination.trim();
      trips[i].country = country.trim();
      trips[i].cost = Number(cost);
      return res.status(200).json(trips[i]);
    }
  }
  return res.status(404).json({ message: 'Trip not found' });
}

function deleteTrip(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'ID must be a positive integer' });
  for (let i = 0; i < trips.length; i++) {
    if (trips[i].id === id) {
      trips.splice(i, 1);
      return res.status(200).json({ message: 'Trip deleted successfully' });
    }
  }
  return res.status(404).json({ message: 'Trip not found' });
}

function compareTrips(req, res) {
  const { tripId1, tripId2 } = req.body || {};
  if (!Number.isInteger(tripId1) || tripId1 <= 0 || !Number.isInteger(tripId2) || tripId2 <= 0 || tripId1 === tripId2) {
    return res.status(400).json({ message: 'tripId1 and tripId2 must be different positive integers' });
  }
  let trip1;
  let trip2;
  for (let i = 0; i < trips.length; i++) {
    if (trips[i].id === tripId1) trip1 = trips[i];
    if (trips[i].id === tripId2) trip2 = trips[i];
  }
  if (!trip1 || !trip2) return res.status(404).json({ message: 'One or both trips not found' });
  const costDifference = Math.abs(trip1.cost - trip2.cost);
  const result = {
    trip1: { id: trip1.id, destination: trip1.destination, cost: trip1.cost },
    trip2: { id: trip2.id, destination: trip2.destination, cost: trip2.cost },
    costDifference
  };
  if (trip1.cost === trip2.cost) result.message = 'Neither trip is cheaper; both have the same cost.';
  else result.cheaperDestination = trip1.cost < trip2.cost ? trip1.destination : trip2.destination;
  return res.status(200).json(result);
}

module.exports = { getAllTrips, getTripById, createTrip, updateTrip, deleteTrip, compareTrips };
