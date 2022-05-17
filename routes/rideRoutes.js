import express from 'express';
import { addRide, getInProgressRide, getUserRides , getInRideBalance} from '../controllers/rideController.js';

const router = express.Router();

router.post('/addRide', addRide);
router.get('/userRides', getUserRides);
router.get('/inProgress', getInProgressRide);
router.get('/inBalance',getInRideBalance)

export default router;