/* eslint-disable no-console */
const Reading = require('../models/readings');
const NotFoundError = require('../middlewares/notFoundError');
const Unauthorized = require('../middlewares/unauthorizedError');

const getReadings = async (req, res, next) => {
  try {
    // const readings = await Reading.find({ owner: req.user._id });
    const readings = await Reading.find();
    if (readings.length === 0) {
      throw new NotFoundError('No readings found on server');
    } else res.send(readings);
  } catch (error) {
    next(error);
  }
};

const deleteReading = async (req, res, next) => {
  try {
    const reading = await Reading.findById(req.params.readingId).select('+owner');
    if (!reading) {
      throw new NotFoundError('Reading ID not found');
    } else if (req.user._id !== reading.owner.toString()) {
      throw new Unauthorized('Authorization required');
    } else {
      await Reading.findByIdAndRemove(reading._id.toString());
      res.status(200).send(reading);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReadings, deleteReading,
};