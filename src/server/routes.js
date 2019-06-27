import express from 'express';

import {
  createLocation, getAllLocations, updateLocation, deleteLocation
} from './controllers/locations';
import {
  validateLocationDetails,
  validateLocationUpdateDetails
} from './helpers/locationValidations';

const router = express.Router();

router.get('/locations', getAllLocations);
router.post('/location', validateLocationDetails, createLocation);
router.patch('/locations/:locationId', validateLocationUpdateDetails, updateLocation)
router.delete('/locations/:locationId', deleteLocation);

export default router;
