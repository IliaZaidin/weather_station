/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const indexRouter = require('./routes');
const NotFoundError = require('./middlewares/notFoundError');
const limiter = require('./utils/rateLimiter');
const handleErrors = require('./middlewares/handleErrors');

require('dotenv').config();

const { DB_ADDRESS } = process.env;
const { PORT } = process.env;
const app = express();

mongoose.connect(DB_ADDRESS);

app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use(cors());
app.options('*', cors());

app.get('/crash-test', () => {
    setTimeout(() => {
        throw new Error('Server will crash now');
    }, 0);
});

app.use('/', indexRouter);
app.get('*', () => {
    throw new NotFoundError('Requested resource not found');
});

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

// To run manually: node app.js
app.listen(PORT, () => {
    console.log(`\u001b[1;33m\n********************************\nApp is listening at port ${PORT}\u001b[0m`);
});