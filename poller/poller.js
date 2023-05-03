const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const https = require('https');

const limiter = require('./utils/rateLimiter');
const Reading = require('./models/readings');

require('dotenv').config();

const { DB_ADDRESS, SENSOR_ADDRESS, PORT } = process.env;
const app = express();

mongoose.connect(DB_ADDRESS);

app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors());
app.options('*', cors());

//To run manually: node poller.js  
app.listen(PORT, () => {
  console.log(`\u001b[1;33m\n********************************\nPoller is listening at port ${PORT}\u001b[0m`);
});

setInterval(() => {
  try {
    https.get(SENSOR_ADDRESS, response => {
      let data = {};

      response.on('data', res => {
        data = JSON.parse(res);
      });

      response.on('end', async () => {
        const date = new Date(data.timestamp);
        const newReading = {
          "temperature": data.temperature,
          "pressure": data.pressure,
          "date": `${date.getDate().toString().padStart(2, '0')}/${date.getMonth().toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`,
          "time": `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`,
        }
        await Reading.create(newReading);
      });
    });
  } catch (error) {
    console.log("Polling process exited with error: \n", error);
  }
}, 1000 * 3600)
