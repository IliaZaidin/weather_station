const validator = require('validator');
const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema(
  {
    temperature: {
      type: String,
      required: true,
    },
    pressure: {
      type: String,
      required: true,
    },
    timestamp: {
        type: String,
        required: true,
      }
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('reading', readingSchema);