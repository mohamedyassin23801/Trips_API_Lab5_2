const express = require('express');
const controller = require('../controllers/tripController');
const { verifyAdmin } = require('../middleware/verifyAdmin');
const { validateTrip } = require('../middleware/validateTrip');
const { logRequest } = require('../middleware/logRequest');
const router = express.Router();

router.use(logRequest);

router.get('/trips', controller.getAllTrips);
router.get('/trips/:id', controller.getTripById);
router.post('/trips', verifyAdmin, validateTrip, controller.createTrip);
router.put('/trips/:id', verifyAdmin, controller.updateTrip);
router.delete('/trips/:id', verifyAdmin, controller.deleteTrip);
router.post('/api/v1/trips/compare', controller.compareTrips);

module.exports = router;
