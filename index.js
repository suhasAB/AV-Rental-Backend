// require("dotenv").config();
import dotenv from 'dotenv'
import { createConnection } from 'mysql';
import express from 'express';

import userRouter from './routes/userRoutes.js';
import carRouter from  './routes/carRoutes.js';
import rideRouter from './routes/rideRoutes.js';

dotenv.config();
var app = express();
app.use(express.json());

import cors from 'cors';
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

var con = createConnection({
  host: "spartan-hotels.cre4aiflmlky.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "spadmin",
  password: "spadmin12345",
  database: "rentalAV"
});

app.listen(5000, () => {
  console.log(`Server listening on port 5000`);
});

app.get('/', (req, res) => {
  res.send('<h1>AV Rental Backend API endpoint!</h1> <h4>Message: Success</h4> <p>Team 7</p>');
})
app.use('/user', userRouter);
app.use('/car', carRouter);
app.use('/ride', rideRouter);

export default con;
