const http = require('http');

const pollSensor = () => {
  try {
    https.get(SENSOR_ADDRESS, response => {
      let data = {};

      response.on('data', res => {
        data = JSON.parse(res);
      });

      response.on('end', () => {
        return data;
      });
    });
  } catch (error) {
    console.log("Failed to poll sensor. Error: \n", error);
  }
}

module.exports = { pollSensor };