const { getActiveUsers } = require('../../socketio/activeusers');

const VoiceResponse = require('twilio').twiml.VoiceResponse;

const inOutBoundCallTwilio = (req, res) => {
    console.log(req.body);
    const toNumberOrClientName = req.body?.To;
    const callerId = process.env.TWILIO_VIRTUAL_NUMBER_TRIAL;
    const twiml = new VoiceResponse();

    let incomingPSTNCall = false;
    //Incoming PSTN Call
    for (const user of getActiveUsers()) {
        // If the request to the /voice endpoint is TO your Twilio Number,
        // then it is an incoming call towards your Twilio.Device.
        if (toNumberOrClientName == user?.twilioVirtualNo) {
            const dial = twiml.dial();

            // This will connect the caller with your Twilio.Device/client
            // TwiML noun is expected to be 'client'
            dial.client(user.username);
            incomingPSTNCall = true;
            break;
        }
    }

    // This is an outgoing call or app-to-app call
    if(!incomingPSTNCall) {
        if (toNumberOrClientName) {

            // set the callerId
            const dial = twiml.dial({callerId});
    
            // Check if the 'To' parameter is a Phone Number or Client Name
            // in order to use the appropriate TwiML noun
            const attr =
            isAValidPhoneNumber(toNumberOrClientName) ?
            'number' :
            'client';
            dial[attr]({}, toNumberOrClientName);
        } else {
            twiml.say('Thanks for calling!');
        }
    }

    res.set('Content-Type', 'text/xml');
    res.send(twiml.toString());
};

/**
 * Checks if the given value is valid as phone number
 * @param {Number|String} number
 * @return {Boolean}
 */
function isAValidPhoneNumber(number) {
    return /^[\d+\-() ]+$/.test(number);
}

module.exports = inOutBoundCallTwilio;