function validateTrip(req, res, next) {
  const { destination, country, cost } = req.body || {};
  if (typeof destination !== 'string' || destination.trim() === '' ||
      typeof country !== 'string' || country.trim() === '' ||
      cost === undefined || cost === null || cost === '' ||
      !Number.isFinite(Number(cost)) || Number(cost) <= 0) {
    return res.status(400).json({
      message: 'destination and country must be non-empty strings, and cost must be a finite number greater than zero'
    });
  }
  req.body.destination = destination.trim();
  req.body.country = country.trim();
  req.body.cost = Number(cost);
  return next();
}

module.exports = { validateTrip };
