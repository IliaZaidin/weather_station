/* eslint-disable no-console */
const Reading = require('../models/readings');
const NotFoundError = require('../middlewares/notFoundError');
const pollSensor = require('../utils/pollSensor');

const createReading = (req, res, next) => {
    try {
        let reading = pollSensor();
        Reading.create(reading);
        res.status(200).send(reading)
    } catch (error) {
        next(error);
    }
}

const getReadings = async (req, res, next) => {
    try {
        const readings = await Reading.find();
        if (readings.length === 0) {
            throw new NotFoundError('No readings found on server');
        } else res.send(readings.slice(-24));
    } catch (error) {
        next(error);
    }
};

const deleteReading = async (req, res, next) => {
    try {
        const reading = await Reading.findById(req.params.readingId);
        if (!reading) {
            throw new NotFoundError('Reading ID not found');
        } else {
            await Reading.findByIdAndRemove(reading._id.toString());
            res.status(200).send(reading);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createReading, getReadings, deleteReading,
};
