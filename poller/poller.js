const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const http = require('http');

const limiter = require('./utils/rateLimiter');
const Reading = require('./models/readings');
const indexRouter = require('./routes');

require('dotenv').config();

const { DB_ADDRESS, SENSOR_ADDRESS, PORT } = process.env;
const app = express();

mongoose.connect(DB_ADDRESS);

app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors());
app.options('*', cors());

app.use('/', indexRouter);

//To run manually: node poller.js  
app.listen(PORT, () => {
  console.log(`\u001b[1;33m\n********************************\nPoller is listening at port ${PORT}\u001b[0m`);
});

setInterval(() => {
  try {
    const time = new Date()
    if (time.getMinutes() == 0) {
      http.get(SENSOR_ADDRESS, response => {
        let data = {};

        response.on('data', res => {
          data = JSON.parse(res);
        });

        response.on('end', async () => {
          await Reading.create(data);
        });
      });
    }
  } catch (error) {
    console.log("Polling process exited with error: \n", error);
  }
}, 1000 * 60)


