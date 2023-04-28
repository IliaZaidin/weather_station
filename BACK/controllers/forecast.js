const Reading = require('../models/readings');
const NotFoundError = require('../middlewares/notFoundError');
const { log } = require('winston');

const lookupTable = new Map([
  [1, "Settled Fine"],
  [2, "Fine Weather"],
  [3, "Fine, Becoming Less Settled"],
  [4, "Fairly Fine, Showery Later"],
  [5, "Showery, Becoming More Unsettled"],
  [6, "Unsettled, Rain Later"],
  [7, "Rain at Times, Worse Later"],
  [8, "Rain at Times, Becoming Very Unsettled"],
  [9, "Very Unsettled, Rain"],
  [10, "Settled Fine"],
  [11, "Fine Weather"],
  [12, "Fine, Possibly Showers"],
  [13, "Fairly Fine, Showers Likely"],
  [14, "Showery, Bright Intervals"],
  [15, "Changeable, Some Rain"],
  [16, "Unsettled, Rain at Times"],
  [17, "Rain at Frequent Intervals"],
  [18, "Very Unsettled, Rain"],
  [19, "Stormy, Much Rain"],
  [20, "Settled Fine"],
  [21, "Fine Weather"],
  [22, "Becoming Fine"],
  [23, "Fairly Fine, Improving"],
  [24, "Fairly Fine, Possibly Showers Early"],
  [25, "Showery Early, Improving"],
  [26, "Changeable, Mending"],
  [27, "Rather Unsettled, Clearing Later"],
  [28, "Unsettled, Probably Improving"],
  [29, "Unsettled, Short Fine Intervals"],
  [30, "Very Unsettled, Finer at Times"],
  [31, "Stormy, Possibly Improving"],
  [32, "Stormy, Much Rain"],
]);

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
        Z = lookupTable.get(Math.round(127 - 0.12 * forecastData[1]));
      }
      //Pressure is rising
      else if ((forecastData[1] - forecastData[0]) > 1.6) {
        Z = lookupTable.get(Math.round(185 - 0.16 * forecastData[1]));
      }
      //Pressure is stable
      else {
        Z = lookupTable.get(Math.round(144 - 0.13 * forecastData[1]));
      }
      res.send(JSON.stringify(Z));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getForecast };