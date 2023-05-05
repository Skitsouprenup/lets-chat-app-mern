const express = require('express');
const { registerUser } = require('./register');
const { loginUser } = require('./login');
const verifySession = require('../../verifysession.js');
const { logOutUser } = require('./logout');

const UserRouter = express.Router();

UserRouter.get('/verifysession', verifySession);
UserRouter.post('/register', registerUser);
UserRouter.post('/login', loginUser);
UserRouter.get('/logout', logOutUser);

module.exports = UserRouter;