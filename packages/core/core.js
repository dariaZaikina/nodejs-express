const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const error = require('../error/error');
const adventuresRoutes = require('../adventures/adventures');
const showplacesRoutes = require('../showplace/showplace');


const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v001/adventures', adventuresRoutes);
app.use('/api/v001/showplaces', showplacesRoutes);

app.use((req, res) => {
  res.json({ status: 'BAD_REQUEST', messages: [error({ code: 'BAD_REQUEST' })] });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.json({ status: 'FAIL', messages: [error({ code: err.message })] });
});

module.exports = app;
