import express from 'express';

import { createLocation } from './controllers/locations';
import { validateLocationDetails } from './helpers/locationValidations';

const router = express.Router();

router.post('/location', validateLocationDetails, createLocation);

export default router;
