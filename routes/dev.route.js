const express = require('express');
const { devTest } = require('../controllers/dev.controller');

const dev = express.Router();

dev.get('/check', devTest);

module.exports = dev;
