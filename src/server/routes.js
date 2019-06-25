import express from 'express';

import {
  createLocation, getAllLocations
} from './controllers/locations';
import { validateLocationDetails } from './helpers/locationValidations';

const router = express.Router();

router.get('/locations', getAllLocations);
router.post('/location', validateLocationDetails, createLocation);

export default router;
