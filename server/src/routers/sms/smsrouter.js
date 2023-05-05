const express = require('express');
const { outBoundSMS } = require('./outboundsms.js');
const { inBoundSMS } = require('./inboundsms.js');

const SMSRouter = express.Router();

SMSRouter.post('/outboundsms', outBoundSMS);
SMSRouter.post('/inboundsms', inBoundSMS);

module.exports = SMSRouter;