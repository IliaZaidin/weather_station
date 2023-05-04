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
        const time = new Date(data.timestamp)
        if (time.getMinutes() == 0)
          await Reading.create(data);
      });
    });
  } catch (error) {
    console.log("Polling process exited with error: \n", error);
  }
}, 1000 * 60)
