const twilio = require('twilio');

exports.twilioOutboundSMS = (req, res) => {
    //console.log(req.body);
    const messageBody = req.body?.message;
    const receiver = req.body?.phoneNo;

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    client.messages
        .create(
            {
                body: messageBody,
                from: process.env.TWILIO_VIRTUAL_NUMBER_TRIAL, 
                to: receiver,
            }
        )
        .then(() => res.sendStatus(200))
        .catch((e) => {
            console.error(e);
            res.sendStatus(500);
        });
};