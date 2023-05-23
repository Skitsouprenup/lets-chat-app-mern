const express = require('express');
const inboundCallSinch = require('./inboundcallsinch');
const inOutBoundCallTwilio = require('./inoutboundcalltwilio');

const CallsRouter = express.Router();

CallsRouter.post('/sinch/inboundcall', inboundCallSinch);
CallsRouter.post('/twilio/inoutboundcall', inOutBoundCallTwilio);

module.exports = CallsRouter;