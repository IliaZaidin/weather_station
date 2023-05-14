const Reading = require('../models/readings');
const NotFoundError = require('../middlewares/notFoundError');

function calculateSeaLevelPressure(data) {
  const elevationM = 67;
  let output = [];

  //PressureAtSeaLevel = pressure * pow(1 - (0.0065 * elevationM) / (tempC + (0.0065 * elevationM) + 273.15), -5.257 ))
  output[0] = parseFloat(data[data.length-9].pressure) * Math.pow(1 - (0.0065 * elevationM) / (parseFloat(data[data.length-9].temperature) + (0.0065 * elevationM) + 273.15), -5.257);
  output[1] = parseFloat(data[data.length-1].pressure) * Math.pow(1 - (0.0065 * elevationM) / (parseFloat(data[data.length-1].temperature) + (0.0065 * elevationM) + 273.15), -5.257);

  return output;
}

const getForecast = async (req, res, next) => {
  try {
    const readings = await Reading.find();
    if (readings.length === 0) {
      throw new NotFoundError('No readings found on server');
    }
    else {
      const forecastData = calculateSeaLevelPressure(readings);
      let Z = 0;

      //Pressure is falling
      if ((forecastData[0] - forecastData[1]) > 1.6) {
        Z = Math.round(127 - 0.12 * forecastData[1]);

      }
      //Pressure is rising
      else if ((forecastData[1] - forecastData[0]) > 1.6) {
        Z = Math.round(185 - 0.16 * forecastData[1]);
      }
      //Pressure is stable
      else {
        Z = Math.round(144 - 0.13 * forecastData[1]);
      }
    res.send(Z);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getForecast };