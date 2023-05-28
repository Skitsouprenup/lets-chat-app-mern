const { getVirtualNo } = require("../../utilities");

const AccessToken = require("twilio").jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

const twilioJWT = (req, res) => {
    const identity = req.body?.username;

    const accessToken = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY_SID,
        process.env.TWILIO_API_KEY_SECRET,
        {identity}  
    );

    //Allow incoming call
    const grant = new VoiceGrant({
        outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
        incomingAllow: true,
    });
    accessToken.addGrant(grant);

    // Include identity and token in a JSON response
    res.send({
        token: accessToken.toJwt(),
        twilioVirtualNo: getVirtualNo('Twilio', identity) ? true : false,
    });
}

module.exports = twilioJWT;