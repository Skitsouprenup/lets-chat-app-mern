const express = require('express');
const { sinchOutboundSMS } = require('./sinch/outboundsms.js');
const { sinchInboundSMS } = require('./sinch/inboundsms.js');
const { twilioInboundSMS } = require('./twilio/inboundsms.js');
const { twilioOutboundSMS } = require('./twilio/outboundsms.js');

const SMSRouter = express.Router();

SMSRouter.post('/sinch/outboundsms', sinchOutboundSMS);
SMSRouter.post('/sinch/inboundsms', sinchInboundSMS);

SMSRouter.post('/twilio/inboundsms', twilioInboundSMS);
SMSRouter.post('/twilio/outboundsms', twilioOutboundSMS);

module.exports = SMSRouter;