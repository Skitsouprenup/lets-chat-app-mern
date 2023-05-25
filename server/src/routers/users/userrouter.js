const express = require('express');
const { registerUser } = require('./register');
const { loginUser } = require('./login');
const verifySession = require('../../verifysession.js');
const { logOutUser } = require('./logout');
const { checkUserVirtualNo } = require('./checkuservirtualno');
const { fetchUserProfileData } = require('./fetchuserprofiledata');
const { saveProfile } = require('./saveprofile');
const { setActiveUser } = require('./setactiveuser');

const UserRouter = express.Router();

UserRouter.post('/register', registerUser);
UserRouter.post('/login', loginUser);

UserRouter.put('/saveprofile', saveProfile);

UserRouter.get('/verifysession', verifySession);
UserRouter.get('/logout', logOutUser);
UserRouter.get('/checkvirtualno', checkUserVirtualNo);
UserRouter.get('/userprofile', fetchUserProfileData);
UserRouter.get('/setactiveuser', setActiveUser);

module.exports = UserRouter;