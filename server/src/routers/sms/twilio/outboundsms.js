const twilio = require('twilio');
const { getVirtualNo } = require('../../../../utilities');

exports.twilioOutboundSMS = (req, res) => {
    //console.log(req.body);
    const username = req.body?.username;
    const messageBody = req.body?.message;
    const receiver = req.body?.phoneNo;

    const virtualNo = getVirtualNo('Twilio', username);
    if(!virtualNo) {
        res.sendStatus(404);
        return;
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    client.messages
        .create(
            {
                body: messageBody,
                from: virtualNo, 
                to: receiver,
            }
        )
        .then(() => res.sendStatus(200))
        .catch((e) => {
            console.error(e);
            res.sendStatus(500);
        });
};