const http = require('http');
const { SENSOR_ADDRESS } = process.env;

const pollSensor = () => {
    http.get(SENSOR_ADDRESS, response => {
        let reading = {};
        response.on('data', data => {
            reading = JSON.parse(data);
        });

        response.on('end', () => {
            return reading;
        });
    });
}

module.exports = pollSensor;