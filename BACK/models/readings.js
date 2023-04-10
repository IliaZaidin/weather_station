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
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('reading', readingSchema);