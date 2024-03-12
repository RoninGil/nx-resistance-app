/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';

// Import the mongoose module
import mongoose from "mongoose";

import {Resistance} from './models/resistanceModel';

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = "mongodb+srv://dbUser:dbUser@resistanceapi.rr5fwf1.mongodb.net/?retryWrites=true&w=majority&appName=ResistanceApi";

// Wait for database to connect, logging an error if there is a problem
async function connectMongoose() {
  await mongoose.connect(mongoDB);
}

connectMongoose().catch((err) => console.log('error', err));

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(
  cors({
    origin: 'http://localhost:4200',
    // Allow follow-up middleware to override this CORS for options
    preflightContinue: true,
  }),
);

app.get('/api/resistanceValues', async (req, res) => {
  const [allValues] = await Resistance.find();
  res.send({ data: allValues});
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
