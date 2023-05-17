const express = require('express');
const inboundCall = require('./inboundcall');

const CallsRouter = express.Router();

CallsRouter.post('/inboundcall', inboundCall);

module.exports = CallsRouter;